"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Check, Download, Loader2 } from "lucide-react";
import { ResearchersTable } from "./components";

// --- Types ---

interface ScholarRow {
  id: string; // nationciteId
  nationciteId: string;
  scholarName: string;
  orgName: string;
  mainSubject?: string | null;
  subField?: string | null;
  worldRank?: number | null;
  countryRank?: number | null;
  universityRank?: number | null;
  hIndexTotal: number;
  hIndexLast5: number;
  hIndexRatio: number;
  isVerified: boolean;
}

type OrgMeResponse = {
  success: boolean;
  data?: {
    organizationProfile?: { name?: string | null };
    organizationMetrics?: { orgName?: string | null } | null;
  };
  message?: string;
};

type ScholarsResponse = {
  success: boolean;
  data?: Array<{
    nationciteId: string;
    scholarName: string;
    orgName: string;
    worldRank?: number | null;
    countryRank?: number | null;
    universityRank?: number | null;
    mainSubject?: string | null;
    subField?: string | null;
    hIndexTotal: number;
    hIndexLast5: number;
    hIndexRatio: number;
  }>;
  message?: string;
};

// --- Main Component ---

export default function MyResearchersPage() {
  const [researchers, setResearchers] = useState<ScholarRow[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const selectedCount = useMemo(() => selectedIds.length, [selectedIds]);

  useEffect(() => {
    let cancelled = false;

    async function loadResearchers() {
      try {
        setLoading(true);
        setError(null);

        const meRes = await fetch("/api/dashboard/org/me");
        const meContentType = meRes.headers.get("content-type") || "";

        if (!meContentType.includes("application/json")) {
          const body = await meRes.text();
          throw new Error(
            `Unexpected response from org dashboard API (${meRes.status}): ${body.slice(0, 80)}`,
          );
        }

        const meJson = (await meRes.json()) as OrgMeResponse;
        if (!meRes.ok || !meJson.success) {
          throw new Error(meJson.message || "Failed to load organization profile");
        }

        const orgName =
          meJson.data?.organizationMetrics?.orgName ||
          meJson.data?.organizationProfile?.name ||
          "";

        if (!orgName) {
          throw new Error(
            "Organization name not found; cannot load researchers for this organization.",
          );
        }

        const scholarsRes = await fetch(
          `/api/scholars?orgName=${encodeURIComponent(orgName)}&top=200`,
        );
        const scholarsContentType =
          scholarsRes.headers.get("content-type") || "";

        if (!scholarsContentType.includes("application/json")) {
          const body = await scholarsRes.text();
          throw new Error(
            `Unexpected response from scholars API (${scholarsRes.status}): ${body.slice(0, 80)}`,
          );
        }

        const scholarsJson = (await scholarsRes.json()) as ScholarsResponse;
        if (!scholarsRes.ok || !scholarsJson.success || !scholarsJson.data) {
          throw new Error(scholarsJson.message || "Failed to load scholars");
        }

        const rows: ScholarRow[] = scholarsJson.data.map((s) => ({
          id: s.nationciteId,
          nationciteId: s.nationciteId,
          scholarName: s.scholarName,
          orgName: s.orgName,
          mainSubject: s.mainSubject,
          subField: s.subField,
          worldRank: s.worldRank,
          countryRank: s.countryRank,
          universityRank: s.universityRank,
          hIndexTotal: s.hIndexTotal,
          hIndexLast5: s.hIndexLast5,
          hIndexRatio: s.hIndexRatio,
          isVerified: false,
        }));

        if (cancelled) return;
        setResearchers(rows);
        setSelectedIds([]);
      } catch (e) {
        console.error(e);
        if (cancelled) return;
        const message =
          e instanceof Error ? e.message : "Could not load researchers.";
        setError(message);
        setResearchers([]);
        setSelectedIds([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadResearchers();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleRemoveResearcher = (id: string) => {
    setResearchers((prev) => prev.filter((r) => r.id !== id));
    setSelectedIds((prev) => prev.filter((sid) => sid !== id));
  };

  const handleSelectionChange = (ids: string[]) => {
    setSelectedIds(ids);
  };

  const handleVerifySelected = () => {
    if (selectedIds.length === 0) return;
    setResearchers((prev) =>
      prev.map((r) =>
        selectedIds.includes(r.id) ? { ...r, isVerified: true } : r,
      ),
    );
    setSelectedIds([]);
  };

  const handleExportCSV = () => {
    // Export functionality placeholder
    console.log("Exporting CSV...");
  };

  return (
    <>
      {/* Page Title */}
      <div className="mb-4 md:mb-6 pb-3 md:pb-4 border-b border-[#E1E4EA] -mx-4 md:-mx-6 px-4 md:px-6">
        <div className="text-[18px] md:text-base font-bold md:font-semibold leading-5 tracking-[-0.006em] text-[#0E121B] mb-1">
          My Researchers
        </div>
        <div className="text-[13px] md:text-sm font-normal leading-6 tracking-[-0.02em] text-[#525866]">
          Manage and verify researchers affiliated with your institute. View their research profiles, bibliometric indicators, and verification status.
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-4 md:mb-6 flex flex-wrap items-center gap-3">
        <button
          onClick={handleVerifySelected}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#22C55E] rounded-[6px] text-sm font-semibold text-white hover:bg-[#16A34A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={selectedCount === 0}
        >
          <Check size={16} strokeWidth={2.5} />
          Verify Selected ({selectedCount})
        </button>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#F5F5F5] border border-[#E1E4EA] rounded-[6px] text-sm font-medium text-[#525866] hover:bg-gray-100 transition-colors"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Researchers Table */}
      {loading ? (
        <div className="bg-white rounded-xl border border-[#E1E4EA] p-8 flex items-center justify-center gap-3 text-[#525866]">
          <Loader2 className="h-5 w-5 animate-spin" />
          <div className="text-[14px]">Loading researchers…</div>
        </div>
      ) : error ? (
        <div className="bg-white rounded-xl border border-[#E1E4EA] p-8">
          <div className="text-[14px] font-semibold text-[#0E121B] mb-1">
            Could not load researchers
          </div>
          <div className="text-[13px] text-[#525866]">{error}</div>
        </div>
      ) : (
        <ResearchersTable
          researchers={researchers}
          selectedIds={selectedIds}
          onSelectionChange={handleSelectionChange}
          onRemoveResearcher={handleRemoveResearcher}
        />
      )}

      {/* No Results */}
      {!loading && !error && researchers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-[#E1E4EA]">
          <div className="text-[16px] font-medium text-[#0E121B] mb-2">
            No researchers found
          </div>
          <div className="text-[14px] text-[#525866]">
            Add researchers to your organization to get started.
          </div>
        </div>
      )}
    </>
  );
}
