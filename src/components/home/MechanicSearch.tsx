"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { services } from "@/lib/data";

export default function MechanicSearch() {
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [issue, setIssue] = useState("");

  function handleSearch() {
    const params = new URLSearchParams();

    if (location.trim()) {
      params.set("location", location.trim());
    }

    if (issue) {
      params.set("issue", issue);
    }

    router.push(`/mechanics?${params.toString()}`);
  }

  return (
    <div className="absolute inset-x-0 bottom-0 translate-y-1/2 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 rounded-2xl border bg-white p-5 text-slate-900 shadow-2xl sm:grid-cols-2 sm:p-6 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold">
            <MapPin className="size-4 text-orange-500" />
            Location
          </label>

          <Input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Enter city or area"
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold">
            <Wrench className="size-4 text-orange-500" />
            Car Issue
          </label>

          <Select value={issue} onValueChange={(value) => setIssue(value ?? "")}>
            <SelectTrigger className="h-12 w-full">
              <SelectValue placeholder="Select your car issue" />
            </SelectTrigger>

            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.name} value={service.name}>
                  {service.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleSearch}
          className="h-12 bg-orange-500 px-7 font-bold hover:bg-orange-600 sm:col-span-2 lg:col-span-1"
        >
          <Search className="mr-2 size-4" />
          Find Mechanics
        </Button>
      </div>
    </div>
  );
}
