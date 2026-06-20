"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export function DeleteButton({ endpoint }: { endpoint: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    if (!confirm("Delete this item?")) return;
    setLoading(true);
    const response = await fetch(endpoint, { method: "DELETE" });
    setLoading(false);
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      toast.error(data.error || "Delete failed");
      return;
    }
    toast.success("Deleted");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={onDelete}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-2xl border border-black/10 px-4 py-2 text-sm font-semibold text-black transition hover:border-maroon hover:text-maroon disabled:opacity-60"
    >
      <Trash2 className="h-4 w-4" />
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
