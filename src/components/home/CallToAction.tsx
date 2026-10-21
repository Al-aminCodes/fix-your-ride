import Link from "next/link";
import { ArrowRight, CarFront } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-3xl bg-slate-950 p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <div className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-orange-500">
            <CarFront className="size-7" />
          </span>

          <div>
            <h2 className="text-2xl font-extrabold">
              Ready to get your car fixed?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              Find a trusted mechanic and get back on the road.
            </p>
          </div>
        </div>

        <Link
          href="/register"
          className="inline-flex h-12 items-center justify-center rounded-md bg-orange-500 px-6 font-bold hover:bg-orange-600"
        >
          Get Started
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </div>
    </section>
  );
}
