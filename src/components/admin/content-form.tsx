"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowDown, ArrowUp, GripVertical, ImagePlus, Plus, Upload, X } from "lucide-react";
import { useMediaUploader } from "@/components/media-uploader";

type Resource = "arts" | "exhibitions";

type ContentFormProps = {
  resource: Resource;
  id?: string;
  initialData?: {
    title?: string;
    description?: string;
    paintingType?: string;
    isFeatured?: boolean;
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
  const [isFeatured, setIsFeatured] = useState(Boolean(initialData?.isFeatured));
  const [orderNumber, setOrderNumber] = useState(String(initialData?.orderNumber || nextOrderNumber));
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [manualImage, setManualImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

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

  function moveImage(index: number, direction: "up" | "down") {
    setImages((current) => {
      const nextIndex = direction === "up" ? index - 1 : index + 1;
      if (nextIndex < 0 || nextIndex >= current.length) {
        return current;
      }

      const next = [...current];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      return next;
    });
  }

  function reorderImage(fromIndex: number, toIndex: number) {
    if (fromIndex === toIndex) return;

    setImages((current) => {
      const next = [...current];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
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
        isFeatured: isArt ? isFeatured : false,
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
      <section className="rounded-[2rem] border border-maroon/15 bg-white/90 p-4 shadow-sm backdrop-blur-sm sm:p-6">
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
            <>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-black/60">Painting Type</span>
                <input
                  value={paintingType}
                  onChange={(e) => setPaintingType(e.target.value)}
                  className="rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-maroon"
                  placeholder="Acrylic on Canvas"
                />
              </label>

              <label className="flex items-start gap-3 rounded-[1.5rem] border border-maroon/15 bg-maroon/5 px-4 py-4">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-maroon/30 text-maroon focus:ring-maroon"
                />
                <span>
                  <span className="block text-sm font-semibold text-maroon">Featured Post</span>
                  <span className="mt-1 block text-sm leading-6 text-black/60">
                    Show this art inside featured sections and use its main image as a banner fallback when no banner image is added.
                  </span>
                </span>
              </label>
            </>
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
              placeholder="Optional curatorial note, material details, or story..."
            />
            <span className="text-xs text-black/45">You can leave this empty if you only want to show the title, images, and painting details.</span>
          </label>
        </div>
      </section>

      <aside className="space-y-6">
        <section className="rounded-[2rem] border border-maroon/15 bg-[linear-gradient(180deg,rgba(109,31,43,0.96),rgba(166,120,121,0.96))] p-4 text-white shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-heading text-2xl">Images</h2>
              <p className="mt-1 text-sm text-white/72">
                Upload files or paste image URLs. Image 1 becomes the lead visual on cards, detail pages, and banner fallback.
              </p>
            </div>
            <div className="shrink-0 rounded-full border border-white/20 bg-white/10 p-3">
              <ImagePlus className="h-5 w-5" />
            </div>
          </div>

          <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-white/30 bg-white/95 p-5 text-center text-maroon transition hover:border-white hover:bg-white sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-maroon text-white shadow-sm">
              <Upload className="h-5 w-5" />
            </div>
            <span className="mt-3 text-sm font-semibold">Choose art images</span>
            <span className="mt-1 text-xs text-maroon/70">{uploading ? "Uploading..." : "PNG, JPG, WebP up to your configured upload limit"}</span>
            <input type="file" accept="image/*" multiple onChange={handleFilesChange} className="hidden" />
          </label>

          <div className="mt-4 flex gap-2">
            <input
              value={manualImage}
              onChange={(e) => setManualImage(e.target.value)}
              placeholder="Paste image URL"
              className="min-w-0 flex-1 rounded-2xl border border-white/20 bg-white px-4 py-3 text-sm text-black outline-none placeholder:text-black/35 focus:ring-2 focus:ring-white/30"
            />
            <button
              type="button"
              onClick={addManualImage}
              className="flex shrink-0 items-center gap-1.5 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-maroon transition hover:bg-white/90"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add URL</span>
            </button>
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-white/15 bg-white/10 p-3 sm:p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-white">Display Sequence</p>
                <p className="text-xs text-white/60">Drag images or use arrows to control order.</p>
              </div>
              <div className="shrink-0 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/75">
                {images.length} image{images.length === 1 ? "" : "s"}
              </div>
            </div>

            <div className="mt-4 grid gap-3">
              {images.length ? (
                images.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    draggable
                    onDragStart={() => setDraggedIndex(index)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => {
                      if (draggedIndex !== null) {
                        reorderImage(draggedIndex, index);
                      }
                      setDraggedIndex(null);
                    }}
                    onDragEnd={() => setDraggedIndex(null)}
                    className={`flex flex-col gap-3 rounded-2xl border bg-white p-3 text-black shadow-sm transition sm:flex-row sm:items-center ${
                      draggedIndex === index ? "border-maroon/40 ring-2 ring-maroon/15" : "border-white/20"
                    }`}
                  >
                    {/* Top Row on Mobile: Index Badge & Reorder / Delete Actions */}
                    <div className="flex items-center justify-between gap-2 border-b border-black/5 pb-2 sm:border-b-0 sm:pb-0">
                      <div className="flex items-center gap-2 rounded-xl bg-maroon/5 px-2.5 py-1 text-maroon">
                        <GripVertical className="h-4 w-4 shrink-0 text-maroon/50" />
                        <span className="text-xs font-bold leading-none">#{index + 1}</span>
                        {index === 0 ? (
                          <span className="rounded-md bg-maroon px-1.5 py-0.5 text-[10px] font-semibold text-white">
                            Primary
                          </span>
                        ) : null}
                      </div>

                      {/* Touch-friendly controls for mobile */}
                      <div className="flex items-center gap-1.5 sm:hidden">
                        <button
                          type="button"
                          onClick={() => moveImage(index, "up")}
                          disabled={index === 0}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-maroon/15 text-maroon transition hover:bg-maroon/5 disabled:cursor-not-allowed disabled:opacity-30"
                          aria-label={`Move image ${index + 1} up`}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveImage(index, "down")}
                          disabled={index === images.length - 1}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-maroon/15 text-maroon transition hover:bg-maroon/5 disabled:cursor-not-allowed disabled:opacity-30"
                          aria-label={`Move image ${index + 1} down`}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setImages((current) => current.filter((_, currentIndex) => currentIndex !== index))}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100"
                          aria-label={`Remove image ${index + 1}`}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Image Thumbnail and Details */}
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <img src={image} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover sm:h-16 sm:w-16" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium text-black/90 sm:text-sm">{image}</p>
                        <p className="mt-0.5 text-[11px] text-black/50">
                          {index === 0 ? "Lead visual for cards & banners" : `Image ${index + 1}`}
                        </p>
                      </div>
                    </div>

                    {/* Desktop Controls */}
                    <div className="hidden items-center gap-2 sm:flex">
                      <div className="flex flex-col gap-1">
                        <button
                          type="button"
                          onClick={() => moveImage(index, "up")}
                          disabled={index === 0}
                          className="rounded-lg border border-maroon/15 p-1.5 text-maroon transition hover:bg-maroon/5 disabled:cursor-not-allowed disabled:opacity-35"
                          aria-label={`Move image ${index + 1} up`}
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveImage(index, "down")}
                          disabled={index === images.length - 1}
                          className="rounded-lg border border-maroon/15 p-1.5 text-maroon transition hover:bg-maroon/5 disabled:cursor-not-allowed disabled:opacity-35"
                          aria-label={`Move image ${index + 1} down`}
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => setImages((current) => current.filter((_, currentIndex) => currentIndex !== index))}
                        className="rounded-xl border border-red-200 bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                        aria-label={`Remove image ${index + 1}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-6 text-center text-sm text-white/75">
                  Add at least one image to publish this entry.
                </div>
              )}
            </div>
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
