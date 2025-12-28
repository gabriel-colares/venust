"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqs = [
  {
    question: "É realmente gratuito para mim?",
    answer:
      "Sim! O Venust é 100% gratuito para clientes. Você só paga pelo serviço na barbearia, como sempre fez. Não cobramos nenhuma taxa adicional.",
  },
  {
    question: "Como funciona o agendamento?",
    answer:
      "É muito simples: busque barbearias na sua região, escolha o horário disponível, confirme o agendamento e pronto! Você receberá uma confirmação e lembretes automáticos.",
  },
  {
    question: "Posso cancelar ou reagendar?",
    answer:
      "Claro! Você pode cancelar ou reagendar seu horário diretamente pelo app, respeitando a política de cancelamento de cada barbearia (geralmente até 2 horas antes).",
  },
  {
    question: "E se a barbearia não cumprir o horário?",
    answer:
      "Temos um sistema de avaliações que ajuda a manter a qualidade. Se houver problemas, você pode avaliar e reportar. Trabalhamos apenas com estabelecimentos confiáveis.",
  },
  {
    question: "Preciso criar uma conta?",
    answer:
      "Para agendar, sim. É rápido e simples - só precisamos de seu nome, telefone e email para confirmar os agendamentos e enviar lembretes.",
  },
  {
    question: "Recebo lembretes do meu agendamento?",
    answer:
      "Sim! Enviamos lembretes por WhatsApp e email (quando habilitados pela barbearia) para que você não esqueça do seu horário. Você pode escolher quando quer receber (1 dia antes, algumas horas antes, etc).",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
            Perguntas frequentes
          </h2>
          <p className="text-muted-foreground text-lg">
            Tire suas dúvidas sobre como usar o Venust
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <Card
                key={`${faq.question}-${index.toString()}`}
                className={`border border-border/50 overflow-hidden ${isOpen ? "gap-2" : "gap-0"}`}
              >
                <CardHeader
                  className="cursor-pointer"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  data-umami-event="home:faq_toggle"
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
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
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
