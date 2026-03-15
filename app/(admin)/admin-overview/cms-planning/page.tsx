"use client";

import { useEffect, useMemo, useState } from "react";
import { Save, RefreshCw } from "lucide-react";
import { DashboardSidebar } from "../component/dashboardsidebar";
import { DashboardHeader } from "../component/DashboardHeader";
import "../adminstyle.css";
import { CMSField, CMSPage, CMS_PAGES } from "./cmsData";
import {
  defaultsForSection,
  resolvePlanningPageKey,
  resolvePlanningSectionKey,
} from "@/lib/cms-planning-utils";

const FONT = "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

type SectionValue = Record<string, unknown>;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function deepMerge(base: unknown, incoming: unknown): unknown {
  if (!isPlainObject(base)) return incoming;
  if (!isPlainObject(incoming)) return incoming ?? base;

  const merged: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(incoming)) {
    merged[key] =
      isPlainObject(merged[key]) && isPlainObject(value)
        ? deepMerge(merged[key], value)
        : value;
  }
  return merged;
}

function updatePathValue(target: unknown, path: Array<string | number>, value: unknown): unknown {
  if (path.length === 0) return value;

  const [head, ...rest] = path;
  const container = Array.isArray(target) ? [...target] : { ...(isPlainObject(target) ? target : {}) };

  if (typeof head === "number") {
    const arr = Array.isArray(container) ? container : [];
    arr[head] = updatePathValue(arr[head], rest, value);
    return arr;
  }

  (container as Record<string, unknown>)[head] = updatePathValue(
    (container as Record<string, unknown>)[head],
    rest,
    value,
  );
  return container;
}

function FieldEditor({
  field,
  value,
  onChange,
  path = [],
}: {
  field: CMSField;
  value: unknown;
  onChange: (path: Array<string | number>, value: unknown) => void;
  path?: Array<string | number>;
}) {
  const [selectedFileName, setSelectedFileName] = useState("");
  const fieldPath = [...path, field.key];

  if (field.type === "repeatable") {
    const items = Array.isArray(value) ? value : [];

    return (
      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>{field.label}</label>
        {items.length === 0 ? (
          <div style={emptyBoxStyle}>No predefined entries for this field.</div>
        ) : (
          <div style={{ display: "grid", gap: "10px" }}>
            {items.map((item, index) => (
              <div key={index} style={repeatableCardStyle}>
                <div style={repeatableHeaderStyle}>Item {index + 1}</div>
                {(field.subFields || []).map((subField) => (
                  <FieldEditor
                    key={`${field.key}-${index}-${subField.key}`}
                    field={subField}
                    value={isPlainObject(item) ? item[subField.key] : undefined}
                    onChange={onChange}
                    path={[...fieldPath, index]}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const currentValue = typeof value === "string" ? value : "";
  const inputType = field.type === "url" || field.type === "image" ? "url" : "text";

  if (field.type === "image") {
    const inputId = `image-upload-${fieldPath.join("-")}`;

    return (
      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>{field.label}</label>
        <input
          type={inputType}
          value={currentValue}
          onChange={(e) => onChange(fieldPath, e.target.value)}
          placeholder={field.placeholder || "https://..."}
          style={inputStyle}
        />

        <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
          <input
            id={inputId}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setSelectedFileName(file.name);
            }}
          />
          <label htmlFor={inputId} style={uploadButtonStyle}>
            Upload Image 
          </label>

          <button
            type="button"
            onClick={() => onChange(fieldPath, "/dummy/placeholder-image.png")}
            style={smallButtonStyle}
          >
            Use Placeholder
          </button>
        </div>

        <div style={{ ...hintTextStyle, marginTop: "6px" }}>
          {selectedFileName
            ? `Selected: ${selectedFileName}. Backend upload is not wired yet.`
            : "You can paste an image URL now. Upload action is UI-ready and pending backend wiring."}
        </div>

        <div style={{ marginTop: "10px" }}>
          <img
            src={currentValue || "/dummy/placeholder-image.png"}
            alt={field.label}
            style={imagePreviewStyle}
          />
        </div>
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>{field.label}</label>
        <textarea
          value={currentValue}
          onChange={(e) => onChange(fieldPath, e.target.value)}
          rows={4}
          placeholder={field.placeholder || field.label}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>
    );
  }

  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={labelStyle}>{field.label}</label>
      <input
        type={inputType}
        value={currentValue}
        onChange={(e) => onChange(fieldPath, e.target.value)}
        placeholder={field.placeholder || field.label}
        style={inputStyle}
      />
    </div>
  );
}

export default function CMSPlanningPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPageIdx, setSelectedPageIdx] = useState(0);
  const [selectedSectionIdx, setSelectedSectionIdx] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);
  const [status, setStatus] = useState("");
  const [values, setValues] = useState<Record<string, SectionValue>>({});

  const currentPage: CMSPage = CMS_PAGES[selectedPageIdx];
  const visibleSections = currentPage.sections.filter((section) =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const activeSection = visibleSections[selectedSectionIdx] || visibleSections[0];

  const resolvedPageKey = resolvePlanningPageKey(currentPage.key);
  const resolvedSectionKey = activeSection
    ? resolvePlanningSectionKey(currentPage.key, activeSection.key)
    : "";
  const storageKey = resolvedSectionKey ? `${resolvedPageKey}.${resolvedSectionKey}` : "";

  const activeValue = useMemo(() => {
    if (!activeSection || !storageKey) return {};
    return values[storageKey] || defaultsForSection(activeSection);
  }, [activeSection, storageKey, values]);

  useEffect(() => {
    setSelectedSectionIdx(0);
    setSearchTerm("");
  }, [selectedPageIdx]);

  useEffect(() => {
    const fetchPageCms = async () => {
      setLoading(true);
      setStatus("");

      const pageKey = resolvePlanningPageKey(currentPage.key);
      const nextValues: Record<string, SectionValue> = {};

      try {
        const res = await fetch(`/api/cms/${pageKey}`, { cache: "no-store" });
        const json = await res.json();
        const cms = isPlainObject(json?.cms) ? json.cms : {};

        for (const section of currentPage.sections) {
          const sectionKey = resolvePlanningSectionKey(currentPage.key, section.key);
          const sectionStorageKey = `${pageKey}.${sectionKey}`;
          const defaults = defaultsForSection(section);
          nextValues[sectionStorageKey] = deepMerge(defaults, cms[sectionKey]) as SectionValue;
        }

        setValues((prev) => ({ ...prev, ...nextValues }));
      } catch {
        for (const section of currentPage.sections) {
          const sectionKey = resolvePlanningSectionKey(currentPage.key, section.key);
          const sectionStorageKey = `${pageKey}.${sectionKey}`;
          nextValues[sectionStorageKey] = defaultsForSection(section);
        }
        setValues((prev) => ({ ...prev, ...nextValues }));
        setStatus("CMS API unavailable. Loaded defaults.");
      } finally {
        setLoading(false);
      }
    };

    fetchPageCms();
  }, [currentPage, reloadToken]);

  const handleFieldChange = (path: Array<string | number>, newValue: unknown) => {
    if (!storageKey) return;

    setValues((prev) => {
      const current = prev[storageKey] || defaultsForSection(activeSection);
      return {
        ...prev,
        [storageKey]: updatePathValue(current, path, newValue) as SectionValue,
      };
    });
  };

  const saveSection = async () => {
    if (!activeSection || !storageKey) return;

    setSaving(true);
    setStatus("");

    try {
      const response = await fetch("/api/cms/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: storageKey,
          value: activeValue,
        }),
      });

      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.message || "Save failed");
      }

      setStatus(`Saved ${storageKey}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      <DashboardSidebar activePage="cms" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main style={{ flex: 1, marginLeft: "260px", overflowX: "hidden", background: "#f8fafc" }} className="ml-0 md:ml-[260px]">
        <DashboardHeader
          breadcrumbItems={[{ label: "Home", href: "/" }, { label: "CMS Planning" }]}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <div style={{ padding: "24px 32px 16px", borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
          <div style={{ fontSize: "22px", fontWeight: 700, color: "#0e121b", fontFamily: FONT, marginBottom: "4px" }}>
            Content Management System
          </div>
          <div style={{ fontSize: "13px", color: "#525866", fontFamily: FONT }}>
            Edit predefined page.section content only.
          </div>
        </div>

        <div style={{ padding: "16px 32px", display: "flex", gap: "12px", alignItems: "center", borderBottom: "1px solid #e2e8f0", background: "#fff", flexWrap: "wrap" }}>
          <select
            value={selectedPageIdx}
            onChange={(e) => setSelectedPageIdx(Number(e.target.value))}
            style={inputStyle}
          >
            {CMS_PAGES.map((page, index) => (
              <option key={page.key} value={index}>{page.title}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search sections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ ...inputStyle, maxWidth: "260px" }}
          />

          <button onClick={() => setReloadToken((v) => v + 1)} style={smallButtonStyle}>
            <RefreshCw size={14} /> Reload
          </button>

          <button onClick={saveSection} disabled={saving || loading || !activeSection} style={primaryButtonStyle}>
            <Save size={14} /> {saving ? "Saving..." : "Save Section"}
          </button>
        </div>

        <div style={{ display: "flex", minHeight: "calc(100vh - 200px)" }}>
          <aside style={{ width: "240px", borderRight: "1px solid #e2e8f0", background: "#fff", padding: "12px 0" }}>
            {visibleSections.map((section, idx) => {
              const active = activeSection?.key === section.key;
              return (
                <button
                  key={section.key}
                  onClick={() => setSelectedSectionIdx(idx)}
                  style={{
                    width: "100%",
                    border: "none",
                    textAlign: "left",
                    padding: "10px 16px",
                    cursor: "pointer",
                    background: active ? "#fff8f0" : "transparent",
                    borderLeft: active ? "3px solid #ff7a00" : "3px solid transparent",
                    color: active ? "#ff7a00" : "#475569",
                    fontFamily: FONT,
                    fontSize: "13px",
                  }}
                >
                  {section.title}
                  <span style={{ display: "block", fontSize: "10px", color: "#94a3b8", marginTop: "2px" }}>
                    {resolvePlanningPageKey(currentPage.key)}.{resolvePlanningSectionKey(currentPage.key, section.key)}
                  </span>
                </button>
              );
            })}
          </aside>

          <section style={{ flex: 1, padding: "24px 32px", overflowY: "auto" }}>
            {activeSection ? (
              <>
                <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#0e121b", fontFamily: FONT }}>
                  {activeSection.title}
                </h2>
                <p style={{ margin: "4px 0 16px", color: "#64748b", fontFamily: FONT, fontSize: "12px" }}>
                  Key: {storageKey}
                </p>

                {status ? (
                  <div style={{ marginBottom: "12px", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", background: "#fff", color: "#475569", fontSize: "12px", fontFamily: FONT }}>
                    {status}
                  </div>
                ) : null}

                <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px" }}>
                  {activeSection.fields.map((field) => (
                    <FieldEditor
                      key={field.key}
                      field={field}
                      value={isPlainObject(activeValue) ? activeValue[field.key] : undefined}
                      onChange={handleFieldChange}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div style={{ color: "#94a3b8", fontFamily: FONT, fontSize: "13px" }}>No sections found.</div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: 600,
  color: "#374151",
  marginBottom: "6px",
  fontFamily: FONT,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "320px",
  padding: "10px 12px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  fontSize: "13px",
  fontFamily: FONT,
  background: "#fff",
};

const smallButtonStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "10px 12px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  background: "#fff",
  cursor: "pointer",
  fontSize: "12px",
  color: "#475569",
  fontFamily: FONT,
};

const primaryButtonStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "10px 14px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg, #ff7a00, #e06a00)",
  color: "#fff",
  cursor: "pointer",
  fontSize: "12px",
  fontFamily: FONT,
  fontWeight: 600,
};

const repeatableCardStyle: React.CSSProperties = {
  border: "1px solid #e2e8f0",
  borderRadius: "10px",
  padding: "12px",
  background: "#fafbfc",
};

const repeatableHeaderStyle: React.CSSProperties = {
  fontSize: "11px",
  color: "#64748b",
  fontWeight: 600,
  marginBottom: "8px",
  fontFamily: FONT,
};

const emptyBoxStyle: React.CSSProperties = {
  border: "1px dashed #cbd5e1",
  borderRadius: "10px",
  padding: "10px 12px",
  fontSize: "12px",
  color: "#94a3b8",
  fontFamily: FONT,
};

const uploadButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "10px 12px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  background: "#fff",
  cursor: "pointer",
  fontSize: "12px",
  color: "#475569",
  fontFamily: FONT,
};

const hintTextStyle: React.CSSProperties = {
  fontSize: "11px",
  color: "#64748b",
  fontFamily: FONT,
};

const imagePreviewStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "240px",
  height: "120px",
  objectFit: "cover",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  background: "#f8fafc",
};
