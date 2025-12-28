import type { FormEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function BuscarEmptyState({
  city,
  successMessage,
  clientEmail,
  barbershopEmail,
  isSubmitting,
  onClientEmailChange,
  onClientSubmit,
  onBarbershopEmailChange,
  onBarbershopSubmit,
}: {
  city: string;
  successMessage: string | null;
  clientEmail: string;
  barbershopEmail: string;
  isSubmitting: boolean;
  onClientEmailChange: (value: string) => void;
  onClientSubmit: (e: FormEvent) => void;
  onBarbershopEmailChange: (value: string) => void;
  onBarbershopSubmit: (e: FormEvent) => void;
}) {
  return (
    <div className="mt-10 rounded-2xl border border-border/50 bg-card/40 p-6 md:p-8">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          O Venust ainda não chegou em{" "}
          <span className="text-primary">{city}</span>
        </h2>
        <p className="text-muted-foreground mt-3">
          Estamos lançando o Venust por cidades. Já existe interesse nessa
          região e você pode entrar na lista.
        </p>

        <div className="mt-5">
          <Badge
            variant="outline"
            className="border-blue-500/25 bg-blue-500/10 text-blue-300"
          >
            🔵 Em breve
          </Badge>
        </div>
      </div>

      <div className="mt-8">
        {successMessage ? (
          <div className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
            <div className="text-foreground font-medium">{successMessage}</div>
            <div className="text-muted-foreground text-sm mt-2">
              Quanto mais pessoas, mais rápido abrimos novas cidades.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-primary/15 bg-background/30 p-6">
              <div className="text-foreground font-semibold text-lg">
                Sou cliente
              </div>
              <div className="text-muted-foreground text-sm mt-2">
                Quero agendar quando chegar
              </div>
              <form
                className="mt-5"
                onSubmit={onClientSubmit}
                data-umami-event="buscar:lead_client_submit"
              >
                <div className="flex gap-3">
                  <Input
                    value={clientEmail}
                    onChange={(e) => onClientEmailChange(e.target.value)}
                    type="email"
                    required
                    placeholder="Seu e-mail"
                    className="bg-background/60"
                    autoComplete="email"
                    inputMode="email"
                    disabled={isSubmitting}
                  />
                  <Button
                    type="submit"
                    className="venust-glow-hover"
                    disabled={isSubmitting}
                  >
                    Quero ser avisado
                  </Button>
                </div>
              </form>
            </div>

            <div className="rounded-2xl border border-primary/15 bg-background/30 p-6">
              <div className="text-foreground font-semibold text-lg">
                Sou barbearia
              </div>
              <div className="text-muted-foreground text-sm mt-2">
                Quero cadastrar minha barbearia nessa cidade
              </div>
              <form
                className="mt-5"
                onSubmit={onBarbershopSubmit}
                data-umami-event="buscar:lead_barbershop_submit"
              >
                <div className="flex gap-3">
                  <Input
                    value={barbershopEmail}
                    onChange={(e) => onBarbershopEmailChange(e.target.value)}
                    type="email"
                    required
                    placeholder="Seu e-mail"
                    className="bg-background/60"
                    autoComplete="email"
                    inputMode="email"
                    disabled={isSubmitting}
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    disabled={isSubmitting}
                  >
                    Sou barbearia em {city}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
