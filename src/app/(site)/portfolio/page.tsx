import { PortfolioGallery } from "@/components/portfolio/portfolio-gallery";
import { getSafeArts, getSafeSiteConfig } from "@/lib/art-content";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const [arts, config] = await Promise.all([getSafeArts(), getSafeSiteConfig()]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.35em] text-maroon">Portfolio</p>
        <h1 className="mt-3 font-heading text-5xl leading-none text-maroon sm:text-7xl">Curated Art Pieces</h1>
        <p className="mt-5 text-base leading-8 text-maroon/72 sm:text-lg">
          Browse the gallery portfolio. Click on any piece to open the quick high-resolution detail view.
        </p>
      </div>

      <PortfolioGallery arts={arts} instagramLink={config.instagramLink} />
    </div>
  );
}
