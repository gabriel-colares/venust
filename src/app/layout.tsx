import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { PropsWithChildren } from "react";
import { Providers } from "@/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Venust | Agende seu corte na barbearia ideal",
  description:
    "Descubra e agende serviços nas melhores barbearias da sua região com o Venust. Simples, rápido e no estilo que você merece.",
  keywords: [
    "barbearia",
    "agendamento online",
    "corte de cabelo",
    "barba",
    "Venust",
    "barbearias próximas",
  ],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
