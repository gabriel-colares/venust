"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BarbershopMiniCard } from "./barbershop-mini-card";

const mockBarbershops = [
  {
    id: 1,
    name: "Barbearia Clássica",
    location: "Vila Madalena, SP",
    tag: "Corte masculino",
    rating: 4.8,
    image: "/modern-barbershop.png",
  },
  {
    id: 2,
    name: "Navalha & Estilo",
    location: "Ipanema, RJ",
    tag: "Navalha tradicional",
    rating: 4.9,
    image: "/elegant-barbershop-with-vintage-chairs.jpg",
  },
  {
    id: 3,
    name: "Barber House",
    location: "Savassi, BH",
    tag: "Corte e barba",
    rating: 4.7,
    image: "/luxury-barbershop-with-modern-equipment.jpg",
  },
  {
    id: 4,
    name: "Vintage Barber",
    location: "Moinhos, POA",
    tag: "Estilo vintage",
    rating: 4.6,
    image: "/modern-barbershop.png",
  },
  {
    id: 5,
    name: "Modern Cut",
    location: "Boa Viagem, Recife",
    tag: "Cortes modernos",
    rating: 4.8,
    image: "/professional-barbershop-owner-working-in-modern-ba.jpg",
  },
  {
    id: 6,
    name: "Tradição Barber",
    location: "Centro, Curitiba",
    tag: "Tradição familiar",
    rating: 4.9,
    image: "/modern-barbershop.png",
  },
];

export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section id="buscar" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
              Encontre a{" "}
              <span className="text-primary">barbearia perfeita</span> para você
            </h2>
            <p className="text-muted-foreground text-lg">
              Compare preços, veja avaliações e agende seu horário em segundos
            </p>
          </div>

          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Digite seu bairro ou cidade..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-input border-border focus:border-primary focus:ring-primary/20 venust-glow-hover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {mockBarbershops.map((barbershop) => (
              <BarbershopMiniCard key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/busca"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors venust-glow-hover px-4 py-2 rounded-lg"
            >
              Ver todas as barbearias →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
