"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <Fragment>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-2xl font-bold text-primary venust-text-glow"
          >
            <Image
              alt="Venust logo"
              src={"/images/venust-icon.svg"}
              width={32}
              height={32}
              style={{ width: "32px", height: "32px" }}
              className="venust-text-glow"
            />
            Venust
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`transition-colors ${
                isActive("/")
                  ? "text-primary font-semibold venust-text-glow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Início
            </Link>
            <Link
              href="/buscar"
              className={`transition-colors ${
                isActive("/buscar")
                  ? "text-primary font-semibold venust-text-glow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Buscar Barbearias
            </Link>
            <Link
              href="/sou-barbearia"
              className={`transition-colors ${
                isActive("/sou-barbearia")
                  ? "text-primary font-semibold venust-text-glow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sou Barbearia
            </Link>
          </div>

          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 venust-glow-hover"
          >
            <Link href="/painel">Acessar Painel</Link>
          </Button>
        </nav>
      </header>
      <span className="flex w-full h-16" />
    </Fragment>
  );
}
