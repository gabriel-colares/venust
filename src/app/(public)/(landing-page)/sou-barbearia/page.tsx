import { AdditionalFeaturesSection } from "@/components/landing-page/sou-barbearia/additional-features";
import { FaqSection } from "@/components/landing-page/sou-barbearia/faq";
import { FinalCtaSection } from "@/components/landing-page/sou-barbearia/final-cta";
import { HeroSection } from "@/components/landing-page/sou-barbearia/hero";
import { HowItWorksSection } from "@/components/landing-page/sou-barbearia/how-it-works";
import { MainBenefitsSection } from "@/components/landing-page/sou-barbearia/main-benefits";
import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";

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
