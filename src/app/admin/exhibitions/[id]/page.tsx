import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ContentForm } from "@/components/admin/content-form";

export const dynamic = "force-dynamic";

export default async function EditExhibitionPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const exhibition = await prisma.exhibition.findUnique({ where: { id } });
  if (!exhibition) return notFound();

  return (
    <ContentForm
      resource="exhibitions"
      id={exhibition.id}
      nextOrderNumber={exhibition.orderNumber}
      initialData={{
        title: exhibition.title,
        description: exhibition.description,
        orderNumber: exhibition.orderNumber,
        images: Array.isArray(exhibition.images) ? exhibition.images.map(String) : []
      }}
    />
  );
}
