"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <Fragment>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-2xl font-bold text-primary venust-text-glow"
            data-umami-event="nav:logo"
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
              data-umami-event="nav:home"
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
              data-umami-event="nav:buscar"
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
              data-umami-event="nav:sou_barbearia"
            >
              Sou Barbearia
            </Link>
          </div>

          <Button
            asChild
            className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 venust-glow-hover"
          >
            <Link
              href="/#lista-de-acesso-antecipado"
              data-umami-event="nav:acesso_antecipado"
            >
              Acesso Antecipado
            </Link>
          </Button>

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Abrir menu"
                  className="text-muted-foreground hover:text-foreground"
                  data-umami-event="nav:open_menu"
                >
                  <Menu className="size-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0">
                <SheetHeader className="sr-only">
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>Navegação do site.</SheetDescription>
                </SheetHeader>
                <div className="flex items-center gap-3 border-b border-border px-4 h-16">
                  <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 text-lg font-bold text-primary"
                    data-umami-event="nav:logo_mobile"
                  >
                    <Image
                      alt="Venust logo"
                      src={"/images/venust-icon.svg"}
                      width={28}
                      height={28}
                      style={{ width: "28px", height: "28px" }}
                    />
                    Venust
                  </Link>
                </div>

                <div className="px-4 py-4">
                  <div className="grid gap-1">
                    <Link
                      href="/"
                      onClick={closeMobileMenu}
                      className={`rounded-md px-3 py-2 text-base transition-colors ${
                        isActive("/")
                          ? "text-primary font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                      data-umami-event="nav:home_mobile"
                    >
                      Início
                    </Link>
                    <Link
                      href="/buscar"
                      onClick={closeMobileMenu}
                      className={`rounded-md px-3 py-2 text-base transition-colors ${
                        isActive("/buscar")
                          ? "text-primary font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                      data-umami-event="nav:buscar_mobile"
                    >
                      Buscar Barbearias
                    </Link>
                    <Link
                      href="/sou-barbearia"
                      onClick={closeMobileMenu}
                      className={`rounded-md px-3 py-2 text-base transition-colors ${
                        isActive("/sou-barbearia")
                          ? "text-primary font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                      data-umami-event="nav:sou_barbearia_mobile"
                    >
                      Sou Barbearia
                    </Link>
                  </div>

                  <div className="mt-4">
                    <Button asChild className="w-full venust-glow-hover">
                      <Link
                        href="/#lista-de-acesso-antecipado"
                        onClick={closeMobileMenu}
                        data-umami-event="nav:acesso_antecipado_mobile"
                      >
                        Acesso Antecipado
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
      <span className="flex w-full h-16" />
    </Fragment>
  );
}
