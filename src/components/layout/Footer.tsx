import Link from "next/link";
import { Wrench } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 border-b border-slate-800 pb-8 md:flex-row md:items-center">
          <Link href="/" className="flex items-center gap-2">
            <Wrench className="size-7 text-orange-500" />

            <span className="text-xl font-extrabold">
              FixMy<span className="text-orange-500">Ride</span>
            </span>
          </Link>

          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
            <Link href="/" className="hover:text-orange-400">
              Home
            </Link>

            <Link href="/mechanics" className="hover:text-orange-400">
              Find Mechanics
            </Link>

            <Link href="/register/user" className="hover:text-orange-400">
              Find a Repair
            </Link>

            <Link href="/register/mechanic" className="hover:text-orange-400">
              Join as a Mechanic
            </Link>

            <a
              href="mailto:support@fixmyride.com"
              className="hover:text-orange-400"
            >
              Contact
            </a>
          </nav>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-slate-500 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} FixMyRide. All rights reserved.</p>

          <p>Built for a smoother journey.</p>
        </div>
      </div>
    </footer>
  );
}
