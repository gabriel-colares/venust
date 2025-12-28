"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  type ComponentType,
  type MouseEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<{ className?: string }>;

interface SidebarNavItemProps {
  url: string;
  label: string;
  icon: IconComponent; // <- mais permissivo e compatível com ComponentType
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;

  /** Se true, só ativa quando o pathname é exatamente igual ao url */
  exact?: boolean;

  /** Desabilita o item (ex.: rota pós-MVP) */
  disabled?: boolean;

  /** Mostra um badge (ex.: notificações) */
  badgeCount?: number;

  /** Se for link externo, abre em nova aba */
  isExternal?: boolean;

  /** Controla o prefetch do Next Link (padrão: true) */
  prefetch?: boolean;

  /** Callback ao iniciar navegação */
  onNavigate?: () => void;

  /** data-testid para testes */
  "data-testid"?: string;
}

export function SidebarNavItem({
  url,
  label,
  icon: Icon,
  className,
  activeClassName,
  inactiveClassName,
  exact,
  disabled = false,
  badgeCount,
  isExternal = false,
  prefetch = true,
  onNavigate,
  ...rest
}: SidebarNavItemProps) {
  const { openMobile, setOpenMobile } = useSidebar();
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const effectiveExact = useMemo(
    () => (typeof exact === "boolean" ? exact : url === "/dashboard"),
    [exact, url],
  );

  const isActive = useMemo(() => {
    if (effectiveExact) return pathname === url;
    return pathname === url || pathname.startsWith(`${url}/`);
  }, [pathname, url, effectiveExact]);

  useEffect(() => {
    if (!isLoading) return;
    if (!isActive) return;
    setIsLoading(false);
  }, [isActive, isLoading]);

  const handleClick = (e: MouseEvent) => {
    if (disabled || isLoading || isActive) {
      e.preventDefault();
      return;
    }
    if (openMobile) setOpenMobile(false);
    setIsLoading(true);
    onNavigate?.();

    if (!isExternal) {
      e.preventDefault();
      router.push(url);
    }
  };

  const baseActive =
    activeClassName ||
    "text-black bg-primary hover:text-black/80 hover:bg-primary/90";
  const baseInactive =
    inactiveClassName || "text-[#9b9c9e] hover:text-white hover:bg-[#1a1d21]";

  const disabledClass =
    "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-[#9b9c9e]";

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        <Icon className="h-4 w-4" />
      )}
      <span className="text-base">{label}</span>
      {typeof badgeCount === "number" && badgeCount > 0 && (
        <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold bg-white/10 text-white">
          <span className="sr-only">{badgeCount} novas</span>
          <span aria-hidden="true">{badgeCount > 99 ? "99+" : badgeCount}</span>
        </span>
      )}
    </>
  );

  return (
    <SidebarMenuItem data-active={isActive} {...rest}>
      <SidebarMenuButton
        asChild
        onClick={handleClick}
        aria-current={isActive ? "page" : undefined}
        aria-disabled={disabled || undefined}
        className={cn(
          "group h-10 gap-3 rounded-2xl px-3 font-medium transition-colors",
          disabled ? disabledClass : isActive ? baseActive : baseInactive,
          className,
        )}
      >
        {isExternal ? (
          <a
            href={disabled ? "#" : url}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={disabled ? -1 : 0}
          >
            {content}
          </a>
        ) : (
          <Link
            href={disabled ? "#" : url}
            prefetch={prefetch}
            tabIndex={disabled ? -1 : 0}
          >
            {content}
          </Link>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
