"use client";

import { Filter, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { BarbershopCard } from "@/components/landing-page/buscar/barbershop-card";
import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockBarbershops = [
  {
    id: 1,
    name: "Barbearia Moderna",
    image: "/modern-barbershop.png",
    rating: 4.8,
    reviews: 127,
    address: "Rua das Flores, 123 - Centro",
    distance: "0.5 km",
    nextAvailable: "14:30",
    services: ["Corte", "Barba", "Sobrancelha"],
    price: "R$ 25",
  },
  {
    id: 2,
    name: "Estilo & Classe",
    image: "/elegant-barbershop-with-vintage-chairs.jpg",
    rating: 4.9,
    reviews: 89,
    address: "Av. Principal, 456 - Jardins",
    distance: "1.2 km",
    nextAvailable: "15:00",
    services: ["Corte", "Barba", "Relaxamento"],
    price: "R$ 30",
  },
  {
    id: 3,
    name: "Barbershop Premium",
    image: "/luxury-barbershop-with-modern-equipment.jpg",
    rating: 4.7,
    reviews: 203,
    address: "Rua do Comércio, 789 - Vila Nova",
    distance: "2.1 km",
    nextAvailable: "16:15",
    services: ["Corte", "Barba", "Tratamento"],
    price: "R$ 35",
  },
  {
    id: 4,
    name: "Corte & Arte",
    image: "/artistic-barbershop-with-creative-styling.jpg",
    rating: 4.6,
    reviews: 156,
    address: "Praça Central, 321 - Centro",
    distance: "0.8 km",
    nextAvailable: "17:00",
    services: ["Corte", "Design", "Coloração"],
    price: "R$ 28",
  },
];

export default function BuscarPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");

  return (
    <div className="min-h-screen bg-background dark">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header da busca */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Encontre sua{" "}
              <span className="text-primary venust-text-glow">
                barbearia ideal
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Descubra as melhores barbearias da sua região e agende seu horário
              em segundos
            </p>
          </div>

          {/* Barra de busca e filtros */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Buscar por nome, serviço ou localização..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 bg-card border-border focus:border-primary"
                />
              </div>
              <Button
                variant="outline"
                className="h-12 px-6 border-border hover:border-primary bg-transparent"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>

            {/* Filtros rápidos */}
            <div className="flex flex-wrap gap-2">
              {[
                "todos",
                "mais próximas",
                "melhor avaliadas",
                "disponível agora",
                "mais baratas",
              ].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className={
                    selectedFilter === filter
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Resultados */}
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground">
                {mockBarbershops.length} barbearias encontradas
              </h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Ordenar por distância</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockBarbershops.map((barbershop) => (
                <BarbershopCard key={barbershop.id} barbershop={barbershop} />
              ))}
            </div>
          </div>

          {/* CTA para mais resultados */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-border hover:border-primary bg-transparent"
            >
              Carregar mais barbearias
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
