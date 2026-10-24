import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CallToAction from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <HeroSection />

      <ServicesSection />

      <HowItWorksSection />
      <BenefitsSection />

      <TestimonialsSection />

      <CallToAction />
    </main>
  );
}
