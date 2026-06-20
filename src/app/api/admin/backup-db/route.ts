import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const payload = {
    exportedAt: new Date().toISOString(),
    adminUsers: await prisma.adminUser.findMany(),
    siteSettings: await prisma.siteSettings.findMany(),
    arts: await prisma.art.findMany(),
    exhibitions: await prisma.exhibition.findMany(),
    sequences: await prisma.sequence.findMany(),
    products: await prisma.product.findMany().catch(() => []),
    orders: await prisma.order.findMany().catch(() => []),
    customers: await prisma.customer.findMany().catch(() => []),
    testimonials: await prisma.testimonial.findMany().catch(() => []),
    emailLogs: await prisma.emailLog.findMany().catch(() => [])
  };

  return new NextResponse(JSON.stringify(payload, null, 2), {
    headers: {
      "content-type": "application/json",
      "content-disposition": `attachment; filename="art-cabin-backup-${Date.now()}.json"`
    }
  });
}
