"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Download } from "lucide-react";

type SiteConfig = {
  siteTitle: string;
  siteDescription: string;
  siteKeywords: string;
  canonicalUrl: string;
  aboutText: string;
  contactEmail: string;
  instagramLink: string;
  contactNumber: string;
};

export function SettingsManager({ initialSettings }: { initialSettings: SiteConfig }) {
  const [config, setConfig] = useState<SiteConfig>(initialSettings);
  const [saving, setSaving] = useState(false);
  const [backingUp, setBackingUp] = useState(false);

  async function save() {
    setSaving(true);
    const response = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config)
    });
    setSaving(false);
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      toast.error(data.error || "Unable to save settings");
      return;
    }
    toast.success("Settings saved");
  }

  async function downloadBackup() {
    setBackingUp(true);
    const response = await fetch("/api/admin/backup-db");
    setBackingUp(false);
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      toast.error(data.error || "Unable to download backup");
      return;
    }
    const blob = await response.blob();
    const disposition = response.headers.get("content-disposition") || "";
    const match = disposition.match(/filename="([^"]+)"/i);
    const filename = match?.[1] || "art-cabin-backup.json";
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.URL.revokeObjectURL(url);
    toast.success("Backup download started");
  }

  const inputClass = "rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-maroon";

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] uppercase tracking-[0.35em] text-black/45">Settings</p>
        <h1 className="mt-2 font-heading text-3xl sm:text-5xl">Art Cabin Settings</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-[2rem] border border-black/10 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="font-heading text-2xl">Site Meta</h2>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-black/60">Site Title</span>
              <input value={config.siteTitle} onChange={(e) => setConfig({ ...config, siteTitle: e.target.value })} className={inputClass} />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-black/60">Site Description</span>
              <textarea
                rows={4}
                value={config.siteDescription}
                onChange={(e) => setConfig({ ...config, siteDescription: e.target.value })}
                className={inputClass}
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-black/60">Keywords</span>
              <input value={config.siteKeywords} onChange={(e) => setConfig({ ...config, siteKeywords: e.target.value })} className={inputClass} />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-black/60">Canonical URL</span>
              <input value={config.canonicalUrl} onChange={(e) => setConfig({ ...config, canonicalUrl: e.target.value })} className={inputClass} />
            </label>
          </div>
        </section>

        <section className="rounded-[2rem] border border-black/10 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="font-heading text-2xl">Business Info</h2>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-black/60">About Page Text</span>
              <textarea rows={5} value={config.aboutText} onChange={(e) => setConfig({ ...config, aboutText: e.target.value })} className={inputClass} />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-black/60">Contact Email</span>
              <input value={config.contactEmail} onChange={(e) => setConfig({ ...config, contactEmail: e.target.value })} className={inputClass} />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-black/60">Instagram Connect Link</span>
              <input value={config.instagramLink} onChange={(e) => setConfig({ ...config, instagramLink: e.target.value })} className={inputClass} />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-black/60">Contact Number</span>
              <input value={config.contactNumber} onChange={(e) => setConfig({ ...config, contactNumber: e.target.value })} className={inputClass} />
            </label>
          </div>
        </section>
      </div>

      <section className="rounded-[2rem] border border-black/10 bg-black p-4 text-white shadow-sm sm:p-6">
        <h2 className="font-heading text-2xl">Database Backup</h2>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-white/65">
          Download a JSON backup of the Art Cabin database, including settings, admin users, arts, exhibitions, and the legacy watch-store tables.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={downloadBackup}
            disabled={backingUp}
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-black disabled:opacity-60"
          >
            <Download className="h-4 w-4" />
            {backingUp ? "Preparing Backup..." : "Backup DB"}
          </button>
        </div>
      </section>

      <div className="flex justify-stretch sm:justify-end">
        <button onClick={save} disabled={saving} className="rounded-2xl bg-maroon px-6 py-3 font-semibold text-white disabled:opacity-60">
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
