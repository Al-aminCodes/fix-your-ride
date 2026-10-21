import { ShieldCheck } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <div
          className="relative min-h-75 overflow-hidden rounded-3xl bg-slate-200 bg-cover bg-center sm:min-h-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1632823471565-1ecdf5c6a7d9?auto=format&fit=crop&w=1200&q=85')",
          }}
        >
          <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/60 bg-white/95 p-5 shadow-xl sm:inset-x-6 sm:bottom-6">
            <div className="flex items-start gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <ShieldCheck className="size-6" />
              </span>

              <div>
                <h3 className="font-bold">Your car is in safe hands</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Find professionals and make informed repair decisions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-3 flex items-center gap-2 text-sm font-bold text-orange-600">
            <span className="h-0.5 w-7 bg-orange-500" />
            WHY CHOOSE FIXMYRIDE
          </p>

          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Your car. Our priority.
          </h2>

          <p className="mt-4 max-w-xl leading-7 text-slate-600">
            We make it easier to find reliable mechanics, compare repair
            options, and keep your vehicle in top condition.
          </p>
        </div>
      </div>
    </section>
  );
}
