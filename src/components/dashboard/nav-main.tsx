"use client";

import {
  Calendar,
  LayoutDashboard,
  Link2,
  Scissors,
  Settings,
  Store,
  Star,
  Users,
} from "lucide-react";

import { SidebarGroup, SidebarMenu } from "@/components/ui/sidebar";
import { SidebarNavItem } from "./sidebar-nav-item";

type NavItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  hidden?: boolean; // útil p/ esconder "Equipe" se for barbearia solo, etc.
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Agendamentos",
    url: "/dashboard/agendamentos",
    icon: Calendar,
  },
  {
    title: "Clientes",
    url: "/dashboard/clientes",
    icon: Users,
  },
  {
    title: "Serviços",
    url: "/dashboard/servicos",
    icon: Scissors,
  },
  {
    title: "Equipe",
    url: "/dashboard/equipe",
    icon: Users,
    hidden: true, // exemplo: habilite quando houver >1 profissional
  },
  {
    title: "Barbearia",
    url: "/dashboard/barbearia",
    icon: Store,
  },
  {
    title: "Links",
    url: "/dashboard/links",
    icon: Link2,
  },
  {
    title: "Avaliações",
    url: "/dashboard/avaliacoes",
    icon: Star,
  },
  {
    title: "Configurações",
    url: "/dashboard/configuracoes",
    icon: Settings,
  },
];

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarMenu className="gap-2">
        {navItems
          .filter((item) => !item.hidden)
          .map((item) => (
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
