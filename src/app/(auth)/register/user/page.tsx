"use client";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CustomerRegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: authError } = await authClient.signUp.email({
        name,
        email,
        password,
        role: "CUSTOMER",
      });

      if (authError) {
        setError(authError.message || "Registration failed.");
        return;
      }

      router.push("/dashboard/user");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create customer account"
      description="Find a trusted mechanic and get your car back on the road."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            autoComplete="name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
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
          disabled={loading}
          className="h-12 w-full bg-orange-500 font-bold hover:bg-orange-600"
        >
          {loading ? "Creating account..." : "Create customer account"}
        </Button>

        <p className="text-center text-sm text-slate-600">
          Want to offer repair services?{" "}
          <Link
            href="/register/user-mechanic"
            className="font-semibold text-orange-600"
          >
            Join as a mechanic
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
