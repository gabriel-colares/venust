import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <p>RootLayout</p>
      </body>
    </html>
  );
}
