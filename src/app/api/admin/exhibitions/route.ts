import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { exhibitionSchema } from "@/lib/validators";
import { toSlug } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const exhibitions = await prisma.exhibition.findMany({
    orderBy: [{ orderNumber: "asc" }, { createdAt: "desc" }]
  });

  const nextOrderNumber = (exhibitions.at(-1)?.orderNumber || 0) + 1;
  return NextResponse.json({ exhibitions, nextOrderNumber });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  try {
    const payload = exhibitionSchema.parse(await request.json());
    const slug = toSlug(`${payload.title}-${payload.orderNumber}`);
    const exhibition = await prisma.exhibition.create({
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
    const message = error instanceof Error ? error.message : "Unable to create exhibition";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
