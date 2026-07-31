"use client";

import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import { MediaImage } from "@/components/media-image";

export interface ArtItem {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  paintingType: string;
  orderNumber: number;
  images: any;
}

interface ArtDetailModalProps {
  art: ArtItem | null;
  arts: ArtItem[];
  onClose: () => void;
  onSelectArt: (art: ArtItem) => void;
  instagramLink?: string;
}

export function ArtDetailModal({ art, arts, onClose, onSelectArt, instagramLink = "https://instagram.com/" }: ArtDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!art) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        navigateArt(-1);
      } else if (e.key === "ArrowRight") {
        navigateArt(1);
      }
    };

    if (art) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [art, arts]);

  if (!art) return null;

  const images = Array.isArray(art.images) ? art.images.map(String) : [];
  const mainImage = images[0] || "";

  const currentIndex = arts.findIndex((item) => item.id === art.id);

  const navigateArt = (direction: number) => {
    if (currentIndex === -1 || arts.length <= 1) return;
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = arts.length - 1;
    if (nextIndex >= arts.length) nextIndex = 0;
    onSelectArt(arts[nextIndex]);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 sm:p-6 backdrop-blur-sm transition-opacity duration-200 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-2xl transition-all dark:bg-zinc-950 border border-maroon/15"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 focus:outline-none"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Navigation Arrows */}
        {arts.length > 1 && (
          <>
            <button
              onClick={() => navigateArt(-1)}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition hover:bg-black/80 focus:outline-none"
              aria-label="Previous artwork"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => navigateArt(1)}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition hover:bg-black/80 focus:outline-none"
              aria-label="Next artwork"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Main Content Area */}
        <div className="flex flex-col">
          {/* Image Container */}
          <div className="relative flex max-h-[70vh] min-h-[300px] w-full items-center justify-center bg-zinc-900/90 overflow-hidden">
            <MediaImage
              src={mainImage}
              alt={art.title}
              width={1600}
              height={1600}
              className="max-h-[70vh] w-auto max-w-full object-contain p-2"
            />
          </div>

          {/* Details below image */}
          <div className="p-6 sm:p-8 bg-cream/30 dark:bg-zinc-900/50 border-t border-black/5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full bg-maroon/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-maroon">
                {art.paintingType || "Oil Painting"}
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-black/50 dark:text-white/50">
                Piece #{art.orderNumber}
              </span>
            </div>

            <h2 className="mt-3 font-heading text-3xl sm:text-4xl text-maroon dark:text-white">
              {art.title}
            </h2>

            {art.description ? (
              <p className="mt-3 text-base leading-relaxed text-black/70 dark:text-white/70">
                {art.description}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-maroon/10">
              <div className="text-xs text-maroon/70 dark:text-white/60">
                Interested in this artwork or custom pieces?
              </div>
              <a
                href={instagramLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-maroon px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-maroon/90"
              >
                <Instagram className="h-4 w-4" />
                Connect on Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
