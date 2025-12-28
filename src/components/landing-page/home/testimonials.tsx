import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Marina Silva",
    location: "Vila Madalena, SP",
    text: "Nunca foi tão fácil agendar um corte! Encontrei uma barbearia incrível perto de casa e o atendimento foi perfeito. Super recomendo!",
    rating: 5,
    service: "Corte + Barba",
  },
  {
    name: "João Santos",
    location: "Copacabana, RJ",
    text: "Estava viajando e precisava cortar o cabelo urgente. Pelo Venust achei uma barbearia top em 5 minutos. Salvou meu dia!",
    rating: 5,
    service: "Corte Masculino",
  },
  {
    name: "Pedro Costa",
    location: "Savassi, BH",
    text: "O que mais gosto é que posso ver as avaliações reais e escolher o horário que funciona pra mim. Nunca mais vou sem agendar!",
    rating: 5,
    service: "Corte + Sobrancelha",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
            O que dizem nossos usuários
          </h2>
          <p className="text-muted-foreground text-lg">
            Clientes que já agendaram pelo Venust
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={`${testimonial.name}-${index.toString()}`}
              className="bg-card border-border"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={`${testimonial.name}-${i.toString()}`}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="border-t border-border pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                  <p className="text-xs text-primary mt-1">
                    Serviço: {testimonial.service}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
