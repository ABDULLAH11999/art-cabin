import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Palette, GalleryHorizontal, Settings2, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

function StatCard({
  label,
  value,
  href
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <Link href={href} className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-maroon">
      <p className="text-[11px] uppercase tracking-[0.35em] text-black/45">{label}</p>
      <div className="mt-3 font-heading text-4xl">{value}</div>
    </Link>
  );
}

export default async function AdminDashboardPage() {
  const [artCount, exhibitionCount, settingsCount, recentArts, recentExhibitions] = await Promise.all([
    prisma.art.count().catch(() => 0),
    prisma.exhibition.count().catch(() => 0),
    prisma.siteSettings.count().catch(() => 0),
    prisma.art.findMany({ orderBy: { createdAt: "desc" }, take: 3 }).catch(() => []),
    prisma.exhibition.findMany({ orderBy: { createdAt: "desc" }, take: 3 }).catch(() => [])
  ]);

  return (
    <div className="space-y-6 md:space-y-8">
      <section className="rounded-[2rem] border border-black/10 bg-[radial-gradient(circle_at_top,_rgba(110,31,52,0.12),_transparent_42%),linear-gradient(180deg,#fff,#f9f6f4)] p-5 shadow-sm md:p-8">
        <div className="max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.4em] text-black/45">Dashboard</p>
          <h1 className="mt-3 font-heading text-4xl leading-tight md:text-6xl">Art Cabin Management</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-black/60 md:text-base">
            Manage the curated settings, art portfolio, and exhibitions from a calm maroon-and-white admin workspace.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/admin/arts/new" className="inline-flex items-center gap-2 rounded-2xl bg-maroon px-5 py-3 font-semibold text-white">
            <Palette className="h-4 w-4" />
            Create Art
          </Link>
          <Link href="/admin/exhibitions/new" className="inline-flex items-center gap-2 rounded-2xl border border-maroon px-5 py-3 font-semibold text-maroon">
            <GalleryHorizontal className="h-4 w-4" />
            Create Exhibition
          </Link>
          <Link href="/admin/settings" className="inline-flex items-center gap-2 rounded-2xl border border-black/10 px-5 py-3 font-semibold text-black">
            <Settings2 className="h-4 w-4" />
            Update Settings
          </Link>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Arts" value={String(artCount)} href="/admin/arts" />
        <StatCard label="Exhibitions" value={String(exhibitionCount)} href="/admin/exhibitions" />
        <StatCard label="Settings Rows" value={String(settingsCount)} href="/admin/settings" />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] border border-black/10 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl">Recent Arts</h2>
            <Sparkles className="h-5 w-5 text-maroon" />
          </div>
          <div className="mt-5 grid gap-3">
            {recentArts.map((art) => (
              <Link key={art.id} href={`/admin/arts/${art.id}`} className="rounded-2xl border border-black/10 px-4 py-4 transition hover:border-maroon">
                <p className="text-sm font-semibold">{art.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-black/45">
                  {art.paintingType} • #{art.orderNumber}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl">Recent Exhibitions</h2>
            <GalleryHorizontal className="h-5 w-5 text-maroon" />
          </div>
          <div className="mt-5 grid gap-3">
            {recentExhibitions.map((exhibition) => (
              <Link key={exhibition.id} href={`/admin/exhibitions/${exhibition.id}`} className="rounded-2xl border border-black/10 px-4 py-4 transition hover:border-maroon">
                <p className="text-sm font-semibold">{exhibition.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-black/45">#{exhibition.orderNumber}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
