import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import { getSeoSettings, getSiteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"]
});

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings();
  const siteUrl = getSiteUrl(seo);
  const ogImage = seo.ogImage?.trim();
  const defaultLogoUrl = `${siteUrl}/art-cabin-icon.svg`;
  const resolvedOgImage = ogImage
    ? ogImage.startsWith("http")
      ? ogImage
      : `${siteUrl}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}`
    : defaultLogoUrl;

  return {
    metadataBase: new URL(siteUrl),
    icons: {
      icon: "/art-cabin-icon.svg",
      apple: "/art-cabin-icon.svg"
    },
    title: {
      default: seo.siteTitle || "Art Cabin",
      template: seo.titleTemplate || "%s | Art Cabin"
    },
    description: seo.metaDescription,
    keywords: seo.metaKeywords
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean),
    alternates: {
      canonical: siteUrl
    },
    openGraph: {
      title: seo.ogTitle || seo.siteTitle || "Art Cabin",
      description: seo.ogDescription || seo.metaDescription,
      url: siteUrl,
      siteName: seo.siteTitle || "Art Cabin",
      images: [
        {
          url: resolvedOgImage,
          width: 1200,
          height: 630,
          alt: seo.ogTitle || seo.siteTitle || "Art Cabin"
        }
      ],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle || seo.siteTitle || "Art Cabin",
      description: seo.ogDescription || seo.metaDescription,
      images: [resolvedOgImage]
    }
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
