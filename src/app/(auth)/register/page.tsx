import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import AccountTypeCard from "@/components/auth/AccountTypeCard";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Join FixMyRide"
      description="Choose the account that matches your needs."
    >
      <div className="space-y-5">
        <AccountTypeCard
          title="I'm a Customer"
          description="Need a repair? Find trusted mechanics for your car."
          icon="🚘"
          features={[
            "Find nearby mechanics",
            "Compare repair quotes",
            "Track your repair requests",
          ]}
          href="/register/user"
        />

        <AccountTypeCard
          title="I'm a Mechanic"
          description="Grow your business and connect with customers."
          icon="🔧"
          features={[
            "Create your business profile",
            "Receive repair requests",
            "Manage your services",
          ]}
          href="/register/user-mechanic"
        />

        <p className="text-center text-sm text-slate-600">
          Already registered?{" "}
          <Link
            href="/login"
            className="font-bold text-orange-600 hover:text-orange-700"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
