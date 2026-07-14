import Link from "next/link";
import { ArrowRight, Instagram, Sparkles } from "lucide-react";
import { getSafeArts, getSafeExhibitions, getSafeSiteConfig } from "@/lib/art-content";
import { MediaImage } from "@/components/media-image";
import { BannerSlider } from "@/components/banner-slider";
import { getBannerSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [config, featuredArts, featuredExhibitions, bannerSettings] = await Promise.all([
    getSafeSiteConfig(),
    getSafeArts(3),
    getSafeExhibitions(2),
    getBannerSettings()
  ]);

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-6 lg:px-8 lg:pt-10">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
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
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-2xl bg-maroon px-5 py-3 font-semibold text-white">
                <Instagram className="h-4 w-4" />
                Get Connect
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-6 h-24 w-24 rounded-full bg-maroon/10 blur-3xl" />
            <BannerSlider desktopImages={bannerSettings.desktopImages} mobileImages={bannerSettings.mobileImages} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-maroon">Selected Arts</p>
            <h2 className="mt-2 font-heading text-3xl sm:text-5xl">Featured Portfolio</h2>
          </div>
          <Link href="/portfolio" className="hidden rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-white md:inline-flex">
            View all
          </Link>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredArts.map((art) => (
            <Link
              key={art.id}
              href={`/art/${art.slug}`}
              className="group overflow-hidden rounded-[2rem] border border-maroon/15 bg-white shadow-sm transition hover:-translate-y-1 hover:border-maroon"
            >
              <MediaImage
                src={Array.isArray(art.images) ? String(art.images[0] || "") : ""}
                alt={art.title}
                width={900}
                height={900}
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
              />
              <div className="p-5">
                <p className="text-[11px] uppercase tracking-[0.3em] text-maroon">
                  {art.paintingType} - #{art.orderNumber}
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
          <div className="rounded-[2rem] border border-maroon/15 bg-maroon p-6 text-white">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/60">About Art Cabin</p>
            <h2 className="mt-3 font-heading text-4xl">A calm visual gallery for contemporary work.</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/80">{config.aboutText}</p>
            <Link href="/about" className="mt-6 inline-flex rounded-2xl bg-white px-5 py-3 font-semibold text-maroon">
              Read About
            </Link>
          </div>

          <div className="rounded-[2rem] border border-maroon/15 bg-white p-6 shadow-sm">
            <p className="text-[11px] uppercase tracking-[0.35em] text-maroon">Exhibitions</p>
            <h2 className="mt-3 font-heading text-4xl">Recent Stories</h2>
            <div className="mt-5 grid gap-4">
              {featuredExhibitions.map((exhibition) => (
                <Link
                  key={exhibition.id}
                  href={`/exhibition/${exhibition.slug}`}
                  className="grid gap-4 rounded-[1.5rem] border border-maroon/15 bg-maroon/5 p-4 transition hover:border-maroon sm:grid-cols-[140px_1fr]"
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
