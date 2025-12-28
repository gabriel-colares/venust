import { Scissors } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
          <Scissors className="w-4 h-4 text-primary" aria-hidden="true" />
          <span className="text-sm font-medium text-foreground">
            Comece hoje mesmo
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
          Transforme sua{" "}
          <span className="text-primary venust-text-glow">barbearia</span> agora
        </h2>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Comece com nosso período promocional de{" "}
          <span className="text-primary font-semibold">até 3 meses</span> e
          escolha entre planos{" "}
          <span className="text-primary font-semibold">
            mensal, trimestral ou semestral
          </span>
          . Sem taxas ocultas.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="venust-glow-hover px-8 py-6 text-lg"
            asChild
          >
            <Link href="/auth/signup?role=barbershop">
              Cadastrar minha barbearia
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="px-8 py-6 text-lg border border-primary/30 hover:bg-primary/10 hover:text-white/80"
            asChild
          >
            <Link href="/contact">Falar com especialista</Link>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span>Sem compromisso</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-neon-pink rounded-full" />
            <span>Suporte especializado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-neon-blue rounded-full" />
            <span>Resultados garantidos</span>
          </div>
        </div>
      </div>
    </section>
  );
}
