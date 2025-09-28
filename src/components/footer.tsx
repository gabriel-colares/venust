import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-card/50 border-t border-border py-12">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link
              href="/"
              className="text-2xl font-bold text-primary venust-text-glow"
            >
              Venust
            </Link>
            <p className="text-muted-foreground mt-2 text-sm">
              Gestão profissional para barbearias modernas
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Produto</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#recursos"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Recursos
                </Link>
              </li>
              <li>
                <Link
                  href="#precos"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Preços
                </Link>
              </li>
              <li>
                <Link
                  href="/busca"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Buscar barbearias
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/termos"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Termos de uso
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidade"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacidade
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  WhatsApp Suporte
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Venust. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
