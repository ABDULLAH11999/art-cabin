import Link from "next/link";
import { ArrowRight, Instagram, Palette, Sparkles } from "lucide-react";
import { getSafeArts, getSafeExhibitions, getSafeSiteConfig } from "@/lib/art-content";
import { MediaImage } from "@/components/media-image";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [config, featuredArts, featuredExhibitions] = await Promise.all([
    getSafeSiteConfig(),
    getSafeArts(3),
    getSafeExhibitions(2)
  ]);

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-6 lg:px-8 lg:pt-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-maroon/15 bg-maroon/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-maroon">
              <Sparkles className="h-4 w-4" />
              Curated Art House
            </p>
            <h1 className="mt-5 max-w-3xl font-heading text-5xl leading-none text-ink sm:text-6xl lg:text-8xl">
              {config.siteTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-black/65 sm:text-lg">
              {config.siteDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/portfolio" className="inline-flex items-center gap-2 rounded-2xl bg-maroon px-5 py-3 font-semibold text-white">
                Explore Portfolio
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-2xl border border-maroon px-5 py-3 font-semibold text-maroon">
                <Instagram className="h-4 w-4" />
                Get Connect
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-6 h-24 w-24 rounded-full bg-maroon/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-black/10 shadow-luxe">
              <MediaImage src="/ui-images/art-1.svg" alt="Art Cabin hero" width={900} height={1100} className="h-[420px] w-full object-cover sm:h-[520px]" />
              <div className="absolute inset-x-4 bottom-4 rounded-[1.5rem] border border-white/20 bg-black/55 p-4 text-white backdrop-blur-md">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-white/45">Featured Story</p>
                    <p className="mt-1 font-heading text-2xl">A maroon-led visual language</p>
                  </div>
                  <div className="rounded-full bg-white/10 p-3">
                    <Palette className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Portfolio Pieces", value: `${featuredArts.length}`, text: "Curated art pieces with title, description, image sets, and painting type." },
            { title: "Exhibition Stories", value: `${featuredExhibitions.length}`, text: "Focused exhibition modules with their own visual rhythm and order." },
            { title: "Instagram First", value: "Connect", text: "Every artwork and exhibition supports a clean Instagram-style action path." }
          ].map((card) => (
            <div key={card.title} className="rounded-[2rem] border border-black/10 bg-paper p-5 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.35em] text-black/45">{card.title}</p>
              <div className="mt-3 font-heading text-4xl text-maroon">{card.value}</div>
              <p className="mt-3 text-sm leading-6 text-black/60">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-black/45">Selected Arts</p>
            <h2 className="mt-2 font-heading text-3xl sm:text-5xl">Featured Portfolio</h2>
          </div>
          <Link href="/portfolio" className="hidden rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-black/70 md:inline-flex">
            View all
          </Link>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredArts.map((art) => (
            <Link key={art.id} href={`/art/${art.slug}`} className="group overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:border-maroon">
              <MediaImage src={Array.isArray(art.images) ? String(art.images[0] || "") : ""} alt={art.title} width={900} height={900} className="h-72 w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
              <div className="p-5">
                <p className="text-[11px] uppercase tracking-[0.3em] text-black/45">
                  {art.paintingType} • #{art.orderNumber}
                </p>
                <h3 className="mt-2 font-heading text-3xl">{art.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-black/60">{art.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-black/10 bg-black p-6 text-white">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">About Art Cabin</p>
            <h2 className="mt-3 font-heading text-4xl">A calm visual gallery for contemporary work.</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">{config.aboutText}</p>
            <Link href="/about" className="mt-6 inline-flex rounded-2xl bg-white px-5 py-3 font-semibold text-black">
              Read About
            </Link>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
            <p className="text-[11px] uppercase tracking-[0.35em] text-black/45">Exhibitions</p>
            <h2 className="mt-3 font-heading text-4xl">Recent Stories</h2>
            <div className="mt-5 grid gap-4">
              {featuredExhibitions.map((exhibition) => (
                <Link key={exhibition.id} href={`/exhibition/${exhibition.slug}`} className="grid gap-4 rounded-[1.5rem] border border-black/10 p-4 transition hover:border-maroon sm:grid-cols-[140px_1fr]">
                  <MediaImage src={Array.isArray(exhibition.images) ? String(exhibition.images[0] || "") : ""} alt={exhibition.title} width={400} height={300} className="h-32 w-full rounded-2xl object-cover" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-black/45">#{exhibition.orderNumber}</p>
                    <h3 className="mt-2 font-heading text-2xl">{exhibition.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-black/60">{exhibition.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
