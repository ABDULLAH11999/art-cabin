"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Instagram, Phone, Mail } from "lucide-react";

type SiteConfig = {
  siteTitle?: string;
  siteDescription?: string;
  siteKeywords?: string;
  canonicalUrl?: string;
  aboutText?: string;
  contactEmail?: string;
  instagramLink?: string;
  contactNumber?: string;
};

export function SiteFooter() {
  const [config, setConfig] = useState<SiteConfig>({});

  useEffect(() => {
    fetch("/api/settings/business")
      .then((response) => response.json())
      .then((data) => setConfig(data))
      .catch(() => undefined);
  }, []);

  return (
    <footer className="border-t border-black/10 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <div className="font-heading text-3xl text-white">{config.siteTitle || "Art Cabin"}</div>
          <p className="max-w-sm text-sm leading-6 text-white/70">
            {config.aboutText ||
              "A contemporary art house curating paintings and exhibitions for collectors, admirers, and creative spaces."}
          </p>
        </div>
        <div>
          <h3 className="mb-4 font-heading text-xl text-white">Explore</h3>
          <div className="flex flex-col gap-2 text-sm text-white/75">
            <Link href="/about">About</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/exhibition">Exhibition</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-heading text-xl text-white">Contact</h3>
          <div className="space-y-3 text-sm text-white/75">
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-maroonSoft" />
              {config.contactNumber || "Phone not set"}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-maroonSoft" />
              {config.contactEmail || "Email not set"}
            </p>
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-heading text-xl text-white">Social</h3>
          <div className="flex gap-3 text-white/75">
            <Link
              href={config.instagramLink || "#"}
              aria-label="Instagram"
              target={config.instagramLink ? "_blank" : undefined}
              rel={config.instagramLink ? "noreferrer" : undefined}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 transition hover:border-maroon hover:bg-maroon"
            >
              <Instagram className="h-4 w-4" />
              Instagram
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Art Cabin. All rights reserved.
      </div>
    </footer>
  );
}
