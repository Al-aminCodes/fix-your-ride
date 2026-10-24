"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const router = useRouter();

  const [role, setRole] = useState<"user" | "mechanic">("user");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: authError } = await authClient.signIn.email({
        email,
        password,
      });

      if (authError) {
        setError(authError.message || "Invalid email or password.");
        return;
      }

      if (!data) {
        setError("Unable to sign in. Please try again.");
        return;
      }

      if (data.user.role === "admin") {
        router.push("/dashboard/admin");
      } else if (data.user.role === "mechanic") {
        router.push("/dashboard/mechanic");
      } else {
        router.push("/mechanics");
      }

      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Label className="mb-3 block">I am signing in as</Label>

        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "user", title: "Customer", icon: "👤" },
            { value: "mechanic", title: "Mechanic", icon: "🔧" },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setRole(item.value as "user" | "mechanic")}
              className={`rounded-xl border p-4 text-left transition ${
                role === item.value
                  ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="mt-2 block font-bold text-slate-900">
                {item.title}
              </span>
              <span className="mt-1 block text-xs text-slate-500">
                {item.value === "user"
                  ? "Find car repairs"
                  : "Manage repair jobs"}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className="h-12 pl-10"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-orange-600 hover:text-orange-700"
          >
            Forgot password?
          </Link>
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            autoComplete="current-password"
            className="h-12 px-10"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
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
        {loading ? "Signing in..." : "Sign in"}
      </Button>

      <p className="text-center text-sm text-slate-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-bold text-orange-600 hover:text-orange-700"
        >
          Create account
        </Link>
      </p>
    </form>
  );
}
