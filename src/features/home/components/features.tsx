import { Clock, CreditCard, MapPin, Shield, Smartphone, Star } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Agendamento 24/7",
    description: "Agende a qualquer hora, mesmo quando a barbearia está fechada",
  },
  {
    icon: MapPin,
    title: "Localização fácil",
    description: "Encontre barbearias próximas com endereço e como chegar",
  },
  {
    icon: Star,
    title: "Avaliações reais",
    description: "Veja o que outros clientes acharam antes de agendar",
  },
  {
    icon: CreditCard,
    title: "Preços transparentes",
    description: "Compare preços antes de agendar, sem surpresas",
  },
  {
    icon: Shield,
    title: "Confirmação imediata",
    description: "Seu horário é confirmado na hora, direto pelo site",
  },
  {
    icon: Smartphone,
    title: "Lembretes automáticos",
    description: "Receba lembretes para não esquecer do seu agendamento",
  },
];

export function FeaturesSection() {
  return (
    <section id="vantagens" className="py-20 bg-card/30">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
            Por que usar o <span className="text-primary">Venust</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Todas as vantagens de agendar pelo nosso app, sem pagar nada a mais
            por isso
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={`${feature.title}-${index.toString()}`}
              className="text-center p-6 venust-card-glow rounded-lg"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

