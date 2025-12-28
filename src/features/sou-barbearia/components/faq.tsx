"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqs = [
  {
    question: "Como funciona a política anti no-show?",
    answer:
      "O sistema permite definir regras claras sobre cancelamentos e faltas. Clientes que faltam sem avisar podem ter restrições para novos agendamentos, incentivando maior compromisso.",
  },
  {
    question: "Os lembretes via WhatsApp são pagos?",
    answer:
      "Os lembretes podem ser enviados por WhatsApp (wa.me) e email, quando habilitados pela barbearia. Não cobramos taxa adicional pela funcionalidade; eventuais custos do canal dependem do provedor escolhido.",
  },
  {
    question: "Como funciona o cancelamento de agendamentos?",
    answer:
      "Clientes podem cancelar através do link enviado na confirmação. Você define as regras de antecedência mínima para cancelamentos sem penalidade.",
  },
  {
    question: "Que tipo de suporte vocês oferecem?",
    answer:
      "Oferecemos suporte via WhatsApp e chat durante horário comercial. Nossa equipe conhece o dia a dia das barbearias e pode ajudar com qualquer dúvida.",
  },
  {
    question: "Posso integrar com outras ferramentas?",
    answer:
      "Estamos sempre desenvolvendo novas integrações. Atualmente trabalhamos com WhatsApp e estamos planejando integrações com redes sociais e sistemas de pagamento.",
  },
];

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-8 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tire suas dúvidas sobre como o Venust funciona
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <Card
                key={`${faq.question}-${index.toString()}`}
                className={`border border-border/50 overflow-hidden ${isOpen ? "gap-2" : "gap-0"}`}
              >
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  data-umami-event="sou_barbearia:faq_toggle"
                  data-umami-event-index={index.toString()}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-left text-foreground">
                      {faq.question}
                    </CardTitle>
                    <ChevronDown
                      className={`w-5 h-5 text-primary transition-transform duration-300 ease-in-out ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </CardHeader>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {isOpen && (
                    <CardContent>
                      <div
                        className={`transition-transform duration-300 ease-in-out ${
                          isOpen ? "translate-y-0" : "-translate-y-2"
                        }`}
                      >
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    </CardContent>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
