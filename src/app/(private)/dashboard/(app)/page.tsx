"use client";

import {
  Calendar,
  Users,
  Scissors,
  Settings,
  TrendingUp,
  CalendarPlus,
  AlertCircle,
  Clock,
  UserX,
  Eye,
  MousePointerClick,
  ExternalLink,
  Bell,
  ChevronDown,
  Search,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const svgPaths = {
  p10d2aa00: "M1.66667 1.66667L6.33333 6.33333M6.33333 1.66667L1.66667 6.33333",
  p13672080:
    "M18 10L12.7071 15.2929C12.3166 15.6834 11.6834 15.6834 11.2929 15.2929L6 10",
  p1620400:
    "M15.525 21.735C13.5365 21.735 10.2504 21.7117 6.46875 19.4528C2.68712 17.1939 1.46324 14.3606 1.07123 12.9142C1.03411 12.7844 1.02293 12.6486 1.03835 12.5145C1.05377 12.3803 1.09547 12.2506 1.16107 12.1326C1.22668 12.0146 1.3149 11.9107 1.42069 11.8268C1.52648 11.7429 1.64777 11.6807 1.77762 11.6438C3.08383 11.3184 4.44636 11.2901 5.76495 11.561C4.77782 8.47149 5.24745 6.07029 5.63558 4.87099C5.7169 4.62375 5.88626 4.41504 6.11145 4.28456C6.33664 4.15407 6.60194 4.11092 6.85687 4.1633C7.83495 4.3716 9.48059 4.91627 11.2039 6.31352C10.6221 7.9036 10.3328 9.58584 10.35 11.2789C10.35 18.8888 15.525 21.735 15.525 21.735ZM29.2723 11.6438C27.9661 11.3184 26.6036 11.2901 25.285 11.561C26.2721 8.47149 25.8025 6.07029 25.4144 4.87099C25.3331 4.62375 25.1637 4.41504 24.9385 4.28456C24.7133 4.15407 24.448 4.11092 24.1931 4.1633C23.2202 4.3716 21.5745 4.91368 19.8513 6.31352C20.4313 7.90393 20.7188 9.58615 20.7 11.2789C20.7 18.8888 15.525 21.735 15.525 21.735C17.5135 21.735 20.7996 21.7117 24.5812 19.4528C28.3628 17.1939 29.5867 14.3632 29.9787 12.9142C30.0159 12.7844 30.027 12.6486 30.0116 12.5145C29.9962 12.3803 29.9545 12.2506 29.8889 12.1326C29.8233 12.0146 29.7351 11.9107 29.6293 11.8268C29.5235 11.7429 29.4022 11.6807 29.2723 11.6438Z",
  p169a7080:
    "M1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8ZM8 4.66667C7.63181 4.66667 7.33333 4.96514 7.33333 5.33333C7.33333 5.70152 7.63181 6 8 6H8.00667C8.37486 6 8.67333 5.70152 8.67333 5.33333C8.67333 4.96514 8.37486 4.66667 8.00667 4.66667H8ZM8.66667 8C8.66667 7.63181 8.36819 7.33333 8 7.33333C7.63181 7.33333 7.33333 7.63181 7.33333 8V10.6667C7.33333 11.0349 7.63181 11.3333 8 11.3333C8.36819 11.3333 8.66667 11.0349 8.66667 10.6667V8Z",
  p3e43200:
    "M30.769 11.5959C30.637 11.3639 30.4601 11.1606 30.2486 10.9978C30.0371 10.835 29.7953 10.7159 29.5373 10.6476C28.6014 10.4066 27.6342 10.3098 26.6691 10.3603C27.1866 7.79225 26.7985 5.76107 26.4026 4.55659C26.2448 4.06181 25.9084 3.64353 25.459 3.3833C25.0095 3.12307 24.4793 3.03954 23.9716 3.14899C22.6552 3.44219 21.4034 3.9736 20.278 4.71701C19.4538 3.03338 18.2538 1.56162 16.7707 0.415293C16.4112 0.145722 15.9741 0 15.5248 0C15.0755 0 14.6383 0.145722 14.2789 0.415293C12.7954 1.56128 11.5953 3.03313 10.7715 4.71701C9.64618 3.9736 8.39438 3.44219 7.07789 3.14899C6.57023 3.03954 6.04 3.12307 5.59057 3.3833C5.14115 3.64353 4.80474 4.06181 4.64694 4.55659C4.25882 5.76107 3.87069 7.79096 4.38043 10.3603C3.41531 10.3098 2.44813 10.4066 1.51219 10.6476C1.2542 10.7159 1.01241 10.835 0.800946 10.9978C0.589477 11.1606 0.412567 11.3639 0.280546 11.5959C0.142381 11.8335 0.052918 12.0962 0.0173779 12.3688C-0.0181622 12.6413 0.000931923 12.9182 0.0735463 13.1833C0.512127 14.8095 1.85892 17.9029 5.9381 20.3403C10.0173 22.7778 13.601 22.77 15.5312 22.77C17.4615 22.77 21.0517 22.77 25.105 20.3403C29.1842 17.9029 30.5309 14.8095 30.9695 13.1833C31.0431 12.9186 31.0633 12.642 31.0288 12.3694C30.9944 12.0969 30.9061 11.8339 30.769 11.5959ZM6.61603 5.19311C6.61757 5.18669 6.62152 5.1811 6.62705 5.17749C6.63258 5.17389 6.63928 5.17253 6.64578 5.1737C7.8496 5.44564 8.98562 5.9593 9.98495 6.68351C9.52993 8.17204 9.30396 9.72112 9.31478 11.2776C9.31478 13.7021 9.80253 15.6764 10.4934 17.2651C9.51123 16.2821 8.66141 15.1752 7.96541 13.9725C5.63407 9.91271 6.11923 6.7275 6.61603 5.19311ZM7.00415 18.564C3.55373 16.5044 2.43464 13.979 2.0698 12.6399C3.02176 12.4056 4.00959 12.3542 4.98073 12.4886C5.30494 13.357 5.7009 14.197 6.16451 14.9997C7.30282 16.9623 8.79413 18.6974 10.5633 20.1178C9.31226 19.7581 8.11393 19.2357 6.99898 18.564H7.00415ZM15.5248 20.493C14.3177 19.5951 11.3848 16.8407 11.3848 11.2776C11.3848 5.78306 14.2802 3.00667 15.5248 2.07C16.7694 3.00926 19.6648 5.78565 19.6648 11.2802C19.6648 16.8407 16.7318 19.5951 15.5248 20.493ZM21.0646 6.68351C22.064 5.95976 23.2 5.44655 24.4038 5.175C24.4103 5.17382 24.417 5.17518 24.4225 5.17879C24.428 5.18239 24.432 5.18798 24.4335 5.1944C24.9303 6.7275 25.4155 9.91271 23.0841 13.9725C22.3887 15.1768 21.5389 16.285 20.5562 17.269C21.247 15.6828 21.7348 13.706 21.7348 11.2815C21.746 9.72371 21.52 8.17329 21.0646 6.68351ZM28.9797 12.6425C28.6214 13.9686 27.5049 16.4992 24.0519 18.564C22.9368 19.2353 21.7385 19.7572 20.4876 20.1165C22.2567 18.6961 23.748 16.961 24.8863 14.9984C25.3499 14.1957 25.7459 13.3557 26.0701 12.4873C27.041 12.3535 28.0284 12.4057 28.9797 12.6412V12.6425Z",
};

// Mock data
const viewsVsImpressionsData = [
  { name: "Jan", visualizacoes: 420, impressoes: 820 },
  { name: "Fev", visualizacoes: 510, impressoes: 1050 },
  { name: "Mar", visualizacoes: 480, impressoes: 920 },
  { name: "Abr", visualizacoes: 620, impressoes: 1180 },
  { name: "Mai", visualizacoes: 590, impressoes: 1100 },
  { name: "Jun", visualizacoes: 710, impressoes: 1420 },
];

const bookingsVsReviewsData = [
  { name: "Jan", agendamentos: 45, avaliacoes: 38 },
  { name: "Fev", agendamentos: 52, avaliacoes: 45 },
  { name: "Mar", agendamentos: 48, avaliacoes: 41 },
  { name: "Abr", agendamentos: 62, avaliacoes: 54 },
  { name: "Mai", agendamentos: 58, avaliacoes: 50 },
  { name: "Jun", agendamentos: 71, avaliacoes: 63 },
];

const topServicesData = [
  { name: "Corte + Barba", value: 45 },
  { name: "Corte de Cabelo", value: 38 },
  { name: "Barba", value: 28 },
  { name: "Pezinho", value: 15 },
  { name: "Sombrancelha", value: 12 },
  { name: "Hidratação", value: 8 },
  { name: "Platinado", value: 6 },
  { name: "Relaxamento", value: 4 },
];

const todayAppointments = [
  {
    id: 1,
    time: "09:00",
    client: "João Silva",
    service: "Corte + Barba",
    status: "confirmed",
  },
  {
    id: 2,
    time: "10:00",
    client: "Carlos Mendes",
    service: "Corte de Cabelo",
    status: "confirmed",
  },
  {
    id: 3,
    time: "11:00",
    client: "Rafael Costa",
    service: "Barba",
    status: "pending",
  },
  {
    id: 4,
    time: "14:00",
    client: "Lucas Oliveira",
    service: "Corte + Barba",
    status: "confirmed",
  },
  {
    id: 5,
    time: "15:00",
    client: "Bruno Alves",
    service: "Corte de Cabelo",
    status: "confirmed",
  },
];

const alerts = [
  {
    id: 1,
    type: "warning" as const,
    message: "3 agendamentos pendentes de confirmação",
    action: "Revisar agendamentos",
    link: "/agendamentos?status=pending",
  },
  {
    id: 2,
    type: "info" as const,
    message: "Feriado próximo: 12 de Outubro",
    action: "Configurar horários",
    link: "/configuracoes/horarios",
  },
  {
    id: 3,
    type: "error" as const,
    message: "Lembretes automáticos desativados",
    action: "Ativar lembretes",
    link: "/configuracoes/notificacoes",
  },
];

function Group() {
  return (
    <div
      className="absolute inset-[14.44%_1.45%_14.4%_1.53%]"
      data-name="Group"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 23"
      >
        <g id="Group">
          <path
            d={svgPaths.p1620400}
            fill="var(--fill-0, white)"
            id="Vector"
            opacity="0.2"
          />
          <path
            d={svgPaths.p3e43200}
            fill="var(--fill-0, white)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function VenustIcons() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Venust Icons">
      <Group />
    </div>
  );
}

function Sidebar() {
  const menuItems = [
    { icon: TrendingUp, label: "Dashboard", active: true, href: "/dashboard" },
    {
      icon: Calendar,
      label: "Agendamentos",
      active: false,
      href: "/agendamentos",
    },
    { icon: Users, label: "Clientes", active: false, href: "/clientes" },
    { icon: Scissors, label: "Serviços", active: false, href: "/servicos" },
    { icon: Users, label: "Equipe", active: false, href: "/equipe" },
    {
      icon: Settings,
      label: "Configurações",
      active: false,
      href: "/configuracoes",
    },
  ];

  return (
    <div className="bg-[#0d0f10] border-r border-[#363a3d] h-full w-[280px] flex flex-col shrink-0">
      {/* Logo */}
      <div className="box-border flex items-center gap-[12px] p-[24px] border-b border-[#363a3d]">
        <VenustIcons />
        <div className="flex flex-col font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] text-white text-[18px]">
          <p className="leading-[28px]">Phantom Hair</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-[8px] px-[16px] py-[24px]">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`flex items-center gap-[12px] px-[16px] py-[12px] rounded-[8px] transition-colors ${
              item.active
                ? "bg-[#32f1b4] text-[#0c1132]"
                : "text-[#9b9c9e] hover:bg-[#1a1d21] hover:text-white"
            }`}
          >
            <item.icon className="size-[20px]" />
            <span className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-[14px] tracking-[0.15px]">
              {item.label}
            </span>
          </a>
        ))}
      </nav>

      {/* User Profile */}
      <div className="mt-auto border-t border-[#363a3d] p-[16px]">
        <div className="flex items-center gap-[12px] p-[12px] rounded-[8px] cursor-pointer hover:bg-[#1a1d21] transition-colors">
          <div className="bg-[#32f1b4] rounded-full size-[40px] flex items-center justify-center">
            <span className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-[#0c1132] text-[16px]">
              PH
            </span>
          </div>
          <div className="flex-1">
            <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[14px] tracking-[0.15px]">
              Phantom Hair
            </div>
            <div className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[12px] tracking-[0.15px]">
              Admin
            </div>
          </div>
          <ChevronDown className="size-[16px] text-[#9b9c9e]" />
        </div>
      </div>
    </div>
  );
}

function KPICard({
  icon: Icon,
  label,
  value,
  subtitle,
}: {
  icon: any;
  label: string;
  value: string | number;
  subtitle?: string;
}) {
  return (
    <div className="bg-[#1a1d21] relative rounded-[12px] p-[24px]">
      <div
        aria-hidden="true"
        className="absolute border border-[#363a3d] border-solid inset-[-1px] pointer-events-none rounded-[13px]"
      />
      <div className="flex flex-col gap-[16px]">
        <div className="flex items-center gap-[12px]">
          <div className="bg-[#32f1b4]/10 rounded-[8px] p-[10px]">
            <Icon className="size-[20px] text-[#32f1b4]" />
          </div>
          <span className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[14px] tracking-[0.15px]">
            {label}
          </span>
        </div>
        <div className="flex flex-col gap-[4px]">
          <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[32px] leading-[1.2]">
            {value}
          </div>
          {subtitle && (
            <div className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#686b6e] text-[13px] tracking-[0.15px]">
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AlertsPanel({ alerts }: { alerts: typeof alerts }) {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertCircle className="size-[18px]" />;
      case "warning":
        return <AlertCircle className="size-[18px]" />;
      default:
        return <AlertCircle className="size-[18px]" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "error":
        return { bg: "#ff6b6b15", text: "#ff6b6b", border: "#ff6b6b30" };
      case "warning":
        return { bg: "#ff9f4315", text: "#ff9f43", border: "#ff9f4330" };
      default:
        return { bg: "#4ecdc415", text: "#4ecdc4", border: "#4ecdc430" };
    }
  };

  if (alerts.length === 0) return null;

  return (
    <div className="flex flex-col gap-[12px]">
      {alerts.map((alert) => {
        const colors = getAlertColor(alert.type);
        return (
          <div
            key={alert.id}
            className="flex items-center justify-between p-[16px] rounded-[12px]"
            style={{
              backgroundColor: colors.bg,
              border: `1px solid ${colors.border}`,
            }}
          >
            <div className="flex items-center gap-[12px] flex-1">
              <div style={{ color: colors.text }}>
                {getAlertIcon(alert.type)}
              </div>
              <span className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-white text-[14px] tracking-[0.15px]">
                {alert.message}
              </span>
            </div>
            <a
              href={alert.link}
              className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-[13px] tracking-[0.15px] px-[16px] py-[8px] rounded-[8px] hover:opacity-80 transition-opacity whitespace-nowrap"
              style={{
                color: colors.text,
                backgroundColor: `${colors.text}15`,
              }}
            >
              {alert.action}
            </a>
          </div>
        );
      })}
    </div>
  );
}

function AppointmentItem({
  appointment,
}: {
  appointment: (typeof todayAppointments)[0];
}) {
  const statusConfig = {
    confirmed: { bg: "#32f1b415", text: "#32f1b4", label: "Confirmado" },
    pending: { bg: "#ff9f4315", text: "#ff9f43", label: "Pendente" },
  };

  const config = statusConfig[appointment.status as keyof typeof statusConfig];

  return (
    <div className="flex items-center justify-between py-[16px] border-b border-[#363a3d] last:border-0 group">
      <div className="flex items-center gap-[16px] flex-1">
        <div className="flex items-center gap-[8px] min-w-[60px]">
          <Clock className="size-[16px] text-[#9b9c9e]" />
          <span className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[14px]">
            {appointment.time}
          </span>
        </div>
        <div className="flex flex-col gap-[2px] flex-1">
          <span className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[15px]">
            {appointment.client}
          </span>
          <span className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[13px]">
            {appointment.service}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-[12px]">
        <div
          className="px-[12px] py-[6px] rounded-[6px]"
          style={{ backgroundColor: config.bg }}
        >
          <span
            className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-[12px] tracking-[0.15px]"
            style={{ color: config.text }}
          >
            {config.label}
          </span>
        </div>
        <a
          href={`/agendamento/${appointment.id}`}
          className="opacity-0 group-hover:opacity-100 transition-opacity px-[12px] py-[6px] rounded-[6px] bg-[#363a3d] hover:bg-[#32f1b4]/10 flex items-center gap-[6px]"
        >
          <span className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-[#32f1b4] text-[12px] tracking-[0.15px]">
            Gerenciar
          </span>
          <ExternalLink className="size-[12px] text-[#32f1b4]" />
        </a>
      </div>
    </div>
  );
}

function EmptyAppointments() {
  return (
    <div className="flex flex-col items-center justify-center py-[48px] gap-[16px]">
      <div className="bg-[#363a3d]/30 rounded-full p-[20px]">
        <Calendar className="size-[32px] text-[#9b9c9e]" />
      </div>
      <div className="flex flex-col items-center gap-[8px]">
        <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[16px]">
          Nenhum agendamento para hoje
        </div>
        <div className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[14px]">
          Comece criando seu primeiro agendamento
        </div>
      </div>
      <Button className="bg-[#32f1b4] text-[#0c1132] hover:bg-[#2cd9a0] mt-[8px]">
        <CalendarPlus className="size-[16px] mr-[8px]" />
        Criar agendamento
      </Button>
    </div>
  );
}

export default function Dashboard() {
  const totalAppointments = todayAppointments.length;
  const confirmedAppointments = todayAppointments.filter(
    (apt) => apt.status === "confirmed",
  ).length;
  const pendingAppointments = todayAppointments.filter(
    (apt) => apt.status === "pending",
  ).length;

  // Mock calculations
  const totalSlots = 16;
  const occupancyRate = Math.round((totalAppointments / totalSlots) * 100);
  const pageViews = 710; // Visualizações da página própria no mês
  const noShows = 1;

  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex-1 flex flex-col bg-[#0d0f10] overflow-auto">
      {/* Header */}
      <div className="border-b border-[#363a3d]">
        <div className="px-[32px] py-4">
          <div className="flex items-center justify-between gap-[16px]">
            <div className="flex flex-col gap-[4px]">
              <h1 className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[28px] leading-[1.2]">
                Dashboard
              </h1>
              <p className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[14px] capitalize">
                {currentDate}
              </p>
            </div>
            <div className="flex items-center gap-[16px]">
              {/* Notifications */}
              <button className="bg-[#1a1d21] relative rounded-[8px] size-[40px] flex items-center justify-center hover:bg-[#1f2226] transition-colors">
                <div
                  aria-hidden="true"
                  className="absolute border border-[#363a3d] border-solid inset-[-1px] pointer-events-none rounded-[9px]"
                />
                <Bell className="size-[18px] text-[#9b9c9e]" />
                <div className="absolute top-[8px] right-[8px] bg-[#32f1b4] rounded-full size-[8px]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-[32px] py-[32px]">
        <div className="flex flex-col gap-[32px] max-w-[1600px]">
          {/* Alerts */}
          {alerts.length > 0 && <AlertsPanel alerts={alerts} />}

          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
            <KPICard
              icon={Calendar}
              label="Agendamentos do dia"
              value={totalAppointments}
              subtitle={`${confirmedAppointments} confirmados`}
            />
            <KPICard
              icon={TrendingUp}
              label="Ocupação do dia"
              value={`${occupancyRate}%`}
              subtitle={`${totalAppointments} de ${totalSlots} horários`}
            />
            <KPICard
              icon={Eye}
              label="Visualizações"
              value={pageViews}
              subtitle="Da sua página este mês"
            />
            <KPICard
              icon={UserX}
              label="No-shows"
              value={noShows}
              subtitle="Hoje"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
            {/* Views vs Impressions Chart */}
            <div className="bg-[#1a1d21] relative rounded-[12px] p-[24px]">
              <div
                aria-hidden="true"
                className="absolute border border-[#363a3d] border-solid inset-[-1px] pointer-events-none rounded-[13px]"
              />
              <div className="flex flex-col gap-[24px]">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-[4px]">
                    <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[16px] tracking-[0.15px]">
                      Alcance da sua página
                    </div>
                    <div className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[13px] tracking-[0.15px]">
                      Visualizações vs Impressões
                    </div>
                  </div>
                  <div className="flex gap-[16px]">
                    <div className="flex items-center gap-[6px]">
                      <div className="size-[10px] rounded-full bg-[#32f1b4]" />
                      <span className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[12px]">
                        Visualizações
                      </span>
                    </div>
                    <div className="flex items-center gap-[6px]">
                      <div className="size-[10px] rounded-full bg-[#4ecdc4]" />
                      <span className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[12px]">
                        Impressões
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={viewsVsImpressionsData}>
                      <defs>
                        <linearGradient
                          id="colorViews"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#32f1b4"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#32f1b4"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorImpressions"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#4ecdc4"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#4ecdc4"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="name"
                        stroke="#686b6e"
                        style={{
                          fontSize: 12,
                          fontFamily: "Plus Jakarta Sans",
                        }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#686b6e"
                        style={{
                          fontSize: 12,
                          fontFamily: "Plus Jakarta Sans",
                        }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1a1d21",
                          border: "1px solid #363a3d",
                          borderRadius: "8px",
                          color: "#fff",
                          fontFamily: "Plus Jakarta Sans",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="visualizacoes"
                        stroke="#32f1b4"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorViews)"
                      />
                      <Area
                        type="monotone"
                        dataKey="impressoes"
                        stroke="#4ecdc4"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorImpressions)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Bookings vs Reviews Chart */}
            <div className="bg-[#1a1d21] relative rounded-[12px] p-[24px]">
              <div
                aria-hidden="true"
                className="absolute border border-[#363a3d] border-solid inset-[-1px] pointer-events-none rounded-[13px]"
              />
              <div className="flex flex-col gap-[24px]">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-[4px]">
                    <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[16px] tracking-[0.15px]">
                      Agendamentos e Avaliações
                    </div>
                    <div className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[13px] tracking-[0.15px]">
                      Últimos 6 meses
                    </div>
                  </div>
                  <div className="flex gap-[16px]">
                    <div className="flex items-center gap-[6px]">
                      <div className="size-[10px] rounded-full bg-[#32f1b4]" />
                      <span className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[12px]">
                        Agendamentos
                      </span>
                    </div>
                    <div className="flex items-center gap-[6px]">
                      <div className="size-[10px] rounded-full bg-[#ff9f43]" />
                      <span className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[12px]">
                        Avaliações
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={bookingsVsReviewsData}>
                      <defs>
                        <linearGradient
                          id="colorBookings"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#32f1b4"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#32f1b4"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorReviews"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#ff9f43"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#ff9f43"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="name"
                        stroke="#686b6e"
                        style={{
                          fontSize: 12,
                          fontFamily: "Plus Jakarta Sans",
                        }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#686b6e"
                        style={{
                          fontSize: 12,
                          fontFamily: "Plus Jakarta Sans",
                        }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1a1d21",
                          border: "1px solid #363a3d",
                          borderRadius: "8px",
                          color: "#fff",
                          fontFamily: "Plus Jakarta Sans",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="agendamentos"
                        stroke="#32f1b4"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorBookings)"
                      />
                      <Area
                        type="monotone"
                        dataKey="avaliacoes"
                        stroke="#ff9f43"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorReviews)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Top Services */}
          <div className="bg-[#1a1d21] relative rounded-[12px] p-[24px]">
            <div
              aria-hidden="true"
              className="absolute border border-[#363a3d] border-solid inset-[-1px] pointer-events-none rounded-[13px]"
            />
            <div className="flex flex-col gap-[24px]">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-[4px]">
                  <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[18px] tracking-[0.15px]">
                    Serviços mais agendados
                  </div>
                  <div className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[13px] tracking-[0.15px]">
                    Este mês
                  </div>
                </div>
                <a
                  href="/servicos"
                  className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-[#32f1b4] text-[14px] hover:text-[#2cd9a0] transition-colors flex items-center gap-[6px]"
                >
                  Ver todos os serviços
                  <ExternalLink className="size-[14px]" />
                </a>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px]">
                {topServicesData.map((service, index) => (
                  <div
                    key={index}
                    className="bg-[#363a3d]/30 rounded-[8px] p-[16px] flex flex-col gap-[8px]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[13px]">
                        {service.name}
                      </span>
                    </div>
                    <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[24px]">
                      {service.value}
                    </div>
                    <div className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#686b6e] text-[12px]">
                      agendamentos
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-[#1a1d21] relative rounded-[12px] p-[24px]">
            <div
              aria-hidden="true"
              className="absolute border border-[#363a3d] border-solid inset-[-1px] pointer-events-none rounded-[13px]"
            />
            <div className="flex flex-col gap-[24px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[12px]">
                  <h2 className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[18px]">
                    Próximos agendamentos
                  </h2>
                  {todayAppointments.length > 0 && (
                    <Badge className="bg-[#32f1b4]/10 text-[#32f1b4] border-[#32f1b4]/30">
                      {todayAppointments.length}
                    </Badge>
                  )}
                </div>
                {todayAppointments.length > 0 && (
                  <a
                    href="/agendamentos"
                    className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-[#32f1b4] text-[14px] hover:text-[#2cd9a0] transition-colors flex items-center gap-[6px]"
                  >
                    Ver agenda completa
                    <ExternalLink className="size-[14px]" />
                  </a>
                )}
              </div>

              {todayAppointments.length === 0 ? (
                <EmptyAppointments />
              ) : (
                <div className="flex flex-col">
                  {todayAppointments.slice(0, 5).map((appointment) => (
                    <AppointmentItem
                      key={appointment.id}
                      appointment={appointment}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
