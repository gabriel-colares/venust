import { Calendar, MessageSquare, Scissors, Users } from "lucide-react";

const steps = [
  {
    icon: Users,
    title: "Cadastrar",
    description: "Crie sua conta e configure o perfil da barbearia",
  },
  {
    icon: Scissors,
    title: "Configurar serviços",
    description: "Adicione seus serviços, preços e horários de funcionamento",
  },
  {
    icon: Calendar,
    title: "Receber agendamentos",
    description: "Clientes encontram sua barbearia e fazem agendamentos online",
  },
  {
    icon: MessageSquare,
    title: "Lembrar clientes",
    description: "Lembretes por WhatsApp e email (quando habilitados)",
  },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Como funciona para sua{" "}
            <span className="text-primary">barbearia</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Em poucos passos sua barbearia estará recebendo agendamentos online
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={`${step.title}-${index.toString()}`}
              className="text-center group"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/15 bg-primary/5 transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                <step.icon
                  className="w-8 h-8 text-primary"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span className="text-sm font-medium text-foreground">
              Comece hoje mesmo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
