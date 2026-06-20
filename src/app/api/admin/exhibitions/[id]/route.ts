import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { exhibitionSchema } from "@/lib/validators";
import { toSlug } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const { id } = params;
  const exhibition = await prisma.exhibition.findUnique({ where: { id } });
  if (!exhibition) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ exhibition });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  try {
    const { id } = params;
    const payload = exhibitionSchema.parse(await request.json());
    const slug = toSlug(`${payload.title}-${payload.orderNumber}`);
    const exhibition = await prisma.exhibition.update({
      where: { id },
      data: {
        title: payload.title,
        description: payload.description,
        orderNumber: payload.orderNumber,
        images: payload.images,
        slug
      }
    });
    return NextResponse.json({ exhibition });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update exhibition";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const { id } = params;
  await prisma.exhibition.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
