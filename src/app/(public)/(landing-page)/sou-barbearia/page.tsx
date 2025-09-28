import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/landing-page/sou-barbearia/hero";
import { MainBenefitsSection } from "@/components/landing-page/sou-barbearia/main-benefits";
import { HowItWorksSection } from "@/components/landing-page/sou-barbearia/how-it-works";
import { AdditionalFeaturesSection } from "@/components/landing-page/sou-barbearia/additional-features";
import { FaqSection } from "@/components/landing-page/sou-barbearia/faq";
import { FinalCtaSection } from "@/components/landing-page/sou-barbearia/final-cta";

export default function SouBarbeariaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <MainBenefitsSection />
      <HowItWorksSection />
      <AdditionalFeaturesSection />
      <FaqSection />
      <FinalCtaSection />
      <Footer />
    </div>
  );
}
