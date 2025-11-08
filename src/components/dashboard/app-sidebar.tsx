"use client";

import * as React from "react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import { SidebarLogo } from "@/components/dashboard/sidebar-logo";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-[#0d0f10]">
        <SidebarLogo />
      </SidebarHeader>
      <Separator />
      <SidebarContent className="bg-[#0d0f10]">
        <NavMain />
      </SidebarContent>
      <SidebarFooter className="bg-[#0d0f10]">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
