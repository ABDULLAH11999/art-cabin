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
    title: "Golden Calligraphy",
    slug: "golden-calligraphy-1",
    description: "Elegant golden Arabic calligraphy on a deep crimson background, blending traditional script with contemporary flair.",
    paintingType: "Calligraphy",
    isFeatured: true,
    orderNumber: 1,
    images: ["/gallery/gallery-1.jpg"]
  },
  {
    id: "gallery-2",
    title: "Crimson Horizon",
    slug: "crimson-horizon-2",
    description: "A vivid oil painting capturing warm crimson tones melting into a quiet golden horizon at sunset.",
    paintingType: "Oil Painting",
    isFeatured: true,
    orderNumber: 2,
    images: ["/gallery/gallery-2.jpg"]
  },
  {
    id: "gallery-3",
    title: "Abstract Bloom",
    slug: "abstract-bloom-3",
    description: "Layered acrylic blooms in maroon and blush tones, exploring organic forms and delicate contrast.",
    paintingType: "Acrylic on Canvas",
    isFeatured: true,
    orderNumber: 3,
    images: ["/gallery/gallery-3.jpg"]
  },
  {
    id: "gallery-4",
    title: "Whispering Lines",
    slug: "whispering-lines-4",
    description: "Fine ink lines flowing across the canvas like whispered secrets, creating a rhythmic abstract composition.",
    paintingType: "Ink Drawing",
    isFeatured: true,
    orderNumber: 4,
    images: ["/gallery/gallery-4.jpg"]
  },
  {
    id: "gallery-5",
    title: "Terracotta Dreams",
    slug: "terracotta-dreams-5",
    description: "A mixed-media piece combining terracotta textures with hand-painted botanical motifs on recycled paper.",
    paintingType: "Mixed Media",
    isFeatured: true,
    orderNumber: 5,
    images: ["/gallery/gallery-5.jpg"]
  },
  {
    id: "gallery-6",
    title: "Velvet Dusk",
    slug: "velvet-dusk-6",
    description: "Rich velvet tones of deep maroon and midnight blue converge in this atmospheric oil painting evoking twilight.",
    paintingType: "Oil Painting",
    isFeatured: false,
    orderNumber: 6,
    images: ["/gallery/gallery-6.jpg"]
  },
  {
    id: "gallery-7",
    title: "Paper Bloom Study",
    slug: "paper-bloom-study-7",
    description: "A watercolor study of paper blooms, capturing the translucence and fragility of petals in soft washes.",
    paintingType: "Watercolor",
    isFeatured: false,
    orderNumber: 7,
    images: ["/gallery/gallery-7.jpg"]
  },
  {
    id: "gallery-8",
    title: "Geometry of Silence",
    slug: "geometry-of-silence-8",
    description: "Bold geometric shapes in muted earth tones create a meditative composition about empty space and balance.",
    paintingType: "Acrylic on Canvas",
    isFeatured: true,
    orderNumber: 8,
    images: ["/gallery/gallery-8.jpg"]
  },
  {
    id: "gallery-9",
    title: "Amber Script",
    slug: "amber-script-9",
    description: "Flowing Arabic script rendered in amber and gold leaf on a dark walnut-toned background.",
    paintingType: "Calligraphy",
    isFeatured: false,
    orderNumber: 9,
    images: ["/gallery/gallery-9.jpg"]
  },
  {
    id: "gallery-10",
    title: "Orchid Reverie",
    slug: "orchid-reverie-10",
    description: "A large-scale oil painting of abstracted orchid forms in deep mauve and ivory, evoking quiet luxury.",
    paintingType: "Oil Painting",
    isFeatured: true,
    orderNumber: 10,
    images: ["/gallery/gallery-10.jpg"]
  },
  {
    id: "gallery-11",
    title: "Charcoal Figures",
    slug: "charcoal-figures-11",
    description: "Expressive charcoal figures captured mid-gesture, exploring human emotion through raw mark-making.",
    paintingType: "Charcoal Drawing",
    isFeatured: false,
    orderNumber: 11,
    images: ["/gallery/gallery-11.jpg"]
  },
  {
    id: "gallery-12",
    title: "Saffron Landscape",
    slug: "saffron-landscape-12",
    description: "A luminous watercolor landscape where saffron fields stretch under a hazy champagne sky.",
    paintingType: "Watercolor",
    isFeatured: false,
    orderNumber: 12,
    images: ["/gallery/gallery-12.jpg"]
  },
  {
    id: "gallery-13",
    title: "Midnight Botanica",
    slug: "midnight-botanica-13",
    description: "Dark botanical forms emerge from a midnight background, their edges highlighted with silver and teal accents.",
    paintingType: "Acrylic on Canvas",
    isFeatured: true,
    orderNumber: 13,
    images: ["/gallery/gallery-13.jpeg"]
  },
  {
    id: "gallery-14",
    title: "Copper Patina",
    slug: "copper-patina-14",
    description: "Oxidized copper textures layered with hand-torn paper and metallic paint, creating a tactile surface study.",
    paintingType: "Mixed Media",
    isFeatured: false,
    orderNumber: 14,
    images: ["/gallery/gallery-14.jpeg"]
  },
  {
    id: "gallery-15",
    title: "Ethereal Drift",
    slug: "ethereal-drift-15",
    description: "Soft gradients of pearl white and blush drift across the canvas like clouds at dawn, a study in lightness.",
    paintingType: "Oil Painting",
    isFeatured: false,
    orderNumber: 15,
    images: ["/gallery/gallery-15.jpeg"]
  },
  {
    id: "gallery-16",
    title: "Woven Traditions",
    slug: "woven-traditions-16",
    description: "A contemporary textile piece weaving traditional South Asian motifs with modern geometric patterns.",
    paintingType: "Textile Art",
    isFeatured: true,
    orderNumber: 16,
    images: ["/gallery/gallery-16.jpeg"]
  },
  {
    id: "gallery-17",
    title: "Maroon Monolith",
    slug: "maroon-monolith-17",
    description: "A monumental single-colour study in deep maroon, exploring texture, depth, and the psychology of colour.",
    paintingType: "Oil Painting",
    isFeatured: false,
    orderNumber: 17,
    images: ["/gallery/gallery-17.jpeg"]
  },
  {
    id: "gallery-18",
    title: "Porcelain Light",
    slug: "porcelain-light-18",
    description: "Delicate watercolor washes in porcelain white and soft grey create an airy, almost translucent composition.",
    paintingType: "Watercolor",
    isFeatured: false,
    orderNumber: 18,
    images: ["/gallery/gallery-18.jpeg"]
  },
  {
    id: "gallery-19",
    title: "Ember & Ash",
    slug: "ember-and-ash-19",
    description: "Burnt umber and charcoal tones collide with flashes of ember orange in this raw mixed-media piece.",
    paintingType: "Mixed Media",
    isFeatured: true,
    orderNumber: 19,
    images: ["/gallery/gallery-19.jpeg"]
  },
  {
    id: "gallery-20",
    title: "Silent Garden",
    slug: "silent-garden-20",
    description: "An intimate garden scene rendered in muted sage and dusty rose, inviting contemplation and quiet presence.",
    paintingType: "Acrylic on Canvas",
    isFeatured: false,
    orderNumber: 20,
    images: ["/gallery/gallery-20.jpeg"]
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
    const arts = await prisma.art.findMany({
      orderBy: [{ orderNumber: "asc" }, { createdAt: "desc" }],
      take: limit
    });
    if (arts.length > 0) return arts;
  } catch {}
  return fallbackArts.slice(0, limit || fallbackArts.length);
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
