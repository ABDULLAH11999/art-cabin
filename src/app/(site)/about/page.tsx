import { getSiteConfig } from "@/lib/settings";
import { MediaImage } from "@/components/media-image";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const config = await getSiteConfig();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-black/45">About</p>
          <h1 className="mt-3 font-heading text-5xl leading-none sm:text-7xl">Art Cabin</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-black/65 sm:text-lg">{config.aboutText}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              "Maroon, white, and black visual direction",
              "Curated art module with image galleries",
              "Exhibition stories with clean editorial presentation"
            ].map((item) => (
              <div key={item} className="rounded-[1.5rem] border border-black/10 bg-white p-4 text-sm text-black/65 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-black/10 shadow-luxe">
          <MediaImage src="/ui-images/exhibition-1.svg" alt="Art Cabin about" width={900} height={900} className="h-[520px] w-full object-cover" />
        </div>
      </div>
    </div>
  );
}
