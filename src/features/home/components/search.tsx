"use client";

import { Search } from "lucide-react";
import { type FormEvent, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

type LeadProfile = "client" | "barbershop";

const emailSchema = z.string().trim().email();

function hasBarbershops(_city: string) {
  return false;
}

function SearchEmptyState({
  city,
  onSubmit,
  successMessage,
}: {
  city: string;
  onSubmit: (payload: {
    email: string;
    city: string;
    profile: LeadProfile;
    source: "home-search";
  }) => void;
  successMessage: string | null;
}) {
  const [clientEmail, setClientEmail] = useState("");
  const [barbershopEmail, setBarbershopEmail] = useState("");

  const handleSubmit = (profile: LeadProfile) => (e: FormEvent) => {
    e.preventDefault();

    const email = profile === "client" ? clientEmail : barbershopEmail;
    const parsed = emailSchema.safeParse(email);

    if (!parsed.success) {
      toast.error("Digite um e-mail válido.");
      return;
    }

    onSubmit({
      email: parsed.data,
      city,
      profile,
      source: "home-search",
    });

    if (profile === "client") {
      setClientEmail("");
    } else {
      setBarbershopEmail("");
    }
  };

  return (
    <div className="mt-10 mx-auto max-w-4xl">
      <div className="rounded-2xl border border-border/50 bg-card/40 p-6 md:p-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/15 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span className="text-sm font-medium text-primary">
              Lançamento por cidades
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            O Venust ainda não chegou em{" "}
            <span className="text-primary">{city}</span>
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Estamos lançando por cidades. Deixe seu contato e a gente te avisa
            quando chegar.
          </p>
        </div>

        {successMessage ? (
          <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4 text-center">
            <div className="text-foreground font-medium">{successMessage}</div>
            <div className="text-muted-foreground text-sm mt-1">
              Obrigado por ajudar a definir as próximas cidades.
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-primary/15 bg-background/30 p-6">
              <div className="text-foreground font-semibold text-lg mb-2">
                Sou cliente
              </div>
              <div className="text-muted-foreground text-sm mb-4 leading-relaxed">
                Quero ser avisado quando o Venust chegar em {city}.
              </div>
              <form
                className="flex gap-3"
                onSubmit={handleSubmit("client")}
                data-umami-event="home:lead_client_submit"
              >
                <Input
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="Seu e-mail"
                  className="bg-background/60"
                  autoComplete="email"
                  inputMode="email"
                />
                <Button type="submit" className="venust-glow-hover">
                  Quero ser avisado
                </Button>
              </form>
            </div>

            <div className="rounded-2xl border border-primary/15 bg-background/30 p-6">
              <div className="text-foreground font-semibold text-lg mb-2">
                Sou barbearia
              </div>
              <div className="text-muted-foreground text-sm mb-4 leading-relaxed">
                Tenho barbearia em {city} e quero participar do lançamento.
              </div>
              <form
                className="flex gap-3"
                onSubmit={handleSubmit("barbershop")}
                data-umami-event="home:lead_barbershop_submit"
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
                />
                <Button type="submit" variant="outline">
                  Tenho barbearia
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BarbershopResultsSkeleton({ city }: { city: string }) {
  return (
    <div className="mt-10 mx-auto max-w-7xl">
      <div className="text-center mb-8">
        <div className="text-muted-foreground">
          Buscando barbearias em <span className="text-primary">{city}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index.toString()}
            className="rounded-2xl border border-border/50 bg-card/40 overflow-hidden"
          >
            <Skeleton className="h-40 w-full rounded-none bg-accent/30" />
            <div className="p-5">
              <Skeleton className="h-5 w-2/3 bg-accent/50" />
              <Skeleton className="h-4 w-1/2 mt-3 bg-accent/40" />
              <div className="flex items-center justify-between mt-5">
                <Skeleton className="h-4 w-20 bg-accent/40" />
                <Skeleton className="h-9 w-24 rounded-md bg-primary/10" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedCity, setSearchedCity] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
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
    }, 800);
  };

  const handleLead = (payload: {
    email: string;
    city: string;
    profile: LeadProfile;
    source: "home-search";
  }) => {
    const message =
      payload.profile === "client"
        ? `Perfeito! Vamos avisar quando o Venust chegar em ${payload.city}.`
        : `Perfeito! Vamos te chamar quando abrirmos o lançamento em ${payload.city}.`;

    setSuccessMessage(message);
    toast.success("Recebido!");
  };

  return (
    <section id="buscar" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
              Veja quando o <span className="text-primary">Venust</span> chega
              na sua cidade
            </h2>
            <p className="text-muted-foreground text-lg">
              Estamos lançando por cidades. Consulte a disponibilidade e ajude a
              definir as próximas regiões.
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="max-w-3xl mx-auto"
            data-umami-event="home:search_submit"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Digite sua cidade ou bairro"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-40 h-14 text-lg bg-input border-border focus:border-primary focus:ring-primary/20 transition-shadow focus:shadow-[0_0_18px_rgba(69,217,166,0.16)]"
                autoComplete="address-level2"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Button type="submit" className="h-11 venust-glow-hover">
                  Ver disponibilidade
                </Button>
              </div>
            </div>
          </form>

          {searchedCity &&
            !hasBarbershops(searchedCity) &&
            (isSearching ? (
              <BarbershopResultsSkeleton city={searchedCity} />
            ) : (
              <SearchEmptyState
                city={searchedCity}
                onSubmit={handleLead}
                successMessage={successMessage}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
