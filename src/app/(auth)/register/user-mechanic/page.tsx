"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function MechanicRegisterPage() {
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [specialties, setSpecialties] = useState<string[]>([]);
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const availableSpecialties = [
    "Brakes",
    "Engine",
    "AC & Heating",
    "Transmission",
    "Electrical",
    "General Repair",
  ];

  function toggleSpecialty(specialty: string) {
    setSpecialties((current) =>
      current.includes(specialty)
        ? current.filter((item) => item !== specialty)
        : [...current, specialty],
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (specialties.length === 0) {
      setError("Select at least one repair specialty.");
      return;
    }

    setLoading(true);

    try {
      const { error: authError } = await authClient.signUp.email({
        name,
        email,
        password,
        role: "MECHANIC",
      });

      if (authError) {
        setError(authError.message || "Registration failed.");
        return;
      }

      // Additional workshop details must also be saved to a
      // server-side mechanic profile before production use.
      router.push("/dashboard/mechanic");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Join as a mechanic"
      description="Build your business profile and connect with drivers who need your expertise."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Your full name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            autoComplete="name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="business">Business or workshop name</Label>
          <Input
            id="business"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="e.g. Al Amin Auto Care"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Business email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+880 1XXX-XXXXXX"
            autoComplete="tel"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Workshop address</Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Area, city, and street"
            autoComplete="street-address"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Repair specialties</Label>
          <div className="grid grid-cols-2 gap-2">
            {availableSpecialties.map((specialty) => (
              <button
                key={specialty}
                type="button"
                aria-pressed={specialties.includes(specialty)}
                onClick={() => toggleSpecialty(specialty)}
                className={`rounded-lg border p-3 text-left text-sm transition ${
                  specialties.includes(specialty)
                    ? "border-orange-500 bg-orange-50 font-semibold text-orange-700"
                    : "border-slate-200 hover:border-orange-300"
                }`}
              >
                {specialties.includes(specialty) ? "✓ " : ""}
                {specialty}
              </button>
            ))}
          </div>
          {specialties.length === 0 && (
            <p className="text-xs text-slate-500">
              Select at least one specialty.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="rate">Hourly rate (BDT)</Label>
          <Input
            id="rate"
            type="number"
            min="0"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            placeholder="e.g. 500"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a strong password"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={loading || specialties.length === 0}
          className="h-12 w-full bg-orange-500 font-bold hover:bg-orange-600"
        >
          {loading ? "Creating account..." : "Create mechanic account"}
        </Button>

        <p className="text-center text-sm text-slate-600">
          Looking for a repair instead?{" "}
          <Link href="/register/user" className="font-semibold text-orange-600">
            Join as a customer
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
