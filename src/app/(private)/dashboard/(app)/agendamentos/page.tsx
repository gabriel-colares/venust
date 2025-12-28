"use client";

import {
  Bell,
  Calendar,
  CalendarPlus,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Eye,
  Filter,
  MessageCircle,
  MoreVertical,
  Search,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Types
type AppointmentStatus =
  | "confirmed"
  | "pending"
  | "completed"
  | "cancelled"
  | "no-show";

interface Appointment {
  id: number;
  date: string;
  time: string;
  client: string;
  phone: string;
  service: string;
  duration: number;
  price: number;
  barber: string;
  barberId: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
}

interface Barber {
  id: string;
  name: string;
}

// Mock data
const barbers: Barber[] = [
  { id: "all", name: "Todos os profissionais" },
  { id: "1", name: "Pedro Santos" },
  { id: "2", name: "João Silva" },
  { id: "3", name: "Carlos Mendes" },
];

const mockAppointments: Appointment[] = [
  {
    id: 1,
    date: "2025-10-05",
    time: "09:00",
    client: "João Silva",
    phone: "+5511987654321",
    service: "Corte + Barba",
    duration: 45,
    price: 75,
    barber: "Pedro Santos",
    barberId: "1",
    status: "confirmed",
    createdAt: "2025-10-01T10:30:00",
  },
  {
    id: 2,
    date: "2025-10-05",
    time: "10:00",
    client: "Carlos Mendes",
    phone: "+5511987654322",
    service: "Corte de Cabelo",
    duration: 30,
    price: 50,
    barber: "João Silva",
    barberId: "2",
    status: "confirmed",
    createdAt: "2025-10-02T14:20:00",
  },
  {
    id: 3,
    date: "2025-10-05",
    time: "11:00",
    client: "Rafael Costa",
    phone: "+5511987654323",
    service: "Barba",
    duration: 20,
    price: 35,
    barber: "Pedro Santos",
    barberId: "1",
    status: "pending",
    notes: "Cliente preferencial",
    createdAt: "2025-10-03T09:15:00",
  },
  {
    id: 4,
    date: "2025-10-05",
    time: "14:00",
    client: "Lucas Oliveira",
    phone: "+5511987654324",
    service: "Corte + Barba",
    duration: 45,
    price: 75,
    barber: "João Silva",
    barberId: "2",
    status: "confirmed",
    createdAt: "2025-10-03T16:45:00",
  },
  {
    id: 5,
    date: "2025-10-05",
    time: "15:00",
    client: "Bruno Alves",
    phone: "+5511987654325",
    service: "Corte de Cabelo",
    duration: 30,
    price: 50,
    barber: "Pedro Santos",
    barberId: "1",
    status: "pending",
    createdAt: "2025-10-04T11:00:00",
  },
  {
    id: 6,
    date: "2025-10-06",
    time: "09:00",
    client: "Marcelo Dias",
    phone: "+5511987654326",
    service: "Barba",
    duration: 20,
    price: 35,
    barber: "Carlos Mendes",
    barberId: "3",
    status: "confirmed",
    createdAt: "2025-10-04T15:30:00",
  },
  {
    id: 7,
    date: "2025-10-04",
    time: "16:00",
    client: "André Souza",
    phone: "+5511987654327",
    service: "Corte + Barba",
    duration: 45,
    price: 75,
    barber: "Pedro Santos",
    barberId: "1",
    status: "completed",
    createdAt: "2025-10-02T10:00:00",
  },
  {
    id: 8,
    date: "2025-10-04",
    time: "10:00",
    client: "Fernando Lima",
    phone: "+5511987654328",
    service: "Corte de Cabelo",
    duration: 30,
    price: 50,
    barber: "João Silva",
    barberId: "2",
    status: "no-show",
    createdAt: "2025-10-03T08:20:00",
  },
  {
    id: 9,
    date: "2025-10-03",
    time: "11:00",
    client: "Roberto Martins",
    phone: "+5511987654329",
    service: "Barba",
    duration: 20,
    price: 35,
    barber: "Carlos Mendes",
    barberId: "3",
    status: "cancelled",
    createdAt: "2025-10-01T14:00:00",
  },
];

// function Group() {
//   return (
//     <div className="absolute inset-[14.44%_1.45%_14.4%_1.53%]" data-name="Group">
//       <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 23">
//         <g id="Group">
//           <path d={svgPaths.p1620400} fill="var(--fill-0, white)" id="Vector" opacity="0.2" />
//           <path d={svgPaths.p3e43200} fill="var(--fill-0, white)" id="Vector_2" />
//         </g>
//       </svg>
//     </div>
//   );
// }

function _VenustIcons() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Venust Icons">
      {/* <Group /> */}
    </div>
  );
}

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const configs = {
    confirmed: { bg: "#32f1b415", text: "#32f1b4", label: "Confirmado" },
    pending: { bg: "#ff9f4315", text: "#ff9f43", label: "Pendente" },
    completed: { bg: "#4ecdc415", text: "#4ecdc4", label: "Concluído" },
    cancelled: { bg: "#ff6b6b15", text: "#ff6b6b", label: "Cancelado" },
    "no-show": { bg: "#ff6b6b15", text: "#ff6b6b", label: "Não compareceu" },
  };

  const config = configs[status];

  return (
    <div
      className="inline-flex px-[10px] py-[4px] rounded-[6px]"
      style={{ backgroundColor: config.bg }}
    >
      <span
        className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-[12px] tracking-[0.15px]"
        style={{ color: config.text }}
      >
        {config.label}
      </span>
    </div>
  );
}

function NewAppointmentDialog() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Agendamento criado com sucesso!");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#32f1b4] text-[#0c1132] hover:bg-[#2cd9a0]">
          <CalendarPlus className="size-[18px] mr-[8px]" />
          Novo agendamento
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1a1d21] border-[#363a3d] text-white max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-white text-[20px]">
            Novo Agendamento
          </DialogTitle>
          <DialogDescription className="text-[#9b9c9e]">
            Preencha as informações do novo agendamento
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[20px] mt-[20px]"
        >
          <div className="flex flex-col gap-[8px]">
            <Label className="text-[#9b9c9e]">Cliente</Label>
            <Input
              placeholder="Nome do cliente"
              className="bg-[#0d0f10] border-[#363a3d] text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-[16px]">
            <div className="flex flex-col gap-[8px]">
              <Label className="text-[#9b9c9e]">Data</Label>
              <Input
                type="date"
                className="bg-[#0d0f10] border-[#363a3d] text-white"
                required
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <Label className="text-[#9b9c9e]">Horário</Label>
              <Input
                type="time"
                className="bg-[#0d0f10] border-[#363a3d] text-white"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-[8px]">
            <Label className="text-[#9b9c9e]">Serviço</Label>
            <Select>
              <SelectTrigger className="bg-[#0d0f10] border-[#363a3d] text-white">
                <SelectValue placeholder="Selecione o serviço" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1d21] border-[#363a3d]">
                <SelectItem
                  value="corte-barba"
                  className="text-white focus:bg-[#363a3d]"
                >
                  Corte + Barba
                </SelectItem>
                <SelectItem
                  value="corte"
                  className="text-white focus:bg-[#363a3d]"
                >
                  Corte de Cabelo
                </SelectItem>
                <SelectItem
                  value="barba"
                  className="text-white focus:bg-[#363a3d]"
                >
                  Barba
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-[8px]">
            <Label className="text-[#9b9c9e]">Profissional</Label>
            <Select>
              <SelectTrigger className="bg-[#0d0f10] border-[#363a3d] text-white">
                <SelectValue placeholder="Selecione o profissional" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1d21] border-[#363a3d]">
                {barbers
                  .filter((b) => b.id !== "all")
                  .map((barber) => (
                    <SelectItem
                      key={barber.id}
                      value={barber.id}
                      className="text-white focus:bg-[#363a3d]"
                    >
                      {barber.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-[8px]">
            <Label className="text-[#9b9c9e]">Telefone</Label>
            <Input
              placeholder="(00) 00000-0000"
              className="bg-[#0d0f10] border-[#363a3d] text-white"
              required
            />
          </div>

          <div className="flex gap-[12px] mt-[8px]">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 border-[#363a3d] text-white hover:bg-[#363a3d]"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#32f1b4] text-[#0c1132] hover:bg-[#2cd9a0]"
            >
              Criar agendamento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function MainContent() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(mockAppointments);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedBarber, setSelectedBarber] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAppointments, setSelectedAppointments] = useState<number[]>(
    [],
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter appointments
  const filteredAppointments = appointments.filter((apt) => {
    if (selectedStatus !== "all" && apt.status !== selectedStatus) return false;
    if (selectedBarber !== "all" && apt.barberId !== selectedBarber)
      return false;
    if (
      searchQuery &&
      !apt.client.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAppointments = filteredAppointments.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleStatusChange = (id: number, newStatus: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt)),
    );
    toast.success("Status atualizado!");
  };

  const handleWhatsApp = (phone: string, client: string) => {
    const message = encodeURIComponent(
      `Olá ${client}! Sobre seu agendamento...`,
    );
    window.open(
      `https://wa.me/${phone.replace(/\D/g, "")}?text=${message}`,
      "_blank",
    );
  };

  const handleSelectAll = () => {
    if (selectedAppointments.length === paginatedAppointments.length) {
      setSelectedAppointments([]);
    } else {
      setSelectedAppointments(paginatedAppointments.map((apt) => apt.id));
    }
  };

  const handleSelectAppointment = (id: number) => {
    setSelectedAppointments((prev) =>
      prev.includes(id) ? prev.filter((aptId) => aptId !== id) : [...prev, id],
    );
  };

  const stats = {
    total: filteredAppointments.length,
    confirmed: filteredAppointments.filter((apt) => apt.status === "confirmed")
      .length,
    pending: filteredAppointments.filter((apt) => apt.status === "pending")
      .length,
    completed: filteredAppointments.filter((apt) => apt.status === "completed")
      .length,
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0d0f10] overflow-auto">
      {/* Header */}
      <div className="border-b border-[#363a3d]">
        <div className="px-[32px] py-[24px]">
          <div className="flex items-center justify-between gap-[16px]">
            <div className="flex flex-col gap-[8px]">
              <h1 className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[28px] leading-[1.2]">
                Agendamentos
              </h1>
              <p className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[14px]">
                Gerencie todos os agendamentos da sua barbearia
              </p>
            </div>
            <div className="flex items-center gap-[12px]">
              <Button
                variant="outline"
                className="border-[#363a3d] text-white hover:bg-[#1a1d21]"
              >
                <Download className="size-[18px] mr-[8px]" />
                Exportar
              </Button>
              <NewAppointmentDialog />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-[#363a3d] px-[32px] py-[20px]">
        <div className="grid grid-cols-4 gap-[20px]">
          <div className="flex items-center gap-[12px]">
            <div className="bg-[#32f1b4]/10 rounded-[8px] p-[10px]">
              <Calendar className="size-[20px] text-[#32f1b4]" />
            </div>
            <div>
              <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[24px]">
                {stats.total}
              </div>
              <div className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[13px]">
                Total
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[12px]">
            <div className="bg-[#32f1b4]/10 rounded-[8px] p-[10px]">
              <Check className="size-[20px] text-[#32f1b4]" />
            </div>
            <div>
              <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[24px]">
                {stats.confirmed}
              </div>
              <div className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[13px]">
                Confirmados
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[12px]">
            <div className="bg-[#ff9f43]/10 rounded-[8px] p-[10px]">
              <Clock className="size-[20px] text-[#ff9f43]" />
            </div>
            <div>
              <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[24px]">
                {stats.pending}
              </div>
              <div className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[13px]">
                Pendentes
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[12px]">
            <div className="bg-[#4ecdc4]/10 rounded-[8px] p-[10px]">
              <UserCheck className="size-[20px] text-[#4ecdc4]" />
            </div>
            <div>
              <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[24px]">
                {stats.completed}
              </div>
              <div className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[13px]">
                Concluídos
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-[#363a3d] px-[32px] py-[20px]">
        <div className="flex items-center gap-[16px]">
          <div className="flex-1">
            <div className="bg-[#1a1d21] relative rounded-[8px] h-[40px] max-w-[400px]">
              <div
                aria-hidden="true"
                className="absolute border border-[#363a3d] border-solid inset-[-1px] pointer-events-none rounded-[9px]"
              />
              <div className="flex items-center h-full px-[16px] gap-[12px]">
                <Search className="size-[16px] text-[#9b9c9e]" />
                <input
                  type="text"
                  placeholder="Buscar por cliente..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent flex-1 text-white text-[14px] outline-none font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium tracking-[0.15px] placeholder:text-[#9b9c9e]"
                />
              </div>
            </div>
          </div>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px] bg-[#1a1d21] border-[#363a3d] text-white">
              <Filter className="size-[16px] mr-[8px]" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1d21] border-[#363a3d]">
              <SelectItem value="all" className="text-white focus:bg-[#363a3d]">
                Todos os status
              </SelectItem>
              <SelectItem
                value="confirmed"
                className="text-white focus:bg-[#363a3d]"
              >
                Confirmados
              </SelectItem>
              <SelectItem
                value="pending"
                className="text-white focus:bg-[#363a3d]"
              >
                Pendentes
              </SelectItem>
              <SelectItem
                value="completed"
                className="text-white focus:bg-[#363a3d]"
              >
                Concluídos
              </SelectItem>
              <SelectItem
                value="cancelled"
                className="text-white focus:bg-[#363a3d]"
              >
                Cancelados
              </SelectItem>
              <SelectItem
                value="no-show"
                className="text-white focus:bg-[#363a3d]"
              >
                No-show
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedBarber} onValueChange={setSelectedBarber}>
            <SelectTrigger className="w-[200px] bg-[#1a1d21] border-[#363a3d] text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1d21] border-[#363a3d]">
              {barbers.map((barber) => (
                <SelectItem
                  key={barber.id}
                  value={barber.id}
                  className="text-white focus:bg-[#363a3d]"
                >
                  {barber.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="border-[#363a3d] text-white hover:bg-[#1a1d21]"
          >
            <Bell className="size-[18px]" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 px-[32px] py-[24px]">
        <div className="bg-[#1a1d21] relative rounded-[12px] overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute border border-[#363a3d] border-solid inset-[-1px] pointer-events-none rounded-[13px]"
          />

          {paginatedAppointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-[80px] gap-[16px]">
              <div className="bg-[#363a3d]/30 rounded-full p-[24px]">
                <Calendar className="size-[40px] text-[#9b9c9e]" />
              </div>
              <div className="flex flex-col items-center gap-[8px]">
                <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[18px]">
                  Nenhum agendamento encontrado
                </div>
                <div className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[14px]">
                  Ajuste os filtros ou crie um novo agendamento
                </div>
              </div>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="border-[#363a3d] hover:bg-transparent">
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={
                          selectedAppointments.length ===
                          paginatedAppointments.length
                        }
                        onCheckedChange={handleSelectAll}
                        className="border-[#9b9c9e]"
                      />
                    </TableHead>
                    <TableHead className="text-[#9b9c9e]">Cliente</TableHead>
                    <TableHead className="text-[#9b9c9e]">Data/Hora</TableHead>
                    <TableHead className="text-[#9b9c9e]">Serviço</TableHead>
                    <TableHead className="text-[#9b9c9e]">
                      Profissional
                    </TableHead>
                    <TableHead className="text-[#9b9c9e]">Status</TableHead>
                    <TableHead className="text-[#9b9c9e]">Valor</TableHead>
                    <TableHead className="text-[#9b9c9e] text-right">
                      Ações
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedAppointments.map((appointment) => (
                    <TableRow
                      key={appointment.id}
                      className="border-[#363a3d] hover:bg-[#1f2226]"
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedAppointments.includes(
                            appointment.id,
                          )}
                          onCheckedChange={() =>
                            handleSelectAppointment(appointment.id)
                          }
                          className="border-[#9b9c9e]"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-[4px]">
                          <span className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[14px]">
                            {appointment.client}
                          </span>
                          <span className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[12px]">
                            {appointment.phone}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-[4px]">
                          <span className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-white text-[14px]">
                            {new Date(appointment.date).toLocaleDateString(
                              "pt-BR",
                            )}
                          </span>
                          <span className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[12px]">
                            {appointment.time} ({appointment.duration} min)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-[4px]">
                          <span className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-white text-[14px]">
                            {appointment.service}
                          </span>
                          {appointment.notes && (
                            <span className="font-['Plus_Jakarta_Sans:Regular',_sans-serif] font-normal text-[#686b6e] text-[11px] italic">
                              {appointment.notes}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[14px]">
                          {appointment.barber}
                        </span>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={appointment.status} />
                      </TableCell>
                      <TableCell>
                        <span className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[14px]">
                          R$ {appointment.price}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-[8px]">
                          {appointment.status === "pending" && (
                            <button
                              type="button"
                              onClick={() =>
                                handleStatusChange(appointment.id, "confirmed")
                              }
                              className="p-[8px] hover:bg-[#32f1b4]/10 rounded-[6px] transition-colors"
                              title="Confirmar"
                            >
                              <Check className="size-[16px] text-[#32f1b4]" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              handleWhatsApp(
                                appointment.phone,
                                appointment.client,
                              )
                            }
                            className="p-[8px] hover:bg-[#25D366]/10 rounded-[6px] transition-colors"
                            title="WhatsApp"
                          >
                            <MessageCircle className="size-[16px] text-[#25D366]" />
                          </button>
                          <a
                            href={`/agendamento/${appointment.id}`}
                            className="p-[8px] hover:bg-[#363a3d] rounded-[6px] transition-colors"
                            title="Ver detalhes"
                          >
                            <Eye className="size-[16px] text-[#9b9c9e]" />
                          </a>
                          <button
                            type="button"
                            className="p-[8px] hover:bg-[#363a3d] rounded-[6px] transition-colors"
                            title="Mais opções"
                          >
                            <MoreVertical className="size-[16px] text-[#9b9c9e]" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="border-t border-[#363a3d] px-[24px] py-[16px] flex items-center justify-between">
                  <div className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[14px]">
                    Mostrando {startIndex + 1} a{" "}
                    {Math.min(
                      startIndex + itemsPerPage,
                      filteredAppointments.length,
                    )}{" "}
                    de {filteredAppointments.length} agendamentos
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentPage === 1}
                      className="border-[#363a3d] text-white hover:bg-[#363a3d]"
                    >
                      <ChevronLeft className="size-[16px]" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={
                            currentPage === page
                              ? "bg-[#32f1b4] text-[#0c1132] hover:bg-[#2cd9a0]"
                              : "border-[#363a3d] text-white hover:bg-[#363a3d]"
                          }
                        >
                          {page}
                        </Button>
                      ),
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="border-[#363a3d] text-white hover:bg-[#363a3d]"
                    >
                      <ChevronRight className="size-[16px]" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Agendamentos() {
  return <MainContent />;
}
