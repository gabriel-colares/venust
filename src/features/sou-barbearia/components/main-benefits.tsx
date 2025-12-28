import { Calendar, CheckCircle, MapPin, MessageSquare, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

const mainBenefits = [
  {
    icon: MapPin,
    title: "Listagem pública na plataforma",
    benefit: "Melhora a descoberta local e traz clientes do bairro",
    points: [
      "Aparece nas buscas por barbearias próximas",
      "Perfil completo com fotos e informações",
      "Destaque em mapas e resultados locais",
    ],
  },
  {
    icon: Calendar,
    title: "Agendamentos online",
    benefit: "Reduz fricção operacional e dá previsibilidade à agenda",
    points: [
      "Clientes agendam sozinhos sem ligar",
      "Agenda sempre organizada e visível",
      "Confirmação via link do WhatsApp",
    ],
  },
  {
    icon: Star,
    title: "Avaliações de quem agendou",
    benefit: "Aumenta confiança e conversão",
    points: [
      "Somente clientes que concluíram atendimento podem avaliar",
      "Moderação simples para manter a qualidade",
      "Melhora posicionamento nas buscas",
    ],
  },
  {
    icon: MessageSquare,
    title: "Lembretes por WhatsApp/email",
    benefit: "Diminui faltas com lembretes práticos",
    points: [
      "Lembretes antes do horário (quando habilitados)",
      "Confirmação de presença via link",
      "Reduz significativamente os no-shows",
    ],
  },
];

export function MainBenefitsSection() {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Por que sua barbearia precisa estar no{" "}
            <span className="text-primary">Venust</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cada funcionalidade foi pensada para resolver problemas reais do seu dia
            a dia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {mainBenefits.map((benefit, idx) => (
            <Card
              key={`${benefit.title}-${idx.toString()}`}
              className="p-6 border border-border/50"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/20 flex-shrink-0">
                  <benefit.icon className="w-8 h-8 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{benefit.benefit}</p>
                  <ul className="space-y-2">
                    {benefit.points.map((p, i) => (
                      <li
                        key={`${benefit.title}-${i.toString()}`}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle
                          className="w-4 h-4 text-primary mt-0.5 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

