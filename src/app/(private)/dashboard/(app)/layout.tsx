import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar className="bg-[#0d0f10]" />
      <main className="w-full bg-[#0d0f10]">{children}</main>
    </SidebarProvider>
  );
}
