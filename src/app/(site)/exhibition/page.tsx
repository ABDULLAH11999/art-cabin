import Link from "next/link";
import { MediaImage } from "@/components/media-image";
import { getSafeExhibitions } from "@/lib/art-content";

export const dynamic = "force-dynamic";

export default async function ExhibitionPage() {
  const exhibitions = await getSafeExhibitions();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.35em] text-black/45">Exhibition</p>
        <h1 className="mt-3 font-heading text-5xl leading-none sm:text-7xl">Exhibition Stories</h1>
        <p className="mt-5 text-base leading-8 text-black/65 sm:text-lg">
          Explore exhibitions that frame the artwork in a broader narrative of space, rhythm, and mood.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {exhibitions.map((exhibition) => (
          <Link key={exhibition.id} href={`/exhibition/${exhibition.slug}`} className="grid gap-4 rounded-[2rem] border border-black/10 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-maroon sm:grid-cols-[260px_1fr]">
            <MediaImage src={Array.isArray(exhibition.images) ? String(exhibition.images[0] || "") : ""} alt={exhibition.title} width={900} height={900} className="h-56 w-full rounded-[1.5rem] object-cover" />
            <div className="self-center">
              <p className="text-[11px] uppercase tracking-[0.3em] text-black/45">#{exhibition.orderNumber}</p>
              <h2 className="mt-2 font-heading text-3xl">{exhibition.title}</h2>
              <p className="mt-3 line-clamp-4 text-sm leading-6 text-black/60">{exhibition.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
