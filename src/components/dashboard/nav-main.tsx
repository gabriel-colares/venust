"use client";

import {
  Bell,
  Calendar,
  DollarSign,
  FileText,
  LayoutDashboard,
  Scissors,
  Settings,
  User,
  Users,
} from "lucide-react";

import { SidebarGroup, SidebarMenu } from "@/components/ui/sidebar";
import { SidebarNavItem } from "./sidebar-nav-item";

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Agendamentos",
    url: "/dashboard/agendamentos",
    icon: Calendar,
    isActive: false,
  },
  {
    title: "Clientes",
    url: "/dashboard/clientes",
    icon: Users,
    isActive: false,
  },
  {
    title: "Serviços",
    url: "/dashboard/servicos",
    icon: Scissors,
    isActive: false,
  },
  {
    title: "Equipe",
    url: "/dashboard/equipe",
    icon: Users,
    isActive: false,
  },
  {
    title: "Financeiro",
    url: "/dashboard/financeiro",
    icon: DollarSign,
    isActive: false,
  },
  {
    title: "Relatórios",
    url: "/dashboard/relatorios",
    icon: FileText,
    isActive: false,
  },
  {
    title: "Notificações",
    url: "/dashboard/notificacoes",
    icon: Bell,
    isActive: false,
  },
  {
    title: "Perfil",
    url: "/dashboard/perfil",
    icon: User,
    isActive: false,
  },
  {
    title: "Configurações",
    url: "/dashboard/configuracoes",
    icon: Settings,
    isActive: false,
  },
];

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarMenu className="gap-2">
        {navItems.map((item) => (
          <SidebarNavItem
            key={item.title}
            label={item.title}
            url={item.url}
            icon={item.icon}
            activeClassName="bg-primary text-black hover:text-black/80 hover:bg-primary/90"
            inactiveClassName="text-[#9b9c9e] hover:text-white hover:bg-[#1a1d21]"
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
