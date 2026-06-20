import { getSiteConfig, getSetting } from "@/lib/settings";

export type SeoSettings = {
  siteTitle: string;
  titleTemplate: string;
  metaDescription: string;
  canonicalUrl: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  headerScripts: string;
  footerScripts: string;
  robotsTxt: string;
};

const defaultSeoSettings: SeoSettings = {
  siteTitle: "Art Cabin",
  titleTemplate: "%s | Art Cabin",
  metaDescription: "Art Cabin is a curated art house for paintings, exhibitions, and collector-led visual stories.",
  canonicalUrl: "",
  metaKeywords: "Art Cabin, paintings, exhibition, portfolio, maroon art, contemporary art",
  ogTitle: "Art Cabin",
  ogDescription: "Art Cabin is a curated art house for paintings, exhibitions, and collector-led visual stories.",
  ogImage: "",
  headerScripts: "",
  footerScripts: "",
  robotsTxt: ""
};

export function getSiteUrl(seo?: Partial<SeoSettings>) {
  const configured = seo?.canonicalUrl?.trim();
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const fallback = configured || envUrl || "https://artcabin.com";
  try {
    const normalized = new URL(fallback);
    return normalized.origin;
  } catch {
    return "https://artcabin.com";
  }
}

export async function getSeoSettings() {
  const site = await getSiteConfig();
  const seo = await getSetting<Partial<SeoSettings>>("seoSettings", {});
  return {
    ...defaultSeoSettings,
    ...seo,
    siteTitle: site.siteTitle || seo.siteTitle || defaultSeoSettings.siteTitle,
    titleTemplate: seo.titleTemplate || `%s | ${site.siteTitle || defaultSeoSettings.siteTitle}`,
    metaDescription: site.siteDescription || seo.metaDescription || defaultSeoSettings.metaDescription,
    canonicalUrl: site.canonicalUrl || seo.canonicalUrl || defaultSeoSettings.canonicalUrl,
    metaKeywords: site.siteKeywords || seo.metaKeywords || defaultSeoSettings.metaKeywords,
    ogTitle: site.siteTitle || seo.ogTitle || defaultSeoSettings.ogTitle,
    ogDescription: site.siteDescription || seo.ogDescription || defaultSeoSettings.ogDescription
  };
}
