"use client";

import { Clock, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BarbershopCardProps {
  barbershop: {
    id: number;
    name: string;
    image: string;
    rating: number;
    reviews: number;
    address: string;
    distance: string;
    nextAvailable: string;
    services: string[];
    price: string;
  };
}

export function BarbershopCard({ barbershop }: BarbershopCardProps) {
  return (
    <Link href={`/barbearia/${barbershop.id}`} className="block">
      <div className="venust-card-glow rounded-lg overflow-hidden bg-card hover:scale-105 transition-all duration-300 cursor-pointer">
        <div className="relative">
          <Image
            className="w-full h-48 object-cover"
            src={barbershop.image || "/placeholder.svg"}
            alt={barbershop.name}
            width={400}
            height={200}
          />
          <div className="absolute top-3 right-3">
            <Badge className="bg-primary text-primary-foreground">
              {barbershop.price}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg text-foreground">
              {barbershop.name}
            </h3>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{barbershop.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({barbershop.reviews})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <MapPin className="w-4 h-4" />
            <span>{barbershop.address}</span>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
            <Clock className="w-4 h-4 neon-accent-blue" />
            <span>
              Próximo horário:{" "}
              <span className="neon-accent-blue font-medium">
                {barbershop.nextAvailable}
              </span>
            </span>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {barbershop.services.map((service, index) => (
              <Badge
                key={`${service}-${index.toString()}`}
                variant="secondary"
                className="text-xs"
              >
                {service}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {barbershop.distance}
            </span>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 venust-glow-hover"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Ver Detalhes
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
