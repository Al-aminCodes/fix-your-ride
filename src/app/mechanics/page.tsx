"use client";

import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  Wrench,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Mechanic = {
  id: number;
  name: string;
  workshop: string;
  location: string;
  distance: string;
  rating: number;
  reviews: number;
  specialties: string[];
  experience: number;
  hourlyRate: number;
  available: boolean;
  verified: boolean;
  image?: string;
};

const mechanics: Mechanic[] = [
  {
    id: 1,
    name: "Rahim Ahmed",
    workshop: "Rahim Auto Care",
    location: "Dhanmondi, Dhaka",
    distance: "1.2 km away",
    rating: 4.9,
    reviews: 128,
    specialties: ["Engine Repair", "Oil Change", "Diagnostics"],
    experience: 8,
    hourlyRate: 800,
    available: true,
    verified: true,
  },
  {
    id: 2,
    name: "Karim Hasan",
    workshop: "City Car Service",
    location: "Mirpur, Dhaka",
    distance: "2.5 km away",
    rating: 4.8,
    reviews: 96,
    specialties: ["Brake Repair", "Suspension", "Engine Repair"],
    experience: 6,
    hourlyRate: 700,
    available: true,
    verified: true,
  },
  {
    id: 3,
    name: "Sabbir Hossain",
    workshop: "Sabbir Motor Works",
    location: "Uttara, Dhaka",
    distance: "4.1 km away",
    rating: 4.7,
    reviews: 74,
    specialties: ["Electrical", "Diagnostics", "AC Repair"],
    experience: 5,
    hourlyRate: 600,
    available: false,
    verified: true,
  },
  {
    id: 4,
    name: "Imran Chowdhury",
    workshop: "Pro Auto Solutions",
    location: "Mohammadpur, Dhaka",
    distance: "3.0 km away",
    rating: 4.9,
    reviews: 156,
    specialties: ["AC Repair", "Oil Change", "Brake Repair"],
    experience: 10,
    hourlyRate: 1000,
    available: true,
    verified: true,
  },
  {
    id: 5,
    name: "Nayeem Islam",
    workshop: "Nayeem Bike & Car Care",
    location: "Bashundhara, Dhaka",
    distance: "5.3 km away",
    rating: 4.6,
    reviews: 52,
    specialties: ["Engine Repair", "Electrical"],
    experience: 4,
    hourlyRate: 500,
    available: true,
    verified: false,
  },
  {
    id: 6,
    name: "Fahim Rahman",
    workshop: "Expert Auto Workshop",
    location: "Banani, Dhaka",
    distance: "2.8 km away",
    rating: 4.8,
    reviews: 89,
    specialties: ["Diagnostics", "Suspension", "AC Repair"],
    experience: 7,
    hourlyRate: 900,
    available: true,
    verified: true,
  },
];

const specialties = [
  "All Services",
  "Engine Repair",
  "Brake Repair",
  "Oil Change",
  "Electrical",
  "AC Repair",
  "Diagnostics",
  "Suspension",
];

export default function FindMechanicsPage() {
  const [specialty, setSpecialty] = useState("All Services");
  const [availability, setAvailability] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [maxRate, setMaxRate] = useState("all");

  const searchParams = useSearchParams();

  const [search, setSearch] = useState(() => searchParams.get("issue") ?? "");

  const [location, setLocation] = useState(
    () => searchParams.get("location") ?? "",
  );

  const filteredMechanics = useMemo(() => {
    const query = search.trim().toLowerCase();
    const locationQuery = location.trim().toLowerCase();

    const results = mechanics.filter((mechanic) => {
      const matchesSearch =
        !query ||
        mechanic.name.toLowerCase().includes(query) ||
        mechanic.workshop.toLowerCase().includes(query) ||
        mechanic.specialties.some((item) => item.toLowerCase().includes(query));

      const matchesLocation =
        !locationQuery ||
        mechanic.location.toLowerCase().includes(locationQuery);

      const matchesSpecialty =
        specialty === "All Services" ||
        mechanic.specialties.includes(specialty);

      const matchesAvailability =
        availability === "all" ||
        (availability === "available" && mechanic.available);

      const matchesRate =
        maxRate === "all" || mechanic.hourlyRate <= Number(maxRate);

      return (
        matchesSearch &&
        matchesLocation &&
        matchesSpecialty &&
        matchesAvailability &&
        matchesRate
      );
    });

    return results.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price-low") return a.hourlyRate - b.hourlyRate;
      if (sortBy === "experience") return b.experience - a.experience;
      return 0;
    });
  }, [search, location, specialty, availability, sortBy, maxRate]);

  function clearFilters() {
    setSearch("");
    setLocation("");
    setSpecialty("All Services");
    setAvailability("all");
    setSortBy("rating");
    setMaxRate("all");
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-slate-950 px-4 py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1.5 text-sm font-medium text-orange-300">
              <Wrench size={15} />
              Trusted vehicle repair experts
            </span>

            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
              Find the right mechanic
              <span className="block text-orange-400">for your ride.</span>
            </h1>

            <p className="mt-4 max-w-xl leading-7 text-slate-300">
              Discover mechanics near you, compare their specialties, and choose
              the right professional for your vehicle.
            </p>
          </div>

          {/* Search bar */}
          <div className="mt-9 grid gap-3 rounded-2xl bg-white p-3 shadow-xl md:grid-cols-[1fr_1fr_auto]">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4">
              <Search className="shrink-0 text-orange-500" size={20} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Problem or service..."
                aria-label="Search by problem or service"
                className="h-12 min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4">
              <MapPin className="shrink-0 text-orange-500" size={20} />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Area or city..."
                aria-label="Search by location"
                className="h-12 min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>

            <Button
              onClick={() => {
                const params = new URLSearchParams();
                if (search.trim()) params.set("issue", search.trim());
                if (location.trim()) params.set("location", location.trim());

                window.history.replaceState(
                  null,
                  "",
                  `/mechanics${params.size ? `?${params.toString()}` : ""}`,
                );
              }}
              className="h-12 bg-orange-500 px-7 text-white hover:bg-orange-600"
            >
              Find Mechanics
            </Button>
          </div>

          <div className="mt-5 flex flex-wrap gap-5 text-sm text-slate-300">
            <span className="flex items-center gap-2">
              <BadgeCheck size={17} className="text-orange-400" />
              Verified professionals
            </span>
            <span className="flex items-center gap-2">
              <Star size={17} className="text-orange-400" />
              Compare customer ratings
            </span>
            <span className="flex items-center gap-2">
              <Clock size={17} className="text-orange-400" />
              Check availability
            </span>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-orange-600">
              YOUR LOCAL EXPERTS
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Available Mechanics
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Showing {filteredMechanics.length} of {mechanics.length} mechanics
            </p>
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-slate-500" />
            <label
              htmlFor="sort"
              className="whitespace-nowrap text-sm text-slate-600"
            >
              Sort by
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="rating">Highest rated</option>
              <option value="price-low">Lowest price</option>
              <option value="experience">Most experienced</option>
            </select>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label
                htmlFor="specialty"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Service specialty
              </label>
              <select
                id="specialty"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-orange-500"
              >
                {specialties.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="availability"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Availability
              </label>
              <select
                id="availability"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">Any availability</option>
                <option value="available">Available now</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="maxRate"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Maximum hourly rate
              </label>
              <select
                id="maxRate"
                value={maxRate}
                onChange={(e) => setMaxRate(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">Any price</option>
                <option value="500">৳500 / hour</option>
                <option value="700">৳700 / hour</option>
                <option value="800">৳800 / hour</option>
                <option value="1000">৳1,000 / hour</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-orange-600"
            >
              <X size={15} />
              Clear filters
            </button>
          </div>
        </div>

        {/* Mechanic cards */}
        {filteredMechanics.length > 0 ? (
          <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredMechanics.map((mechanic) => (
              <Card
                key={mechanic.id}
                className="overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-xl font-bold text-orange-600">
                        {mechanic.name
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <h3 className="font-bold text-slate-900">
                            {mechanic.name}
                          </h3>
                          {mechanic.verified && (
                            <BadgeCheck
                              size={16}
                              className="text-blue-500"
                              aria-label="Verified mechanic"
                            />
                          )}
                        </div>
                        <p className="mt-1 truncate text-sm text-slate-500">
                          {mechanic.workshop}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        mechanic.available
                          ? "bg-green-50 text-green-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {mechanic.available ? "Available" : "Busy"}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                      <Star
                        size={16}
                        className="fill-amber-400 text-amber-400"
                      />
                      {mechanic.rating}
                      <span className="font-normal text-slate-500">
                        ({mechanic.reviews} reviews)
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <MapPin size={15} />
                      {mechanic.location}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                    <Clock size={16} className="text-orange-500" />
                    {mechanic.experience} years of experience
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {mechanic.specialties.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-xs text-slate-500">Hourly rate</p>
                      <p className="mt-1 text-lg font-bold text-slate-900">
                        ৳{mechanic.hourlyRate.toLocaleString("en-BD")}
                        <span className="text-xs font-normal text-slate-500">
                          /hr
                        </span>
                      </p>
                    </div>

                    <Link
                      href={`/mechanics/${mechanic.id}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
                    >
                      View Profile
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-orange-500">
              <Search size={25} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">
              No mechanics found
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Try another location, service specialty, or hourly rate.
            </p>
            <Button
              onClick={clearFilters}
              className="mt-5 bg-orange-500 hover:bg-orange-600"
            >
              Clear filters
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}
