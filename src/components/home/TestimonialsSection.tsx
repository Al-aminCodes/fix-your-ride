import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { reviews } from "@/lib/data";

export default function TestimonialsSection() {
  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 flex items-center gap-2 text-sm font-bold text-orange-600">
          <span className="h-0.5 w-7 bg-orange-500" />
          CUSTOMER STORIES
        </p>

        <h2 className="text-3xl font-extrabold">Drivers who trust FixMyRide</h2>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <Card
              key={review.name}
              className="border-slate-200 bg-white shadow-sm"
            >
              <CardContent className="p-6">
                <Quote className="size-7 text-orange-400" />

                <p className="mt-4 min-h-20 text-sm leading-6 text-slate-600">
                  “{review.review}”
                </p>

                <div className="mt-5 flex items-center gap-3 border-t pt-4">
                  <div className="flex size-11 items-center justify-center rounded-full bg-slate-900 font-bold text-white">
                    {review.initials}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold">{review.name}</h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {review.location}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-4 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
