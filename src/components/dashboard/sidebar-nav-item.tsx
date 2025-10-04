"use client";

import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Loader2, type LucideProps } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";

interface SidebarNavItemProps {
  url: string;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

export function SidebarNavItem({
  url,
  label,
  icon: Icon,
  className,
  activeClassName,
  inactiveClassName,
}: SidebarNavItemProps) {
  const { openMobile, setOpenMobile } = useSidebar();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathname = usePathname();

  const isActive = useMemo(() => pathname === url, [pathname, url]);

  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  const handleClick = () => {
    if (openMobile) setOpenMobile(false);
    if (isLoading) return;
    if (isActive) return;
    setIsLoading(true);
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        onClick={handleClick}
        className={cn(
          "h-10 px-3 gap-3 rounded-2xl font-medium",
          isActive
            ? activeClassName ||
                "text-white bg-primary hover:text-white/90 hover:bg-primary/90"
            : inactiveClassName ||
                "text-[#9b9c9e] hover:text-white hover:bg-[#1a1d21]",
          className,
        )}
      >
        <Link href={url} prefetch>
          {isLoading ? (
            <Loader2 className="animate-spin h-4 w-4" />
          ) : (
            <Icon className="h-4 w-4" />
          )}
          <span className="text-base">{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
