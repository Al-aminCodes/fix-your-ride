"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

interface RepairRequest {
  _id: string;
  mechanicId: string;
  vehicleBrand: string;
  vehicleModel: string;
  registrationNumber?: string;
  problemCategory: string;
  description: string;
  preferredDate: string;
  location: string;
  status: "pending" | "accepted" | "rejected";
  createdAt?: string;
}

const API_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export default function MechanicDashboard() {
  const { data: session, isPending } = authClient.useSession();

  const [requests, setRequests] = useState<RepairRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function handleUpdateStatus(
    requestId: string,
    status: "accepted" | "rejected",
  ) {
    const apiUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

    if (!apiUrl) {
      setError("API URL is missing.");
      return;
    }

    setUpdatingId(requestId);
    setError("");

    try {
      const response = await fetch(
        `${apiUrl}/repair-requests/${requestId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update request status.");
      }

      setRequests((currentRequests) =>
        currentRequests.map((request) =>
          request._id === requestId ? { ...request, status } : request,
        ),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setUpdatingId(null);
    }
  }

  const mechanicId = session?.user?.id;

  useEffect(() => {
    if (isPending || !mechanicId) {
      return;
    }

    const authenticatedMechanicId = mechanicId;
    let cancelled = false;

    async function fetchRequests() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

        if (!apiUrl) {
          throw new Error("API URL is missing. Check your .env.local file.");
        }

        const response = await fetch(
          `${apiUrl}/repair-requests/mechanic/${encodeURIComponent(authenticatedMechanicId)}`,
        );

        if (!response.ok) {
          throw new Error("Failed to load repair requests.");
        }

        const data: RepairRequest[] = await response.json();

        if (!cancelled) {
          setRequests(data);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Something went wrong.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchRequests();

    return () => {
      cancelled = true;
    };
  }, [mechanicId, isPending]);

  if (isPending) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12">
        <p className="animate-pulse text-slate-500">Checking your session...</p>
      </main>
    );
  }

  if (!mechanicId) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12">
        <p className="rounded-xl bg-orange-50 p-4 text-orange-700">
          Please log in to view your mechanic dashboard.
        </p>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12">
        <p className="animate-pulse text-slate-500">
          Loading repair requests...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12">
        <p className="rounded-xl bg-red-50 p-4 text-red-700">{error}</p>
      </main>
    );
  }

  const pendingCount = requests.filter(
    (request) => request.status === "pending",
  ).length;

  const acceptedCount = requests.filter(
    (request) => request.status === "accepted",
  ).length;

  const rejectedCount = requests.filter(
    (request) => request.status === "rejected",
  ).length;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">
            Mechanic workspace
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Repair Requests
          </h1>

          <p className="mt-2 text-slate-600">
            Manage repair requests assigned to you.
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              label: "Pending",
              count: pendingCount,
              color: "text-orange-600",
            },
            {
              label: "Accepted",
              count: acceptedCount,
              color: "text-green-600",
            },
            {
              label: "Rejected",
              count: rejectedCount,
              color: "text-red-600",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className={`mt-2 text-3xl font-bold ${item.color}`}>
                {item.count}
              </p>
            </div>
          ))}
        </div>

        {requests.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              No repair requests yet
            </h2>
            <p className="mt-2 text-slate-500">
              New requests assigned to you will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {requests.map((request) => (
              <article
                key={request._id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {request.vehicleBrand} {request.vehicleModel}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {request.registrationNumber ||
                        "Registration not provided"}
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-700">
                    {request.status}
                  </span>
                </div>

                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-900">
                      Problem:
                    </span>{" "}
                    {request.problemCategory}
                  </p>

                  <p>{request.description}</p>

                  <p>
                    <span className="font-semibold text-slate-900">
                      Preferred date:
                    </span>{" "}
                    {request.preferredDate}
                  </p>

                  <p>
                    <span className="font-semibold text-slate-900">
                      Location:
                    </span>{" "}
                    {request.location}
                  </p>
                </div>

                {requests.map((request) => (
                  <article
                    key={request._id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    {/* Your existing vehicle details and status */}
                    <h2 className="text-lg font-bold">
                      {request.vehicleBrand} {request.vehicleModel}
                    </h2>

                    {/* Your existing problem, date, and location details */}

                    {/* ADD THE BUTTONS HERE */}
                    {request.status === "pending" && (
                      <div className="mt-5 flex gap-3 border-t border-slate-100 pt-4">
                        <button
                          type="button"
                          disabled={updatingId === request._id}
                          onClick={() =>
                            handleUpdateStatus(request._id, "accepted")
                          }
                          className="flex-1 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
                        >
                          {updatingId === request._id
                            ? "Updating..."
                            : "Accept Request"}
                        </button>

                        <button
                          type="button"
                          disabled={updatingId === request._id}
                          onClick={() =>
                            handleUpdateStatus(request._id, "rejected")
                          }
                          className="flex-1 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </article>
                ))}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
