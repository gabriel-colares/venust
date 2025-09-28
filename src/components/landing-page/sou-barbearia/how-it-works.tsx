import { Users, Scissors, Calendar, MessageSquare } from "lucide-react";

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
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 venust-card-glow">
              <Users className="w-8 h-8 text-primary" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Cadastrar
            </h3>
            <p className="text-muted-foreground">
              Crie sua conta e configure o perfil da barbearia
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 venust-card-glow">
              <Scissors className="w-8 h-8 text-primary" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Configurar serviços
            </h3>
            <p className="text-muted-foreground">
              Adicione seus serviços, preços e horários de funcionamento
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 venust-card-glow">
              <Calendar className="w-8 h-8 text-primary" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Receber agendamentos
            </h3>
            <p className="text-muted-foreground">
              Clientes encontram sua barbearia e fazem agendamentos online
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 venust-card-glow">
              <MessageSquare
                className="w-8 h-8 text-primary"
                aria-hidden="true"
              />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Lembrar clientes
            </h3>
            <p className="text-muted-foreground">
              Lembretes por WhatsApp e email (quando habilitados)
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground">
              Comece hoje mesmo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
