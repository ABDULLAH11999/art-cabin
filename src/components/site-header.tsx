"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Palette, Instagram } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/exhibition", label: "Exhibition" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-maroon/10 transition-all ${
        scrolled ? "bg-maroon/95 backdrop-blur-xl shadow-sm" : "bg-maroon"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white shadow-luxe">
            <Palette className="h-5 w-5" />
          </div>
          <span className="block font-heading text-xl font-semibold tracking-wide text-white">Art Cabin</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-white transition hover:text-white/70">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden items-center gap-2 rounded-full border border-white/35 bg-paper px-4 py-2 text-sm font-semibold text-maroon transition hover:bg-white sm:inline-flex"
          >
            <Instagram className="h-4 w-4" />
            Get Connected
          </Link>
          <button className="text-white md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-maroon px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-paper px-4 py-3 text-sm font-semibold text-maroon"
            onClick={() => setOpen(false)}
          >
            <Instagram className="h-4 w-4" />
            Get Connected
          </Link>
        </div>
      ) : null}
    </header>
  );
}
