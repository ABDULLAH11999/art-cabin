import { prisma } from "@/lib/prisma";
import { safeJsonParse } from "@/lib/utils";

export type SettingValue = string | number | boolean | Record<string, unknown> | unknown[];

export async function getSetting<T extends SettingValue = SettingValue>(key: string, fallback: T) {
  try {
    const record = await prisma.siteSettings.findUnique({ where: { key } });
    if (!record) return fallback;
    const parsed = safeJsonParse<T>(record.value, record.value as unknown as T);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export async function getSettingsMap() {
  try {
    const rows = await prisma.siteSettings.findMany();
    return rows.reduce<Record<string, string>>((acc, row) => {
      acc[row.key] = row.value;
      return acc;
    }, {});
  } catch {
    return {};
  }
}

export async function upsertSettings(values: Record<string, string>) {
  await prisma.$transaction(
    Object.entries(values).map(([key, value]) =>
      prisma.siteSettings.upsert({
        where: { key },
        create: { key, value },
        update: { value }
      })
    )
  );
}

export type SiteConfig = {
  siteTitle: string;
  siteDescription: string;
  siteKeywords: string;
  canonicalUrl: string;
  aboutText: string;
  contactEmail: string;
  instagramLink: string;
  contactNumber: string;
};

export type BannerSettings = {
  desktopImages: string[];
  mobileImages: string[];
};

const defaultSiteConfig: SiteConfig = {
  siteTitle: "Art Cabin",
  siteDescription: "A contemporary art house curating original paintings, exhibitions, and visual stories through a refined maroon-led identity.",
  siteKeywords: "art cabin, paintings, exhibition, portfolio, contemporary art, maroon art",
  canonicalUrl: "",
  aboutText:
    "Art Cabin is a contemporary visual studio that shares original paintings, curated exhibitions, and custom art stories through a calm maroon-led identity. The practice brings together expressive brushwork, made-to-order pieces, and gallery-style presentation for collectors, interior spaces, and anyone drawn to thoughtful modern art.",
  contactEmail: "hello@artcabin.com",
  instagramLink: "https://instagram.com/",
  contactNumber: "+92 300 0000000"
};

const defaultBannerSettings: BannerSettings = {
  desktopImages: [],
  mobileImages: []
};

export async function getSiteConfig() {
  const config = await getSetting<SiteConfig>("siteConfig", defaultSiteConfig);
  return { ...defaultSiteConfig, ...config };
}

export async function getBannerSettings() {
  const settings = await getSetting<BannerSettings>("bannerSettings", defaultBannerSettings);

  return {
    desktopImages: Array.isArray(settings.desktopImages) ? settings.desktopImages : [],
    mobileImages: Array.isArray(settings.mobileImages) ? settings.mobileImages : []
  };
}
