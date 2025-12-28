import { CTASection } from "@/components/landing-page/home/cta";
import { FAQSection } from "@/components/landing-page/home/faq";
import { FeaturesSection } from "@/components/landing-page/home/features";
import { HeroSection } from "@/components/landing-page/home/hero";
import { HowItWorksSection } from "@/components/landing-page/home/how-it-works";
import { SearchSection } from "@/components/landing-page/home/search";
import { TestimonialsSection } from "@/components/landing-page/home/testimonials";
import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";

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
