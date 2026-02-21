"use client";

import { useState, useEffect, useCallback } from "react";
import { DashboardSidebar } from "../component/dashboardsidebar";
import { DashboardHeader } from "../component/DashboardHeader";
import {
    Eye, Trash2, Search, RefreshCw, Plus, Edit, X, Save, ImageIcon,
} from "lucide-react";
import "../adminstyle.css";

/* ───── types ───── */
interface BlogSection { heading: string; text: string; image?: string }
interface Blog {
    id: number;
    title: string;
    coverImage: string | null;
    intro: string;
    sections: BlogSection[];
    conclusion: string | null;
    createdAt: string;
    updatedAt: string;
    author: { id: number; email: string; name: string };
}

/* ───── constants ───── */
const FONT = "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const EMPTY_SECTION: BlogSection = { heading: "", text: "" };

/* ───── page ───── */
export default function CMSPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    // Editor state
    const [showEditor, setShowEditor] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
    const [previewBlog, setPreviewBlog] = useState<Blog | null>(null);

    // Form state
    const [title, setTitle] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [intro, setIntro] = useState("");
    const [sections, setSections] = useState<BlogSection[]>([{ ...EMPTY_SECTION }]);
    const [conclusion, setConclusion] = useState("");
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState("");

    /* ── fetch ── */
    const fetchBlogs = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ limit: "100" });
            if (search) params.set("title", search);
            const res = await fetch(`/api/blogs?${params}`);
            const json = await res.json();
            setBlogs(json.blogs || []);
        } catch { /* silent */ } finally { setLoading(false); }
    }, [search]);

    useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

    /* ── open editor ── */
    const openNew = () => {
        setEditingBlog(null);
        setTitle(""); setCoverImage(""); setIntro("");
        setSections([{ ...EMPTY_SECTION }]); setConclusion("");
        setFormError(""); setShowEditor(true);
    };

    const openEdit = (blog: Blog) => {
        setEditingBlog(blog);
        setTitle(blog.title);
        setCoverImage(blog.coverImage || "");
        setIntro(blog.intro);
        setSections(
            Array.isArray(blog.sections) && blog.sections.length > 0
                ? blog.sections.map((s) => ({ heading: s.heading || "", text: s.text || "", image: s.image || "" }))
                : [{ ...EMPTY_SECTION }]
        );
        setConclusion(blog.conclusion || "");
        setFormError(""); setShowEditor(true);
    };

    /* ── save ── */
    const handleSave = async () => {
        if (!title.trim()) { setFormError("Title is required"); return; }
        if (!intro.trim()) { setFormError("Introduction is required"); return; }
        setFormError(""); setSaving(true);

        try {
            const body: any = {
                title: title.trim(),
                coverImage: coverImage.trim() || null,
                intro: intro.trim(),
                sections: sections.filter((s) => s.heading?.trim() || s.text?.trim()),
                conclusion: conclusion.trim() || null,
            };
            if (editingBlog) body.id = editingBlog.id;

            const res = await fetch("/api/admin/blogs", {
                method: editingBlog ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                const json = await res.json();
                setFormError(json.message || "Save failed");
                return;
            }

            setShowEditor(false);
            fetchBlogs();
        } catch { setFormError("Something went wrong"); } finally { setSaving(false); }
    };

    /* ── delete ── */
    const handleDelete = async (id: number) => {
        if (!confirm("Delete this blog permanently?")) return;
        try {
            await fetch(`/api/admin/blogs?id=${id}`, { method: "DELETE" });
            fetchBlogs();
        } catch { alert("Delete failed"); }
    };

    /* ── section helpers ── */
    const updateSection = (idx: number, field: keyof BlogSection, val: string) => {
        setSections((prev) => prev.map((s, i) => (i === idx ? { ...s, [field]: val } : s)));
    };

    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
            <DashboardSidebar activePage="cms" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main style={{ flex: 1, marginLeft: "260px", overflowX: "hidden", background: "#f8fafc" }} className="ml-0 md:ml-[260px]">
                <DashboardHeader
                    breadcrumbItems={[{ label: "Home", href: "/" }, { label: "CMS" }]}
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                {/* Page heading */}
                <div style={{ padding: "24px 32px 16px", borderBottom: "1px solid #e2e8f0", marginBottom: "24px", background: "#f8fafc" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                        <div>
                            <div style={{ fontSize: "22px", fontWeight: 700, color: "#0e121b", fontFamily: FONT, marginBottom: "4px" }}>
                                Content Management
                            </div>
                            <div style={{ fontSize: "13px", color: "#525866", fontFamily: FONT }}>
                                Create, edit and manage blog posts for the public site.
                            </div>
                        </div>
                        <button onClick={openNew} style={{
                            display: "flex", alignItems: "center", gap: "8px",
                            padding: "10px 20px", borderRadius: "10px", border: "none", cursor: "pointer",
                            background: "linear-gradient(135deg, #ff7a00, #e06a00)", color: "#fff",
                            fontSize: "13px", fontWeight: 600, fontFamily: FONT,
                            boxShadow: "0 2px 8px rgba(255,122,0,0.25)",
                        }}>
                            <Plus size={16} /> New Blog Post
                        </button>
                    </div>
                </div>

                {/* Toggle */}
                <div style={{ padding: "0 32px", marginBottom: "20px" }}>
                    <div style={{ display: "inline-flex", background: "#f1f5f9", borderRadius: "10px", padding: "4px", gap: "4px" }}>
                        <button style={{
                            padding: "8px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontFamily: FONT,
                            fontSize: "13px", fontWeight: 600, background: "#ff7a00", color: "#fff",
                        }}>
                            Blogs
                        </button>
                    </div>
                </div>

                {/* Search + Refresh */}
                <div style={{ padding: "0 32px", marginBottom: "16px" }}>
                    <div style={{
                        background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0",
                        padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap",
                    }}>
                        <div style={{ position: "relative", minWidth: "240px", flex: "0 1 320px" }}>
                            <Search size={15} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                            <input type="text" placeholder="Search by title…" value={search} onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    width: "100%", padding: "8px 12px 8px 32px", borderRadius: "8px", border: "1px solid #e2e8f0",
                                    fontSize: "13px", fontFamily: FONT, outline: "none", background: "#f8fafc",
                                }}
                            />
                        </div>
                        <button onClick={fetchBlogs} style={{
                            display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px",
                            borderRadius: "8px", border: "1px solid #e2e8f0", background: "#fff",
                            fontSize: "12px", fontFamily: FONT, cursor: "pointer", color: "#525866",
                        }}>
                            <RefreshCw size={13} /> Refresh
                        </button>
                    </div>
                </div>

                {/* Blog Table */}
                <div style={{ padding: "0 32px 32px" }}>
                    <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT }}>
                            <thead>
                                <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#fafbfc" }}>
                                    {["TITLE", "AUTHOR", "DATE", "ACTIONS"].map((h) => (
                                        <th key={h} style={{
                                            padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 600,
                                            color: "#525866", letterSpacing: "0.05em", textTransform: "uppercase" as const,
                                        }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={4} style={{ padding: "40px", textAlign: "center", color: "#94a3b8", fontSize: "13px" }}>Loading…</td></tr>
                                ) : blogs.length === 0 ? (
                                    <tr><td colSpan={4} style={{ padding: "40px", textAlign: "center", color: "#94a3b8", fontSize: "13px" }}>No blogs yet. Click "New Blog Post" to create one.</td></tr>
                                ) : blogs.map((blog) => (
                                    <tr key={blog.id} style={{ borderBottom: "1px solid #f1f5f9", transition: "background .1s" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "#fafbfc")}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                                    >
                                        <td style={{ padding: "14px 16px" }}>
                                            <div style={{ fontSize: "13px", fontWeight: 600, color: "#0e121b", maxWidth: "320px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                {blog.title}
                                            </div>
                                            <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>
                                                {blog.intro.slice(0, 60)}…
                                            </div>
                                        </td>
                                        <td style={{ padding: "14px 16px", fontSize: "12px", color: "#525866" }}>{blog.author.name}</td>
                                        <td style={{ padding: "14px 16px", fontSize: "12px", color: "#94a3b8" }}>
                                            {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                        </td>
                                        <td style={{ padding: "14px 16px" }}>
                                            <div style={{ display: "flex", gap: "6px" }}>
                                                <button onClick={() => setPreviewBlog(blog)} title="Preview" style={actionBtnStyle}><Eye size={14} /></button>
                                                <button onClick={() => openEdit(blog)} title="Edit" style={actionBtnStyle}><Edit size={14} /></button>
                                                <button onClick={() => handleDelete(blog.id)} title="Delete" style={{ ...actionBtnStyle, color: "#ef4444" }}><Trash2 size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* ── Preview Modal ── */}
            {previewBlog && (
                <div style={{
                    position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100,
                    display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
                }} onClick={(e) => { if (e.target === e.currentTarget) setPreviewBlog(null); }}>
                    <div style={{
                        background: "#fff", borderRadius: "16px", maxWidth: "780px", width: "100%",
                        maxHeight: "90vh", overflow: "auto", boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
                    }}>
                        <div style={{
                            padding: "20px 24px", borderBottom: "1px solid #e2e8f0",
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                        }}>
                            <div style={{ fontSize: "16px", fontWeight: 700, color: "#0e121b", fontFamily: FONT }}>Blog Preview</div>
                            <button onClick={() => setPreviewBlog(null)}
                                style={{ background: "transparent", border: "none", cursor: "pointer", color: "#94a3b8", padding: "4px" }}>
                                <X size={18} />
                            </button>
                        </div>

                        <div style={{ padding: "24px" }}>
                            {previewBlog.coverImage && (
                                <img src={previewBlog.coverImage} alt={previewBlog.title}
                                    style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "12px", marginBottom: "20px" }} />
                            )}
                            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0e121b", fontFamily: FONT, marginBottom: "12px", lineHeight: 1.3 }}>
                                {previewBlog.title}
                            </h1>
                            <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#475569", marginBottom: "24px", fontFamily: FONT }}>{previewBlog.intro}</p>

                            {(previewBlog.sections as BlogSection[]).map((section, i) => (
                                <div key={i} style={{ marginBottom: "24px" }}>
                                    <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#0e121b", fontFamily: FONT, marginBottom: "8px" }}>{section.heading}</h2>
                                    {section.image && (
                                        <img src={section.image} alt={section.heading}
                                            style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }} />
                                    )}
                                    <p style={{ fontSize: "13px", lineHeight: 1.7, color: "#475569", fontFamily: FONT }}>{section.text}</p>
                                </div>
                            ))}

                            {previewBlog.conclusion && (
                                <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "16px", marginTop: "16px" }}>
                                    <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#0e121b", fontFamily: FONT, marginBottom: "8px" }}>Conclusion</h3>
                                    <p style={{ fontSize: "13px", lineHeight: 1.7, color: "#475569", fontFamily: FONT }}>{previewBlog.conclusion}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ── Editor Modal ── */}
            {showEditor && (
                <div style={{
                    position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100,
                    display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
                }} onClick={(e) => { if (e.target === e.currentTarget) setShowEditor(false); }}>
                    <div style={{
                        background: "#fff", borderRadius: "16px", maxWidth: "780px", width: "100%",
                        maxHeight: "90vh", overflow: "auto", boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
                    }}>
                        {/* Header */}
                        <div style={{
                            padding: "20px 24px", borderBottom: "1px solid #e2e8f0",
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                        }}>
                            <div style={{ fontSize: "16px", fontWeight: 700, color: "#0e121b", fontFamily: FONT }}>
                                {editingBlog ? "Edit Blog Post" : "New Blog Post"}
                            </div>
                            <button onClick={() => setShowEditor(false)}
                                style={{ background: "transparent", border: "none", cursor: "pointer", color: "#94a3b8", padding: "4px" }}>
                                <X size={18} />
                            </button>
                        </div>

                        {/* Form */}
                        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                            {formError && (
                                <div style={{ padding: "10px 16px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "13px", color: "#991b1b" }}>
                                    {formError}
                                </div>
                            )}

                            {/* Title */}
                            <div>
                                <label style={labelStyle}>Blog Title *</label>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter a compelling title…" style={inputStyle} />
                            </div>

                            {/* Cover Image */}
                            <div>
                                <label style={labelStyle}>Cover Image URL</label>
                                <div style={{ position: "relative" }}>
                                    <ImageIcon size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                                    <input type="text" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="https://example.com/image.jpg"
                                        style={{ ...inputStyle, paddingLeft: "34px" }} />
                                </div>
                                {coverImage && (
                                    <img src={coverImage} alt="Cover" style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "8px", marginTop: "8px" }} />
                                )}
                            </div>

                            {/* Intro */}
                            <div>
                                <label style={labelStyle}>Introduction *</label>
                                <textarea className="text-black!" value={intro} onChange={(e) => setIntro(e.target.value)} placeholder="Write a compelling introduction…"
                                    rows={3} style={{ ...inputStyle, resize: "vertical" as const }} />
                            </div>

                            {/* Sections */}
                            <div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                                    <label style={{ ...labelStyle, margin: 0 }}>Sections (up to 3)</label>
                                    {sections.length < 3 && (
                                        <button onClick={() => setSections((p) => [...p, { ...EMPTY_SECTION }])} style={{
                                            display: "flex", alignItems: "center", gap: "4px", padding: "4px 10px", borderRadius: "6px",
                                            border: "1px dashed #cbd5e1", background: "transparent", cursor: "pointer", fontSize: "11px", color: "#64748b", fontFamily: FONT,
                                        }}>
                                            <Plus size={11} /> Add
                                        </button>
                                    )}
                                </div>

                                {sections.map((s, idx) => (
                                    <div key={idx} style={{
                                        background: "#fafbfc", border: "1px solid #e2e8f0", borderRadius: "10px",
                                        padding: "12px", marginBottom: "8px",
                                    }}>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                                            <span style={{ fontSize: "12px", fontWeight: 600, color: "#475569", fontFamily: FONT }}>Section {idx + 1}</span>
                                            {sections.length > 1 && (
                                                <button onClick={() => setSections((p) => p.filter((_, i) => i !== idx))}
                                                    style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: "11px", color: "#ef4444", fontFamily: FONT }}>
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                        <input type="text" value={s.heading} onChange={(e) => updateSection(idx, "heading", e.target.value)}
                                            placeholder="Section heading…" style={{ ...inputStyle, marginBottom: "8px" }} />
                                        <textarea value={s.text} onChange={(e) => updateSection(idx, "text", e.target.value)}
                                            placeholder="Section content…" rows={3} style={{ ...inputStyle, resize: "vertical" as const, marginBottom: "8px" }} />
                                        <div style={{ position: "relative" }}>
                                            <ImageIcon size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                                            <input type="text" value={s.image || ""} onChange={(e) => updateSection(idx, "image", e.target.value)}
                                                placeholder="Optional image URL" style={{ ...inputStyle, paddingLeft: "34px" }} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Conclusion */}
                            <div>
                                <label style={labelStyle}>Conclusion</label>
                                <textarea value={conclusion} onChange={(e) => setConclusion(e.target.value)} placeholder="Summarize key points…"
                                    rows={3} style={{ ...inputStyle, resize: "vertical" as const }} />
                            </div>
                        </div>

                        {/* Footer */}
                        <div style={{ padding: "16px 24px", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                            <button onClick={() => setShowEditor(false)} style={{
                                padding: "8px 18px", borderRadius: "8px", border: "1px solid #e2e8f0",
                                background: "#fff", color: "#525866", fontSize: "13px", cursor: "pointer", fontFamily: FONT,
                            }}>Cancel</button>
                            <button onClick={handleSave} disabled={saving} style={{
                                display: "flex", alignItems: "center", gap: "6px",
                                padding: "8px 20px", borderRadius: "8px", border: "none", cursor: "pointer",
                                background: "linear-gradient(135deg, #ff7a00, #e06a00)", color: "#fff",
                                fontSize: "13px", fontWeight: 600, fontFamily: FONT, opacity: saving ? 0.6 : 1,
                            }}>
                                <Save size={14} /> {editingBlog ? "Update" : "Publish"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ── style helpers ── */
const actionBtnStyle: React.CSSProperties = {
    padding: "6px", background: "transparent", border: "1px solid #e2e8f0",
    borderRadius: "6px", cursor: "pointer", color: "#525866", display: "flex",
    alignItems: "center", justifyContent: "center", transition: "all .15s",
};

const labelStyle: React.CSSProperties = {
    display: "block", fontSize: "12px", fontWeight: 600, color: "#374151",
    marginBottom: "4px", fontFamily: "Inter, system-ui, sans-serif",
};

const inputStyle: React.CSSProperties = {
    width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #e2e8f0",
    fontSize: "13px", fontFamily: "Inter, system-ui, sans-serif", outline: "none", background: "#fff", color : "black"
};
