import Link from "next/link";
import {
  Wrench,
  UserRound,
  CalendarDays,
  Star,
  Settings,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { requireRole } from "@/lib/require-role";

const stats = [
  {
    label: "Total Requests",
    value: "10",
    icon: CalendarDays,
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Completed Jobs",
    value: "5",
    icon: CheckCircle2,
    color: "bg-green-50 text-green-600",
  },
  {
    label: "Average Rating",
    value: "4.9",
    icon: Star,
    color: "bg-amber-50 text-amber-600",
  },
  {
    label: "Experience",
    value: "5 years",
    icon: Clock,
    color: "bg-purple-50 text-purple-600",
  },
];

export default async function MechanicDashboardPage() {
  const session = await requireRole("MECHANIC");
  const name = session.user.name || "Mechanic";

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome */}
        <section className="overflow-hidden rounded-2xl bg-slate-950 p-6 text-white sm:p-9">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-orange-400">
                MECHANIC DASHBOARD
              </p>

              <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
                Welcome back, {name}!
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                Manage your mechanic profile, track service requests, and grow
                your repair business with FixMyRide.
              </p>
            </div>

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-500">
              <Wrench size={32} />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}
                  >
                    <Icon size={20} />
                  </span>
                </div>

                <p className="mt-4 text-xl font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </section>

        {/* Dashboard actions */}
        <section className="mt-9">
          <h2 className="text-xl font-bold text-slate-900">
            Manage your business
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Keep your profile updated so customers can find you.
          </p>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <Link
              href="/dashboard/mechanic/profile"
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-orange-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <UserRound size={24} />
                </span>

                <ArrowRight
                  size={20}
                  className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-orange-500"
                />
              </div>

              <h3 className="mt-5 font-bold text-slate-900">
                My Mechanic Profile
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Add your workshop details, location, specialties, experience,
                and service prices.
              </p>
            </Link>

            <Link
              href="/dashboard/mechanic/requests"
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-orange-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <CalendarDays size={24} />
                </span>

                <ArrowRight
                  size={20}
                  className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-orange-500"
                />
              </div>

              <h3 className="mt-5 font-bold text-slate-900">
                Service Requests
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                View customer repair requests and manage their status.
              </p>
            </Link>

            <Link
              href="/dashboard/mechanic/settings"
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-orange-300 hover:shadow-md md:col-span-2"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <Settings size={24} />
                </span>

                <ArrowRight
                  size={20}
                  className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-orange-500"
                />
              </div>

              <h3 className="mt-5 font-bold text-slate-900">
                Account Settings
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Manage your account and preferences.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
