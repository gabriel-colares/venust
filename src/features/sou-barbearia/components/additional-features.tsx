import {
  AlertTriangle,
  BookOpen,
  Check,
  Link as LinkIcon,
  Shield,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const allFeatures = [
  {
    icon: Shield,
    title: "Bloqueios de agenda",
    benefit: "Evita conflitos e organiza folgas/feriados",
    points: [
      "Bloqueia horários para folgas",
      "Organiza feriados e eventos",
      "Evita agendamentos em horários indisponíveis",
    ],
  },
  {
    icon: TrendingUp,
    title: "Overbooking controlado",
    benefit: "Aproveita picos de demanda com segurança",
    points: [
      "Aceita mais agendamentos em horários de pico",
      "Controle inteligente para evitar sobrecarga",
      "Maximiza aproveitamento da agenda",
    ],
  },
  {
    icon: LinkIcon,
    title: "Links personalizados",
    benefit: "Facilita campanhas e rastreia origem",
    points: [
      "Link único para bio do Instagram",
      "QR codes para campanhas físicas",
      "Acompanha de onde vêm os clientes",
    ],
  },
  {
    icon: BookOpen,
    title: "Catálogo de serviços",
    benefit: "Define expectativas e agiliza agendamento",
    points: [
      "Lista completa de serviços e durações",
      "Preços transparentes para o cliente",
      "Agendamento mais rápido e preciso",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Política anti no-show",
    benefit: "Formaliza regras e reduz faltas",
    points: [
      "Regras claras sobre cancelamentos",
      "Sistema de penalidades simples",
      "Clientes mais comprometidos",
    ],
  },
];

export function AdditionalFeaturesSection() {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Recursos que fazem a diferença
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Funcionalidades pensadas para otimizar cada aspecto do seu negócio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {allFeatures.map((feature, index) => (
            <Card
              key={`${feature.title}-${index.toString()}`}
              className="p-6 border border-border/50"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/20 flex-shrink-0">
                  <feature.icon
                    className="w-6 h-6 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {feature.benefit}
                  </p>
                </div>
              </div>
              <ul className="space-y-2">
                {feature.points.map((point, pointIndex) => (
                  <li
                    key={`${feature.title}-${pointIndex.toString()}`}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <Check
                      className="w-4 h-4 text-primary mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
