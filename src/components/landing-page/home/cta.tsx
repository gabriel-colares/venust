import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Comece agora mesmo
            </span>
          </div>

          <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Pronto para o{" "}
            <span className="text-primary venust-text-glow">
              corte perfeito
            </span>
            ?
          </h2>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty leading-relaxed">
            Junte-se a milhares de pessoas que já descobriram a forma mais fácil
            de agendar serviços em barbearias.{" "}
            <span className="text-primary font-semibold">
              Totalmente gratuito!
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 venust-glow-hover px-8 py-4 text-lg"
            >
              <Link href="#buscar" className="flex items-center gap-2">
                Encontrar minha barbearia
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="ghost"
              asChild
              className="text-muted-foreground hover:text-primary border border-neon-coral/30 hover:border-neon-coral/50"
            >
              <Link href="#como-funciona">Ver como funciona</Link>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>Cadastro rápido</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-pink rounded-full animate-pulse"></div>
              <span>Confirmação instantânea</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
              <span>Suporte rápido</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-neon-coral/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-neon-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
