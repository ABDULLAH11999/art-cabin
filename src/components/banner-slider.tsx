"use client";

import { useEffect, useState } from "react";
import { MediaImage } from "@/components/media-image";

type BannerSliderProps = {
  desktopImages: string[];
  mobileImages: string[];
};

function useRotatingIndex(total: number) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (total <= 1) {
      setActiveIndex(0);
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [total]);

  return activeIndex;
}

function BannerTrack({
  images,
  activeIndex,
  className
}: {
  images: string[];
  activeIndex: number;
  className: string;
}) {
  return (
    <div className={className}>
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={`${image}-${index}`} className="relative h-full min-w-full overflow-hidden">
            <MediaImage src={image} alt={`Art Cabin banner ${index + 1}`} fill className="object-cover" sizes="100vw" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function BannerSlider({ desktopImages, mobileImages }: BannerSliderProps) {
  const desktopActiveIndex = useRotatingIndex(desktopImages.length);
  const mobileActiveIndex = useRotatingIndex(mobileImages.length);

  if (!desktopImages.length && !mobileImages.length) {
    return (
      <div className="relative overflow-hidden rounded-[2.5rem] border border-maroon/15 bg-[radial-gradient(circle_at_top,_rgba(110,31,52,0.18),_transparent_40%),linear-gradient(180deg,#fff,#f6ecef)] p-8 shadow-luxe">
        <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-maroon/10 blur-3xl" />
        <div className="relative flex min-h-[320px] flex-col justify-end rounded-[2rem] border border-maroon/15 bg-white/80 p-6 backdrop-blur-sm sm:min-h-[420px]">
          <p className="text-[11px] uppercase tracking-[0.35em] text-black/45">Maroon Visual Story</p>
          <h2 className="mt-3 font-heading text-4xl text-maroon sm:text-5xl">Add desktop and mobile banners from the admin panel.</h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-black/65">
            Once images are added, this hero area will rotate them every 3 seconds without a full page refresh.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {desktopImages.length ? (
        <div className="relative hidden overflow-hidden rounded-[2.5rem] border border-maroon/15 bg-white shadow-luxe md:block">
          <BannerTrack images={desktopImages} activeIndex={desktopActiveIndex} className="relative h-[540px] w-full" />
          {desktopImages.length > 1 ? (
            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-white/85 px-3 py-2 backdrop-blur-sm">
              {desktopImages.map((image, index) => (
                <span key={`${image}-desktop-dot`} className={`h-2.5 w-2.5 rounded-full ${index === desktopActiveIndex ? "bg-maroon" : "bg-maroon/25"}`} />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {mobileImages.length ? (
        <div className="relative overflow-hidden rounded-[2rem] border border-maroon/15 bg-white shadow-luxe md:hidden">
          <BannerTrack images={mobileImages} activeIndex={mobileActiveIndex} className="relative h-[420px] w-full" />
          {mobileImages.length > 1 ? (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-white/85 px-3 py-2 backdrop-blur-sm">
              {mobileImages.map((image, index) => (
                <span key={`${image}-mobile-dot`} className={`h-2.5 w-2.5 rounded-full ${index === mobileActiveIndex ? "bg-maroon" : "bg-maroon/25"}`} />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {!mobileImages.length && desktopImages.length ? (
        <div className="rounded-2xl border border-maroon/15 bg-maroon/5 p-4 text-sm text-black/60 md:hidden">
          Mobile banner not added yet. Desktop banner is active.
        </div>
      ) : null}

      {!desktopImages.length && mobileImages.length ? (
        <div className="hidden rounded-2xl border border-maroon/15 bg-maroon/5 p-4 text-sm text-black/60 md:block">
          Desktop banner not added yet. Mobile banner is active.
        </div>
      ) : null}
    </div>
  );
}
