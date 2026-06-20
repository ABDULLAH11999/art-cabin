import { prisma } from "@/lib/prisma";
import { ContentForm } from "@/components/admin/content-form";

export const dynamic = "force-dynamic";

export default async function NewExhibitionPage() {
  const exhibitions = await prisma.exhibition.findMany({
    orderBy: [{ orderNumber: "asc" }, { createdAt: "desc" }]
  });
  const nextOrderNumber = (exhibitions.at(-1)?.orderNumber || 0) + 1;

  return <ContentForm resource="exhibitions" nextOrderNumber={nextOrderNumber} />;
}
