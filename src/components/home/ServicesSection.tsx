import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/lib/data";

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-slate-50 px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.5fr] lg:items-center">
        <div>
          <p className="mb-3 flex items-center gap-2 text-sm font-bold text-orange-600">
            <span className="h-0.5 w-7 bg-orange-500" />
            COMMON CAR ISSUES
          </p>

          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
            Get help with any car problem
          </h2>

          <p className="mt-4 max-w-md leading-7 text-slate-600">
            From simple fixes to complex repairs, find the right professional
            for your vehicle.
          </p>

          <Link
            href="/mechanics"
            className="mt-4 inline-flex items-center font-bold text-orange-600 hover:underline"
          >
            Browse all services
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.name}
                href={`/mechanics?issue=${encodeURIComponent(service.name)}`}
              >
                <Card className="h-full border-slate-200 shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg">
                  <CardContent className="p-4 sm:p-5">
                    <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                      <Icon className="size-6" />
                    </span>

                    <h3 className="font-bold">{service.name}</h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
