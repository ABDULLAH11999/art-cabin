"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Palette, Sparkles } from "lucide-react";

function normalizeCallbackUrl(value: string | null) {
  if (!value) return "/admin";
  if (value.startsWith("/")) return value;
  try {
    const parsed = new URL(value);
    return `${parsed.pathname}${parsed.search}${parsed.hash}` || "/admin";
  } catch {
    return "/admin";
  }
}

export function AdminLoginCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const callbackUrl = useMemo(() => searchParams.get("callbackUrl"), [searchParams]);
  const safeCallbackUrl = useMemo(() => normalizeCallbackUrl(callbackUrl), [callbackUrl]);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/admin");
    }
  }, [router, status]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      redirect: false,
      callbackUrl: safeCallbackUrl,
      identifier: String(formData.get("identifier") || ""),
      password: String(formData.get("password") || "")
    });
    setLoading(false);
    if (result?.error) {
      setError("Invalid credentials. Please try again.");
      return;
    }
    window.location.replace("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(110,31,52,0.18),_transparent_42%),linear-gradient(180deg,#fff,#f7f2f3)] px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-[2rem] border border-black/10 bg-black p-8 text-white shadow-2xl">
        <div className="flex items-center gap-3 text-maroonSoft">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <Palette className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">Art Cabin</p>
            <h1 className="font-heading text-4xl text-white">Admin Panel</h1>
          </div>
        </div>
        <p className="mt-3 text-sm leading-6 text-white/60">Sign in to manage settings, arts, and exhibitions.</p>
        <div className="mt-8 space-y-4">
          <input
            name="identifier"
            type="text"
            placeholder="Username or Email"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />
        </div>
        {error && <p className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}
        <button disabled={loading} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 font-semibold text-black">
          <Sparkles className="h-4 w-4" />
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
