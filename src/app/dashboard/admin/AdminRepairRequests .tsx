"use client";

import { useEffect, useState } from "react";

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

export default function AdminDashboard() {
  const [requests, setRequests] = useState<RepairRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchRequests() {
      try {
        if (!API_URL) {
          throw new Error("API URL is missing. Check .env.local.");
        }

        const response = await fetch("/api/admin/repair-requests");

        if (!response.ok) {
          throw new Error("Failed to load repair requests.");
        }

        const data: RepairRequest[] = await response.json();

        if (!cancelled) {
          setRequests(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Something went wrong.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRequests();

    return () => {
      cancelled = true;
    };
  }, []);

  const pending = requests.filter(
    (request) => request.status === "pending",
  ).length;

  const accepted = requests.filter(
    (request) => request.status === "accepted",
  ).length;

  const rejected = requests.filter(
    (request) => request.status === "rejected",
  ).length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold text-orange-600">
            FIXMYRIDE / ADMIN
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Repair Requests
          </h1>
          <p className="mt-2 text-slate-600">
            View all repair requests submitted across the platform.
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard label="Total Requests" value={requests.length} />
          <SummaryCard label="Pending" value={pending} />
          <SummaryCard label="Accepted" value={accepted} />
          <SummaryCard label="Rejected" value={rejected} />
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white p-10 text-center text-slate-600 shadow-sm">
            Loading repair requests...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
            {error}
          </div>
        ) : requests.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              No repair requests yet
            </h2>
            <p className="mt-2 text-slate-600">
              Requests will appear here when customers submit them.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {requests.map((request) => (
              <article
                key={request._id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {request.vehicleBrand} {request.vehicleModel}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Registration:{" "}
                      {request.registrationNumber || "Not provided"}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      request.status === "pending"
                        ? "bg-amber-100 text-amber-800"
                        : request.status === "accepted"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {request.status}
                  </span>
                </div>

                <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-sm">
                  <p>
                    <span className="font-semibold text-slate-800">
                      Mechanic ID:
                    </span>{" "}
                    <span className="break-all text-slate-600">
                      {request.mechanicId}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold text-slate-800">
                      Problem:
                    </span>{" "}
                    <span className="text-slate-600">
                      {request.problemCategory}
                    </span>
                  </p>

                  <p className="text-slate-600">{request.description}</p>

                  <p>
                    <span className="font-semibold text-slate-800">
                      Preferred date:
                    </span>{" "}
                    <span className="text-slate-600">
                      {request.preferredDate || "Not specified"}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold text-slate-800">
                      Location:
                    </span>{" "}
                    <span className="text-slate-600">{request.location}</span>
                  </p>

                  <p className="text-xs text-slate-400">
                    Request ID: {request._id}
                  </p>

                  {request.createdAt && (
                    <p className="text-xs text-slate-400">
                      Submitted: {new Date(request.createdAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
