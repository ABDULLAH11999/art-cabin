"use client";

import { useMemo, useState } from "react";
import { formatEntryUrl, formatPlatformLabel } from "@/lib/visitor-tracking";

type VisitorRow = {
  id: string;
  sessionId: string;
  entryUrl: string;
  entryPath: string;
  entryDomain: string;
  referrer: string | null;
  platform: string;
  ipAddress: string | null;
  countryCode: string | null;
  countryName: string | null;
  userAgent: string | null;
  pageViews: number;
  createdAt: string;
  lastSeenAt: string;
};

function shorten(value: string, length = 14) {
  return value.length <= length ? value : `${value.slice(0, length)}...`;
}

export function VisitorTable({
  visitors,
  siteUrl
}: {
  visitors: VisitorRow[];
  siteUrl: string;
}) {
  const [platformFilter, setPlatformFilter] = useState("ALL");

  const filteredVisitors = useMemo(() => {
    return visitors.filter((visitor) => platformFilter === "ALL" || visitor.platform === platformFilter);
  }, [platformFilter, visitors]);

  return (
    <div className="space-y-5 rounded-3xl border border-maroon/15 bg-white p-4 shadow-sm lg:p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-black/45">Analytics</p>
          <h2 className="mt-2 font-heading text-2xl text-maroon sm:text-3xl">Site Visitors</h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="w-full rounded-2xl border border-maroon/20 px-4 py-3 text-black outline-none transition focus:border-maroon sm:w-56"
          >
            <option value="ALL">All Platforms</option>
            <option value="GOOGLE_SEARCH">Google Search</option>
            <option value="SHARED_LINK">Shared Link</option>
            <option value="INSTAGRAM">Instagram</option>
          </select>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-maroon/15 bg-maroon/5 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-black/45">Unique Sessions</p>
          <div className="mt-2 font-heading text-3xl text-maroon">{visitors.length}</div>
        </div>
        <div className="rounded-2xl border border-maroon/15 bg-maroon/5 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-black/45">Filtered</p>
          <div className="mt-2 font-heading text-3xl text-maroon">{filteredVisitors.length}</div>
        </div>
        <div className="rounded-2xl border border-maroon/15 bg-maroon/5 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-black/45">Tracked URL</p>
          <div className="mt-2 truncate font-heading text-base text-maroon">{siteUrl}</div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-maroon/15">
        <div className="max-h-[760px] overflow-auto">
          <table className="w-full min-w-[1200px] text-left text-sm">
            <thead className="sticky top-0 bg-maroon text-white">
              <tr>
                <th className="px-4 py-3 font-medium">Session</th>
                <th className="px-4 py-3 font-medium">First Page</th>
                <th className="px-4 py-3 font-medium">IP</th>
                <th className="px-4 py-3 font-medium">Country</th>
                <th className="px-4 py-3 font-medium">Platform</th>
                <th className="px-4 py-3 font-medium">Referrer</th>
                <th className="px-4 py-3 font-medium">Views</th>
                <th className="px-4 py-3 font-medium">First Seen</th>
                <th className="px-4 py-3 font-medium">Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisitors.map((visitor) => (
                <tr key={visitor.id} className="border-t border-maroon/10">
                  <td className="px-4 py-4 font-medium text-black">
                    <div>{shorten(visitor.sessionId)}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-medium text-black">{formatEntryUrl(visitor.entryUrl, siteUrl)}</div>
                    <div className="text-xs text-black/45">{visitor.entryPath}</div>
                  </td>
                  <td className="px-4 py-4 text-black">{visitor.ipAddress || "Unknown"}</td>
                  <td className="px-4 py-4 text-black">{visitor.countryName || visitor.countryCode || "Unknown"}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full border border-maroon/20 bg-maroon/5 px-3 py-1 text-xs font-semibold text-maroon">
                      {formatPlatformLabel(visitor.platform)}
                    </span>
                  </td>
                  <td className="max-w-[220px] px-4 py-4 text-black">
                    <div className="truncate">{visitor.referrer || "Direct / unknown"}</div>
                  </td>
                  <td className="px-4 py-4 text-black">{visitor.pageViews}</td>
                  <td className="px-4 py-4 text-black">{new Date(visitor.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-4 text-black">{new Date(visitor.lastSeenAt).toLocaleString()}</td>
                </tr>
              ))}
              {filteredVisitors.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-black/50">
                    No visitor sessions match the selected filters.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
