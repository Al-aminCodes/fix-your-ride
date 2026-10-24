"use client";

import { authClient } from "@/lib/auth-client";
import {
  ArrowRight,
  ClipboardList,
  Search,
  Star,
  UserRound,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const stats = [
  {
    title: "Total Requests",
    value: "0",
    icon: ClipboardList,
    description: "Your mechanic requests",
  },
  {
    title: "Completed Jobs",
    value: "0",
    icon: Wrench,
    description: "Successfully completed",
  },
  {
    title: "My Reviews",
    value: "0",
    icon: Star,
    description: "Reviews you have submitted",
  },
];

export default function CustomerDashboard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.replace("/login");
      return;
    }

    if (session.user.role !== "CUSTOMER") {
      router.replace("/dashboard/mechanic");
    }
  }, [session, isPending, router]);

  if (isPending || !session) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </main>
    );
  }

  const user = session.user;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Welcome section */}
        <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold text-orange-600">
              CUSTOMER DASHBOARD
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Welcome back, {user.name}!
            </h1>

            <p className="mt-2 text-slate-500">
              Manage your mechanic requests and keep track of your repairs.
            </p>
          </div>

          <Link
            href="/mechanics"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            <Search size={19} />
            Find a Mechanic
          </Link>
        </section>

        {/* Stats cards */}
        <section className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>
                    <p className="mt-3 text-3xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                  </div>

                  <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                    <Icon size={22} />
                  </div>
                </div>

                <p className="mt-4 text-sm text-slate-500">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </section>

        {/* Main dashboard content */}
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Recent Repair Requests
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Track the status of your repair requests.
                </p>
              </div>

              <ClipboardList className="text-orange-500" size={25} />
            </div>

            <div className="my-8 rounded-xl border border-dashed border-slate-300 px-5 py-10 text-center">
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-slate-100">
                <Wrench className="text-slate-500" size={25} />
              </div>

              <h3 className="font-semibold text-slate-800">
                No repair requests yet
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                When you request a repair from a mechanic, your requests and
                their status will appear here.
              </p>

              <Link
                href="/mechanics"
                className="mt-5 inline-flex items-center gap-2 font-semibold text-orange-600 hover:text-orange-700"
              >
                Explore mechanics <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          {/* Profile card */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-100 text-orange-600">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="size-full object-cover"
                  />
                ) : (
                  <UserRound size={24} />
                )}
              </div>

              <div className="min-w-0">
                <h2 className="truncate font-bold text-slate-900">
                  {user.name}
                </h2>
                <p className="truncate text-sm text-slate-500">{user.email}</p>
              </div>
            </div>

            <div className="my-5 border-t border-slate-100" />

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Account type</span>
              <span className="rounded-full bg-orange-50 px-3 py-1 font-medium text-orange-700">
                Customer
              </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              Find trusted mechanics, request repairs, and review your service
              history from your account.
            </p>
          </aside>
        </section>
      </div>
    </main>
  );
}
