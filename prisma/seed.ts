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
      "Art Cabin is a focused space for paintings and exhibition storytelling, combining gallery presentation with a refined digital experience.",
    contactEmail: "hello@artcabin.com",
    instagramLink: "https://instagram.com/",
    contactNumber: "+92 300 0000000"
  };

  await prisma.siteSettings.upsert({
    where: { key: "siteConfig" },
    create: { key: "siteConfig", value: JSON.stringify(siteConfig, null, 2) },
    update: { value: JSON.stringify(siteConfig, null, 2) }
  });

  const arts = [
    {
      title: "Quiet Maroon Horizon",
      orderNumber: 1,
      paintingType: "Acrylic on Canvas",
      description:
        "An atmospheric composition balancing maroon light with layered charcoal strokes and a calm paper-white negative space.",
      images: ["/ui-images/art-1.svg", "/ui-images/art-2.svg"]
    },
    {
      title: "Paper Bloom Study",
      orderNumber: 2,
      paintingType: "Mixed Media",
      description:
        "A textured piece built around gesture, shadow, and delicate contrast to evoke the softness of paper and paint.",
      images: ["/ui-images/art-3.svg"]
    }
  ];

  for (const art of arts) {
    await prisma.art.upsert({
      where: { slug: toSlug(`${art.title}-${art.orderNumber}`) },
      create: {
        ...art,
        slug: toSlug(`${art.title}-${art.orderNumber}`)
      },
      update: {
        ...art,
        slug: toSlug(`${art.title}-${art.orderNumber}`)
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
