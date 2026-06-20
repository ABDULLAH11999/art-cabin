import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { artSchema } from "@/lib/validators";
import { toSlug } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const { id } = params;
  const art = await prisma.art.findUnique({ where: { id } });
  if (!art) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ art });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  try {
    const { id } = params;
    const payload = artSchema.parse(await request.json());
    const slug = toSlug(`${payload.title}-${payload.orderNumber}`);
    const art = await prisma.art.update({
      where: { id },
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
    const message = error instanceof Error ? error.message : "Unable to update art";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const { id } = params;
  await prisma.art.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
