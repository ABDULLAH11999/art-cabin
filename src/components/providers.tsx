"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <SessionProvider>
      {children}
      <Toaster
        position={isAdminRoute ? "top-right" : "top-right"}
        toastOptions={{
          style: {
            borderRadius: "18px",
            border: "1px solid rgba(110, 31, 52, 0.14)",
            background: "#ffffff",
            color: "#111111",
            boxShadow: "0 18px 40px rgba(17,17,17,0.12)"
          },
          success: {
            style: {
              border: "1px solid rgba(110, 31, 52, 0.18)"
            }
          },
          error: {
            style: {
              border: "1px solid rgba(220, 38, 38, 0.18)"
            }
          }
        }}
      />
    </SessionProvider>
  );
}
