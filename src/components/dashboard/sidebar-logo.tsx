"use client";

import { SvgVenust, SvgVenustFull } from "@/components/ui/icons";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function SidebarLogo() {
  const { isMobile, state } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="w-full text-sidebar-primary-foreground flex justify-start items-center rounded-lg">
            {!isMobile && state === "collapsed" ? (
              <SvgVenust color="#FFF" />
            ) : (
              <SvgVenustFull className="w-[80%]" color="#FFF" />
            )}
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
