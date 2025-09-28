import Link from "next/link";
import { Star, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface BarbershopMiniCardProps {
  barbershop: {
    id: number;
    name: string;
    location: string;
    tag: string;
    rating: number;
    price?: string;
    nextAvailable?: string;
    image?: string;
  };
}

export function BarbershopMiniCard({ barbershop }: BarbershopMiniCardProps) {
  return (
    <Link href="/buscar">
      <Card className="bg-card border-border hover:border-primary/50 transition-all duration-150 venust-glow-hover cursor-pointer overflow-hidden pt-0">
        <CardContent className="p-0">
          <div className="relative h-48 overflow-hidden">
            <img
              src={
                barbershop.image ||
                `/placeholder.svg?height=200&width=300&query=modern barbershop interior ${barbershop.name}`
              }
              alt={`Interior da ${barbershop.name}`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-3 right-3">
              <span className="text-xs bg-primary/90 text-primary-foreground px-2 py-1 rounded-full font-medium">
                {barbershop.tag}
              </span>
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 text-foreground">
              {barbershop.name}
            </h3>

            <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
              <MapPin className="w-4 h-4" />
              <span>{barbershop.location}</span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="text-sm">
                <span className="text-muted-foreground">A partir de </span>
                <span className="font-semibold text-primary">
                  {barbershop.price || "R$ 25"}
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{barbershop.nextAvailable || "Hoje 14h"}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="text-sm font-medium">{barbershop.rating}</span>
                <span className="text-xs text-muted-foreground">
                  (127 avaliações)
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
