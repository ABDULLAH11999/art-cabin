import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteButton } from "@/components/admin/delete-button";
import { MediaImage } from "@/components/media-image";
import { ChevronRight, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ExhibitionsPage() {
  const exhibitions = await prisma.exhibition.findMany({
    orderBy: [{ orderNumber: "asc" }, { createdAt: "desc" }]
  });
  const nextOrderNumber = (exhibitions.at(-1)?.orderNumber || 0) + 1;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-[2rem] border border-black/10 bg-white p-4 shadow-sm sm:flex-row sm:items-end sm:justify-between sm:p-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-black/45">Exhibitions</p>
          <h1 className="mt-2 font-heading text-3xl sm:text-4xl">Exhibition Cards</h1>
          <p className="mt-2 max-w-2xl text-sm text-black/55">Manage title, image gallery, description, slug order, and content sequencing.</p>
        </div>
        <Link href="/admin/exhibitions/new" className="inline-flex items-center gap-2 rounded-2xl bg-maroon px-5 py-3 font-semibold text-white">
          <Plus className="h-4 w-4" />
          New Exhibition #{nextOrderNumber}
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {exhibitions.map((exhibition) => (
          <article key={exhibition.id} className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm">
            <div className="relative grid h-56 grid-cols-1 overflow-hidden bg-black/5">
              <MediaImage src={Array.isArray(exhibition.images) ? String(exhibition.images[0] || "") : ""} alt={exhibition.title} fill className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-black/45">#{exhibition.orderNumber}</p>
                  <h2 className="mt-2 font-heading text-2xl">{exhibition.title}</h2>
                </div>
              </div>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-black/60">{exhibition.description}</p>

              <div className="mt-5 flex items-center justify-between gap-3">
                <Link href={`/admin/exhibitions/${exhibition.id}`} className="inline-flex items-center gap-2 rounded-2xl border border-black/10 px-4 py-2 text-sm font-semibold">
                  Edit
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <DeleteButton endpoint={`/api/admin/exhibitions/${exhibition.id}`} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
