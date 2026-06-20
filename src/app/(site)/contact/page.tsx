import { getSiteConfig } from "@/lib/settings";
import { Mail, Instagram, Phone } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const config = await getSiteConfig();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
      <p className="text-[11px] uppercase tracking-[0.35em] text-black/45">Contact</p>
      <h1 className="mt-3 font-heading text-5xl leading-none sm:text-7xl">Let&apos;s Connect</h1>
      <p className="mt-5 max-w-3xl text-base leading-8 text-black/65 sm:text-lg">
        Use the Instagram-style button to connect, or reach out with the contact information below for inquiries and collaborations.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.75rem] border border-black/10 bg-white p-5 shadow-sm">
          <Phone className="h-5 w-5 text-maroon" />
          <p className="mt-3 text-sm uppercase tracking-[0.3em] text-black/45">Phone</p>
          <p className="mt-2 font-semibold">{config.contactNumber}</p>
        </div>
        <div className="rounded-[1.75rem] border border-black/10 bg-white p-5 shadow-sm">
          <Mail className="h-5 w-5 text-maroon" />
          <p className="mt-3 text-sm uppercase tracking-[0.3em] text-black/45">Email</p>
          <p className="mt-2 font-semibold">{config.contactEmail}</p>
        </div>
        <a
          href={config.instagramLink}
          target="_blank"
          rel="noreferrer"
          className="rounded-[1.75rem] border border-maroon bg-maroon p-5 text-white shadow-sm transition hover:bg-maroonSoft"
        >
          <Instagram className="h-5 w-5" />
          <p className="mt-3 text-sm uppercase tracking-[0.3em] text-white/55">Instagram</p>
          <p className="mt-2 font-semibold">Get Connect</p>
        </a>
      </div>
    </div>
  );
}
