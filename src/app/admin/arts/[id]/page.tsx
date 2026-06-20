import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ContentForm } from "@/components/admin/content-form";

export const dynamic = "force-dynamic";

export default async function EditArtPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const art = await prisma.art.findUnique({ where: { id } });
  if (!art) return notFound();

  return (
    <ContentForm
      resource="arts"
      id={art.id}
      nextOrderNumber={art.orderNumber}
      initialData={{
        title: art.title,
        description: art.description,
        paintingType: art.paintingType,
        orderNumber: art.orderNumber,
        images: Array.isArray(art.images) ? art.images.map(String) : []
      }}
    />
  );
}
