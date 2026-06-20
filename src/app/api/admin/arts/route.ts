import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { artSchema } from "@/lib/validators";
import { toSlug } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const arts = await prisma.art.findMany({
    orderBy: [{ orderNumber: "asc" }, { createdAt: "desc" }]
  });

  const nextOrderNumber = (arts.at(-1)?.orderNumber || 0) + 1;
  return NextResponse.json({ arts, nextOrderNumber });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  try {
    const payload = artSchema.parse(await request.json());
    const slug = toSlug(`${payload.title}-${payload.orderNumber}`);
    const art = await prisma.art.create({
      data: {
        title: payload.title,
        description: payload.description,
        paintingType: payload.paintingType,
        orderNumber: payload.orderNumber,
        images: payload.images,
        slug
      }
    });
    return NextResponse.json({ art });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create art";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
