import { prisma } from "@/lib/prisma";
import { getSiteConfig } from "@/lib/settings";

export type ArtContent = {
  id: string;
  title: string;
  slug: string;
  description: string;
  paintingType: string;
  orderNumber: number;
  images: string[];
};

export type ExhibitionContent = {
  id: string;
  title: string;
  slug: string;
  description: string;
  orderNumber: number;
  images: string[];
};

export const fallbackArts: ArtContent[] = [
  {
    id: "fallback-art-1",
    title: "Quiet Maroon Horizon",
    slug: "quiet-maroon-horizon-1",
    description: "An atmospheric composition balancing maroon light with layered charcoal strokes and a calm paper-white negative space.",
    paintingType: "Acrylic on Canvas",
    orderNumber: 1,
    images: ["/ui-images/art-1.svg", "/ui-images/art-2.svg"]
  },
  {
    id: "fallback-art-2",
    title: "Paper Bloom Study",
    slug: "paper-bloom-study-2",
    description: "A textured piece built around gesture, shadow, and delicate contrast to evoke the softness of paper and paint.",
    paintingType: "Mixed Media",
    orderNumber: 2,
    images: ["/ui-images/art-3.svg"]
  }
];

export const fallbackExhibitions: ExhibitionContent[] = [
  {
    id: "fallback-exhibition-1",
    title: "Into the Quiet Room",
    slug: "into-the-quiet-room-1",
    description: "A curated exhibition concept around stillness, shadow, and intimate visual pacing across a compact gallery experience.",
    orderNumber: 1,
    images: ["/ui-images/exhibition-1.svg", "/ui-images/exhibition-2.svg"]
  },
  {
    id: "fallback-exhibition-2",
    title: "Gesture and Light",
    slug: "gesture-and-light-2",
    description: "An exhibition narrative built on bold maroon accents, white space, and the emotional rhythm of contemporary painting.",
    orderNumber: 2,
    images: ["/ui-images/exhibition-3.svg"]
  }
];

export async function getSafeSiteConfig() {
  return getSiteConfig();
}

export async function getSafeArts(limit?: number) {
  try {
    return await prisma.art.findMany({
      orderBy: [{ orderNumber: "asc" }, { createdAt: "desc" }],
      take: limit
    });
  } catch {
    return fallbackArts.slice(0, limit || fallbackArts.length);
  }
}

export async function getSafeExhibitions(limit?: number) {
  try {
    return await prisma.exhibition.findMany({
      orderBy: [{ orderNumber: "asc" }, { createdAt: "desc" }],
      take: limit
    });
  } catch {
    return fallbackExhibitions.slice(0, limit || fallbackExhibitions.length);
  }
}

export async function getSafeArtBySlug(slug: string) {
  try {
    return await prisma.art.findUnique({ where: { slug } });
  } catch {
    return fallbackArts.find((item) => item.slug === slug) || null;
  }
}

export async function getSafeExhibitionBySlug(slug: string) {
  try {
    return await prisma.exhibition.findUnique({ where: { slug } });
  } catch {
    return fallbackExhibitions.find((item) => item.slug === slug) || null;
  }
}

