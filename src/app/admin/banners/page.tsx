import { BannerManager } from "@/components/admin/banner-manager";
import { getBannerSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function AdminBannersPage() {
  const initialSettings = await getBannerSettings();
  return <BannerManager initialSettings={initialSettings} />;
}
