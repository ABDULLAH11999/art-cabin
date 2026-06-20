import { prisma } from "@/lib/prisma";
import { ContentForm } from "@/components/admin/content-form";

export const dynamic = "force-dynamic";

export default async function NewArtPage() {
  const arts = await prisma.art.findMany({
    orderBy: [{ orderNumber: "asc" }, { createdAt: "desc" }]
  });
  const nextOrderNumber = (arts.at(-1)?.orderNumber || 0) + 1;

  return <ContentForm resource="arts" nextOrderNumber={nextOrderNumber} />;
}
