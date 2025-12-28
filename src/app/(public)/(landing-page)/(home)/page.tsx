import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { CTASection } from "@/features/home/components/cta";
import { FAQSection } from "@/features/home/components/faq";
import { FeaturesSection } from "@/features/home/components/features";
import { HeroSection } from "@/features/home/components/hero";
import { HowItWorksSection } from "@/features/home/components/how-it-works";
import { SearchSection } from "@/features/home/components/search";
import { TestimonialsSection } from "@/features/home/components/testimonials";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <SearchSection />
        <HowItWorksSection />
        <FeaturesSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
