"use client";

import { Scissors } from "lucide-react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FinalCtaSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/lista-espera", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          segment: "barbershop",
          source: "sou-barbearia-final-cta",
        }),
      });

      if (!res.ok && res.status !== 200) {
        throw new Error("Failed to submit waitlist");
      }

      const data = (await res.json().catch(() => null)) as {
        status?: "created" | "exists";
      } | null;
      const status =
        data?.status === "created" || data?.status === "exists"
          ? data.status
          : res.status === 201
            ? "created"
            : "exists";

      if (status === "created") {
        toast.success("Inscrição recebida! Vamos te chamar para o onboarding.");
      } else {
        toast.info("Você já está na lista.");
      }

      setEmail("");
    } catch {
      toast.error("Não foi possível enviar agora. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
          <Scissors className="w-4 h-4 text-primary" aria-hidden="true" />
          <span className="text-sm font-medium text-foreground">
            Lista de parceiros
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
          Transforme sua{" "}
          <span className="text-primary venust-text-glow">barbearia</span> agora
        </h2>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Cadastre seu e-mail para receber o convite de onboarding e ser uma das
          primeiras barbearias a lançar no Venust.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-10 max-w-2xl mx-auto"
        >
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="Seu e-mail"
            className="h-11 bg-background/60"
            autoComplete="email"
            inputMode="email"
            disabled={isSubmitting}
          />
          <Button
            size="lg"
            className="h-11 px-8 text-lg transition-shadow focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-0 hover:shadow-[0_0_18px_rgba(69,217,166,0.16)]"
            type="submit"
            disabled={isSubmitting}
          >
            Entrar na lista
          </Button>
        </form>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span>Sem compromisso</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-neon-pink rounded-full" />
            <span>Onboarding guiado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-neon-blue rounded-full" />
            <span>Acesso antecipado</span>
          </div>
        </div>
      </div>
    </section>
  );
}
