import Link from "next/link";
import { ArrowLeft, Home, Search, Wrench } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-xl text-center">
        {/* Icon */}
        <div className="relative mx-auto mb-8 flex size-24 items-center justify-center rounded-3xl bg-orange-100">
          <Wrench size={44} className="text-orange-500" />

          <span className="absolute -right-2 -top-2 flex size-9 items-center justify-center rounded-full border-4 border-slate-50 bg-slate-900 text-xs font-bold text-white">
            !
          </span>
        </div>

        {/* Error code */}
        <p className="text-7xl font-extrabold tracking-tight text-orange-500 sm:text-8xl">
          404
        </p>

        <h1 className="mt-5 text-2xl font-bold text-slate-900 sm:text-3xl">
          Oops! Page Not Found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-500">
          Looks like this road leads nowhere. The page you are looking for may
          have moved, been removed, or never existed.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            <Home size={19} />
            Back to Home
          </Link>

          <Link
            href="/mechanics"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600"
          >
            <Search size={19} />
            Find a Mechanic
          </Link>
        </div>

        {/* Footer link */}
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-orange-600"
          >
            <ArrowLeft size={16} />
            Return to FixMyRide
          </Link>
        </div>
      </div>
    </main>
  );
}
