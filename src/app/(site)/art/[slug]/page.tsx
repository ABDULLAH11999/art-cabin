import { notFound } from "next/navigation";
import Link from "next/link";
import { Instagram, ArrowLeft } from "lucide-react";
import { MediaImage } from "@/components/media-image";
import { getSafeArtBySlug, getSafeSiteConfig } from "@/lib/art-content";

export const dynamic = "force-dynamic";

export default async function ArtDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [art, config] = await Promise.all([getSafeArtBySlug(slug), getSafeSiteConfig()]);

  if (!art) return notFound();

  const images = Array.isArray(art.images) ? art.images.map(String) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-black/60">
        <ArrowLeft className="h-4 w-4" />
        Back to Portfolio
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <div className="space-y-4">
          <MediaImage src={images[0] || ""} alt={art.title} width={1200} height={1200} className="h-[520px] w-full rounded-[2rem] object-cover shadow-luxe" />
          <div className="grid gap-4 sm:grid-cols-3">
            {images.slice(1).map((image) => (
              <MediaImage key={image} src={image} alt={art.title} width={400} height={400} className="h-40 w-full rounded-[1.5rem] object-cover" />
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-[11px] uppercase tracking-[0.35em] text-black/45">
            {art.paintingType} • #{art.orderNumber}
          </p>
          <h1 className="mt-3 font-heading text-4xl sm:text-6xl">{art.title}</h1>
          <p className="mt-5 text-base leading-8 text-black/65">{art.description}</p>
          <div className="mt-6 rounded-[1.5rem] border border-maroon/15 bg-maroon/5 p-4">
            <p className="text-sm text-black/60">Want a closer look or commission conversation?</p>
            <a
              href={config.instagramLink}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-maroon px-5 py-3 font-semibold text-white"
            >
              <Instagram className="h-4 w-4" />
              Get Connect on Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
