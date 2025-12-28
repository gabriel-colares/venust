import { Analytics } from "@vercel/analytics/next";
import { SessionProvider } from "next-auth/react";
import type { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/sonner";
import { UmamiProvider } from "./umami-analytics";

export function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <UmamiProvider>{children}</UmamiProvider>
      <Analytics />
      <Toaster />
    </SessionProvider>
  );
}
