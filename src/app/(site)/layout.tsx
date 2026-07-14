import { SiteChrome } from "@/components/site-chrome";
import { getSafeArts, getSafeExhibitions } from "@/lib/art-content";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [arts, exhibitions] = await Promise.all([getSafeArts(6), getSafeExhibitions(6)]);
  const prefetchRoutes = [
    "/",
    "/about",
    "/portfolio",
    "/exhibition",
    "/contact",
    ...arts.map((art) => `/art/${art.slug}`),
    ...exhibitions.map((exhibition) => `/exhibition/${exhibition.slug}`)
  ];

  return <SiteChrome prefetchRoutes={prefetchRoutes}>{children}</SiteChrome>;
}
