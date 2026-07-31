import { PrismaClient, AdminRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import { toSlug } from "../src/lib/utils";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("fatyma123!", 12);

  await prisma.adminUser.upsert({
    where: { username: "fatyma" },
    create: {
      username: "fatyma",
      email: "fatyma@artcabin.com",
      passwordHash,
      role: AdminRole.SUPERADMIN
    },
    update: {
      email: "fatyma@artcabin.com",
      passwordHash,
      role: AdminRole.SUPERADMIN
    }
  });

  const siteConfig = {
    siteTitle: "Art Cabin",
    siteDescription: "A contemporary art house curating paintings, exhibitions, and collector-led visual stories.",
    siteKeywords: "art cabin, paintings, exhibition, portfolio, maroon art, contemporary art",
    canonicalUrl: "http://localhost:3000",
    aboutText:
      "Art Cabin is a contemporary visual studio that shares original paintings, curated exhibitions, and custom art stories through a calm maroon-led identity. The practice brings together expressive brushwork, made-to-order pieces, and gallery-style presentation for collectors, interior spaces, and anyone drawn to thoughtful modern art.",
    contactEmail: "hello@artcabin.com",
    instagramLink: "https://instagram.com/",
    contactNumber: "+92 300 0000000"
  };

  await prisma.siteSettings.upsert({
    where: { key: "siteConfig" },
    create: { key: "siteConfig", value: JSON.stringify(siteConfig, null, 2) },
    update: { value: JSON.stringify(siteConfig, null, 2) }
  });

  await prisma.siteSettings.upsert({
    where: { key: "bannerSettings" },
    create: {
      key: "bannerSettings",
      value: JSON.stringify({ desktopImages: [], mobileImages: [] }, null, 2)
    },
    update: {
      value: JSON.stringify({ desktopImages: [], mobileImages: [] }, null, 2)
    }
  });

  const arts = [
    {
      title: "Golden Calligraphy",
      orderNumber: 1,
      paintingType: "Calligraphy",
      description: "Elegant golden Arabic calligraphy on a deep crimson background, blending traditional script with contemporary flair.",
      isFeatured: true,
      images: ["/gallery/gallery-1.jpg"]
    },
    {
      title: "Crimson Horizon",
      orderNumber: 2,
      paintingType: "Oil Painting",
      description: "A vivid oil painting capturing warm crimson tones melting into a quiet golden horizon at sunset.",
      isFeatured: true,
      images: ["/gallery/gallery-2.jpg"]
    },
    {
      title: "Abstract Bloom",
      orderNumber: 3,
      paintingType: "Acrylic on Canvas",
      description: "Layered acrylic blooms in maroon and blush tones, exploring organic forms and delicate contrast.",
      isFeatured: true,
      images: ["/gallery/gallery-3.jpg"]
    },
    {
      title: "Whispering Lines",
      orderNumber: 4,
      paintingType: "Ink Drawing",
      description: "Fine ink lines flowing across the canvas like whispered secrets, creating a rhythmic abstract composition.",
      isFeatured: true,
      images: ["/gallery/gallery-4.jpg"]
    },
    {
      title: "Terracotta Dreams",
      orderNumber: 5,
      paintingType: "Mixed Media",
      description: "A mixed-media piece combining terracotta textures with hand-painted botanical motifs on recycled paper.",
      isFeatured: true,
      images: ["/gallery/gallery-5.jpg"]
    },
    {
      title: "Velvet Dusk",
      orderNumber: 6,
      paintingType: "Oil Painting",
      description: "Rich velvet tones of deep maroon and midnight blue converge in this atmospheric oil painting evoking twilight.",
      isFeatured: false,
      images: ["/gallery/gallery-6.jpg"]
    },
    {
      title: "Paper Bloom Study",
      orderNumber: 7,
      paintingType: "Watercolor",
      description: "A watercolor study of paper blooms, capturing the translucence and fragility of petals in soft washes.",
      isFeatured: false,
      images: ["/gallery/gallery-7.jpg"]
    },
    {
      title: "Geometry of Silence",
      orderNumber: 8,
      paintingType: "Acrylic on Canvas",
      description: "Bold geometric shapes in muted earth tones create a meditative composition about empty space and balance.",
      isFeatured: true,
      images: ["/gallery/gallery-8.jpg"]
    },
    {
      title: "Amber Script",
      orderNumber: 9,
      paintingType: "Calligraphy",
      description: "Flowing Arabic script rendered in amber and gold leaf on a dark walnut-toned background.",
      isFeatured: false,
      images: ["/gallery/gallery-9.jpg"]
    },
    {
      title: "Orchid Reverie",
      orderNumber: 10,
      paintingType: "Oil Painting",
      description: "A large-scale oil painting of abstracted orchid forms in deep mauve and ivory, evoking quiet luxury.",
      isFeatured: true,
      images: ["/gallery/gallery-10.jpg"]
    },
    {
      title: "Charcoal Figures",
      orderNumber: 11,
      paintingType: "Charcoal Drawing",
      description: "Expressive charcoal figures captured mid-gesture, exploring human emotion through raw mark-making.",
      isFeatured: false,
      images: ["/gallery/gallery-11.jpg"]
    },
    {
      title: "Saffron Landscape",
      orderNumber: 12,
      paintingType: "Watercolor",
      description: "A luminous watercolor landscape where saffron fields stretch under a hazy champagne sky.",
      isFeatured: false,
      images: ["/gallery/gallery-12.jpg"]
    },
    {
      title: "Midnight Botanica",
      orderNumber: 13,
      paintingType: "Acrylic on Canvas",
      description: "Dark botanical forms emerge from a midnight background, their edges highlighted with silver and teal accents.",
      isFeatured: true,
      images: ["/gallery/gallery-13.jpeg"]
    },
    {
      title: "Copper Patina",
      orderNumber: 14,
      paintingType: "Mixed Media",
      description: "Oxidized copper textures layered with hand-torn paper and metallic paint, creating a tactile surface study.",
      isFeatured: false,
      images: ["/gallery/gallery-14.jpeg"]
    },
    {
      title: "Ethereal Drift",
      orderNumber: 15,
      paintingType: "Oil Painting",
      description: "Soft gradients of pearl white and blush drift across the canvas like clouds at dawn, a study in lightness.",
      isFeatured: false,
      images: ["/gallery/gallery-15.jpeg"]
    },
    {
      title: "Woven Traditions",
      orderNumber: 16,
      paintingType: "Textile Art",
      description: "A contemporary textile piece weaving traditional South Asian motifs with modern geometric patterns.",
      isFeatured: true,
      images: ["/gallery/gallery-16.jpeg"]
    },
    {
      title: "Maroon Monolith",
      orderNumber: 17,
      paintingType: "Oil Painting",
      description: "A monumental single-colour study in deep maroon, exploring texture, depth, and the psychology of colour.",
      isFeatured: false,
      images: ["/gallery/gallery-17.jpeg"]
    },
    {
      title: "Porcelain Light",
      orderNumber: 18,
      paintingType: "Watercolor",
      description: "Delicate watercolor washes in porcelain white and soft grey create an airy, almost translucent composition.",
      isFeatured: false,
      images: ["/gallery/gallery-18.jpeg"]
    },
    {
      title: "Ember & Ash",
      orderNumber: 19,
      paintingType: "Mixed Media",
      description: "Burnt umber and charcoal tones collide with flashes of ember orange in this raw mixed-media piece.",
      isFeatured: true,
      images: ["/gallery/gallery-19.jpeg"]
    },
    {
      title: "Silent Garden",
      orderNumber: 20,
      paintingType: "Acrylic on Canvas",
      description: "An intimate garden scene rendered in muted sage and dusty rose, inviting contemplation and quiet presence.",
      isFeatured: false,
      images: ["/gallery/gallery-20.jpeg"]
    }
  ];

  for (const art of arts) {
    const slug = toSlug(`${art.title}-${art.orderNumber}`);
    await prisma.art.upsert({
      where: { slug },
      create: {
        ...art,
        slug
      },
      update: {
        ...art,
        slug
      }
    });
  }

  const exhibitions = [
    {
      title: "Into the Quiet Room",
      orderNumber: 1,
      description:
        "A curated exhibition concept around stillness, shadow, and intimate visual pacing across a compact gallery experience.",
      images: ["/ui-images/exhibition-1.svg", "/ui-images/exhibition-2.svg"]
    },
    {
      title: "Gesture and Light",
      orderNumber: 2,
      description:
        "An exhibition narrative built on bold maroon accents, white space, and the emotional rhythm of contemporary painting.",
      images: ["/ui-images/exhibition-3.svg"]
    }
  ];

  for (const exhibition of exhibitions) {
    await prisma.exhibition.upsert({
      where: { slug: toSlug(`${exhibition.title}-${exhibition.orderNumber}`) },
      create: {
        ...exhibition,
        slug: toSlug(`${exhibition.title}-${exhibition.orderNumber}`)
      },
      update: {
        ...exhibition,
        slug: toSlug(`${exhibition.title}-${exhibition.orderNumber}`)
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
