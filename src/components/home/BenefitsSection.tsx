import { benefits } from "@/lib/data";

export default function BenefitsSection() {
  return (
    <section id="about" className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div key={benefit.title} className="flex gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border bg-white text-orange-600 shadow-sm">
                  <Icon className="size-5" />
                </span>

                <div>
                  <h3 className="font-bold">{benefit.title}</h3>
                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
