import Link from "next/link";
import { MediaImage } from "@/components/media-image";
import { getSafeArts } from "@/lib/art-content";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const arts = await getSafeArts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.35em] text-black/45">Portfolio</p>
        <h1 className="mt-3 font-heading text-5xl leading-none sm:text-7xl">Curated Art Pieces</h1>
        <p className="mt-5 text-base leading-8 text-black/65 sm:text-lg">
          Browse the portfolio and open any work for the full single-art page with Instagram-first contact action.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {arts.map((art) => (
          <Link key={art.id} href={`/art/${art.slug}`} className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:border-maroon">
            <MediaImage src={Array.isArray(art.images) ? String(art.images[0] || "") : ""} alt={art.title} width={900} height={900} className="h-72 w-full object-cover" />
            <div className="p-5">
              <p className="text-[11px] uppercase tracking-[0.3em] text-black/45">
                {art.paintingType} • #{art.orderNumber}
              </p>
              <h2 className="mt-2 font-heading text-3xl">{art.title}</h2>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-black/60">{art.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
