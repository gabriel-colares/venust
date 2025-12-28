"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type LeadSegment = "barbershop" | "client";

export function CTASection() {
  const [barbershopEmail, setBarbershopEmail] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [isSubmittingBarbershop, setIsSubmittingBarbershop] = useState(false);
  const [isSubmittingClient, setIsSubmittingClient] = useState(false);

  const submitWaitlist = async (payload: {
    email: string;
    segment: LeadSegment;
    source: "home-cta";
  }) => {
    const res = await fetch("/api/lista-espera", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok && res.status !== 200) {
      throw new Error("Failed to submit waitlist");
    }

    const data = (await res.json().catch(() => null)) as {
      status?: "created" | "exists";
    } | null;

    if (data?.status === "created" || data?.status === "exists") {
      return data.status;
    }

    return res.status === 201 ? "created" : "exists";
  };

  const handleSubmit = (segment: LeadSegment) => async (e: FormEvent) => {
    e.preventDefault();
    const email = segment === "barbershop" ? barbershopEmail : clientEmail;

    if (segment === "barbershop") {
      setIsSubmittingBarbershop(true);
    } else {
      setIsSubmittingClient(true);
    }

    try {
      const status = await submitWaitlist({
        email,
        segment,
        source: "home-cta",
      });

      if (status === "created") {
        toast.success(
          segment === "barbershop"
            ? "Inscrição recebida! Vamos te chamar para o onboarding."
            : "Inscrição recebida! Avisaremos quando estiver disponível.",
        );
      } else {
        toast.info("Você já está na lista.");
      }

      if (segment === "barbershop") {
        setBarbershopEmail("");
      } else {
        setClientEmail("");
      }
    } catch {
      toast.error("Não foi possível enviar agora. Tente novamente.");
    } finally {
      if (segment === "barbershop") {
        setIsSubmittingBarbershop(false);
      } else {
        setIsSubmittingClient(false);
      }
    }
  };

  return (
    <section
      id="lista-de-acesso-antecipado"
      className="py-24 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Lista de acesso antecipado
            </span>
          </div>

          <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Venust para <span className="text-primary">barbearias</span> e{" "}
            <span className="text-primary">clientes</span>
          </h2>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty leading-relaxed">
            Estamos abrindo a lista para o lançamento. Se você tem uma
            barbearia, receba convite para o onboarding. Se você é cliente, seja
            avisado quando o agendamento chegar na sua cidade.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-primary/20 bg-background/40 backdrop-blur-sm p-6 text-left">
              <div className="text-white text-xl font-semibold mb-2">
                Sou barbearia
              </div>
              <div className="text-muted-foreground mb-5">
                Entre na lista e receba o convite para cadastrar sua barbearia.
              </div>
              <form
                className="flex gap-3"
                onSubmit={handleSubmit("barbershop")}
              >
                <Input
                  value={barbershopEmail}
                  onChange={(e) => setBarbershopEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="Seu e-mail"
                  className="bg-background/60"
                  autoComplete="email"
                  inputMode="email"
                  disabled={isSubmittingBarbershop}
                />
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 venust-glow-hover"
                  disabled={isSubmittingBarbershop}
                >
                  Entrar
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
              <div className="mt-4">
                <Button
                  size="sm"
                  variant="ghost"
                  asChild
                  className="text-muted-foreground hover:text-black"
                >
                  <Link href="/sou-barbearia">
                    Ver benefícios para barbearias
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-background/40 backdrop-blur-sm p-6 text-left">
              <div className="text-white text-xl font-semibold mb-2">
                Sou cliente
              </div>
              <div className="text-muted-foreground mb-5">
                Seja avisado quando o Venust estiver disponível.
              </div>
              <form className="flex gap-3" onSubmit={handleSubmit("client")}>
                <Input
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="Seu e-mail"
                  className="bg-background/60"
                  autoComplete="email"
                  inputMode="email"
                  disabled={isSubmittingClient}
                />
                <Button
                  type="submit"
                  variant="outline"
                  className="border-primary/30 hover:bg-primary/10 bg-transparent text-primary hover:text-white"
                  disabled={isSubmittingClient}
                >
                  Entrar
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
              <div className="mt-4">
                <Button
                  size="sm"
                  variant="ghost"
                  asChild
                  className="text-muted-foreground hover:text-black"
                >
                  <Link href="/buscar">Explorar barbearias</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>Sem spam</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-pink rounded-full"></div>
              <span>Lançamento por cidade</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
              <span>Convite de onboarding</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none opacity-70" />
    </section>
  );
}
