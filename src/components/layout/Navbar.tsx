"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserRound,
  LogOut,
  Wrench,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [profileOpen, setProfileOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const user = session?.user;
  const role = user?.role;
  const dashboardHref =
    role === "MECHANIC" ? "/dashboard/mechanic" : "/dashboard/user";

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setProfileOpen(false);
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  async function handleSignOut() {
    setSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error("Sign out failed:", error.message);
        return;
      }

      setProfileOpen(false);
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setSigningOut(false);
    }
  }

  const links = [
    { href: "/", label: "Home" },

    ...(role === "CUSTOMER"
      ? [{ href: "/mechanics", label: "Find Mechanics" }]
      : []),

    ...(role === "MECHANIC"
      ? [{ href: "/dashboard/mechanic", label: "My Dashboard" }]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 border-b  bg-slate-900 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-xl font-bold text-white"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-white">
            <Wrench size={20} />
          </span>
          <span>
            FixMy<span className="text-orange-500">Ride</span>
          </span>
        </Link>

        {/* Navigation links */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white transition hover:text-orange-500"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Authentication / Profile */}
        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-100" />
          ) : user ? (
            <div className="relative" ref={profileRef}>
              {/* Profile trigger */}
              <button
                type="button"
                onClick={() => setProfileOpen((open) => !open)}
                aria-expanded={profileOpen}
                aria-haspopup="true"
                className="flex items-center gap-2 rounded-full p-1.5 transition hover:text-black hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "Profile"}
                    className="h-9 w-9 rounded-full border border-slate-200 object-cover"
                  />
                ) : (
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <UserRound size={19} />
                  </span>
                )}

                <span className="hidden max-w-32 truncate text-sm font-semibold text-white hover:text-black sm:block">
                  {user.name || "My Account"}
                </span>

                <ChevronDown
                  size={15}
                  className={`hidden text-slate-500 transition sm:block ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile dropdown */}
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                  <div className="border-b border-slate-100 bg-slate-50 px-4 py-4">
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name || "Profile"}
                          className="h-12 w-12 rounded-full border border-white object-cover shadow-sm"
                        />
                      ) : (
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                          <UserRound size={24} />
                        </span>
                      )}

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-900">
                          {user.name || "User"}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <span className="mt-3 inline-flex rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700">
                      {role === "MECHANIC" ? "Mechanic" : "Customer"}
                    </span>
                  </div>

                  <div className="p-2">
                    <Link
                      href={dashboardHref}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-100"
                    >
                      <LayoutDashboard size={17} />
                      My Dashboard
                    </Link>

                    <button
                      type="button"
                      onClick={handleSignOut}
                      disabled={signingOut}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      <LogOut size={17} />
                      {signingOut ? "Signing out..." : "Sign Out"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-slate-700 transition hover:text-orange-500"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
