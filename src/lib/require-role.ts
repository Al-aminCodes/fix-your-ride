import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

type UserRole = "CUSTOMER" | "MECHANIC";

export async function requireRole(role: UserRole) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== role) {
    redirect(
      session.user.role === "MECHANIC"
        ? "/dashboard/user-mechanic"
        : "/dashboard/user",
    );
  }

  return session;
}
