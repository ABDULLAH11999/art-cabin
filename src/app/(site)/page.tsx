import Link from "next/link";
import { ArrowRight, Brush, Frame, Instagram, Sparkles, WandSparkles } from "lucide-react";
import { getSafeArts, getSafeExhibitions, getSafeFeaturedArts, getSafeSiteConfig } from "@/lib/art-content";
import { MediaImage } from "@/components/media-image";
import { BannerSlider } from "@/components/banner-slider";
import { PortfolioGallery } from "@/components/portfolio/portfolio-gallery";
import { getBannerSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [config, featuredArts, allArts, featuredExhibitions, bannerSettings] = await Promise.all([
    getSafeSiteConfig(),
    getSafeFeaturedArts(3),
    getSafeArts(3),
    getSafeExhibitions(2),
    getBannerSettings()
  ]);

  const resolvedFeaturedArts = featuredArts.length ? featuredArts : allArts;
  const fallbackBannerImages = Array.isArray(resolvedFeaturedArts[0]?.images) ? resolvedFeaturedArts[0].images.map(String) : [];
  const accentImage =
    Array.isArray(resolvedFeaturedArts[1]?.images) && resolvedFeaturedArts[1]?.images.length
      ? String(resolvedFeaturedArts[1].images[0])
      : String(resolvedFeaturedArts[0]?.images?.[0] || "");

  return (
    <div className="bg-paper text-maroon">
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-6 lg:px-8 lg:pt-10">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-maroon/15 bg-maroon/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-maroon">
              <Sparkles className="h-4 w-4" />
              Art Cabin
            </p>
            <h1 className="mt-5 max-w-3xl font-heading text-5xl leading-none text-maroon sm:text-6xl lg:text-8xl">
              {config.siteTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-maroon/75 sm:text-lg">{config.siteDescription}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/portfolio" className="inline-flex items-center gap-2 rounded-2xl bg-maroon px-5 py-3 font-semibold text-white">
                Explore Portfolio
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-2xl bg-maroon px-5 py-3 font-semibold text-white">
                <Instagram className="h-4 w-4" />
                Get Connect
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-6 h-24 w-24 rounded-full bg-maroon/10 blur-3xl" />
            <BannerSlider
              desktopImages={bannerSettings.desktopImages}
              mobileImages={bannerSettings.mobileImages}
              fallbackImages={fallbackBannerImages}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-maroon">Selected Arts</p>
            <h2 className="mt-2 font-heading text-3xl text-maroon sm:text-5xl">Featured Portfolio</h2>
          </div>
          <Link href="/portfolio" className="hidden rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-white md:inline-flex">
            View all
          </Link>
        </div>
        <PortfolioGallery arts={resolvedFeaturedArts} instagramLink={config.instagramLink} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-maroon/15 bg-maroon p-6 text-white shadow-luxe">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/65">Curatorial Process</p>
            <h2 className="mt-3 max-w-xl font-heading text-4xl sm:text-5xl">Built like a quiet gallery visit, not a crowded feed.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/78">
              Each collection is arranged with attention to pacing, negative space, and tonal contrast so paintings feel intentional on screen and in person.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { icon: Brush, title: "Studio-led", text: "Original works, materials, and brush rhythm stay central to the presentation." },
                { icon: Frame, title: "Collector-ready", text: "Lead images, clean sequencing, and detail views support serious browsing." },
                { icon: WandSparkles, title: "Story-driven", text: "Exhibitions are framed as visual narratives, not only simple listings." }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-[1.5rem] border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                    <Icon className="h-5 w-5 text-paper" />
                    <h3 className="mt-4 font-heading text-2xl">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/72">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="palette-glow overflow-hidden rounded-[2rem] border border-maroon/15 p-4 shadow-sm sm:p-5">
            <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
              <MediaImage
                src={accentImage}
                alt="Art detail"
                width={800}
                height={1000}
                className="h-full min-h-[280px] w-full rounded-[1.6rem] object-cover"
              />
              <div className="flex flex-col justify-between rounded-[1.6rem] border border-maroon/12 bg-white/65 p-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.32em] text-rosewood">Visual Direction</p>
                  <h3 className="mt-3 font-heading text-4xl text-maroon">Cherry velvet depth, champagne light, rosewood quiet.</h3>
                  <p className="mt-4 text-sm leading-7 text-maroon/70">
                    The palette draws warmth from intimate interior tones and translates them into a gallery setting that feels polished, calm, and memorable.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.28em] text-maroon/70">
                  <span className="rounded-full border border-maroon/15 bg-paper px-3 py-2">Paintings</span>
                  <span className="rounded-full border border-maroon/15 bg-paper px-3 py-2">Exhibitions</span>
                  <span className="rounded-full border border-maroon/15 bg-paper px-3 py-2">Custom Curation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-maroon/15 bg-maroon p-6 text-white">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/60">About Art Cabin</p>
            <h2 className="mt-3 font-heading text-4xl">A calm visual gallery for contemporary work.</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/80">{config.aboutText}</p>
            <Link href="/about" className="mt-6 inline-flex rounded-2xl bg-white px-5 py-3 font-semibold text-maroon">
              Read About
            </Link>
          </div>

          <div className="soft-card rounded-[2rem] border border-maroon/15 p-6 shadow-sm">
            <p className="text-[11px] uppercase tracking-[0.35em] text-maroon">Exhibitions</p>
            <h2 className="mt-3 font-heading text-4xl text-maroon">Recent Stories</h2>
            <div className="mt-5 grid gap-4">
              {featuredExhibitions.map((exhibition) => (
                <Link
                  key={exhibition.id}
                  href={`/exhibition/${exhibition.slug}`}
                  className="grid gap-4 rounded-[1.5rem] border border-maroon/15 bg-white/70 p-4 transition hover:border-maroon sm:grid-cols-[140px_1fr]"
                >
                  <MediaImage
                    src={Array.isArray(exhibition.images) ? String(exhibition.images[0] || "") : ""}
                    alt={exhibition.title}
                    width={400}
                    height={300}
                    className="h-32 w-full rounded-2xl object-cover"
                  />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-maroon">#{exhibition.orderNumber}</p>
                    <h3 className="mt-2 font-heading text-2xl text-maroon">{exhibition.title}</h3>
                    {exhibition.description ? <p className="mt-2 line-clamp-3 text-sm leading-6 text-maroon/72">{exhibition.description}</p> : null}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-maroon/10 bg-maroon py-4 text-paper">
        <div className="marquee gap-8 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.38em]">
          {Array.from({ length: 2 }).map((_, row) =>
            ["Original Paintings", "Curated Exhibitions", "Private Commissions", "Collector Conversations", "Instagram-first Presentation", "Quiet Luxury Palette"].map((item, index) => (
              <span key={`${row}-${index}`} className="inline-flex items-center gap-8">
                <span>{item}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-paper/70" />
              </span>
            ))
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="soft-card rounded-[2rem] border border-maroon/15 p-6 shadow-sm">
            <p className="text-[11px] uppercase tracking-[0.35em] text-rosewood">Collector Services</p>
            <h2 className="mt-3 font-heading text-4xl text-maroon">A polished path from discovery to inquiry.</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                "Featured works stay front and center with dedicated lead imagery.",
                "Exhibition stories create context for collectors and interior projects.",
                "Instagram contact keeps outreach immediate and familiar."
              ].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-maroon/12 bg-white/72 p-4 text-sm leading-7 text-maroon/72">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-maroon/15 bg-[linear-gradient(135deg,rgba(244,231,215,0.95),rgba(166,120,121,0.34))] p-6 shadow-sm">
            <div className="absolute -right-8 top-6 h-40 w-40 rounded-full bg-maroon/10 blur-3xl" />
            <div className="relative grid gap-5 sm:grid-cols-[1fr_220px] sm:items-center">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-rosewood">Studio Note</p>
                <h2 className="mt-3 font-heading text-4xl text-maroon">Designed to feel editorial, tactile, and quietly premium.</h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-maroon/72">
                  Art Cabin pairs gallery pacing with social-first clarity, making it easy for viewers to move from a hero story to featured works and direct conversation without friction.
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-maroon/15 bg-maroon p-4 text-white shadow-sm">
                <div className="space-y-3">
                  <div className="rounded-[1.2rem] bg-white/10 p-3">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">Focus</p>
                    <p className="mt-2 font-heading text-2xl">Lead image quality</p>
                  </div>
                  <div className="rounded-[1.2rem] bg-white/10 p-3">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">Flow</p>
                    <p className="mt-2 font-heading text-2xl">Fast page transitions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
