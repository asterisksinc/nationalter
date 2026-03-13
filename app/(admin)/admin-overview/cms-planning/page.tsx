"use client";

import { useState } from "react";
import { DashboardSidebar } from "../component/dashboardsidebar";
import { DashboardHeader } from "../component/DashboardHeader";
import {
    ChevronDown, Search, Upload, Link as LinkIcon,
    Type, AlignLeft, Image as ImageIcon, Repeat, MapPin,
} from "lucide-react";
import "../adminstyle.css";
import { CMS_PAGES, CMSField, CMSSection } from "./cmsData";

const FONT = "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

/* ═══ Field Renderers ═══ */
function TextField({ field }: { field: CMSField }) {
    return (
        <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>
                <Type size={12} style={{ marginRight: "6px", color: "#94a3b8" }} />
                {field.label}
            </label>
            <input
                type="text"
                placeholder={field.placeholder || field.label}
                style={inputStyle}
                readOnly
            />
        </div>
    );
}

function TextareaField({ field }: { field: CMSField }) {
    return (
        <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>
                <AlignLeft size={12} style={{ marginRight: "6px", color: "#94a3b8" }} />
                {field.label}
            </label>
            <textarea
                placeholder={field.placeholder || field.label}
                rows={3}
                style={{ ...inputStyle, resize: "vertical" as const }}
                readOnly
            />
        </div>
    );
}

function UrlField({ field }: { field: CMSField }) {
    return (
        <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>
                <LinkIcon size={12} style={{ marginRight: "6px", color: "#94a3b8" }} />
                {field.label}
            </label>
            <div style={{ position: "relative" }}>
                <MapPin size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                    type="text"
                    placeholder={field.placeholder || "https://…"}
                    style={{ ...inputStyle, paddingLeft: "34px" }}
                    readOnly
                />
            </div>
        </div>
    );
}

function ImageField({ field }: { field: CMSField }) {
    return (
        <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>
                <ImageIcon size={12} style={{ marginRight: "6px", color: "#94a3b8" }} />
                {field.label}
            </label>
            <div style={{
                border: "2px dashed #e2e8f0", borderRadius: "12px", padding: "24px",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                background: "#fafbfc", cursor: "pointer", transition: "all 0.2s",
                minHeight: "100px",
            }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#ff7a00"; e.currentTarget.style.background = "#fff8f0"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#fafbfc"; }}
            >
                <Upload size={20} style={{ color: "#ff7a00", marginBottom: "8px" }} />
                <span style={{ fontSize: "12px", color: "#525866", fontFamily: FONT }}>
                    Drop a file or click to browse
                </span>
                <span style={{ fontSize: "11px", color: "#94a3b8", fontFamily: FONT, marginTop: "2px" }}>
                    PNG, JPG, SVG (10 MB max)
                </span>
            </div>
        </div>
    );
}

function RepeatableField({ field }: { field: CMSField }) {
    return (
        <div style={{ marginBottom: "20px" }}>
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginBottom: "10px",
            }}>
                <label style={{ ...labelStyle, marginBottom: 0, display: "flex", alignItems: "center" }}>
                    <Repeat size={12} style={{ marginRight: "6px", color: "#ff7a00" }} />
                    {field.label}
                    <span style={{
                        marginLeft: "8px", fontSize: "10px", background: "#fff3e0", color: "#e06a00",
                        padding: "2px 8px", borderRadius: "999px", fontWeight: 600,
                    }}>REPEATABLE</span>
                </label>
            </div>

            {/* Single sample item */}
            <div style={{
                background: "#fafbfc", border: "1px solid #e2e8f0", borderRadius: "10px",
                padding: "16px", position: "relative",
            }}>
                <div style={{
                    position: "absolute", top: "10px", right: "12px",
                    fontSize: "10px", color: "#94a3b8", fontFamily: FONT, fontWeight: 600,
                    background: "#f1f5f9", padding: "2px 8px", borderRadius: "999px",
                }}>Item 1</div>

                {field.subFields?.map((sf) => (
                    <FieldRenderer key={sf.key} field={sf} />
                ))}
            </div>
        </div>
    );
}

function FieldRenderer({ field }: { field: CMSField }) {
    switch (field.type) {
        case "text": return <TextField field={field} />;
        case "textarea": return <TextareaField field={field} />;
        case "url": return <UrlField field={field} />;
        case "image": return <ImageField field={field} />;
        case "repeatable": return <RepeatableField field={field} />;
        default: return null;
    }
}

/* ═══ Field stats counter ═══ */
function countFields(section: CMSSection): { text: number; image: number; repeatable: number } {
    let text = 0, image = 0, repeatable = 0;
    for (const f of section.fields) {
        if (f.type === "image") image++;
        else if (f.type === "repeatable") repeatable++;
        else text++;
    }
    return { text, image, repeatable };
}

/* ═══ Main Page ═══ */
export default function CMSPlanningPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedPageIdx, setSelectedPageIdx] = useState(0);
    const [selectedSectionIdx, setSelectedSectionIdx] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const currentPage = CMS_PAGES[selectedPageIdx];
    const filteredSections = currentPage.sections.filter((s) =>
        s.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const activeSection = filteredSections[selectedSectionIdx] || currentPage.sections[0];
    const stats = activeSection ? countFields(activeSection) : { text: 0, image: 0, repeatable: 0 };

    /* Total fields across all pages */
    const totalFields = CMS_PAGES.reduce((sum, p) =>
        sum + p.sections.reduce((s2, sec) => s2 + sec.fields.length, 0), 0
    );
    const totalSections = CMS_PAGES.reduce((sum, p) => sum + p.sections.length, 0);

    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
            <DashboardSidebar activePage="cms" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main style={{ flex: 1, marginLeft: "260px", overflowX: "hidden", background: "#f8fafc" }} className="ml-0 md:ml-[260px]">
                <DashboardHeader
                    breadcrumbItems={[{ label: "Home", href: "/" }, { label: "CMS", href: "/admin-overview/cms" }, { label: "CMS Planning" }]}
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                {/* Page heading */}
                <div style={{ padding: "24px 32px 16px", borderBottom: "1px solid #e2e8f0", marginBottom: "0", background: "#f8fafc" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                        <div>
                            <div style={{ fontSize: "22px", fontWeight: 700, color: "#0e121b", fontFamily: FONT, marginBottom: "4px" }}>
                                Content Management System
                            </div>
                            <div style={{ fontSize: "13px", color: "#525866", fontFamily: FONT }}>
                                CMS planning & estimation — identify every editable content field across all public pages.
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            {/* Stats badges */}
                            <span style={{
                                fontSize: "11px", fontWeight: 600, fontFamily: FONT,
                                background: "#eff6ff", color: "#2563eb", padding: "5px 12px", borderRadius: "999px",
                            }}>{CMS_PAGES.length} Pages</span>
                            <span style={{
                                fontSize: "11px", fontWeight: 600, fontFamily: FONT,
                                background: "#f0fdf4", color: "#16a34a", padding: "5px 12px", borderRadius: "999px",
                            }}>{totalSections} Sections</span>
                            <span style={{
                                fontSize: "11px", fontWeight: 600, fontFamily: FONT,
                                background: "#fff7ed", color: "#ea580c", padding: "5px 12px", borderRadius: "999px",
                            }}>{totalFields} Fields</span>
                        </div>
                    </div>
                </div>

                {/* Page selector + search row */}
                <div style={{
                    padding: "16px 32px", display: "flex", alignItems: "center", gap: "16px",
                    borderBottom: "1px solid #e2e8f0", background: "#fff", flexWrap: "wrap",
                }}>
                    {/* Page dropdown */}
                    <div style={{ position: "relative" }}>
                        <select
                            value={selectedPageIdx}
                            onChange={(e) => { setSelectedPageIdx(Number(e.target.value)); setSelectedSectionIdx(0); setSearchTerm(""); }}
                            style={{
                                appearance: "none", padding: "10px 36px 10px 16px", borderRadius: "10px",
                                border: "1px solid #e2e8f0", background: "#fff", fontSize: "14px", fontWeight: 600,
                                fontFamily: FONT, color: "#0e121b", cursor: "pointer", minWidth: "200px",
                            }}
                        >
                            {CMS_PAGES.map((p, i) => (
                                <option key={p.key} value={i}>{p.title}</option>
                            ))}
                        </select>
                        <ChevronDown size={16} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", pointerEvents: "none" }} />
                    </div>

                    {/* Search */}
                    <div style={{ position: "relative", flex: "0 1 280px" }}>
                        <Search size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                        <input
                            type="text"
                            placeholder="Search sections…"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setSelectedSectionIdx(0); }}
                            style={{
                                width: "100%", padding: "10px 14px 10px 36px", borderRadius: "10px",
                                border: "1px solid #e2e8f0", fontSize: "13px", fontFamily: FONT,
                                outline: "none", background: "#f8fafc",
                            }}
                        />
                    </div>

                    {/* Page section count */}
                    <span style={{ fontSize: "12px", color: "#94a3b8", fontFamily: FONT, marginLeft: "auto" }}>
                        {currentPage.sections.length} sections · {currentPage.sections.reduce((s, sec) => s + sec.fields.length, 0)} fields
                    </span>
                </div>

                {/* Content area: sidebar + editing panel */}
                <div style={{ display: "flex", minHeight: "calc(100vh - 200px)" }}>
                    {/* Section sidebar */}
                    <div style={{
                        width: "220px", flexShrink: 0, borderRight: "1px solid #e2e8f0",
                        background: "#fff", padding: "16px 0", overflowY: "auto",
                    }}>
                        {filteredSections.map((section, idx) => {
                            const isActive = idx === selectedSectionIdx;
                            return (
                                <button
                                    key={section.key}
                                    onClick={() => setSelectedSectionIdx(idx)}
                                    style={{
                                        display: "block", width: "100%", textAlign: "left",
                                        padding: "10px 20px 10px 16px", border: "none",
                                        background: isActive ? "#fff8f0" : "transparent",
                                        borderLeft: isActive ? "3px solid #ff7a00" : "3px solid transparent",
                                        cursor: "pointer", fontSize: "13px", fontFamily: FONT,
                                        color: isActive ? "#ff7a00" : "#525866",
                                        fontWeight: isActive ? 600 : 400,
                                        transition: "all 0.15s",
                                    }}
                                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "#f8fafc"; }}
                                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                                >
                                    {section.title}
                                    <span style={{
                                        display: "block", fontSize: "10px", color: "#94a3b8",
                                        fontWeight: 400, marginTop: "2px",
                                    }}>
                                        {section.fields.length} field{section.fields.length !== 1 ? "s" : ""}
                                    </span>
                                </button>
                            );
                        })}

                        {filteredSections.length === 0 && (
                            <div style={{ padding: "20px", textAlign: "center", color: "#94a3b8", fontSize: "12px" }}>
                                No sections match your search.
                            </div>
                        )}
                    </div>

                    {/* Editing panel */}
                    <div style={{ flex: 1, padding: "24px 32px", overflowY: "auto" }}>
                        {activeSection && (
                            <>
                                {/* Section header */}
                                <div style={{
                                    display: "flex", alignItems: "center", justifyContent: "space-between",
                                    marginBottom: "24px", flexWrap: "wrap", gap: "12px",
                                }}>
                                    <div>
                                        <h2 style={{
                                            fontSize: "18px", fontWeight: 700, color: "#0e121b",
                                            fontFamily: FONT, margin: 0,
                                        }}>
                                            {activeSection.title}
                                        </h2>
                                        <p style={{
                                            fontSize: "12px", color: "#94a3b8", fontFamily: FONT,
                                            margin: "4px 0 0",
                                        }}>
                                            Section key: <code style={{
                                                background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px",
                                                fontSize: "11px", color: "#475569",
                                            }}>{activeSection.key}</code>
                                        </p>
                                    </div>

                                    {/* Field type badges */}
                                    <div style={{ display: "flex", gap: "8px" }}>
                                        {stats.text > 0 && (
                                            <span style={typeBadge("#eff6ff", "#2563eb")}>
                                                <Type size={10} /> {stats.text} text
                                            </span>
                                        )}
                                        {stats.image > 0 && (
                                            <span style={typeBadge("#fef3c7", "#d97706")}>
                                                <ImageIcon size={10} /> {stats.image} image
                                            </span>
                                        )}
                                        {stats.repeatable > 0 && (
                                            <span style={typeBadge("#fff7ed", "#ea580c")}>
                                                <Repeat size={10} /> {stats.repeatable} repeatable
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Render all fields */}
                                <div style={{
                                    background: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px",
                                    padding: "24px",
                                }}>
                                    {activeSection.fields.map((field) => (
                                        <FieldRenderer key={field.key} field={field} />
                                    ))}
                                </div>

                                {/* Future implementation note */}
                                <div style={{
                                    marginTop: "20px", padding: "14px 18px", background: "#fffbeb",
                                    border: "1px solid #fde68a", borderRadius: "10px",
                                    fontSize: "12px", color: "#92400e", fontFamily: FONT, lineHeight: 1.6,
                                }}>

                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

/* ═══ Style Helpers ═══ */
const labelStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", fontSize: "12px", fontWeight: 600,
    color: "#374151", marginBottom: "6px",
    fontFamily: "Inter, system-ui, sans-serif",
};

const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 14px", borderRadius: "10px",
    border: "1px solid #e2e8f0", fontSize: "13px",
    fontFamily: "Inter, system-ui, sans-serif", outline: "none",
    background: "#f8fafc", color: "#0e121b",
    transition: "border-color 0.2s",
};

const typeBadge = (bg: string, color: string): React.CSSProperties => ({
    display: "flex", alignItems: "center", gap: "4px",
    fontSize: "10px", fontWeight: 600, padding: "4px 10px",
    borderRadius: "999px", background: bg, color,
    fontFamily: "Inter, system-ui, sans-serif",
});
