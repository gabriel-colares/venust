import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { AdditionalFeaturesSection } from "@/features/sou-barbearia/components/additional-features";
import { FaqSection } from "@/features/sou-barbearia/components/faq";
import { FinalCtaSection } from "@/features/sou-barbearia/components/final-cta";
import { HeroSection } from "@/features/sou-barbearia/components/hero";
import { HowItWorksSection } from "@/features/sou-barbearia/components/how-it-works";
import { MainBenefitsSection } from "@/features/sou-barbearia/components/main-benefits";

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
