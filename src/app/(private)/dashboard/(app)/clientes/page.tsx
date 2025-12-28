"use client";

import {
  Calendar,
  Edit,
  Filter,
  History,
  Mail,
  MessageCircle,
  Phone,
  Plus,
  Search,
  Star,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";

type Appointment = {
  id: number;
  date: string;
  time: string;
  service: string;
  barber: string;
  price: number;
  status: "completed" | "pending";
};

type Client = {
  id: number;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
  lastVisit: string;
  totalVisits: number;
  totalSpent: number;
  notes: string;
  appointments: Appointment[];
};

type ClientCardProps = {
  client: Client;
  onViewDetails: (client: Client) => void;
};

type ClientDetailsModalProps = {
  client: Client | null;
  onClose: () => void;
};

const clients: Client[] = [
  {
    id: 1,
    name: "João Silva",
    phone: "(11) 99999-9999",
    email: "joao.silva@email.com",
    createdAt: "2024-01-10",
    lastVisit: "2024-01-15",
    totalVisits: 12,
    totalSpent: 540,
    notes: "Cliente fiel, sempre pontual",
    appointments: [
      {
        id: 1,
        date: "2024-01-15",
        time: "09:00",
        service: "Corte + Barba",
        barber: "Pedro Santos",
        price: 45,
        status: "completed",
      },
      {
        id: 2,
        date: "2024-01-08",
        time: "14:00",
        service: "Corte de Cabelo",
        barber: "João Silva",
        price: 25,
        status: "completed",
      },
    ],
  },
  {
    id: 2,
    name: "Carlos Mendes",
    phone: "(11) 88888-8888",
    email: "carlos.mendes@email.com",
    createdAt: "2024-01-05",
    lastVisit: "2024-01-12",
    totalVisits: 8,
    totalSpent: 320,
    notes: "Prefere cortes mais conservadores",
    appointments: [
      {
        id: 3,
        date: "2024-01-12",
        time: "10:00",
        service: "Corte de Cabelo",
        barber: "Pedro Santos",
        price: 25,
        status: "completed",
      },
    ],
  },
  {
    id: 3,
    name: "Rafael Costa",
    phone: "(11) 77777-7777",
    email: "rafael.costa@email.com",
    createdAt: "2024-01-01",
    lastVisit: "2024-01-14",
    totalVisits: 15,
    totalSpent: 675,
    notes: "Alérgico a produtos com álcool",
    appointments: [
      {
        id: 4,
        date: "2024-01-14",
        time: "16:00",
        service: "Barba",
        barber: "João Silva",
        price: 20,
        status: "completed",
      },
    ],
  },
];

function ClientCard({ client, onViewDetails }: ClientCardProps) {
  const handleWhatsApp = () => {
    const phone = client.phone.replace(/\D/g, "");
    const message = `Olá ${client.name}! Como você está? Gostaria de agendar um novo horário na nossa barbearia?`;
    window.open(
      `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="bg-[#1a1d21] relative rounded-[12px] p-[20px] border border-[#363a3d] hover:border-[#32f1b4]/30 transition-colors">
      <div className="flex items-start justify-between mb-[16px]">
        <div className="flex items-center gap-[16px]">
          <div className="bg-[#32f1b4] rounded-full size-[48px] flex items-center justify-center">
            <span className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-black text-[18px]">
              {client.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[16px] mb-[4px]">
              {client.name}
            </div>
            <div className="flex items-center gap-[16px] text-[#9b9c9e] text-[12px]">
              <span className="flex items-center gap-[4px]">
                <Phone className="size-[12px]" />
                {client.phone}
              </span>
              <span className="flex items-center gap-[4px]">
                <Mail className="size-[12px]" />
                {client.email}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[8px]">
          <button
            type="button"
            onClick={handleWhatsApp}
            className="bg-green-500 hover:bg-green-600 rounded-[6px] p-[8px] transition-colors"
            title="Enviar mensagem no WhatsApp"
          >
            <MessageCircle className="size-[16px] text-white" />
          </button>
          <button
            type="button"
            className="text-[#9b9c9e] hover:text-white transition-colors p-[8px]"
          >
            <Edit className="size-[16px]" />
          </button>
          <button
            type="button"
            className="text-[#9b9c9e] hover:text-red-400 transition-colors p-[8px]"
          >
            <Trash2 className="size-[16px]" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-[16px] mb-[16px]">
        <div className="text-center">
          <div className="text-[#32f1b4] text-[20px] font-semibold">
            {client.totalVisits}
          </div>
          <div className="text-[#9b9c9e] text-[12px]">Visitas</div>
        </div>
        <div className="text-center">
          <div className="text-[#32f1b4] text-[20px] font-semibold">
            R$ {client.totalSpent}
          </div>
          <div className="text-[#9b9c9e] text-[12px]">Total Gasto</div>
        </div>
        <div className="text-center">
          <div className="text-[#32f1b4] text-[20px] font-semibold">
            {new Date(client.lastVisit).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
            })}
          </div>
          <div className="text-[#9b9c9e] text-[12px]">Última Visita</div>
        </div>
      </div>

      {client.notes && (
        <div className="bg-[#0d0f10] rounded-[8px] p-[12px] mb-[16px]">
          <div className="text-[#9b9c9e] text-[12px] italic">
            "{client.notes}"
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => onViewDetails(client)}
        className="w-full bg-[#363a3d] hover:bg-[#32f1b4] hover:text-black rounded-[8px] py-[8px] text-[#9b9c9e] hover:text-black text-[14px] font-medium transition-colors"
      >
        Ver Histórico
      </button>
    </div>
  );
}

function ClientDetailsModal({ client, onClose }: ClientDetailsModalProps) {
  if (!client) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[24px]">
      <div className="bg-[#1a1d21] rounded-[12px] border border-[#363a3d] w-full max-w-[800px] max-h-[80vh] overflow-auto">
        <div className="p-[24px] border-b border-[#363a3d]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[16px]">
              <div className="bg-[#32f1b4] rounded-full size-[48px] flex items-center justify-center">
                <span className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-black text-[18px]">
                  {client.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[20px]">
                  {client.name}
                </div>
                <div className="text-[#9b9c9e] text-[14px]">
                  Cliente desde{" "}
                  {new Date(client.createdAt).toLocaleDateString("pt-BR")}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-[#9b9c9e] hover:text-white transition-colors p-[8px]"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-[24px]">
          <div className="grid grid-cols-2 gap-[24px] mb-[32px]">
            <div>
              <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[16px] mb-[16px]">
                Informações de Contato
              </div>
              <div className="space-y-[12px]">
                <div className="flex items-center gap-[12px]">
                  <Phone className="size-[16px] text-[#9b9c9e]" />
                  <span className="text-white">{client.phone}</span>
                </div>
                <div className="flex items-center gap-[12px]">
                  <Mail className="size-[16px] text-[#9b9c9e]" />
                  <span className="text-white">{client.email}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[16px] mb-[16px]">
                Estatísticas
              </div>
              <div className="grid grid-cols-2 gap-[16px]">
                <div className="text-center bg-[#0d0f10] rounded-[8px] p-[12px]">
                  <div className="text-[#32f1b4] text-[24px] font-semibold">
                    {client.totalVisits}
                  </div>
                  <div className="text-[#9b9c9e] text-[12px]">
                    Total de Visitas
                  </div>
                </div>
                <div className="text-center bg-[#0d0f10] rounded-[8px] p-[12px]">
                  <div className="text-[#32f1b4] text-[24px] font-semibold">
                    R$ {client.totalSpent}
                  </div>
                  <div className="text-[#9b9c9e] text-[12px]">Total Gasto</div>
                </div>
              </div>
            </div>
          </div>

          {client.notes && (
            <div className="mb-[32px]">
              <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[16px] mb-[16px]">
                Observações
              </div>
              <div className="bg-[#0d0f10] rounded-[8px] p-[16px]">
                <div className="text-[#9b9c9e] italic">"{client.notes}"</div>
              </div>
            </div>
          )}

          <div>
            <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[16px] mb-[16px]">
              Histórico de Agendamentos
            </div>
            <div className="space-y-[12px]">
              {client.appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-[#0d0f10] rounded-[8px] p-[16px] flex items-center justify-between"
                >
                  <div className="flex items-center gap-[16px]">
                    <div className="bg-[#363a3d] rounded-[8px] size-[40px] flex items-center justify-center">
                      <Calendar className="size-[18px] text-[#9b9c9e]" />
                    </div>
                    <div>
                      <div className="text-white font-medium">
                        {appointment.service}
                      </div>
                      <div className="text-[#9b9c9e] text-[12px]">
                        {new Date(appointment.date).toLocaleDateString("pt-BR")}{" "}
                        às {appointment.time} • {appointment.barber}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#32f1b4] font-semibold">
                      R$ {appointment.price}
                    </div>
                    <div className="text-[#9b9c9e] text-[12px]">
                      {appointment.status === "completed"
                        ? "Concluído"
                        : "Pendente"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex-1 flex flex-col bg-[#0d0f10] overflow-auto">
      {/* Header */}
      <div className="border-b border-[#363a3d] px-[32px] py-[24px]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-[8px]">
            <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[24px]">
              Clientes
            </div>
            <div className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[14px] tracking-[0.15px]">
              Gerencie os clientes da sua barbearia
            </div>
          </div>
          <button
            type="button"
            className="bg-[#32f1b4] h-[40px] px-[20px] rounded-[8px] flex items-center gap-[8px] hover:bg-[#2cd9a0] transition-colors"
          >
            <Plus className="size-[16px] text-black" />
            <span className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-black text-[14px]">
              Novo Cliente
            </span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-[32px]">
        <div className="flex flex-col gap-[24px]">
          {/* Filters */}
          <div className="flex items-center gap-[16px]">
            <div className="bg-[#1a1d21] relative rounded-[8px] h-[40px] w-[320px] border border-[#363a3d]">
              <div className="flex items-center h-full px-[16px] gap-[12px]">
                <Search className="size-[16px] text-[#9b9c9e]" />
                <input
                  type="text"
                  placeholder="Buscar por nome, telefone ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent flex-1 text-white text-[14px] outline-none"
                />
              </div>
            </div>
            <button
              type="button"
              className="bg-[#1a1d21] h-[40px] px-[16px] rounded-[8px] flex items-center gap-[8px] border border-[#363a3d] hover:bg-[#1f2226] transition-colors"
            >
              <Filter className="size-[16px] text-[#9b9c9e]" />
              <span className="text-[#9b9c9e] text-[14px]">Filtros</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-[24px]">
            <div className="bg-[#1a1d21] rounded-[12px] p-[20px] border border-[#363a3d]">
              <div className="flex items-center gap-[12px] mb-[8px]">
                <Users className="size-[20px] text-[#32f1b4]" />
                <span className="text-[#9b9c9e] text-[14px]">
                  Total de Clientes
                </span>
              </div>
              <div className="text-white text-[24px] font-semibold">
                {clients.length}
              </div>
            </div>
            <div className="bg-[#1a1d21] rounded-[12px] p-[20px] border border-[#363a3d]">
              <div className="flex items-center gap-[12px] mb-[8px]">
                <Calendar className="size-[20px] text-[#32f1b4]" />
                <span className="text-[#9b9c9e] text-[14px]">
                  Novos este Mês
                </span>
              </div>
              <div className="text-white text-[24px] font-semibold">8</div>
            </div>
            <div className="bg-[#1a1d21] rounded-[12px] p-[20px] border border-[#363a3d]">
              <div className="flex items-center gap-[12px] mb-[8px]">
                <Star className="size-[20px] text-[#32f1b4]" />
                <span className="text-[#9b9c9e] text-[14px]">
                  Clientes Fiéis
                </span>
              </div>
              <div className="text-white text-[24px] font-semibold">12</div>
            </div>
            <div className="bg-[#1a1d21] rounded-[12px] p-[20px] border border-[#363a3d]">
              <div className="flex items-center gap-[12px] mb-[8px]">
                <History className="size-[20px] text-[#32f1b4]" />
                <span className="text-[#9b9c9e] text-[14px]">Ticket Médio</span>
              </div>
              <div className="text-white text-[24px] font-semibold">R$ 35</div>
            </div>
          </div>

          {/* Clients Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
            {filteredClients.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                onViewDetails={setSelectedClient}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Client Details Modal */}
      {selectedClient && (
        <ClientDetailsModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}
    </div>
  );
}
