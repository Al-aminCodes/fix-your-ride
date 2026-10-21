import { requireRole } from "@/lib/require-role";

export default async function UserDashboard() {
  const session = await requireRole("CUSTOMER");

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Welcome, {session.user.name}</h1>
      {/* Your customer dashboard */}
    </main>
  );
}
