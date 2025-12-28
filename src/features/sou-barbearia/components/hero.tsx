import { ArrowRight, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative flex items-center justify-center venust-gradient-bg py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div className="text-center lg:text-left">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Sua barbearia{" "}
              <span className="text-primary venust-text-glow">descoberta</span>{" "}
              por mais clientes
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 text-pretty leading-relaxed">
              <span className="text-primary font-semibold">
                Planos simples e sem burocracia
              </span>{" "}
              A plataforma que conecta sua barbearia aos clientes do bairro,
              organiza sua agenda e reduz faltas com lembretes quando
              habilitados.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Button
                size="lg"
                className="h-11 bg-primary text-primary-foreground hover:bg-primary/90 venust-glow-hover px-8"
                asChild
              >
                <Link href="/auth/signup?role=barbershop">
                  <Users className="mr-2" aria-hidden="true" />
                  Cadastrar minha barbearia
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-11 border-primary/30 hover:bg-primary/10 hover:text-white bg-transparent text-primary"
                asChild
              >
                <Link href="#como-funciona">
                  Ver como funciona
                  <ArrowRight className="ml-2" aria-hidden="true" />
                </Link>
              </Button>
            </div>

            <div className="mt-4 sm:mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Sem taxas ocultas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-pink rounded-full" />
                <span>Agenda organizada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-blue rounded-full" />
                <span>Mais clientes</span>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden border border-primary/20 venust-glow">
              <Image
                src="/images/professional-barbershop-owner-working-in-modern-ba.jpg"
                alt="Barbeiro profissional atendendo cliente em barbearia moderna"
                className="w-full h-[500px] object-cover"
                width={500}
                height={300}
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent" />
            </div>

            <div className="select-none absolute -top-3 -right-3 bg-background/85 backdrop-blur-sm border border-primary/30 text-foreground px-4 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 venust-card-glow">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-primary/15 rounded-full flex items-center justify-center text-sm">
                  ✨
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-xs text-foreground">
                    Mais clientes
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Visibilidade online
                  </span>
                </div>
              </div>
            </div>

            <div className="select-none absolute -bottom-3 -left-3 bg-neon-blue/10 backdrop-blur-sm border border-neon-blue/30 text-foreground px-4 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-neon-blue/20 rounded-full flex items-center justify-center text-sm">
                  📅
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-xs text-foreground">
                    Agenda organizada
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Sem conflitos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
