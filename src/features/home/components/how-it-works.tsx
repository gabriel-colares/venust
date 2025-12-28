import { Calendar, Scissors, Search, Star } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Encontre",
    description:
      "Busque barbearias na sua região e compare preços e avaliações",
  },
  {
    icon: Calendar,
    title: "Agende",
    description: "Escolha o horário que funciona para você, direto pelo app",
  },
  {
    icon: Scissors,
    title: "Corte",
    description: "Vá até a barbearia no horário marcado e aproveite o serviço",
  },
  {
    icon: Star,
    title: "Avalie",
    description: "Deixe sua avaliação para ajudar outros clientes",
  },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
            Como funciona para <span className="text-primary">você</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Agendar seu corte nunca foi tão fácil. Sem complicação, sem taxa,
            sem dor de cabeça.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen">
          {steps.map((step, index) => (
            <div
              key={`${step.title}-${index.toString()}`}
              className="text-center group"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/15 bg-primary/5 transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground transition-colors group-hover:text-primary">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-primary font-medium">
              100% gratuito para clientes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
