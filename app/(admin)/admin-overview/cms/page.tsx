"use client";

import { useEffect, useMemo, useState } from "react";
import { DashboardSidebar } from "../component/dashboardsidebar";
import { DashboardHeader } from "../component/DashboardHeader";
import { Save, RefreshCw, FileJson, MapPin } from "lucide-react";
import Link from "next/link";
import "../adminstyle.css";

type SectionValue = Record<string, unknown>;

type CmsSectionDef = {
  key: string;
  title: string;
  defaultValue: SectionValue;
};

type CmsPageDef = {
  key: string;
  title: string;
  sections: CmsSectionDef[];
};

const FONT = "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

// Non-blog CMS only. Blog CMS is managed in its own flow/routes.
const CMS_PAGES: CmsPageDef[] = [
  {
    key: "home",
    title: "Home",
    sections: [
      {
        key: "hero",
        title: "Hero",
        defaultValue: {
          top_message: "1,928,384+ Indian Researchers",
          heading_line_1: "India's H-Index",
          heading_line_2: "Leaderboard Portal",
          subheading:
            "Stop guessing your impact. We verify, rank, and showcase your academic performance so you get the funding, promotions, and recognition you actually deserve.",
          primary_cta_label: "Claim My Profile",
          secondary_cta_label: "Search Directory",
        },
      },
    ],
  },
  {
    key: "about",
    title: "About",
    sections: [
      {
        key: "hero",
        title: "Hero",
        defaultValue: {
          badge_text: "About Nationcite",
          heading: "The Digital Backbone of India's Research Ecosystem",
          subheading:
            "Nationcite is not just an index; we are the intelligence layer for Indian academia.",
          cta_label: "Explore Our Vision",
        },
      },
      {
        key: "faq",
        title: "FAQ",
        defaultValue: {
          kicker: "Know Nationcite",
          title: "Transparency is Our Currency",
          body: "You have questions about how your reputation is managed. We have clear answers.",
        },
      },
      {
        key: "final_cta",
        title: "Final CTA",
        defaultValue: {
          kicker: "Join the Ecosystem",
          heading: "Claim Your Place on the Leaderboard",
          body:
            "Your hard work deserves to be recognized. Join the platform that is defining the standard for Indian research excellence.",
          secondary_cta_label: "Search Directory",
          primary_cta_label: "Get Verified Now",
        },
      },
    ],
  },
  {
    key: "pricing",
    title: "Pricing",
    sections: [
      {
        key: "tables",
        title: "Tables",
        defaultValue: {
          overview_title: "Overview & Pricing",
          addons_title: "Add-ons (Optional for all)",
        },
      },
      {
        key: "faq",
        title: "FAQ",
        defaultValue: {
          kicker: "Lorem ipsum",
          title: "Lorem ipsum dolor self amet consectetyr alit",
          body:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
      },
    ],
  },
  {
    key: "methodology",
    title: "Methodology",
    sections: [
      {
        key: "hero",
        title: "Hero",
        defaultValue: {
          badge_text: "Methodology",
          heading: "Built on Transparency Governed by Data Integrity",
          subheading:
            "Nationcite follows a reproducible, evidence-backed methodology using global open and licensed bibliometric sources.",
          cta_label: "Explore Methodology",
        },
      },
    ],
  },
  {
    key: "leaderboard",
    title: "Leaderboard Hub",
    sections: [
      {
        key: "hero",
        title: "Hero",
        defaultValue: {
          badge_text: "Leaderboard",
          heading_prefix: "Top Researchers & ",
          heading_highlight: "Institutions",
          heading_line_2: "Shaping the Future",
          subheading:
            "Discover the top researchers and institutions driving innovation and making an impact in their fields. Our comprehensive rankings highlight the leaders in academic research and scholarly achievement",
        },
      },
    ],
  },
  {
    key: "leaderboard-scholars",
    title: "Leaderboard Scholars",
    sections: [
      {
        key: "hero",
        title: "Hero",
        defaultValue: {
          badge_text: "Leaderboard",
          heading: "Top Researchers & Scholars",
          subheading:
            "Explore India's leading researchers and scholars who are advancing knowledge and global research.",
          cta_label: "Explore Scholars",
        },
      },
      {
        key: "table",
        title: "Table",
        defaultValue: {
          title: "Scholars Leaderboard",
          search_placeholder: "Search scholars, IISc Bangalore, Physics...",
        },
      },
    ],
  },
  {
    key: "leaderboard-universities",
    title: "Leaderboard Universities",
    sections: [
      {
        key: "hero",
        title: "Hero",
        defaultValue: {
          badge_text: "Leaderboard",
          heading: "Top Universities & Institutions",
          subheading:
            "Discover India's leading universities and research institutions excelling in research output and academic excellence. Ranked by H-Index and research contributions.",
          cta_label: "Explore Universities",
        },
      },
      {
        key: "table",
        title: "Table",
        defaultValue: {
          title: "Universities Leaderboard",
          search_placeholder: "Search universities...",
        },
      },
    ],
  },
  {
    key: "leaderboard-doctors",
    title: "Leaderboard Doctors",
    sections: [
      {
        key: "hero",
        title: "Hero",
        defaultValue: {
          badge_text: "Leaderboard",
          heading: "Top Doctors & Medical Researchers",
          subheading:
            "Discover the top doctors and medical researchers driving innovation and making an impact in healthcare. Our comprehensive rankings highlight the leaders in medical research.",
          cta_label: "Explore Doctors",
        },
      },
      {
        key: "table",
        title: "Table",
        defaultValue: {
          title: "Doctors Leaderboard",
          search_placeholder: "Search doctors...",
        },
      },
    ],
  },
  {
    key: "contact",
    title: "Contact",
    sections: [
      {
        key: "hero",
        title: "Hero",
        defaultValue: {
          kicker: "Get in Touch with Nationcite",
          heading_line_1: "Let's Build India's Research",
          heading_line_2: "Transparency Together",
          body:
            "Whether you're a researcher seeking profile support, an institution exploring analytics, or a partner interested in collaboration – our team is here to assist you with verified, secure, and transparent solutions.",
          trusted_by_text: "Trusted by 8,000+ Researchers in India",
        },
      },
      {
        key: "form",
        title: "Form",
        defaultValue: {
          title: "Contact Form",
          success_title: "Message sent successfully!",
          success_body: "We'll get back to you soon.",
          error_title: "Failed to send message",
          error_body: "Please try again later.",
          submit_label: "Submit",
          submitting_label: "Submitting...",
        },
      },
    ],
  },
  {
    key: "legal",
    title: "Legal",
    sections: [
      {
        key: "hero",
        title: "Hero",
        defaultValue: {
          privacy_badge: "Privacy Policy",
          terms_badge: "Terms of Service",
          privacy_heading: "NationCite's Privacy Policy",
          terms_heading: "NationCite's Terms of Service",
          privacy_summary:
            "Your privacy matters to us. This policy explains how we collect, use, and protect your personal information when you use NationCite.",
          terms_summary:
            "Please read these terms carefully before using NationCite. By using our services, you agree to be bound by these terms.",
          privacy_tab_label: "Privacy Policy",
          terms_tab_label: "Terms of Service",
          last_updated_prefix: "Last Updated:",
        },
      },
    ],
  },
];

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function deepMerge<T extends Record<string, unknown>>(base: T, incoming: unknown): T {
  if (!incoming || typeof incoming !== "object" || Array.isArray(incoming)) return deepClone(base);
  const out: Record<string, unknown> = deepClone(base);
  for (const [k, v] of Object.entries(incoming as Record<string, unknown>)) {
    out[k] = v;
  }
  return out as T;
}

export default function CMSPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPageIdx, setSelectedPageIdx] = useState(0);
  const [selectedSectionIdx, setSelectedSectionIdx] = useState(0);

  const [values, setValues] = useState<Record<string, SectionValue>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string>("");

  const currentPage = CMS_PAGES[selectedPageIdx];
  const currentSection = currentPage.sections[selectedSectionIdx];

  const sectionStorageKey = `${currentPage.key}.${currentSection.key}`;

  const currentValue = useMemo(() => {
    return values[sectionStorageKey] || deepClone(currentSection.defaultValue);
  }, [values, sectionStorageKey, currentSection.defaultValue]);

  useEffect(() => {
    const fetchPageCms = async () => {
      setLoading(true);
      setStatus("");
      try {
        const res = await fetch(`/api/cms/${currentPage.key}`);
        const json = await res.json();
        const cms = json?.cms || {};

        const nextValues: Record<string, SectionValue> = {};
        for (const section of currentPage.sections) {
          const merged = deepMerge(section.defaultValue, cms[section.key]);
          nextValues[`${currentPage.key}.${section.key}`] = merged;
        }
        setValues((prev) => ({ ...prev, ...nextValues }));
      } catch {
        const fallbackValues: Record<string, SectionValue> = {};
        for (const section of currentPage.sections) {
          fallbackValues[`${currentPage.key}.${section.key}`] = deepClone(section.defaultValue);
        }
        setValues((prev) => ({ ...prev, ...fallbackValues }));
        setStatus("Could not fetch CMS data. Loaded defaults.");
      } finally {
        setLoading(false);
      }
    };

    fetchPageCms();
  }, [currentPage.key, currentPage.sections]);

  const updateField = (field: string, newVal: string) => {
    setValues((prev) => {
      const existing = prev[sectionStorageKey] || deepClone(currentSection.defaultValue);
      return {
        ...prev,
        [sectionStorageKey]: {
          ...existing,
          [field]: newVal,
        },
      };
    });
  };

  const saveSection = async () => {
    setSaving(true);
    setStatus("");
    try {
      const payload = {
        key: `${currentPage.key}.${currentSection.key}`,
        value: currentValue,
      };

      const res = await fetch("/api/cms/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to save");
      }

      setStatus(`Saved ${payload.key}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Save failed";
      setStatus(message);
    } finally {
      setSaving(false);
    }
  };

  const refreshPage = () => {
    setSelectedSectionIdx(0);
    setValues((prev) => {
      const next = { ...prev };
      for (const section of currentPage.sections) {
        delete next[`${currentPage.key}.${section.key}`];
      }
      return next;
    });
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      <DashboardSidebar activePage="cms" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main
        style={{ flex: 1, marginLeft: "260px", overflowX: "hidden", background: "#f8fafc" }}
        className="ml-0 md:ml-[260px]"
      >
        <DashboardHeader
          breadcrumbItems={[{ label: "Home", href: "/" }, { label: "CMS" }]}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <div style={{ padding: "24px 32px 16px", borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "#0e121b", fontFamily: FONT, marginBottom: "4px" }}>
                Content Management System
              </div>
              <div style={{ fontSize: "13px", color: "#525866", fontFamily: FONT }}>
                Manage non-blog public page content using page.section CMS keys.
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Link
                href="/admin-overview/cms-planning"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  color: "#525866",
                  background: "#fff",
                  textDecoration: "none",
                  fontSize: "12px",
                  fontWeight: 600,
                  fontFamily: FONT,
                }}
              >
                <MapPin size={14} /> CMS Planning
              </Link>
            </div>
          </div>
        </div>

        <div style={{ padding: "16px 32px", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <select
            value={selectedPageIdx}
            onChange={(e) => {
              setSelectedPageIdx(Number(e.target.value));
              setSelectedSectionIdx(0);
              setStatus("");
            }}
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              background: "#fff",
              fontSize: "13px",
              fontFamily: FONT,
              color: "#0e121b",
              minWidth: "250px",
            }}
          >
            {CMS_PAGES.map((page, idx) => (
              <option key={page.key} value={idx}>
                {page.title}
              </option>
            ))}
          </select>

          <button
            onClick={refreshPage}
            disabled={loading}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 14px",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              background: "#fff",
              cursor: "pointer",
              fontSize: "12px",
              color: "#525866",
              fontFamily: FONT,
            }}
          >
            <RefreshCw size={14} /> Reload
          </button>
        </div>

        <div style={{ display: "flex", borderTop: "1px solid #e2e8f0", minHeight: "calc(100vh - 220px)" }}>
          <aside
            style={{
              width: "260px",
              borderRight: "1px solid #e2e8f0",
              background: "#fff",
              padding: "12px 0",
            }}
          >
            {currentPage.sections.map((section, idx) => {
              const active = idx === selectedSectionIdx;
              return (
                <button
                  key={section.key}
                  onClick={() => setSelectedSectionIdx(idx)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    border: "none",
                    cursor: "pointer",
                    padding: "10px 16px",
                    background: active ? "#fff8f0" : "transparent",
                    borderLeft: active ? "3px solid #ff7a00" : "3px solid transparent",
                    color: active ? "#ff7a00" : "#475569",
                    fontFamily: FONT,
                    fontSize: "13px",
                    fontWeight: active ? 600 : 500,
                  }}
                >
                  {section.title}
                  <span style={{ display: "block", fontSize: "10px", color: "#94a3b8", marginTop: "2px" }}>
                    {currentPage.key}.{section.key}
                  </span>
                </button>
              );
            })}
          </aside>

          <section style={{ flex: 1, padding: "20px 28px", background: "#f8fafc" }}>
            <div style={{ marginBottom: "14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", flexWrap: "wrap" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#0e121b", fontFamily: FONT }}>
                  {currentSection.title}
                </h3>
                <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#64748b", fontFamily: FONT }}>
                  Key: {currentPage.key}.{currentSection.key}
                </p>
              </div>

              <button
                onClick={saveSection}
                disabled={saving || loading}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  background: "linear-gradient(135deg, #ff7a00, #e06a00)",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: 600,
                  fontFamily: FONT,
                  opacity: saving || loading ? 0.7 : 1,
                }}
              >
                <Save size={14} /> {saving ? "Saving..." : "Save Section"}
              </button>
            </div>

            {status && (
              <div
                style={{
                  marginBottom: "12px",
                  padding: "9px 12px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  background: "#fff",
                  color: "#475569",
                  fontFamily: FONT,
                  fontSize: "12px",
                }}
              >
                {status}
              </div>
            )}

            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px" }}>
              {Object.entries(currentValue).map(([field, val]) => {
                const isSimpleText = typeof val === "string" || typeof val === "number" || typeof val === "boolean";
                return (
                  <div key={field} style={{ marginBottom: "14px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 600,
                        marginBottom: "6px",
                        color: "#374151",
                        fontFamily: FONT,
                      }}
                    >
                      {field}
                    </label>

                    {isSimpleText ? (
                      <input
                        type="text"
                        value={String(val ?? "")}
                        onChange={(e) => updateField(field, e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: "10px",
                          border: "1px solid #e2e8f0",
                          fontSize: "13px",
                          fontFamily: FONT,
                          background: "#f8fafc",
                        }}
                      />
                    ) : (
                      <textarea
                        value={JSON.stringify(val, null, 2)}
                        onChange={(e) => {
                          try {
                            const parsed = JSON.parse(e.target.value);
                            setValues((prev) => ({
                              ...prev,
                              [sectionStorageKey]: {
                                ...(prev[sectionStorageKey] || deepClone(currentSection.defaultValue)),
                                [field]: parsed,
                              },
                            }));
                          } catch {
                            // Keep editor permissive while typing invalid JSON.
                          }
                        }}
                        rows={6}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: "10px",
                          border: "1px solid #e2e8f0",
                          fontSize: "12px",
                          fontFamily: "Consolas, 'Courier New', monospace",
                          background: "#f8fafc",
                        }}
                      />
                    )}
                  </div>
                );
              })}

              <div
                style={{
                  marginTop: "8px",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  background: "#fffbeb",
                  border: "1px solid #fde68a",
                  color: "#92400e",
                  fontFamily: FONT,
                  fontSize: "11px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <FileJson size={13} /> Complex fields can be edited as JSON in-place.
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
