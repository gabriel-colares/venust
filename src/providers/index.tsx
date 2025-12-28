"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { trackFirebaseEvent, trackFirebasePageView } from "@/firebase/client";
import { UmamiProvider } from "./umami-analytics";

function normalizeFirebaseEventName(raw: string) {
  const normalized = raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  const prefixed = /^[a-z]/.test(normalized) ? normalized : `e_${normalized}`;
  return prefixed.slice(0, 40);
}

export function Providers({ children }: PropsWithChildren) {
  const pathname = usePathname();

  useEffect(() => {
    const pathWithQuery = `${pathname}${window.location.search}`;
    trackFirebasePageView(pathWithQuery);
    const umami = (window as unknown as { umami?: unknown }).umami as
      | {
          trackView?: (url?: string) => void;
          track?: (event: string, data?: Record<string, unknown>) => void;
        }
      | undefined;
    umami?.trackView?.(pathWithQuery);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const el = target?.closest?.("[data-umami-event]") as HTMLElement | null;
      const umamiEvent = el?.getAttribute("data-umami-event") ?? "";
      if (!umamiEvent) return;

      trackFirebaseEvent(normalizeFirebaseEventName(`umami_${umamiEvent}`), {
        umami_event: umamiEvent,
      });
    };

    const handleSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement | null;
      const umamiEvent = form?.getAttribute?.("data-umami-event") ?? "";
      if (!umamiEvent) return;

      const umami = (window as unknown as { umami?: unknown }).umami as
        | { track?: (event: string, data?: Record<string, unknown>) => void }
        | undefined;
      umami?.track?.(umamiEvent);

      trackFirebaseEvent(normalizeFirebaseEventName(`umami_${umamiEvent}`), {
        umami_event: umamiEvent,
      });
    };

    document.addEventListener("click", handleClick, { capture: true });
    document.addEventListener("submit", handleSubmit, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      document.removeEventListener("submit", handleSubmit, { capture: true });
    };
  }, []);

  return (
    <SessionProvider>
      <UmamiProvider>{children}</UmamiProvider>
      <Analytics />
      <SpeedInsights />
      <Toaster />
    </SessionProvider>
  );
}
