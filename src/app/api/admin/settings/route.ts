import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { siteConfigSchema } from "@/lib/validators";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const SETTINGS_KEY = "siteConfig";

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const record = await prisma.siteSettings.findUnique({ where: { key: SETTINGS_KEY } });
  const fallback = {
    siteTitle: "Art Cabin",
    siteDescription: "A contemporary art house curating paintings, exhibitions, and collector-led visual stories.",
    siteKeywords: "art cabin, paintings, exhibition, portfolio, maroon art, contemporary art",
    canonicalUrl: "",
    aboutText:
      "Art Cabin is a focused space for paintings and exhibition storytelling, combining gallery presentation with a refined digital experience.",
    contactEmail: "hello@artcabin.com",
    instagramLink: "https://instagram.com/",
    contactNumber: "+92 300 0000000"
  };
  return NextResponse.json(record ? { ...fallback, ...JSON.parse(record.value) } : fallback);
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  try {
    const payload = siteConfigSchema.parse(await request.json());
    await prisma.siteSettings.upsert({
      where: { key: SETTINGS_KEY },
      create: { key: SETTINGS_KEY, value: JSON.stringify(payload, null, 2) },
      update: { value: JSON.stringify(payload, null, 2) }
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save settings";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
