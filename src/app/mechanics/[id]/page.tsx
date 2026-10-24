"use client";

import {
  ArrowLeft,
  BadgeCheck,
  CalendarCheck,
  Clock,
  MapPin,
  Phone,
  RefreshCw,
  Star,
  UserRound,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface IMechanic {
  _id: string;
  name: string;
  workshop: string;
  location: string;
  distance?: string;
  rating: number;
  reviews: number;
  specialties: string[];
  experience: number;
  hourlyRate: number;
  available: boolean;
  verified: boolean;
  image?: string;
  phone?: string;
  description?: string;
}

const API_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export default function MechanicDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const [mechanic, setMechanic] = useState<IMechanic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMechanic = useCallback(
    async (signal?: AbortSignal) => {
      if (!API_URL) {
        setError("Backend URL is not configured.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_URL}/machanics/${encodeURIComponent(id)}`,
          {
            signal,
            cache: "no-store",
          },
        );

        if (response.status === 404) {
          throw new Error("Mechanic not found.");
        }

        if (!response.ok) {
          throw new Error("Failed to load mechanic details.");
        }

        const data: IMechanic = await response.json();

        if (!data || !data._id) {
          throw new Error("Invalid mechanic data received from server.");
        }

        setMechanic(data);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;

        setMechanic(null);
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [id],
  );

  useEffect(() => {
    const controller = new AbortController();

    queueMicrotask(() => void fetchMechanic(controller.signal));

    return () => controller.abort();
  }, [fetchMechanic]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-orange-500" />
          <p className="mt-4 text-sm text-slate-500">
            Loading mechanic details...
          </p>
        </div>
      </main>
    );
  }

  if (error || !mechanic) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <Wrench size={44} className="mb-4 text-slate-400" />

        <h1 className="text-2xl font-bold text-slate-900">
          {error === "Mechanic not found."
            ? "Mechanic Not Found"
            : "Unable to Load Mechanic"}
        </h1>

        <p className="mt-2 max-w-md text-slate-500">
          {error || "This mechanic may no longer be available."}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => void fetchMechanic()}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
          >
            <RefreshCw size={17} />
            Try Again
          </button>

          <Link
            href="/mechanics"
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-100"
          >
            Back to Mechanics
          </Link>
        </div>
      </main>
    );
  }

  const initials: string = mechanic.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-orange-600"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Profile header */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="h-36 bg-linear-to-r from-slate-900 via-slate-800 to-orange-500 sm:h-48" />

          <div className="px-5 pb-7 sm:px-8">
            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-orange-50 text-2xl font-bold text-orange-600 sm:size-28">
                  {mechanic.image ? (
                    <img
                      src={mechanic.image}
                      alt={mechanic.name}
                      className="size-full object-cover"
                    />
                  ) : (
                    <UserRound size={42} />
                  )}
                </div>

                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold text-[#ff6a00] sm:text-3xl">
                      {mechanic.name}
                    </h1>

                    {mechanic.verified && (
                      <BadgeCheck
                        size={21}
                        className="text-blue-600"
                        aria-label="Verified mechanic"
                      />
                    )}
                  </div>

                  <p className="mt-1 font-medium text-orange-600">
                    {mechanic.workshop}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={16} />
                      {mechanic.location}
                    </span>

                    <span className="inline-flex items-center gap-1">
                      <Star
                        size={16}
                        className="fill-amber-400 text-amber-400"
                      />
                      {mechanic.rating.toFixed(1)}
                      <span>({mechanic.reviews} reviews)</span>
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href={`/mechanics/${mechanic._id}/request`}
                className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white"
              >
                Request a Repair
              </Link>
            </div>
          </div>
        </section>

        {/* Profile details */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-bold text-slate-900">
                About the Mechanic
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                {mechanic.description ||
                  `${mechanic.name} works at ${mechanic.workshop} in ${mechanic.location}. Contact the workshop to discuss your vehicle repair needs.`}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                  <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
                    <Clock size={21} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Experience</p>
                    <p className="font-bold text-slate-900">
                      {mechanic.experience} years
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                  <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
                    <Wrench size={21} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Hourly Rate</p>
                    <p className="font-bold text-slate-900">
                      ৳{mechanic.hourlyRate.toLocaleString("en-BD")}/hour
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-bold text-slate-900">
                Services Offered
              </h2>

              {mechanic.specialties.length > 0 ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {mechanic.specialties.map((service) => (
                    <div
                      key={service}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 p-4"
                    >
                      <Wrench size={18} className="text-orange-500" />
                      <span className="font-medium text-slate-700">
                        {service}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-slate-500">
                  No services have been listed yet.
                </p>
              )}
            </section>
          </div>

          {/* Contact information */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Contact Information
            </h2>

            <div className="mt-5 flex items-start gap-3">
              <MapPin className="mt-1 shrink-0 text-orange-500" size={20} />
              <div>
                <p className="font-medium text-slate-800">Location</p>
                <p className="mt-1 text-sm text-slate-500">
                  {mechanic.location}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3">
              <Phone className="mt-1 shrink-0 text-orange-500" size={20} />
              <div>
                <p className="font-medium text-slate-800">Phone</p>
                <p className="mt-1 break-all text-sm text-slate-500">
                  {mechanic.phone || "Contact details not provided"}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3">
              <Clock className="mt-1 shrink-0 text-orange-500" size={20} />
              <div>
                <p className="font-medium text-slate-800">Availability</p>
                <p
                  className={`mt-1 text-sm font-medium ${
                    mechanic.available ? "text-green-600" : "text-slate-500"
                  }`}
                >
                  {mechanic.available ? "Available" : "Currently busy"}
                </p>
              </div>
            </div>

            <Link
              href={`/mechanics/${encodeURIComponent(mechanic._id)}/request`}
              className="mt-6 flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Request This Mechanic
            </Link>

            <p className="mt-3 text-center text-xs leading-5 text-slate-500">
              Confirm repair details and pricing before approving any work.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
