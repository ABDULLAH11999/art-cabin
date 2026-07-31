import { prisma } from "@/lib/prisma";
import { getSiteConfig } from "@/lib/settings";

export type ArtContent = {
  id: string;
  title: string;
  slug: string;
  description: string;
  paintingType: string;
  isFeatured: boolean;
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
    id: "gallery-1",
    title: "Gallery 1",
    slug: "gallery-1",
    description: "",
    paintingType: "Oil Painting",
    isFeatured: true,
    orderNumber: 1,
    images: ["https://raw.githubusercontent.com/fatyma-irfan/Portfolio/main/assets/img/gallery/gallery-1.jpg"]
  },
  {
    id: "gallery-2",
    title: "Gallery 2",
    slug: "gallery-2",
    description: "",
    paintingType: "Oil Painting",
    isFeatured: true,
    orderNumber: 2,
    images: ["https://raw.githubusercontent.com/fatyma-irfan/Portfolio/main/assets/img/gallery/gallery-2.jpg"]
  },
  {
    id: "gallery-3",
    title: "Gallery 3",
    slug: "gallery-3",
    description: "",
    paintingType: "Oil Painting",
    isFeatured: true,
    orderNumber: 3,
    images: ["https://raw.githubusercontent.com/fatyma-irfan/Portfolio/main/assets/img/gallery/gallery-3.jpg"]
  },
  {
    id: "gallery-4",
    title: "Gallery 4",
    slug: "gallery-4",
    description: "",
    paintingType: "Oil Painting",
    isFeatured: true,
    orderNumber: 4,
    images: ["https://raw.githubusercontent.com/fatyma-irfan/Portfolio/main/assets/img/gallery/gallery-4.jpg"]
  },
  {
    id: "gallery-5",
    title: "Gallery 5",
    slug: "gallery-5",
    description: "",
    paintingType: "Oil Painting",
    isFeatured: true,
    orderNumber: 5,
    images: ["https://raw.githubusercontent.com/fatyma-irfan/Portfolio/main/assets/img/gallery/gallery-5.jpg"]
  },
  {
    id: "gallery-6",
    title: "Gallery 6",
    slug: "gallery-6",
    description: "",
    paintingType: "Oil Painting",
    isFeatured: true,
    orderNumber: 6,
    images: ["https://raw.githubusercontent.com/fatyma-irfan/Portfolio/main/assets/img/gallery/gallery-6.jpg"]
  },
  {
    id: "gallery-7",
    title: "Gallery 7",
    slug: "gallery-7",
    description: "",
    paintingType: "Oil Painting",
    isFeatured: true,
    orderNumber: 7,
    images: ["https://raw.githubusercontent.com/fatyma-irfan/Portfolio/main/assets/img/gallery/gallery-7.jpg"]
  },
  {
    id: "gallery-8",
    title: "Gallery 8",
    slug: "gallery-8",
    description: "",
    paintingType: "Oil Painting",
    isFeatured: true,
    orderNumber: 8,
    images: ["https://raw.githubusercontent.com/fatyma-irfan/Portfolio/main/assets/img/gallery/gallery-8.jpg"]
  },
  {
    id: "gallery-9",
    title: "Gallery 9",
    slug: "gallery-9",
    description: "",
    paintingType: "Oil Painting",
    isFeatured: true,
    orderNumber: 9,
    images: ["https://raw.githubusercontent.com/fatyma-irfan/Portfolio/main/assets/img/gallery/gallery-9.jpg"]
  },
  {
    id: "gallery-10",
    title: "Gallery 10",
    slug: "gallery-10",
    description: "",
    paintingType: "Oil Painting",
    isFeatured: true,
    orderNumber: 10,
    images: ["https://raw.githubusercontent.com/fatyma-irfan/Portfolio/main/assets/img/gallery/gallery-10.jpg"]
  },
  {
    id: "gallery-11",
    title: "Gallery 11",
    slug: "gallery-11",
    description: "",
    paintingType: "Oil Painting",
    isFeatured: true,
    orderNumber: 11,
    images: ["https://raw.githubusercontent.com/fatyma-irfan/Portfolio/main/assets/img/gallery/gallery-11.jpg"]
  },
  {
    id: "gallery-12",
    title: "Gallery 12",
    slug: "gallery-12",
    description: "",
    paintingType: "Oil Painting",
    isFeatured: true,
    orderNumber: 12,
    images: ["https://raw.githubusercontent.com/fatyma-irfan/Portfolio/main/assets/img/gallery/gallery-12.jpg"]
  }
];

export const fallbackExhibitions: ExhibitionContent[] = [
  {
    id: "fallback-exhibition-1",
    title: "Into the Quiet Room",
    slug: "into-the-quiet-room-1",
    description: "A curated exhibition concept shaped around stillness, shadow, and intimate pacing across a compact gallery experience.",
    orderNumber: 1,
    images: ["/ui-images/exhibition-1.svg", "/ui-images/exhibition-2.svg"]
  },
  {
    id: "fallback-exhibition-2",
    title: "Gesture and Light",
    slug: "gesture-and-light-2",
    description: "An exhibition narrative built on maroon accents, white space, and the emotional rhythm of contemporary painting.",
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

export async function getSafeFeaturedArts(limit?: number) {
  try {
    const arts = await prisma.art.findMany({
      where: { isFeatured: true },
      orderBy: [{ orderNumber: "asc" }, { createdAt: "desc" }],
      take: limit
    });

    if (arts.length) {
      return arts;
    }
  } catch {}

  const fallbackFeatured = fallbackArts.filter((art) => art.isFeatured);
  return fallbackFeatured.slice(0, limit || fallbackFeatured.length);
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
