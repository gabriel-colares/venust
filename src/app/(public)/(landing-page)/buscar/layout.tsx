import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Venust | Encontre barbearias perto de você",
  description:
    "Pesquise barbearias na sua região, compare serviços, leia avaliações e agende seu horário com praticidade pelo Venust.",
  keywords: [
    "buscar barbearia",
    "barbearias próximas",
    "barbearia online",
    "agendamento barbearia",
    "Venust busca",
    "cabelo e barba",
  ],
};

export default function BuscarLayout({ children }: PropsWithChildren) {
  return children;
}
