import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Venust | Sou Barbearia",
  description:
    "Cadastre sua barbearia no Venust e receba mais clientes. Ofereça agendamento online, controle de horários e destaque-se no mercado.",
  keywords: [
    "sou barbearia",
    "cadastrar barbearia",
    "gestão de barbearia",
    "agendamento online barbearia",
    "Venust parceiros",
    "atrair clientes barbearia",
  ],
}

export default function BuscarLayout({ children }: PropsWithChildren) {
  return children;
}