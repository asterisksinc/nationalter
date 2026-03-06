"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardSidebar } from "../component/dashboardsidebar";
import { DashboardHeader } from "../component/DashboardHeader";
import { ChevronDown, Download, Plus, Users, Stethoscope, Building2, Hourglass, X } from "lucide-react";

interface Registration {
  ticketId: string;
  type: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
  nationciteId?: string;
  registrantData?: {
    primaryHospital?: string;
    institute?: string;
    plan?: string;
  };
}

export default function RegistrationRequestsPage() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [allRegistrations, setAllRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [addMode, setAddMode] = useState<"SCHOLAR" | "ORG">("SCHOLAR");
  const [scholarType, setScholarType] = useState<"RESEARCHER" | "MEDICAL">("RESEARCHER");
  const [formSaving, setFormSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [createdTicketId, setCreatedTicketId] = useState("");
  const [createdInfo, setCreatedInfo] = useState("");

  const [scholarForm, setScholarForm] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    state: "",
    medCouncilRegNo: "",
    stateCouncil: "",
    primaryHospital: "",
    specialty: "",
    researchFocus: "",
    medicalDegreeUrl: "",
    regCertificateUrl: "",
    institute: "",
    instituteEmail: "",
    orcidId: "",
    institutionalIdCardUrl: "",
    googleScholarUrl: "",
    primaryDomain: "",
    profilePhotoUrl: "",
  });

  const [orgForm, setOrgForm] = useState({
    name: "",
    domain: "",
    email: "",
    number: "",
    city: "",
    state: "",
    letterOfAuthorizationUrl: "",
    accreditationProofUrl: "",
  });

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const params = new URLSearchParams();
      if (filterType !== "ALL") params.append("type", filterType);
      if (filterStatus !== "ALL") params.append("status", filterStatus);

      const response = await fetch(`/api/registration/requests?${params}`, { credentials: "include" });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to load registrations");
      }

      setRegistrations(data.data || []);
    } catch (err) {
      console.error(err);
      setRegistrations([]);
      setLoadError(err instanceof Error ? err.message : "Failed to load registrations");
    } finally {
      setLoading(false);
    }
  }, [filterType, filterStatus]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  useEffect(() => {
    const fetchAllRegistrations = async () => {
      try {
        const response = await fetch("/api/registration/requests", { credentials: "include" });
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to load registration totals");
        }

        setAllRegistrations(data.data || []);
      } catch (err) {
        console.error(err);
        setAllRegistrations([]);
      }
    };

    fetchAllRegistrations();
  }, []);

  const resetCreateState = () => {
    setFormError("");
    setCreatedTicketId("");
    setCreatedInfo("");
  };

  const openCreatePanel = () => {
    resetCreateState();
    setShowAddPanel(true);
  };

  const closeCreatePanel = () => {
    setShowAddPanel(false);
    resetCreateState();
  };

  const handleCreateUser = async () => {
    setFormSaving(true);
    setFormError("");
    setCreatedTicketId("");
    setCreatedInfo("");

    try {
      if (addMode === "SCHOLAR") {
        const payload = {
          type: scholarType,
          name: scholarForm.name,
          email: scholarForm.email,
          mobile: scholarForm.mobile,
          city: scholarForm.city,
          state: scholarForm.state,
          medCouncilRegNo: scholarForm.medCouncilRegNo,
          stateCouncil: scholarForm.stateCouncil,
          primaryHospital: scholarForm.primaryHospital,
          specialty: scholarForm.specialty,
          researchFocus: scholarForm.researchFocus,
          medicalDegreeUrl: scholarForm.medicalDegreeUrl,
          regCertificateUrl: scholarForm.regCertificateUrl,
          institute: scholarForm.institute,
          instituteEmail: scholarForm.instituteEmail,
          orcidId: scholarForm.orcidId,
          institutionalIdCardUrl: scholarForm.institutionalIdCardUrl,
          googleScholarUrl: scholarForm.googleScholarUrl,
          primaryDomain: scholarForm.primaryDomain,
          profilePhotoUrl: scholarForm.profilePhotoUrl,
        };

        const res = await fetch("/api/registration/scholars", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });

        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.message || "Failed to create registration request");
        }

        const ticketId = json.data?.ticketId || "";
        setCreatedTicketId(ticketId);
        setCreatedInfo(`${scholarType} registration request created and added to queue`);
      }

      if (addMode === "ORG") {
        const res = await fetch("/api/registration/orgs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(orgForm),
        });

        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.message || "Failed to create organization request");
        }

        const ticketId = json.data?.ticketId || "";
        setCreatedTicketId(ticketId);
        setCreatedInfo("Organization registration request created and added to queue");
      }

      await fetchRegistrations();

      const response = await fetch("/api/registration/requests", { credentials: "include" });
      const data = await response.json();
      setAllRegistrations(data.data || []);
    } catch (error: unknown) {
      setFormError(error instanceof Error ? error.message : "Failed to create");
    } finally {
      setFormSaving(false);
    }
  };

  const total = allRegistrations.length;
  const pendingCount = allRegistrations.filter((r) => r.status === "PENDING").length;
  const researcherCount = allRegistrations.filter((r) => r.type === "RESEARCHER").length;
  const medicalCount = allRegistrations.filter((r) => r.type === "MEDICAL").length;
  const orgCount = allRegistrations.filter((r) => r.type === "ORG").length;
  const today = new Date().toDateString();
  const pendingToday = allRegistrations.filter(
    (r) => r.status === "PENDING" && new Date(r.createdAt).toDateString() === today,
  ).length;

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] relative">
      <DashboardSidebar
        activePage="registrations"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 transition-all duration-300 ml-0 md:ml-[260px] w-full overflow-x-hidden">
        <DashboardHeader
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Registrations" },
          ]}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <div className="p-4 md:p-6">
          {loadError && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {loadError}
            </div>
          )}

          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start pb-4 gap-4 border-b border-gray-200 mb-4">
            <div>
              <div className="text-xl md:text-2xl font-semibold text-gray-900">
                Registration Verification Dashboard
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Review, approve, or reject new registrations from researchers, medical professionals, and organizations.
              </div>
            </div>
            <button
              onClick={openCreatePanel}
              className="flex items-center gap-2 bg-[#FF7F3E] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#e66a2e] transition-colors text-sm"
            >
              <Plus size={18} />
              Add Registration
            </button>
          </div>

          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <StatCard
              icon={<Hourglass size={20} />}
              label="Pending"
              value={pendingCount.toString()}
              trend={`${pendingToday} Today`}
              trendColor={pendingToday > 0 ? "text-red-500" : "text-gray-500"}
            />
            <StatCard
              icon={<Users size={20} />}
              label="Researchers"
              value={researcherCount.toString()}
              progress={total > 0 ? Math.round((researcherCount / total) * 100) : 0}
            />
            <StatCard
              icon={<Stethoscope size={20} />}
              label="Medical"
              value={medicalCount.toString()}
              progress={total > 0 ? Math.round((medicalCount / total) * 100) : 0}
            />
            <StatCard
              icon={<Building2 size={20} />}
              label="Organisations"
              value={orgCount.toString()}
              progress={total > 0 ? Math.round((orgCount / total) * 100) : 0}
            />
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Filters Bar */}
            <div className="p-4 flex flex-col lg:flex-row justify-between items-center gap-4 border-b border-gray-100">
              <div className="flex flex-wrap gap-3 items-center flex-1 w-full">
                <input
                  type="text"
                  placeholder="Search by name, email, or ID..."
                  className="flex-1 max-w-md min-w-[200px] px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7F3E]/20 focus:border-[#FF7F3E]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="relative">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="appearance-none px-4 py-2 pr-8 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7F3E]/20"
                  >
                    <option value="ALL">All Types</option>
                    <option value="RESEARCHER">Researcher</option>
                    <option value="MEDICAL">Medical</option>
                    <option value="ORG">Organization</option>
                  </select>
                  <ChevronDown size={14} className="text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="appearance-none px-4 py-2 pr-8 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7F3E]/20"
                  >
                    <option value="ALL">All Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                  <ChevronDown size={14} className="text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <Download size={16} />
                Export
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-16 text-center text-gray-500">Loading registrations...</div>
              ) : (
                <table className="w-full min-w-[900px] text-left">
                  <thead>
                    <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                      <th className="px-4 py-3 font-medium">ID</th>
                      <th className="px-4 py-3 font-medium">Type</th>
                      <th className="px-4 py-3 font-medium">Name / Institution</th>
                      <th className="px-4 py-3 font-medium">Email</th>
                      <th className="px-4 py-3 font-medium">Submitted</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {registrations
                      .filter((r) =>
                        r.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        r.nationciteId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        r.ticketId?.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((reg, index) => {
                        const rowKey =
                          reg.ticketId ||
                          `${reg.type}-${reg.email}-${reg.createdAt}-${index}`;

                        return (
                        <tr key={rowKey} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3 text-sm text-gray-900">{reg.ticketId}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              reg.type === 'ORG' ? 'bg-orange-50 text-orange-600' :
                              reg.type === 'RESEARCHER' ? 'bg-blue-50 text-blue-600' : 
                              'bg-purple-50 text-purple-600'
                            }`}>
                              {reg.type}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-sm text-gray-900">{reg.name}</div>
                            <div className="text-xs text-gray-500">
                              {reg.registrantData?.primaryHospital || reg.registrantData?.institute || "N/A"}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{reg.email}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {new Date(reg.createdAt).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              reg.status === 'APPROVED' ? 'bg-green-50 text-green-600' :
                              reg.status === 'REJECTED' ? 'bg-red-50 text-red-600' :
                              'bg-yellow-50 text-yellow-600'
                            }`}>
                              {reg.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => router.push(`/admin-overview/registration-requests/${reg.ticketId}`)}
                              className="text-sm text-[#FF7F3E] hover:underline"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                        );
                      })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>

      {showAddPanel && (
        <div className="fixed inset-0 z-[70] bg-black/45" onClick={closeCreatePanel}>
          <div
            className="absolute right-0 top-0 h-full w-full max-w-[680px] bg-white shadow-2xl border-l border-gray-200 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold text-gray-900">Add Registration</div>
                <div className="text-xs text-gray-600 mt-1">Create researcher, medical, or organization registration requests</div>
              </div>
              <button onClick={closeCreatePanel} className="p-2 rounded-md text-gray-500 hover:bg-gray-100">
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                <button
                  onClick={() => { setAddMode("SCHOLAR"); resetCreateState(); }}
                  className={`px-3 py-2 rounded-md text-sm font-medium border ${addMode === "SCHOLAR" ? "bg-[#ffefe6] text-[#a34f25] border-[#ffb082]" : "bg-white text-gray-700 border-gray-200"}`}
                >
                  Add Researcher / Medical
                </button>
                <button
                  onClick={() => { setAddMode("ORG"); resetCreateState(); }}
                  className={`px-3 py-2 rounded-md text-sm font-medium border ${addMode === "ORG" ? "bg-[#ffefe6] text-[#a34f25] border-[#ffb082]" : "bg-white text-gray-700 border-gray-200"}`}
                >
                  Add Organization
                </button>
              </div>

              {addMode === "SCHOLAR" && (
                <div className="space-y-3">
                  <FormLabel text="Type" />
                  <select value={scholarType} onChange={(e) => setScholarType(e.target.value as "RESEARCHER" | "MEDICAL")} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900">
                    <option value="RESEARCHER">Researcher</option>
                    <option value="MEDICAL">Medical</option>
                  </select>

                  <FormGrid>
                    <Field label="Name" value={scholarForm.name} onChange={(v) => setScholarForm((p) => ({ ...p, name: v }))} />
                    <Field label="Email" value={scholarForm.email} onChange={(v) => setScholarForm((p) => ({ ...p, email: v }))} />
                    <Field label="Mobile" value={scholarForm.mobile} onChange={(v) => setScholarForm((p) => ({ ...p, mobile: v }))} />
                    <Field label="City" value={scholarForm.city} onChange={(v) => setScholarForm((p) => ({ ...p, city: v }))} />
                    <Field label="State" value={scholarForm.state} onChange={(v) => setScholarForm((p) => ({ ...p, state: v }))} />
                  </FormGrid>

                  {scholarType === "RESEARCHER" && (
                    <FormGrid>
                      <Field label="Institute" value={scholarForm.institute} onChange={(v) => setScholarForm((p) => ({ ...p, institute: v }))} />
                      <Field label="Institute Email" value={scholarForm.instituteEmail} onChange={(v) => setScholarForm((p) => ({ ...p, instituteEmail: v }))} />
                      <Field label="ORCID ID" value={scholarForm.orcidId} onChange={(v) => setScholarForm((p) => ({ ...p, orcidId: v }))} />
                      <Field label="Primary Domain" value={scholarForm.primaryDomain} onChange={(v) => setScholarForm((p) => ({ ...p, primaryDomain: v }))} />
                      <Field label="Google Scholar URL" value={scholarForm.googleScholarUrl} onChange={(v) => setScholarForm((p) => ({ ...p, googleScholarUrl: v }))} />
                      <Field label="Profile Photo URL" value={scholarForm.profilePhotoUrl} onChange={(v) => setScholarForm((p) => ({ ...p, profilePhotoUrl: v }))} />
                      <Field label="Institutional ID Card URL" value={scholarForm.institutionalIdCardUrl} onChange={(v) => setScholarForm((p) => ({ ...p, institutionalIdCardUrl: v }))} />
                    </FormGrid>
                  )}

                  {scholarType === "MEDICAL" && (
                    <FormGrid>
                      <Field label="Med Council Reg No" value={scholarForm.medCouncilRegNo} onChange={(v) => setScholarForm((p) => ({ ...p, medCouncilRegNo: v }))} />
                      <Field label="State Council" value={scholarForm.stateCouncil} onChange={(v) => setScholarForm((p) => ({ ...p, stateCouncil: v }))} />
                      <Field label="Primary Hospital" value={scholarForm.primaryHospital} onChange={(v) => setScholarForm((p) => ({ ...p, primaryHospital: v }))} />
                      <Field label="Specialty" value={scholarForm.specialty} onChange={(v) => setScholarForm((p) => ({ ...p, specialty: v }))} />
                      <Field label="Research Focus" value={scholarForm.researchFocus} onChange={(v) => setScholarForm((p) => ({ ...p, researchFocus: v }))} />
                      <Field label="Medical Degree URL" value={scholarForm.medicalDegreeUrl} onChange={(v) => setScholarForm((p) => ({ ...p, medicalDegreeUrl: v }))} />
                      <Field label="Reg Certificate URL" value={scholarForm.regCertificateUrl} onChange={(v) => setScholarForm((p) => ({ ...p, regCertificateUrl: v }))} />
                    </FormGrid>
                  )}
                </div>
              )}

              {addMode === "ORG" && (
                <FormGrid>
                  <Field label="Organization Name" value={orgForm.name} onChange={(v) => setOrgForm((p) => ({ ...p, name: v }))} />
                  <Field label="Domain" value={orgForm.domain} onChange={(v) => setOrgForm((p) => ({ ...p, domain: v }))} />
                  <Field label="Email" value={orgForm.email} onChange={(v) => setOrgForm((p) => ({ ...p, email: v }))} />
                  <Field label="Mobile Number" value={orgForm.number} onChange={(v) => setOrgForm((p) => ({ ...p, number: v }))} />
                  <Field label="City" value={orgForm.city} onChange={(v) => setOrgForm((p) => ({ ...p, city: v }))} />
                  <Field label="State" value={orgForm.state} onChange={(v) => setOrgForm((p) => ({ ...p, state: v }))} />
                  <Field label="Letter Of Authorization URL" value={orgForm.letterOfAuthorizationUrl} onChange={(v) => setOrgForm((p) => ({ ...p, letterOfAuthorizationUrl: v }))} />
                  <Field label="Accreditation Proof URL" value={orgForm.accreditationProofUrl} onChange={(v) => setOrgForm((p) => ({ ...p, accreditationProofUrl: v }))} />
                </FormGrid>
              )}

              {formError && <div className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">{formError}</div>}
              {createdInfo && <div className="mt-4 text-sm text-green-800 bg-green-50 border border-green-200 rounded-md px-3 py-2">{createdInfo}</div>}
              {createdTicketId && (
                <div className="mt-3 text-sm text-[#a34f25] bg-orange-50 border border-orange-200 rounded-md px-3 py-2">
                  New Registration Ticket ID: <span className="font-semibold">{createdTicketId}</span>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end gap-3">
                <button onClick={closeCreatePanel} className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
                <button
                  onClick={handleCreateUser}
                  disabled={formSaving}
                  className="px-4 py-2 rounded-lg bg-[#FF7F3E] text-white text-sm font-medium hover:bg-[#e66a2e] disabled:opacity-60"
                >
                  {formSaving ? "Creating..." : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FormLabel({ text }: { text: string }) {
  return <div className="text-xs font-medium text-gray-700 mb-1">{text}</div>;
}

function FormGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>;
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div>
      <FormLabel text={label} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-600"
        placeholder={label}
      />
    </div>
  );
}

function StatCard({ icon, label, value, trend, trendColor, progress }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: string;
  trendColor?: string;
  progress?: number;
}) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200">
      <div className="flex gap-3 items-center mb-3">
        <div className="p-2 bg-orange-50 rounded-lg text-[#A34F25]">{icon}</div>
        <div>
          <div className="text-xs text-gray-500">{label}</div>
          <div className="text-xl font-semibold text-gray-900">{value}</div>
        </div>
      </div>
      {trend && (
        <div className={`text-xs ${trendColor}`}>{trend}</div>
      )}
      {progress !== undefined && (
        <div className="mt-2">
          <div className="h-1.5 bg-orange-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#FF7F3E] rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}
    </div>
  );
}