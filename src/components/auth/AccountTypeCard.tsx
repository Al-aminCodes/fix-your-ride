import Link from "next/link";
import { ArrowRight } from "lucide-react";

type AccountTypeCardProps = {
  title: string;
  description: string;
  icon: string;
  features: string[];
  href: string;
};

export default function AccountTypeCard({
  title,
  description,
  icon,
  features,
  href,
}: AccountTypeCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-orange-400 hover:shadow-xl"
    >
      <span className="flex size-14 items-center justify-center rounded-2xl bg-orange-50 text-3xl">
        {icon}
      </span>

      <h3 className="mt-5 text-xl font-bold text-slate-900">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>

      <ul className="mt-5 space-y-3">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2 text-sm text-slate-700"
          >
            <span className="text-orange-500">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between border-t pt-4 font-bold text-orange-600">
        Get started
        <ArrowRight className="size-5 transition group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
