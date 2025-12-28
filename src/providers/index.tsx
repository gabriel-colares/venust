import { SessionProvider } from "next-auth/react";
import type { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      {children}
      <Toaster />
    </SessionProvider>
  );
}
