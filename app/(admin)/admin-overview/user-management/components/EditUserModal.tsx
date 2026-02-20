"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, Loader2, Save } from "lucide-react";

interface EditUserModalProps {
    nationciteId: string;
    registrationType: string;
    onClose: () => void;
    onSaved: () => void;
}

type Tab = "account" | "profile" | "documents" | "public";

const FONT = "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

/* ---- Shared field components using inline styles ---- */
const FieldGroup = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#525866", fontFamily: FONT, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            {label}
        </span>
        {children}
    </div>
);

const inputStyle: React.CSSProperties = {
    padding: "8px 12px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "13px",
    fontFamily: FONT,
    color: "#0e121b",
    background: "#fff",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
};

const disabledInputStyle: React.CSSProperties = {
    ...inputStyle,
    background: "#f8fafc",
    color: "#94a3b8",
    cursor: "not-allowed",
};

const Field = ({
    label, value, onChange, type = "text", disabled = false, mono = false,
}: {
    label: string; value: string | number | null | undefined; onChange: (v: string) => void;
    type?: string; disabled?: boolean; mono?: boolean;
}) => (
    <FieldGroup label={label}>
        <input
            type={type === "boolean" ? "text" : type}
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            style={{ ...(disabled ? disabledInputStyle : inputStyle), fontFamily: mono ? "'SF Mono','Fira Code',monospace" : FONT }}
        />
    </FieldGroup>
);

const BoolField = ({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) => {
    const btnBase: React.CSSProperties = { padding: "6px 18px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px", fontFamily: FONT, cursor: "pointer" };
    return (
        <FieldGroup label={label}>
            <div style={{ display: "flex", gap: "8px" }}>
                <button type="button" onClick={() => onChange(true)}
                    style={{ ...btnBase, background: value ? "#dcfce7" : "#fff", borderColor: value ? "#16a34a" : "#e2e8f0", color: value ? "#15803d" : "#525866", fontWeight: value ? 600 : 400 }}>
                    Active
                </button>
                <button type="button" onClick={() => onChange(false)}
                    style={{ ...btnBase, background: !value ? "#fee2e2" : "#fff", borderColor: !value ? "#ef4444" : "#e2e8f0", color: !value ? "#b91c1c" : "#525866", fontWeight: !value ? 600 : 400 }}>
                    Inactive
                </button>
            </div>
        </FieldGroup>
    );
};

const SelectField = ({ label, value, onChange, options }: {
    label: string; value: string; onChange: (v: string) => void;
    options: { label: string; value: string }[];
}) => (
    <FieldGroup label={label}>
        <select value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}
            style={{ ...inputStyle, cursor: "pointer" }}>
            {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
    </FieldGroup>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div style={{ fontSize: "11px", fontWeight: 700, color: "#ff7a00", fontFamily: FONT, textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #fff1e7", paddingBottom: "6px", marginBottom: "12px", marginTop: "4px" }}>
        {children}
    </div>
);

const Grid2 = ({ children }: { children: React.ReactNode }) => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>{children}</div>
);

/* ---- Main Modal ---- */
export const EditUserModal: React.FC<EditUserModalProps> = ({ nationciteId, registrationType, onClose, onSaved }) => {
    const [tab, setTab] = useState<Tab>("account");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const [authUser, setAuthUser] = useState<any>({});
    const [profileData, setProfileData] = useState<any>({});
    const [publicData, setPublicData] = useState<any>({});
    const [regData, setRegData] = useState<any>({});

    const type = registrationType;

    const fetchDetail = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            const res = await fetch(`/api/admin/user-detail?nationciteId=${encodeURIComponent(nationciteId)}`);
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || "Failed to load");
            setAuthUser(json.authUser ?? {});
            setProfileData(json.profileData ?? {});
            setPublicData(json.publicData ?? {});
            setRegData(json.registration ?? {});
        } catch (e: any) { setError(e.message); }
        finally { setLoading(false); }
    }, [nationciteId]);

    useEffect(() => { fetchDetail(); }, [fetchDetail]);

    const handleSave = async () => {
        setSaving(true); setError(null); setSaveSuccess(false);
        try {
            const res = await fetch("/api/admin/user-update", {
                method: "PUT", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nationciteId, type, authUser: { isActive: authUser.isActive }, profileData, publicData }),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || "Save failed");
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
            onSaved();
        } catch (e: any) { setError(e.message); }
        finally { setSaving(false); }
    };

    const tabs: { key: Tab; label: string }[] = [
        { key: "account", label: "Account" },
        { key: "profile", label: type === "ORG" ? "Org Details" : "Profile" },
        { key: "documents", label: "Documents" },
        { key: "public", label: "Public Index" },
    ];

    /* ---- Tab content ---- */
    const renderAccount = () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
                <SectionTitle>Auth Account</SectionTitle>
                <Grid2>
                    <Field label="Email" value={authUser.email} onChange={() => { }} disabled />
                    <Field label="Role" value={authUser.role} onChange={() => { }} disabled />
                    <BoolField label="Active Status" value={!!authUser.isActive} onChange={(v) => setAuthUser({ ...authUser, isActive: v })} />
                    <Field label="Last Login" value={authUser.lastLoginAt ? new Date(authUser.lastLoginAt).toLocaleString() : "Never"} onChange={() => { }} disabled />
                    <Field label="Member Since" value={authUser.createdAt ? new Date(authUser.createdAt).toLocaleDateString() : ""} onChange={() => { }} disabled />
                </Grid2>
            </div>
            <div>
                <SectionTitle>Registration</SectionTitle>
                <Grid2>
                    <Field label="NationCite ID" value={nationciteId} onChange={() => { }} disabled mono />
                    <Field label="Type" value={type} onChange={() => { }} disabled />
                    <SelectField label="Registration Status"
                        value={profileData.registrationStatus ?? regData.status ?? ""}
                        onChange={(v) => setProfileData({ ...profileData, registrationStatus: v })}
                        options={[{ label: "PENDING", value: "PENDING" }, { label: "APPROVED", value: "APPROVED" }, { label: "REJECTED", value: "REJECTED" }]}
                    />
                    <SelectField label="Plan"
                        value={profileData.plan ?? ""}
                        onChange={(v) => setProfileData({ ...profileData, plan: v })}
                        options={[{ label: "STANDARD", value: "STANDARD" }, { label: "PREMIUM", value: "PREMIUM" }]}
                    />
                </Grid2>
            </div>
        </div>
    );

    const renderScholarProfile = () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
                <SectionTitle>Personal Info</SectionTitle>
                <Grid2>
                    <Field label="Full Name" value={profileData.name} onChange={(v) => setProfileData({ ...profileData, name: v })} />
                    <Field label="Mobile" value={profileData.mobile} onChange={(v) => setProfileData({ ...profileData, mobile: v })} />
                    <Field label="City" value={profileData.city} onChange={(v) => setProfileData({ ...profileData, city: v })} />
                    <Field label="State" value={profileData.state} onChange={(v) => setProfileData({ ...profileData, state: v })} />
                </Grid2>
            </div>
            {type === "RESEARCHER" && (
                <div>
                    <SectionTitle>Researcher Details</SectionTitle>
                    <Grid2>
                        <Field label="Email" value={profileData.email} onChange={(v) => setProfileData({ ...profileData, email: v })} />
                        <Field label="Institute Email" value={profileData.instituteEmail} onChange={(v) => setProfileData({ ...profileData, instituteEmail: v })} />
                        <Field label="Institute / University" value={profileData.institute} onChange={(v) => setProfileData({ ...profileData, institute: v })} />
                        <Field label="ORCID ID" value={profileData.orcidId} onChange={(v) => setProfileData({ ...profileData, orcidId: v })} mono />
                        <Field label="Primary Domain" value={profileData.primaryDomain} onChange={(v) => setProfileData({ ...profileData, primaryDomain: v })} />
                        <Field label="Google Scholar URL" value={profileData.googleScholarUrl} onChange={(v) => setProfileData({ ...profileData, googleScholarUrl: v })} />
                    </Grid2>
                </div>
            )}
            {type === "MEDICAL" && (
                <div>
                    <SectionTitle>Medical Details</SectionTitle>
                    <Grid2>
                        <Field label="Email" value={profileData.email} onChange={(v) => setProfileData({ ...profileData, email: v })} />
                        <Field label="Medical Council Reg. No." value={profileData.medCouncilRegNo} onChange={(v) => setProfileData({ ...profileData, medCouncilRegNo: v })} mono />
                        <Field label="State Medical Council" value={profileData.stateCouncil} onChange={(v) => setProfileData({ ...profileData, stateCouncil: v })} />
                        <Field label="Primary Hospital" value={profileData.primaryHospital} onChange={(v) => setProfileData({ ...profileData, primaryHospital: v })} />
                        <Field label="Specialty" value={profileData.specialty} onChange={(v) => setProfileData({ ...profileData, specialty: v })} />
                        <Field label="Research Focus" value={profileData.researchFocus} onChange={(v) => setProfileData({ ...profileData, researchFocus: v })} />
                    </Grid2>
                </div>
            )}
        </div>
    );

    const renderOrgProfile = () => (
        <div>
            <SectionTitle>Organization Details</SectionTitle>
            <Grid2>
                <Field label="Organization Name" value={profileData.name} onChange={(v) => setProfileData({ ...profileData, name: v })} />
                <Field label="Domain" value={profileData.domain} onChange={(v) => setProfileData({ ...profileData, domain: v })} mono />
                <Field label="Official Email" value={profileData.email} onChange={(v) => setProfileData({ ...profileData, email: v })} />
                <Field label="Phone Number" value={profileData.number} onChange={(v) => setProfileData({ ...profileData, number: v })} />
                <Field label="City" value={profileData.city} onChange={(v) => setProfileData({ ...profileData, city: v })} />
                <Field label="State" value={profileData.state} onChange={(v) => setProfileData({ ...profileData, state: v })} />
            </Grid2>
        </div>
    );

    const renderDocuments = () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <SectionTitle>Document URLs</SectionTitle>
            <div style={{ fontSize: "12px", color: "#525866", fontFamily: FONT, marginTop: "-8px" }}>
                Stored document links. Paste a new URL to update.
            </div>
            {type === "RESEARCHER" && <>
                <Field label="Profile Photo URL" value={profileData.profilePhotoUrl} onChange={(v) => setProfileData({ ...profileData, profilePhotoUrl: v })} />
                <Field label="Institutional ID Card URL" value={profileData.institutionalIdCardUrl} onChange={(v) => setProfileData({ ...profileData, institutionalIdCardUrl: v })} />
            </>}
            {type === "MEDICAL" && <>
                <Field label="Medical Degree URL" value={profileData.medicalDegreeUrl} onChange={(v) => setProfileData({ ...profileData, medicalDegreeUrl: v })} />
                <Field label="Registration Certificate URL" value={profileData.regCertificateUrl} onChange={(v) => setProfileData({ ...profileData, regCertificateUrl: v })} />
            </>}
            {type === "ORG" && <>
                <Field label="Letter of Authorization URL" value={profileData.letterOfAuthorizationUrl} onChange={(v) => setProfileData({ ...profileData, letterOfAuthorizationUrl: v })} />
                <Field label="Accreditation Proof URL" value={profileData.accreditationProofUrl} onChange={(v) => setProfileData({ ...profileData, accreditationProofUrl: v })} />
            </>}
        </div>
    );

    const renderPublicIndex = () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
                <SectionTitle>Rankings</SectionTitle>
                <div style={{ display: "grid", gridTemplateColumns: type !== "ORG" ? "1fr 1fr 1fr" : "1fr 1fr", gap: "16px" }}>
                    <Field label="World Rank" value={publicData.worldRank} onChange={(v) => setPublicData({ ...publicData, worldRank: v })} type="number" />
                    <Field label="Country Rank" value={publicData.countryRank} onChange={(v) => setPublicData({ ...publicData, countryRank: v })} type="number" />
                    {type !== "ORG" && <Field label="University Rank" value={publicData.universityRank} onChange={(v) => setPublicData({ ...publicData, universityRank: v })} type="number" />}
                </div>
            </div>
            <div>
                <SectionTitle>H-Index Data</SectionTitle>
                <div style={{ display: "grid", gridTemplateColumns: type !== "ORG" ? "1fr 1fr 1fr" : "1fr 1fr", gap: "16px" }}>
                    <Field label="H-Index (Total)" value={publicData.hIndexTotal} onChange={(v) => setPublicData({ ...publicData, hIndexTotal: v })} type="number" />
                    <Field label="H-Index (Last 5yr)" value={publicData.hIndexLast5} onChange={(v) => setPublicData({ ...publicData, hIndexLast5: v })} type="number" />
                    {type !== "ORG" && <Field label="H-Index Ratio" value={publicData.hIndexRatio} onChange={(v) => setPublicData({ ...publicData, hIndexRatio: v })} type="number" />}
                </div>
            </div>
            <div>
                <SectionTitle>Public Profile</SectionTitle>
                <Grid2>
                    {type !== "ORG" ? <>
                        <Field label="Scholar Name (Public)" value={publicData.scholarName} onChange={(v) => setPublicData({ ...publicData, scholarName: v })} />
                        <Field label="Organization Name (Public)" value={publicData.orgName} onChange={(v) => setPublicData({ ...publicData, orgName: v })} />
                        <Field label="Main Subject" value={publicData.mainSubject} onChange={(v) => setPublicData({ ...publicData, mainSubject: v })} />
                        <Field label="Sub-Field" value={publicData.subField} onChange={(v) => setPublicData({ ...publicData, subField: v })} />
                    </> : <>
                        <Field label="Organization Name (Public)" value={publicData.orgName} onChange={(v) => setPublicData({ ...publicData, orgName: v })} />
                    </>}
                </Grid2>
            </div>
        </div>
    );

    /* ---- render ---- */
    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex" }}>
            {/* Backdrop */}
            <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />

            {/* Panel */}
            <div style={{
                position: "relative", marginLeft: "auto",
                width: "100%", maxWidth: "640px", height: "100%",
                background: "#fff", display: "flex", flexDirection: "column",
                boxShadow: "-4px 0 24px rgba(0,0,0,0.12)",
                fontFamily: FONT,
                animation: "slideInRight 0.2s ease-out",
            }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: "1px solid #e2e8f0", flexShrink: 0 }}>
                    <div>
                        <div style={{ fontSize: "15px", fontWeight: 600, color: "#0e121b", fontFamily: FONT }}>Edit User</div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                            <span style={{ fontFamily: "'SF Mono','Fira Code',monospace", fontSize: "11px", background: "#f1f5f9", padding: "2px 8px", borderRadius: "4px", color: "#525866" }}>{nationciteId}</span>
                            <span style={{ fontSize: "11px", fontWeight: 600, background: "#fff1e7", color: "#ff7a00", padding: "2px 8px", borderRadius: "4px" }}>{type}</span>
                        </div>
                    </div>
                    <button onClick={onClose} style={{ padding: "6px", border: "none", background: "transparent", cursor: "pointer", color: "#525866", borderRadius: "6px", display: "flex", alignItems: "center" }}>
                        <X size={18} />
                    </button>
                </div>

                {/* Tabs */}
                <div style={{ display: "flex", borderBottom: "1px solid #e2e8f0", flexShrink: 0, overflowX: "auto" }}>
                    {tabs.map((t) => (
                        <button key={t.key} onClick={() => setTab(t.key)}
                            style={{
                                padding: "12px 20px", border: "none", background: "transparent", cursor: "pointer",
                                fontSize: "13px", fontFamily: FONT, whiteSpace: "nowrap",
                                fontWeight: tab === t.key ? 600 : 400,
                                color: tab === t.key ? "#ff7a00" : "#525866",
                                borderBottom: tab === t.key ? "2px solid #ff7a00" : "2px solid transparent",
                            }}>
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Body */}
                <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
                    {loading ? (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "60px", gap: "12px", color: "#525866" }}>
                            <Loader2 size={28} style={{ color: "#ff7a00", animation: "spin 1s linear infinite" }} />
                            <span style={{ fontSize: "13px", fontFamily: FONT }}>Loading user details…</span>
                        </div>
                    ) : error && !authUser.email ? (
                        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "16px", fontSize: "13px", color: "#b91c1c", fontFamily: FONT }}>
                            {error}
                        </div>
                    ) : (
                        <>
                            {tab === "account" && renderAccount()}
                            {tab === "profile" && (type === "ORG" ? renderOrgProfile() : renderScholarProfile())}
                            {tab === "documents" && renderDocuments()}
                            {tab === "public" && renderPublicIndex()}
                        </>
                    )}
                </div>

                {/* Footer */}
                <div style={{ flexShrink: 0, padding: "14px 24px", borderTop: "1px solid #e2e8f0", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                    <div style={{ flex: 1 }}>
                        {error && <span style={{ fontSize: "12px", color: "#b91c1c", fontFamily: FONT }}>{error}</span>}
                        {saveSuccess && <span style={{ fontSize: "12px", color: "#15803d", fontFamily: FONT, fontWeight: 600 }}>✓ Saved successfully</span>}
                    </div>
                    <button onClick={onClose}
                        style={{ padding: "8px 18px", border: "1px solid #e2e8f0", borderRadius: "8px", background: "#fff", fontSize: "13px", fontFamily: FONT, color: "#525866", cursor: "pointer" }}>
                        Cancel
                    </button>
                    <button onClick={handleSave} disabled={saving || loading}
                        style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 20px", border: "none", borderRadius: "8px", background: "#ff7a00", fontSize: "13px", fontFamily: FONT, color: "#fff", fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>
                        {saving ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Save size={14} />}
                        {saving ? "Saving…" : "Save Changes"}
                    </button>
                </div>
            </div>

            <style>{`
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
};
