"use client";

import { useState } from "react";
import {
  Settings,
  User,
  CreditCard,
  MessageSquare,
  Bell,
  Shield,
  Store,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  Edit,
  Check,
  X,
  AlertTriangle,
  Clock,
  Calendar,
  DollarSign,
  FileText,
  Download,
  ExternalLink,
  Copy,
  Trash2,
  Plus,
} from "lucide-react";

// Mock data
const barbershopSettings = {
  name: "Barbearia Venust",
  description: "A melhor barbearia da região com profissionais qualificados",
  address: "Rua das Flores, 123 - Centro",
  phone: "(11) 99999-9999",
  whatsapp: "(11) 99999-9999",
  email: "contato@barbeariavenust.com",
  website: "https://venust.app/barbearia/venust",
  instagram: "@barbeariavenust",
};

const subscriptionData = {
  plan: "Premium",
  status: "Ativo",
  nextBilling: "2024-03-15",
  amount: "R$ 89,90",
  paymentMethod: "Cartão •••• 4532",
  invoices: [
    {
      id: 1,
      date: "2024-02-15",
      amount: "R$ 89,90",
      status: "Pago",
      downloadUrl: "#",
    },
    {
      id: 2,
      date: "2024-01-15",
      amount: "R$ 89,90",
      status: "Pago",
      downloadUrl: "#",
    },
    {
      id: 3,
      date: "2023-12-15",
      amount: "R$ 89,90",
      status: "Pago",
      downloadUrl: "#",
    },
  ],
};

const integrationSettings = {
  whatsapp: {
    enabled: true,
    phone: "(11) 99999-9999",
    templates: {
      confirmation:
        "Olá {nome}! Seu agendamento para {servico} está confirmado para {data} às {hora}.",
      reminder:
        "Lembrete: Você tem um agendamento amanhã às {hora} para {servico}.",
      cancellation: "Seu agendamento para {servico} em {data} foi cancelado.",
    },
  },
};

const notificationSettings = {
  whatsapp: {
    newBooking: true,
    cancellation: true,
    reminder: true,
    review: true,
  },
  email: {
    newBooking: false,
    cancellation: true,
    reminder: false,
    review: true,
  },
  schedule: {
    start: "08:00",
    end: "18:00",
  },
};

const accountData = {
  name: "Gabriel Silva",
  email: "gabriel@barbeariavenust.com",
  phone: "(11) 99999-9999",
  role: "Proprietário",
  lastLogin: "2024-02-15 14:30",
};

const policiesData = {
  cancellation: {
    enabled: true,
    hours: 24,
    penalty: 50,
  },
  delay: {
    enabled: true,
    minutes: 15,
    action: "cancel",
  },
  noShow: {
    enabled: true,
    penalty: 100,
    block: true,
  },
};

function SettingsCard({ title, description, children }: any) {
  return (
    <div className="bg-[#1a1d21] rounded-[12px] p-[24px] border border-[#363a3d]">
      <div className="mb-[20px]">
        <h3 className="text-white text-[18px] font-semibold mb-[4px]">
          {title}
        </h3>
        <p className="text-[#9b9c9e] text-[14px]">{description}</p>
      </div>
      {children}
    </div>
  );
}

function FormField({ label, children }: any) {
  return (
    <div className="space-y-[8px]">
      <label className="text-white text-[14px] font-medium">{label}</label>
      {children}
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
}: any) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full bg-[#0d0f10] border border-[#363a3d] rounded-[8px] px-[12px] py-[10px] text-white text-[14px] outline-none focus:border-[#32f1b4] disabled:opacity-50 disabled:cursor-not-allowed"
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 3 }: any) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-[#0d0f10] border border-[#363a3d] rounded-[8px] px-[12px] py-[10px] text-white text-[14px] outline-none focus:border-[#32f1b4] resize-none"
    />
  );
}

function Toggle({ enabled, onChange }: any) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-[44px] h-[24px] rounded-full transition-colors ${
        enabled ? "bg-[#32f1b4]" : "bg-[#363a3d]"
      }`}
    >
      <div
        className={`absolute top-[2px] w-[20px] h-[20px] bg-white rounded-full transition-transform ${
          enabled ? "translate-x-[22px]" : "translate-x-[2px]"
        }`}
      />
    </button>
  );
}

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState("barbearia");
  const [barbershop, setBarbershop] = useState(barbershopSettings);
  const [integrations, setIntegrations] = useState(integrationSettings);
  const [notifications, setNotifications] = useState(notificationSettings);
  const [account, setAccount] = useState(accountData);
  const [policies, setPolicies] = useState(policiesData);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const tabs = [
    { id: "barbearia", label: "Barbearia", icon: Store },
    { id: "assinatura", label: "Assinatura", icon: CreditCard },
    { id: "integracoes", label: "Integrações", icon: Smartphone },
    { id: "notificacoes", label: "Notificações", icon: Bell },
    { id: "conta", label: "Conta", icon: User },
    { id: "politicas", label: "Políticas", icon: Shield },
  ];

  const handleSave = () => {
    // Simulate save action
    console.log("Configurações salvas");
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(barbershop.website);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0d0f10] overflow-auto">
      {/* Header */}
      <div className="border-b border-[#363a3d] px-[32px] py-[24px]">
        <div className="flex flex-col gap-[8px]">
          <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[24px]">
            Configurações
          </div>
          <div className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[14px] tracking-[0.15px]">
            Gerencie as configurações da sua conta e barbearia
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-[32px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-[24px]">
            {/* Sidebar */}
            <div className="lg:w-[280px]">
              <div className="bg-[#1a1d21] rounded-[12px] p-[16px] border border-[#363a3d] sticky top-[24px]">
                <nav className="space-y-[4px]">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-[12px] px-[12px] py-[10px] rounded-[8px] text-[14px] font-medium transition-colors ${
                          activeTab === tab.id
                            ? "bg-[#32f1b4] text-black"
                            : "text-[#9b9c9e] hover:text-white hover:bg-[#363a3d]"
                        }`}
                      >
                        <Icon className="size-[16px]" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 space-y-[24px]">
              {/* Barbearia */}
              {activeTab === "barbearia" && (
                <div className="space-y-[24px]">
                  <SettingsCard
                    title="Informações da Barbearia"
                    description="Configure as informações públicas da sua barbearia"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                      <FormField label="Nome da Barbearia">
                        <Input
                          value={barbershop.name}
                          onChange={(e: any) =>
                            setBarbershop({
                              ...barbershop,
                              name: e.target.value,
                            })
                          }
                          placeholder="Nome da barbearia"
                        />
                      </FormField>
                      <FormField label="Telefone">
                        <Input
                          value={barbershop.phone}
                          onChange={(e: any) =>
                            setBarbershop({
                              ...barbershop,
                              phone: e.target.value,
                            })
                          }
                          placeholder="(11) 99999-9999"
                        />
                      </FormField>
                      <FormField label="WhatsApp">
                        <Input
                          value={barbershop.whatsapp}
                          onChange={(e: any) =>
                            setBarbershop({
                              ...barbershop,
                              whatsapp: e.target.value,
                            })
                          }
                          placeholder="(11) 99999-9999"
                        />
                      </FormField>
                      <FormField label="E-mail">
                        <Input
                          value={barbershop.email}
                          onChange={(e: any) =>
                            setBarbershop({
                              ...barbershop,
                              email: e.target.value,
                            })
                          }
                          placeholder="contato@barbearia.com"
                          type="email"
                        />
                      </FormField>
                      <FormField label="Instagram">
                        <Input
                          value={barbershop.instagram}
                          onChange={(e: any) =>
                            setBarbershop({
                              ...barbershop,
                              instagram: e.target.value,
                            })
                          }
                          placeholder="@barbeariavenust"
                        />
                      </FormField>
                      <FormField label="URL Pública">
                        <div className="flex items-center gap-[8px]">
                          <Input value={barbershop.website} disabled />
                          <button
                            onClick={handleCopyUrl}
                            className="p-[10px] bg-[#363a3d] hover:bg-[#32f1b4] hover:text-black rounded-[8px] text-[#9b9c9e] transition-colors"
                            title="Copiar URL"
                          >
                            <Copy className="size-[16px]" />
                          </button>
                          <button
                            className="p-[10px] bg-[#363a3d] hover:bg-[#32f1b4] hover:text-black rounded-[8px] text-[#9b9c9e] transition-colors"
                            title="Abrir URL"
                          >
                            <ExternalLink className="size-[16px]" />
                          </button>
                        </div>
                      </FormField>
                    </div>
                    <FormField label="Endereço">
                      <Input
                        value={barbershop.address}
                        onChange={(e: any) =>
                          setBarbershop({
                            ...barbershop,
                            address: e.target.value,
                          })
                        }
                        placeholder="Rua, número - Bairro"
                      />
                    </FormField>
                    <FormField label="Descrição">
                      <Textarea
                        value={barbershop.description}
                        onChange={(e: any) =>
                          setBarbershop({
                            ...barbershop,
                            description: e.target.value,
                          })
                        }
                        placeholder="Descreva sua barbearia..."
                      />
                    </FormField>
                    <button
                      onClick={handleSave}
                      className="bg-[#32f1b4] hover:bg-[#2cd9a0] rounded-[8px] px-[16px] py-[10px] text-black text-[14px] font-semibold transition-colors flex items-center gap-[8px]"
                    >
                      <Save className="size-[16px]" />
                      Salvar Alterações
                    </button>
                  </SettingsCard>
                </div>
              )}

              {/* Assinatura */}
              {activeTab === "assinatura" && (
                <div className="space-y-[24px]">
                  <SettingsCard
                    title="Plano Atual"
                    description="Informações sobre sua assinatura"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] mb-[20px]">
                      <div>
                        <div className="text-[#9b9c9e] text-[12px] mb-[4px]">
                          Plano
                        </div>
                        <div className="text-white text-[16px] font-semibold">
                          {subscriptionData.plan}
                        </div>
                      </div>
                      <div>
                        <div className="text-[#9b9c9e] text-[12px] mb-[4px]">
                          Status
                        </div>
                        <div className="text-green-400 text-[16px] font-semibold">
                          {subscriptionData.status}
                        </div>
                      </div>
                      <div>
                        <div className="text-[#9b9c9e] text-[12px] mb-[4px]">
                          Próxima Cobrança
                        </div>
                        <div className="text-white text-[16px] font-semibold">
                          {subscriptionData.nextBilling}
                        </div>
                      </div>
                      <div>
                        <div className="text-[#9b9c9e] text-[12px] mb-[4px]">
                          Valor
                        </div>
                        <div className="text-white text-[16px] font-semibold">
                          {subscriptionData.amount}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-[12px]">
                      <button className="bg-[#32f1b4] hover:bg-[#2cd9a0] rounded-[8px] px-[16px] py-[10px] text-black text-[14px] font-semibold transition-colors">
                        Alterar Plano
                      </button>
                      <button className="bg-[#363a3d] hover:bg-[#4a4f54] rounded-[8px] px-[16px] py-[10px] text-[#9b9c9e] text-[14px] font-medium transition-colors">
                        Cancelar Assinatura
                      </button>
                    </div>
                  </SettingsCard>

                  <SettingsCard
                    title="Método de Pagamento"
                    description="Gerencie seu método de pagamento"
                  >
                    <div className="flex items-center justify-between p-[16px] bg-[#0d0f10] rounded-[8px] border border-[#363a3d]">
                      <div className="flex items-center gap-[12px]">
                        <CreditCard className="size-[20px] text-[#9b9c9e]" />
                        <div>
                          <div className="text-white text-[14px] font-medium">
                            {subscriptionData.paymentMethod}
                          </div>
                          <div className="text-[#9b9c9e] text-[12px]">
                            Expira em 12/2027
                          </div>
                        </div>
                      </div>
                      <button className="text-[#32f1b4] hover:text-[#2cd9a0] text-[14px] font-medium transition-colors">
                        Alterar
                      </button>
                    </div>
                  </SettingsCard>

                  <SettingsCard
                    title="Histórico de Faturas"
                    description="Visualize e baixe suas faturas"
                  >
                    <div className="space-y-[8px]">
                      {subscriptionData.invoices.map((invoice) => (
                        <div
                          key={invoice.id}
                          className="flex items-center justify-between p-[16px] bg-[#0d0f10] rounded-[8px] border border-[#363a3d]"
                        >
                          <div className="flex items-center gap-[12px]">
                            <FileText className="size-[16px] text-[#9b9c9e]" />
                            <div>
                              <div className="text-white text-[14px] font-medium">
                                {invoice.date}
                              </div>
                              <div className="text-[#9b9c9e] text-[12px]">
                                {invoice.amount} • {invoice.status}
                              </div>
                            </div>
                          </div>
                          <button className="p-[8px] text-[#9b9c9e] hover:text-white hover:bg-[#363a3d] rounded-[6px] transition-colors">
                            <Download className="size-[16px]" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </SettingsCard>
                </div>
              )}

              {/* Integrações */}
              {activeTab === "integracoes" && (
                <div className="space-y-[24px]">
                  <SettingsCard
                    title="WhatsApp"
                    description="Configure a integração com WhatsApp"
                  >
                    <div className="space-y-[16px]">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white text-[14px] font-medium">
                            Integração WhatsApp
                          </div>
                          <div className="text-[#9b9c9e] text-[12px]">
                            Envie mensagens automáticas via WhatsApp
                          </div>
                        </div>
                        <Toggle
                          enabled={integrations.whatsapp.enabled}
                          onChange={(enabled: boolean) =>
                            setIntegrations({
                              ...integrations,
                              whatsapp: { ...integrations.whatsapp, enabled },
                            })
                          }
                        />
                      </div>

                      {integrations.whatsapp.enabled && (
                        <>
                          <FormField label="Número do WhatsApp">
                            <Input
                              value={integrations.whatsapp.phone}
                              onChange={(e: any) =>
                                setIntegrations({
                                  ...integrations,
                                  whatsapp: {
                                    ...integrations.whatsapp,
                                    phone: e.target.value,
                                  },
                                })
                              }
                              placeholder="(11) 99999-9999"
                            />
                          </FormField>

                          <div className="space-y-[12px]">
                            <div className="text-white text-[14px] font-medium">
                              Templates de Mensagem
                            </div>

                            <FormField label="Confirmação de Agendamento">
                              <Textarea
                                value={
                                  integrations.whatsapp.templates.confirmation
                                }
                                onChange={(e: any) =>
                                  setIntegrations({
                                    ...integrations,
                                    whatsapp: {
                                      ...integrations.whatsapp,
                                      templates: {
                                        ...integrations.whatsapp.templates,
                                        confirmation: e.target.value,
                                      },
                                    },
                                  })
                                }
                                placeholder="Template de confirmação..."
                              />
                            </FormField>

                            <FormField label="Lembrete">
                              <Textarea
                                value={integrations.whatsapp.templates.reminder}
                                onChange={(e: any) =>
                                  setIntegrations({
                                    ...integrations,
                                    whatsapp: {
                                      ...integrations.whatsapp,
                                      templates: {
                                        ...integrations.whatsapp.templates,
                                        reminder: e.target.value,
                                      },
                                    },
                                  })
                                }
                                placeholder="Template de lembrete..."
                              />
                            </FormField>

                            <FormField label="Cancelamento">
                              <Textarea
                                value={
                                  integrations.whatsapp.templates.cancellation
                                }
                                onChange={(e: any) =>
                                  setIntegrations({
                                    ...integrations,
                                    whatsapp: {
                                      ...integrations.whatsapp,
                                      templates: {
                                        ...integrations.whatsapp.templates,
                                        cancellation: e.target.value,
                                      },
                                    },
                                  })
                                }
                                placeholder="Template de cancelamento..."
                              />
                            </FormField>
                          </div>
                        </>
                      )}
                    </div>
                    <button
                      onClick={handleSave}
                      className="bg-[#32f1b4] hover:bg-[#2cd9a0] rounded-[8px] px-[16px] py-[10px] text-black text-[14px] font-semibold transition-colors flex items-center gap-[8px]"
                    >
                      <Save className="size-[16px]" />
                      Salvar Configurações
                    </button>
                  </SettingsCard>
                </div>
              )}

              {/* Notificações */}
              {activeTab === "notificacoes" && (
                <div className="space-y-[24px]">
                  <SettingsCard
                    title="Preferências de Notificação"
                    description="Configure como e quando receber notificações"
                  >
                    <div className="space-y-[20px]">
                      <div>
                        <div className="text-white text-[16px] font-medium mb-[12px]">
                          WhatsApp
                        </div>
                        <div className="space-y-[12px]">
                          {Object.entries(notifications.whatsapp).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="flex items-center justify-between"
                              >
                                <div className="text-[#9b9c9e] text-[14px]">
                                  {key === "newBooking" && "Novos agendamentos"}
                                  {key === "cancellation" && "Cancelamentos"}
                                  {key === "reminder" && "Lembretes"}
                                  {key === "review" && "Novas avaliações"}
                                </div>
                                <Toggle
                                  enabled={value}
                                  onChange={(enabled: boolean) =>
                                    setNotifications({
                                      ...notifications,
                                      whatsapp: {
                                        ...notifications.whatsapp,
                                        [key]: enabled,
                                      },
                                    })
                                  }
                                />
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="text-white text-[16px] font-medium mb-[12px]">
                          E-mail
                        </div>
                        <div className="space-y-[12px]">
                          {Object.entries(notifications.email).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="flex items-center justify-between"
                              >
                                <div className="text-[#9b9c9e] text-[14px]">
                                  {key === "newBooking" && "Novos agendamentos"}
                                  {key === "cancellation" && "Cancelamentos"}
                                  {key === "reminder" && "Lembretes"}
                                  {key === "review" && "Novas avaliações"}
                                </div>
                                <Toggle
                                  enabled={value}
                                  onChange={(enabled: boolean) =>
                                    setNotifications({
                                      ...notifications,
                                      email: {
                                        ...notifications.email,
                                        [key]: enabled,
                                      },
                                    })
                                  }
                                />
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </SettingsCard>

                  <SettingsCard
                    title="Horário de Envio"
                    description="Configure o horário para envio de notificações"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                      <FormField label="Início">
                        <Input
                          type="time"
                          value={notifications.schedule.start}
                          onChange={(e: any) =>
                            setNotifications({
                              ...notifications,
                              schedule: {
                                ...notifications.schedule,
                                start: e.target.value,
                              },
                            })
                          }
                        />
                      </FormField>
                      <FormField label="Fim">
                        <Input
                          type="time"
                          value={notifications.schedule.end}
                          onChange={(e: any) =>
                            setNotifications({
                              ...notifications,
                              schedule: {
                                ...notifications.schedule,
                                end: e.target.value,
                              },
                            })
                          }
                        />
                      </FormField>
                    </div>
                    <button
                      onClick={handleSave}
                      className="bg-[#32f1b4] hover:bg-[#2cd9a0] rounded-[8px] px-[16px] py-[10px] text-black text-[14px] font-semibold transition-colors flex items-center gap-[8px]"
                    >
                      <Save className="size-[16px]" />
                      Salvar Configurações
                    </button>
                  </SettingsCard>
                </div>
              )}

              {/* Conta */}
              {activeTab === "conta" && (
                <div className="space-y-[24px]">
                  <SettingsCard
                    title="Informações da Conta"
                    description="Gerencie suas informações pessoais"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                      <FormField label="Nome Completo">
                        <Input
                          value={account.name}
                          onChange={(e: any) =>
                            setAccount({ ...account, name: e.target.value })
                          }
                          placeholder="Seu nome completo"
                        />
                      </FormField>
                      <FormField label="E-mail">
                        <Input
                          value={account.email}
                          onChange={(e: any) =>
                            setAccount({ ...account, email: e.target.value })
                          }
                          placeholder="seu@email.com"
                          type="email"
                        />
                      </FormField>
                      <FormField label="Telefone">
                        <Input
                          value={account.phone}
                          onChange={(e: any) =>
                            setAccount({ ...account, phone: e.target.value })
                          }
                          placeholder="(11) 99999-9999"
                        />
                      </FormField>
                      <FormField label="Função">
                        <Input value={account.role} disabled />
                      </FormField>
                    </div>
                    <div className="text-[#9b9c9e] text-[12px]">
                      Último acesso: {account.lastLogin}
                    </div>
                    <button
                      onClick={handleSave}
                      className="bg-[#32f1b4] hover:bg-[#2cd9a0] rounded-[8px] px-[16px] py-[10px] text-black text-[14px] font-semibold transition-colors flex items-center gap-[8px]"
                    >
                      <Save className="size-[16px]" />
                      Salvar Alterações
                    </button>
                  </SettingsCard>

                  <SettingsCard
                    title="Alterar Senha"
                    description="Mantenha sua conta segura"
                  >
                    <div className="space-y-[16px]">
                      <FormField label="Nova Senha">
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e: any) =>
                              setNewPassword(e.target.value)
                            }
                            placeholder="Digite sua nova senha"
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-[12px] top-[50%] translate-y-[-50%] text-[#9b9c9e] hover:text-white"
                          >
                            {showPassword ? (
                              <EyeOff className="size-[16px]" />
                            ) : (
                              <Eye className="size-[16px]" />
                            )}
                          </button>
                        </div>
                      </FormField>
                      <FormField label="Confirmar Senha">
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e: any) =>
                            setConfirmPassword(e.target.value)
                          }
                          placeholder="Confirme sua nova senha"
                        />
                      </FormField>
                    </div>
                    <button
                      className="bg-[#32f1b4] hover:bg-[#2cd9a0] rounded-[8px] px-[16px] py-[10px] text-black text-[14px] font-semibold transition-colors flex items-center gap-[8px]"
                      disabled={!newPassword || newPassword !== confirmPassword}
                    >
                      <Lock className="size-[16px]" />
                      Alterar Senha
                    </button>
                  </SettingsCard>
                </div>
              )}

              {/* Políticas */}
              {activeTab === "politicas" && (
                <div className="space-y-[24px]">
                  <SettingsCard
                    title="Política de Cancelamento"
                    description="Configure as regras para cancelamento de agendamentos"
                  >
                    <div className="space-y-[16px]">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white text-[14px] font-medium">
                            Permitir Cancelamento
                          </div>
                          <div className="text-[#9b9c9e] text-[12px]">
                            Clientes podem cancelar agendamentos
                          </div>
                        </div>
                        <Toggle
                          enabled={policies.cancellation.enabled}
                          onChange={(enabled: boolean) =>
                            setPolicies({
                              ...policies,
                              cancellation: {
                                ...policies.cancellation,
                                enabled,
                              },
                            })
                          }
                        />
                      </div>

                      {policies.cancellation.enabled && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                          <FormField label="Antecedência Mínima (horas)">
                            <Input
                              type="number"
                              value={policies.cancellation.hours}
                              onChange={(e: any) =>
                                setPolicies({
                                  ...policies,
                                  cancellation: {
                                    ...policies.cancellation,
                                    hours: parseInt(e.target.value),
                                  },
                                })
                              }
                            />
                          </FormField>
                          <FormField label="Taxa de Cancelamento (%)">
                            <Input
                              type="number"
                              value={policies.cancellation.penalty}
                              onChange={(e: any) =>
                                setPolicies({
                                  ...policies,
                                  cancellation: {
                                    ...policies.cancellation,
                                    penalty: parseInt(e.target.value),
                                  },
                                })
                              }
                            />
                          </FormField>
                        </div>
                      )}
                    </div>
                  </SettingsCard>

                  <SettingsCard
                    title="Política de Atraso"
                    description="Configure as regras para clientes atrasados"
                  >
                    <div className="space-y-[16px]">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white text-[14px] font-medium">
                            Controle de Atraso
                          </div>
                          <div className="text-[#9b9c9e] text-[12px]">
                            Ações automáticas para atrasos
                          </div>
                        </div>
                        <Toggle
                          enabled={policies.delay.enabled}
                          onChange={(enabled: boolean) =>
                            setPolicies({
                              ...policies,
                              delay: { ...policies.delay, enabled },
                            })
                          }
                        />
                      </div>

                      {policies.delay.enabled && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                          <FormField label="Tolerância (minutos)">
                            <Input
                              type="number"
                              value={policies.delay.minutes}
                              onChange={(e: any) =>
                                setPolicies({
                                  ...policies,
                                  delay: {
                                    ...policies.delay,
                                    minutes: parseInt(e.target.value),
                                  },
                                })
                              }
                            />
                          </FormField>
                          <FormField label="Ação">
                            <select
                              value={policies.delay.action}
                              onChange={(e: any) =>
                                setPolicies({
                                  ...policies,
                                  delay: {
                                    ...policies.delay,
                                    action: e.target.value,
                                  },
                                })
                              }
                              className="w-full bg-[#0d0f10] border border-[#363a3d] rounded-[8px] px-[12px] py-[10px] text-white text-[14px] outline-none focus:border-[#32f1b4]"
                            >
                              <option value="cancel">
                                Cancelar agendamento
                              </option>
                              <option value="reschedule">Reagendar</option>
                              <option value="wait">Aguardar na fila</option>
                            </select>
                          </FormField>
                        </div>
                      )}
                    </div>
                  </SettingsCard>

                  <SettingsCard
                    title="Política de No-Show"
                    description="Configure as regras para clientes que não comparecem"
                  >
                    <div className="space-y-[16px]">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white text-[14px] font-medium">
                            Controle de No-Show
                          </div>
                          <div className="text-[#9b9c9e] text-[12px]">
                            Ações para clientes que não comparecem
                          </div>
                        </div>
                        <Toggle
                          enabled={policies.noShow.enabled}
                          onChange={(enabled: boolean) =>
                            setPolicies({
                              ...policies,
                              noShow: { ...policies.noShow, enabled },
                            })
                          }
                        />
                      </div>

                      {policies.noShow.enabled && (
                        <div className="space-y-[16px]">
                          <FormField label="Taxa de No-Show (%)">
                            <Input
                              type="number"
                              value={policies.noShow.penalty}
                              onChange={(e: any) =>
                                setPolicies({
                                  ...policies,
                                  noShow: {
                                    ...policies.noShow,
                                    penalty: parseInt(e.target.value),
                                  },
                                })
                              }
                            />
                          </FormField>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-white text-[14px] font-medium">
                                Bloquear Cliente
                              </div>
                              <div className="text-[#9b9c9e] text-[12px]">
                                Impedir novos agendamentos temporariamente
                              </div>
                            </div>
                            <Toggle
                              enabled={policies.noShow.block}
                              onChange={(block: boolean) =>
                                setPolicies({
                                  ...policies,
                                  noShow: { ...policies.noShow, block },
                                })
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={handleSave}
                      className="bg-[#32f1b4] hover:bg-[#2cd9a0] rounded-[8px] px-[16px] py-[10px] text-black text-[14px] font-semibold transition-colors flex items-center gap-[8px]"
                    >
                      <Save className="size-[16px]" />
                      Salvar Políticas
                    </button>
                  </SettingsCard>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}