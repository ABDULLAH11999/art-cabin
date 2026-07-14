"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { VisitorTracker } from "@/components/visitor-tracker";
import { RoutePrefetcher } from "@/components/route-prefetcher";

export function SiteChrome({
  children,
  prefetchRoutes = []
}: {
  children: React.ReactNode;
  prefetchRoutes?: string[];
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <VisitorTracker />
      {prefetchRoutes.length ? <RoutePrefetcher routes={prefetchRoutes} /> : null}
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
