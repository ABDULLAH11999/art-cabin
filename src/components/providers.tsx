"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showToaster = !pathname?.startsWith("/admin");

  return (
    <SessionProvider>
      {children}
      {showToaster ? <Toaster position="top-right" /> : null}
    </SessionProvider>
  );
}
