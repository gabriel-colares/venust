"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { BarbershopResultsSkeleton } from "@/components/skeletons/buscar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BuscarEmptyState } from "@/features/buscar/components/search-empty-state";
import {
  hasBarbershops,
  submitDemand,
} from "@/features/buscar/lib/submit-demand";

const emailSchema = z.string().trim().email();

export default function BuscarPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedCity, setSearchedCity] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clientEmail, setClientEmail] = useState("");
  const [barbershopEmail, setBarbershopEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const searchRequestRef = useRef(0);

  const normalizedQuery = useMemo(() => searchQuery.trim(), [searchQuery]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const city = normalizedQuery;

    if (!city) {
      toast.error("Digite sua cidade ou bairro.");
      return;
    }

    searchRequestRef.current += 1;
    const requestId = searchRequestRef.current;

    setSuccessMessage(null);
    setSearchedCity(city);
    setIsSearching(true);

    window.setTimeout(() => {
      if (searchRequestRef.current !== requestId) return;
      setIsSearching(false);
    }, 1000);
  };

  const handleClientSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!searchedCity) return;

    const parsed = emailSchema.safeParse(clientEmail);
    if (!parsed.success) {
      toast.error("Digite um e-mail válido.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitDemand({
        email: parsed.data,
        city: searchedCity,
        profile: "client",
        source: "buscar",
      });

      if (result.status === "created") {
        toast.success("Recebido!");
      } else {
        toast.info("Você já está na lista dessa cidade.");
      }
      setClientEmail("");
      setSuccessMessage(
        `Perfeito! 🙌 Vamos avisar você quando o Venust chegar em ${searchedCity}.`,
      );
    } catch {
      toast.error("Não foi possível enviar agora. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBarbershopSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!searchedCity) return;

    const parsed = emailSchema.safeParse(barbershopEmail);
    if (!parsed.success) {
      toast.error("Digite um e-mail válido.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitDemand({
        email: parsed.data,
        city: searchedCity,
        profile: "barbershop",
        source: "buscar",
      });

      if (result.status === "created") {
        toast.success("Inscrição recebida! Vamos te chamar para o onboarding.");
      } else {
        toast.info("Você já está na lista dessa cidade.");
      }

      setBarbershopEmail("");
      router.push(`/sou-barbearia?city=${encodeURIComponent(searchedCity)}`);
    } catch {
      toast.error("Não foi possível enviar agora. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Busque sua cidade
              </h1>
              <p className="text-muted-foreground mt-3">
                Veja quando o Venust chega perto de você e seja avisado no
                lançamento.
              </p>
            </div>

            <form onSubmit={handleSearch} className="mt-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Digite sua cidade ou bairro"
                  className="h-14 pl-12 pr-40 text-lg bg-card border-border focus:border-primary transition-shadow focus:shadow-[0_0_18px_rgba(69,217,166,0.16)]"
                  autoComplete="address-level2"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <Button
                    type="submit"
                    className="h-11 venust-glow-hover"
                    disabled={isSearching}
                  >
                    Ver disponibilidade
                  </Button>
                </div>
              </div>
            </form>

            {!searchedCity && (
              <div className="mt-6 text-center text-muted-foreground">
                Digite uma cidade para ver o status do Venust nessa região.
              </div>
            )}

            {searchedCity && isSearching && (
              <BarbershopResultsSkeleton city={searchedCity} />
            )}

            {searchedCity && !isSearching && !hasBarbershops(searchedCity) && (
              <BuscarEmptyState
                city={searchedCity}
                successMessage={successMessage}
                clientEmail={clientEmail}
                barbershopEmail={barbershopEmail}
                isSubmitting={isSubmitting}
                onClientEmailChange={setClientEmail}
                onClientSubmit={handleClientSubmit}
                onBarbershopEmailChange={setBarbershopEmail}
                onBarbershopSubmit={handleBarbershopSubmit}
              />
            )}

            <div className="mt-14 rounded-2xl border border-border/50 bg-card/30 p-6 md:p-8">
              <h2 className="text-xl font-semibold text-foreground">
                Como o Venust chega na sua cidade
              </h2>
              <div className="mt-4 text-muted-foreground leading-relaxed">
                <div>• Identificamos demanda de clientes</div>
                <div>• Convidamos barbearias locais</div>
                <div>• Abrimos a cidade com agenda ativa</div>
              </div>
            </div>

            <div className="mt-10 text-center text-muted-foreground">
              <span>É dono de barbearia?</span>{" "}
              <Link
                href="/sou-barbearia"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Ver benefícios para barbearias →
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
