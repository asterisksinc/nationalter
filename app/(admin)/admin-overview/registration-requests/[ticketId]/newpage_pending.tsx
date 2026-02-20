"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { DashboardSidebar } from "../../component/dashboardsidebar";
import { DashboardHeader } from "../../component/DashboardHeader";
import { ArrowLeft, Check, X, ExternalLink, FileText, AlertCircle } from "lucide-react";

interface RegistrantData {
  id: number;
  name: string;
  email: string;
  mobile?: string;
  institute?: string;
  instituteEmail?: string;
  orcidId?: string;
  primaryDomain?: string;
  googleScholarUrl?: string;
  medCouncilRegNo?: string;
  stateCouncil?: string;
  primaryHospital?: string;
  specialty?: string;
  researchFocus?: string;
  domain?: string;
  number?: string;
  officialDomain?: string;
  adminName?: string;
  adminMobile?: string;
  adminEmail?: string;
  researchCategories?: string[];
  referral?: string;
  purpose?: string;
  hIndex?: number;
  citations?: string;
}

interface PotentialMatch {
  nationciteId: string;
  name: string;
  organization?: string;
  hIndexTotal?: number;
  worldRank?: number | null;
}

interface RegistrationData {
  registration: {
    id: number;
    nationciteId: string;
    type: "RESEARCHER" | "ORG" | "MEDICAL";
    status: string;
    ticketId: string;
  };
  ticket: {
    ticketId: string;
    name: string;
    type: string;
    status: string;
    createdAt: string;
  };
  registrantData: RegistrantData;
  potentialMatches: PotentialMatch[];
}

export default function RegistrationReviewPage() {
  const router = useRouter();
  const params = useParams();
  const ticketId = params.ticketId as string;

  const [data, setData] = useState<RegistrationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // NationCite ID assignment state
  const [selectedMatch, setSelectedMatch] = useState<string>("");
  const [customNationCiteId, setCustomNationCiteId] = useState("");
  const [useCustomId, setUseCustomId] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    if (ticketId) {
      fetchRegistrationData();
    }
  }, [ticketId]);

  const fetchRegistrationData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/registration/compare/${ticketId}`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch registration data");
      }

      const result = await response.json();
      setData(result.data);

      if (result.data?.potentialMatches?.length > 0) {
        setSelectedMatch(result.data.potentialMatches[0].nationciteId);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    const nationciteId = useCustomId ? customNationCiteId : selectedMatch;

    if (!nationciteId) {
      alert("Please select or enter a NationCite ID");
      return;
    }

    setProcessing(true);

    try {
      const response = await fetch("/api/tickets/registration-approve", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ticketId,
          nationciteId,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to approve registration");
      }

      alert("Registration approved successfully!");
      router.push("/admin-overview/registration-requests");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to approve");
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }

    setRejecting(true);

    try {
      const response = await fetch("/api/registration/reject", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ticketId,
          reason: rejectReason,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to reject registration");
      }

      alert("Registration rejected successfully");
      router.push("/admin-overview/registration-requests");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to reject");
    } finally {
      setRejecting(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-600">Loading...</div>;
  if (error || !data) return <div className="p-10 text-center text-red-500">{error || "Registration not found"}</div>;

  const type = data.registration.type;
  const isPending = data.registration.status === "PENDING";

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
            { label: "Registrations", href: "/admin-overview/registration-requests" },
            { label: ticketId || "Review" },
          ]}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <div className="p-4 md:p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <div className="text-lg font-semibold text-gray-900">{ticketId}</div>
              <div className="text-xs text-gray-500">{type} Registration</div>
            </div>
            <div className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${
              data.registration.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
              data.registration.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {data.registration.status}
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT COLUMN: Matching & Manual Entry */}
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="text-sm font-medium text-gray-900 mb-4">Assign NationCite ID</div>

                {/* Potential Matches */}
                {data.potentialMatches?.length > 0 && (
                  <div className="mb-4">
                    <label className="flex items-center gap-2 mb-3 cursor-pointer">
                      <input
                        type="radio"
                        checked={!useCustomId}
                        onChange={() => setUseCustomId(false)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">Select from matches</span>
                    </label>

                    <div className={`border border-gray-200 rounded-lg max-h-[280px] overflow-y-auto ${useCustomId ? 'opacity-50 pointer-events-none' : ''}`}>
                      {data.potentialMatches.map((match) => (
                        <label
                          key={match.nationciteId}
                          className={`flex items-start gap-3 p-3 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 ${
                            selectedMatch === match.nationciteId && !useCustomId ? 'bg-green-50' : ''
                          }`}
                        >
                          <input
                            type="radio"
                            name="match"
                            value={match.nationciteId}
                            checked={selectedMatch === match.nationciteId && !useCustomId}
                            onChange={(e) => setSelectedMatch(e.target.value)}
                            disabled={useCustomId}
                            className="mt-1 text-green-600 focus:ring-green-500"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">{match.name}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{match.nationciteId}</div>
                            {match.organization && (
                              <div className="text-xs text-gray-400 truncate">{match.organization}</div>
                            )}
                            {match.hIndexTotal !== undefined && (
                              <div className="text-[11px] text-gray-400 mt-1">
                                H-Index: {match.hIndexTotal}
                                {match.worldRank && ` | Rank: #${match.worldRank}`}
                              </div>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Manual Entry */}
                <div>
                  <label className="flex items-center gap-2 mb-3 cursor-pointer">
                    <input
                      type="radio"
                      checked={useCustomId}
                      onChange={() => setUseCustomId(true)}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Enter manually</span>
                  </label>

                  <input
                    type="text"
                    value={customNationCiteId}
                    onChange={(e) => setCustomNationCiteId(e.target.value)}
                    placeholder="e.g., SC0000001"
                    disabled={!useCustomId}
                    className={`w-full p-3 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 ${
                      !useCustomId ? 'opacity-50 bg-gray-50' : 'bg-white'
                    }`}
                  />
                </div>

                {data.potentialMatches?.length === 0 && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-2 items-start">
                    <AlertCircle size={16} className="text-yellow-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-yellow-800">No matching records found. Please enter ID manually.</span>
                  </div>
                )}
              </div>

              {/* Reject Section */}
              {isPending && (
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="text-sm font-medium text-gray-900 mb-3">Rejection Reason</div>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Enter reason for rejection..."
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 resize-none min-h-[80px]"
                  />
                </div>
              )}

              {/* Action Buttons */}
              {isPending && (
                <div className="flex gap-3">
                  <button
                    onClick={handleApprove}
                    disabled={processing || rejecting}
                    className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Check size={16} />
                    {processing ? "Approving..." : "Approve"}
                  </button>
                  <button
                    onClick={handleReject}
                    disabled={processing || rejecting}
                    className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <X size={16} />
                    {rejecting ? "Rejecting..." : "Reject"}
                  </button>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: User Entered Details */}
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="text-sm font-medium text-gray-900 mb-4">User Entered Details</div>

                <div className="space-y-3">
                  <InfoRow label="Name" value={data.registrantData.name} />
                  <InfoRow label="Email" value={data.registrantData.email} />
                  {data.registrantData.mobile && <InfoRow label="Mobile" value={data.registrantData.mobile} />}

                  {type === "RESEARCHER" && (
                    <>
                      <InfoRow label="Institution" value={data.registrantData.institute} />
                      <InfoRow label="ORCID" value={data.registrantData.orcidId} />
                      {data.registrantData.googleScholarUrl && (
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-xs text-gray-500 uppercase">Google Scholar</span>
                          <a
                            href={data.registrantData.googleScholarUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#FF7F3E] flex items-center gap-1 hover:underline"
                          >
                            View <ExternalLink size={12} />
                          </a>
                        </div>
                      )}
                      <InfoRow label="H-Index" value={data.registrantData.hIndex} />
                      <InfoRow label="Citations" value={data.registrantData.citations} />
                      {data.registrantData.researchCategories && data.registrantData.researchCategories.length > 0 && (
                        <div className="py-2 border-b border-gray-100">
                          <div className="text-xs text-gray-500 uppercase mb-2">Research Categories</div>
                          <div className="flex flex-wrap gap-1">
                            {data.registrantData.researchCategories.map(cat => (
                              <span key={cat} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full">{cat}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      <InfoRow label="Referral" value={data.registrantData.referral} />
                      <InfoRow label="Purpose" value={data.registrantData.purpose} />
                    </>
                  )}

                  {type === "ORG" && (
                    <>
                      <InfoRow label="Institution" value={data.registrantData.institute} />
                      <InfoRow label="Official Domain" value={data.registrantData.officialDomain} />
                      <InfoRow label="Admin Name" value={data.registrantData.adminName} />
                      <InfoRow label="Admin Mobile" value={data.registrantData.adminMobile} />
                      <InfoRow label="Admin Email" value={data.registrantData.adminEmail} />
                    </>
                  )}

                  {type === "MEDICAL" && (
                    <>
                      <InfoRow label="Primary Hospital" value={data.registrantData.primaryHospital} />
                      <InfoRow label="Specialty" value={data.registrantData.specialty} />
                      <InfoRow label="Med Council Reg #" value={data.registrantData.medCouncilRegNo} />
                      <InfoRow label="State Council" value={data.registrantData.stateCouncil} />
                      <InfoRow label="Research Focus" value={data.registrantData.researchFocus} />
                    </>
                  )}
                </div>
              </div>

              {/* Documents */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="text-sm font-medium text-gray-900 mb-3">Uploaded Documents</div>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-2 border border-gray-100 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-red-50 text-red-500 rounded"><FileText size={16} /></div>
                        <div>
                          <div className="text-sm text-gray-900">document_{i}.pdf</div>
                          <div className="text-[11px] text-gray-400">3 MB</div>
                        </div>
                      </div>
                      <button className="text-sm text-[#FF7F3E] hover:underline">View</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-100">
      <span className="text-xs text-gray-500 uppercase">{label}</span>
      <span className="text-sm text-gray-800">{value || "N/A"}</span>
    </div>
  );
}