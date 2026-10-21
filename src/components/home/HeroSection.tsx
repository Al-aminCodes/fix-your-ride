import { ShieldCheck, Clock, Star } from "lucide-react";
import MechanicSearch from "./MechanicSearch";

export default function HeroSection() {
  return (
    <section
      className="relative bg-slate-950 bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(2,6,23,.96), rgba(2,6,23,.72)), url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=2000&q=85')",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 pb-36 pt-20 sm:px-6 sm:pb-40 sm:pt-28 lg:px-8 lg:pb-44">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm text-orange-300">
            <ShieldCheck className="size-4" />
            Trusted automotive care, made simple
          </div>

          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Find a trusted
            <br />
            <span className="text-orange-500">mechanic near you.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Get your car fixed quickly and safely. Connect with trusted
            mechanics, compare quotes, and get back on the road.
          </p>

          <div className="mt-8 flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-orange-500" />
              Verified Mechanics
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-5 text-orange-500" />
              Fast Service
            </div>
            <div className="flex items-center gap-2">
              <Star className="size-5 text-orange-500" />
              Real Reviews
            </div>
          </div>
        </div>
      </div>

      <MechanicSearch />
    </section>
  );
}
