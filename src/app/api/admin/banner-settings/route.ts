import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { bannerSettingsSchema } from "@/lib/validators";
import { getBannerSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

const SETTINGS_KEY = "bannerSettings";

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const settings = await getBannerSettings();
  return NextResponse.json(settings);
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  try {
    const payload = bannerSettingsSchema.parse(await request.json());
    await prisma.siteSettings.upsert({
      where: { key: SETTINGS_KEY },
      create: { key: SETTINGS_KEY, value: JSON.stringify(payload, null, 2) },
      update: { value: JSON.stringify(payload, null, 2) }
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save banner settings";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
