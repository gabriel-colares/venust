"use client";

import { Scissors } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FinalCtaSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    toast.success("Inscrição recebida! Vamos te chamar para o onboarding.");
    setEmail("");
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
          />
          <Button
            size="lg"
            className="h-11 venust-glow-hover px-8 text-lg"
            type="submit"
          >
            Entrar na lista
          </Button>
        </form>

        <div className="mb-12">
          <Button
            variant="ghost"
            size="lg"
            className="px-8 py-6 text-lg border border-primary/30 hover:bg-primary/10 hover:text-white/80"
            asChild
          >
            <Link href="/dashboard/entrar">Já tenho conta</Link>
          </Button>
        </div>

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
