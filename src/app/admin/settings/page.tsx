import { prisma } from "@/lib/prisma";
import { SettingsManager } from "@/components/admin/settings-manager";
import { getSiteConfig } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const [stored, fallback] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { key: "siteConfig" } }),
    getSiteConfig()
  ]);

  const initialSettings = stored ? { ...fallback, ...JSON.parse(stored.value) } : fallback;
  return <SettingsManager initialSettings={initialSettings} />;
}
