"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Plus, Upload, X } from "lucide-react";
import { useMediaUploader } from "@/components/media-uploader";

type Resource = "arts" | "exhibitions";

type ContentFormProps = {
  resource: Resource;
  id?: string;
  initialData?: {
    title?: string;
    description?: string;
    paintingType?: string;
    orderNumber?: number;
    images?: string[];
  };
  nextOrderNumber: number;
};

export function ContentForm({ resource, id, initialData, nextOrderNumber }: ContentFormProps) {
  const router = useRouter();
  const isArt = resource === "arts";
  const endpoint = useMemo(() => `/api/admin/${resource}${id ? `/${id}` : ""}`, [resource, id]);
  const { uploadFiles, uploading } = useMediaUploader(resource);

  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [paintingType, setPaintingType] = useState(initialData?.paintingType || "");
  const [orderNumber, setOrderNumber] = useState(String(initialData?.orderNumber || nextOrderNumber));
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [manualImage, setManualImage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!images.length && initialData?.images?.length) {
      setImages(initialData.images);
    }
  }, [images.length, initialData?.images]);

  async function handleFilesChange(event: React.ChangeEvent<HTMLInputElement>) {
    const urls = await uploadFiles(event.target.files);
    if (urls.length) {
      setImages((current) => [...current, ...urls]);
    }
    event.target.value = "";
  }

  function addManualImage() {
    const value = manualImage.trim();
    if (!value) return;
    setImages((current) => [...current, value]);
    setManualImage("");
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!images.length) {
      toast.error("Please add at least one image.");
      return;
    }
    if (isArt && !paintingType.trim()) {
      toast.error("Painting type is required.");
      return;
    }

    setSaving(true);
    const response = await fetch(endpoint, {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        paintingType: isArt ? paintingType : undefined,
        orderNumber: Number(orderNumber),
        images
      })
    });
    setSaving(false);

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      toast.error(data.error || `Unable to ${id ? "update" : "create"} item`);
      return;
    }

    toast.success(`Art Cabin ${resource === "arts" ? "art" : "exhibition"} saved`);
    router.push(`/admin/${resource}`);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <section className="rounded-[2rem] border border-black/10 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-black/45">Content</p>
            <h1 className="mt-2 font-heading text-3xl sm:text-4xl">{id ? "Update entry" : "Create entry"}</h1>
          </div>
          <div className="rounded-full bg-maroon px-3 py-2 text-xs font-semibold text-white">
            {resource === "arts" ? "Art Piece" : "Exhibition"}
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-black/60">Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-maroon"
              placeholder={isArt ? "Quiet Maroon Horizon" : "Into the Quiet Room"}
            />
          </label>

          {isArt ? (
            <label className="grid gap-2">
              <span className="text-sm font-medium text-black/60">Painting Type</span>
              <input
                value={paintingType}
                onChange={(e) => setPaintingType(e.target.value)}
                className="rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-maroon"
                placeholder="Acrylic on Canvas"
              />
            </label>
          ) : null}

          <label className="grid gap-2">
            <span className="text-sm font-medium text-black/60">Order Number</span>
            <input
              type="number"
              min={1}
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-maroon"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-black/60">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
              className="rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-maroon"
              placeholder="Describe the artwork or exhibition story..."
            />
          </label>
        </div>
      </section>

      <aside className="space-y-6">
        <section className="rounded-[2rem] border border-black/10 bg-black p-4 text-white shadow-sm sm:p-6">
          <h2 className="font-heading text-2xl">Images</h2>
          <p className="mt-1 text-sm text-white/65">Upload files or paste image URLs. The first image becomes the lead visual in the UI.</p>

          <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-white/15 bg-white/5 px-4 py-8 text-center transition hover:border-white/30">
            <Upload className="h-6 w-6" />
            <span className="mt-2 text-sm font-semibold">Upload images</span>
            <span className="mt-1 text-xs text-white/50">{uploading ? "Uploading..." : "PNG, JPG, WebP"}</span>
            <input type="file" accept="image/*" multiple onChange={handleFilesChange} className="hidden" />
          </label>

          <div className="mt-4 flex gap-2">
            <input
              value={manualImage}
              onChange={(e) => setManualImage(e.target.value)}
              placeholder="Paste image URL"
              className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
            />
            <button type="button" onClick={addManualImage} className="rounded-2xl bg-white px-4 py-3 font-semibold text-black">
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-5 grid gap-3">
            {images.length ? (
              images.map((image, index) => (
                <div key={`${image}-${index}`} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-2">
                  <img src={image} alt="" className="h-14 w-14 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{image}</p>
                    <p className="text-xs text-white/45">Image {index + 1}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setImages((current) => current.filter((_, currentIndex) => currentIndex !== index))}
                    className="rounded-xl border border-white/10 p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-sm text-white/55">
                Add at least one image to publish this entry.
              </div>
            )}
          </div>
        </section>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 rounded-2xl bg-maroon px-5 py-4 font-semibold text-white transition hover:bg-maroonSoft disabled:opacity-60"
          >
            {saving ? "Saving..." : id ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-2xl border border-black/10 px-5 py-4 font-semibold text-black transition hover:border-maroon hover:text-maroon"
          >
            Cancel
          </button>
        </div>
      </aside>
    </form>
  );
}
