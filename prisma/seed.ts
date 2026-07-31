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
      title: "Gallery 1",
      orderNumber: 1,
      paintingType: "Oil Painting",
      description: "",
      isFeatured: true,
      images: ["https://raw.githubusercontent.com/fatyma-irfan/Portfolio/main/assets/img/gallery/gallery-1.jpg"]
    },
    {
      title: "Gallery 2",
      orderNumber: 2,
      paintingType: "Oil Painting",
      description: "",
      isFeatured: true,
      images: ["https://raw.githubusercontent.com/fatyma-irfan/Portfolio/main/assets/img/gallery/gallery-2.jpg"]
    },
    {
      title: "Gallery 3",
      orderNumber: 3,
      paintingType: "Oil Painting",
      description: "",
      isFeatured: true,
      images: ["https://raw.githubusercontent.com/fatyma-irfan/Portfolio/main/assets/img/gallery/gallery-3.jpg"]
    },
    {
      title: "Gallery 4",
      orderNumber: 4,
      paintingType: "Oil Painting",
      description: "",
      isFeatured: true,
      images: ["https://raw.githubusercontent.com/fatyma-irfan/Portfolio/main/assets/img/gallery/gallery-4.jpg"]
    },
    {
      title: "Gallery 5",
      orderNumber: 5,
      paintingType: "Oil Painting",
      description: "",
      isFeatured: true,
      images: ["https://raw.githubusercontent.com/fatyma-irfan/Portfolio/main/assets/img/gallery/gallery-5.jpg"]
    },
    {
      title: "Gallery 6",
      orderNumber: 6,
      paintingType: "Oil Painting",
      description: "",
      isFeatured: true,
      images: ["https://raw.githubusercontent.com/fatyma-irfan/Portfolio/main/assets/img/gallery/gallery-6.jpg"]
    },
    {
      title: "Gallery 7",
      orderNumber: 7,
      paintingType: "Oil Painting",
      description: "",
      isFeatured: true,
      images: ["https://raw.githubusercontent.com/fatyma-irfan/Portfolio/main/assets/img/gallery/gallery-7.jpg"]
    },
    {
      title: "Gallery 8",
      orderNumber: 8,
      paintingType: "Oil Painting",
      description: "",
      isFeatured: true,
      images: ["https://raw.githubusercontent.com/fatyma-irfan/Portfolio/main/assets/img/gallery/gallery-8.jpg"]
    },
    {
      title: "Gallery 9",
      orderNumber: 9,
      paintingType: "Oil Painting",
      description: "",
      isFeatured: true,
      images: ["https://raw.githubusercontent.com/fatyma-irfan/Portfolio/main/assets/img/gallery/gallery-9.jpg"]
    },
    {
      title: "Gallery 10",
      orderNumber: 10,
      paintingType: "Oil Painting",
      description: "",
      isFeatured: true,
      images: ["https://raw.githubusercontent.com/fatyma-irfan/Portfolio/main/assets/img/gallery/gallery-10.jpg"]
    },
    {
      title: "Gallery 11",
      orderNumber: 11,
      paintingType: "Oil Painting",
      description: "",
      isFeatured: true,
      images: ["https://raw.githubusercontent.com/fatyma-irfan/Portfolio/main/assets/img/gallery/gallery-11.jpg"]
    },
    {
      title: "Gallery 12",
      orderNumber: 12,
      paintingType: "Oil Painting",
      description: "",
      isFeatured: true,
      images: ["https://raw.githubusercontent.com/fatyma-irfan/Portfolio/main/assets/img/gallery/gallery-12.jpg"]
    }
  ];

  for (const art of arts) {
    const slug = toSlug(art.title);
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
