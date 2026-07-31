"use client";

import { useState } from "react";
import { MediaImage } from "@/components/media-image";
import { ArtDetailModal, type ArtItem } from "@/components/portfolio/art-detail-modal";
import { Maximize2 } from "lucide-react";

interface PortfolioGalleryProps {
  arts: ArtItem[];
  instagramLink?: string;
}

export function PortfolioGallery({ arts, instagramLink }: PortfolioGalleryProps) {
  const [selectedArt, setSelectedArt] = useState<ArtItem | null>(null);

  return (
    <>
      <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {arts.map((art) => {
          const images = Array.isArray(art.images) ? art.images.map(String) : [];
          const mainImage = images[0] || "";

          return (
            <div
              key={art.id}
              onClick={() => setSelectedArt(art)}
              className="group relative cursor-pointer overflow-hidden rounded-[1.8rem] border border-maroon/15 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-maroon hover:shadow-xl dark:bg-zinc-900"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5">
                <MediaImage
                  src={mainImage}
                  alt={art.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover overlay button */}
                <div className="absolute inset-0 bg-maroon/20 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-maroon shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Maximize2 className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-maroon/80">
                    {art.paintingType || "Oil Painting"}
                  </span>
                  <span className="text-[11px] font-semibold text-black/40 dark:text-white/40">
                    #{art.orderNumber}
                  </span>
                </div>
                <h3 className="mt-1.5 font-heading text-xl text-maroon dark:text-white transition-colors group-hover:text-maroon">
                  {art.title}
                </h3>
                {art.description ? (
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-maroon/70 dark:text-white/70">
                    {art.description}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Detail View Modal */}
      <ArtDetailModal
        art={selectedArt}
        arts={arts}
        onClose={() => setSelectedArt(null)}
        onSelectArt={(art) => setSelectedArt(art)}
        instagramLink={instagramLink}
      />
    </>
  );
}
