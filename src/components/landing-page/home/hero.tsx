import { CircleQuestionMark, SearchCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center venust-gradient-bg pb-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div className="text-center lg:text-left">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Agende seu corte na{" "}
              <span className="text-primary venust-text-glow">
                melhor barbearia
              </span>{" "}
              da sua região
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 text-pretty leading-relaxed">
              <span className="text-primary font-semibold">
                100% gratuito para você!
              </span>{" "}
              Encontre, compare e agende serviços nas melhores barbearias. Você
              só paga pelo corte, nós cuidamos do resto.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Button
                size="lg"
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 venust-glow-hover px-8"
              >
                <Link href="#buscar">
                  Encontrar barbearias
                  <SearchCheck className="ml-2" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-primary/30 hover:bg-primary/10 bg-transparent text-primary"
              >
                <Link href="#como-funciona" className="hover:text-slate-200">
                  Como funciona
                  <CircleQuestionMark className="ml-2" />
                </Link>
              </Button>
            </div>

            <div className="mt-4 sm:mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Sem taxas ocultas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-pink rounded-full"></div>
                <span>Agendamento instantâneo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                <span>Avaliações reais</span>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden border border-primary/20 venust-glow">
              <Image
                src="/images/5075.jpg"
                alt="Clientes satisfeitos em barbearias modernas"
                className="w-full h-[500px] object-cover"
                width={500}
                height={300}
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(69,217,166,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(69,217,166,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
    </section>
  );
}
