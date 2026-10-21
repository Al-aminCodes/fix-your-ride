import Link from "next/link";
import { Wrench, ShieldCheck } from "lucide-react";

export default function AuthLayout({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <main className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">
      <section className="hidden flex-col justify-between bg-slate-950 p-12 text-white lg:flex xl:p-16">
        <Link href="/" className="flex items-center gap-3">
          <span className="rounded-xl bg-orange-500 p-3">
            <Wrench className="size-7" />
          </span>
          <span className="text-2xl font-extrabold">
            FixMy<span className="text-orange-500">Ride</span>
          </span>
        </Link>

        <div className="max-w-lg">
          <ShieldCheck className="mb-6 size-12 text-orange-500" />
          <h1 className="text-5xl font-black leading-tight">
            Your journey deserves better care.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Find trusted mechanics, compare repair options, and get back on the
            road with confidence.
          </p>
        </div>

        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} FixMyRide. Built for a smoother journey.
        </p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-8 flex items-center justify-center gap-2 lg:hidden"
          >
            <Wrench className="size-7 text-orange-500" />
            <span className="text-xl font-extrabold">
              FixMy<span className="text-orange-500">Ride</span>
            </span>
          </Link>

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              {title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {description}
            </p>
          </div>

          {children}

          <p className="mt-8 text-center text-xs text-slate-500">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </section>
    </main>
  );
}
