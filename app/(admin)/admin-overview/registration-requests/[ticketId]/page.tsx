"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { DashboardSidebar } from "../../component/dashboardsidebar";
import { DashboardHeader } from "../../component/DashboardHeader";
import { ArrowLeft, Check, X, AlertCircle } from "lucide-react";
import "../../adminstyle.css";
import "../../monetization/mstyle.css";

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
}

interface PotentialMatch {
  nationciteId: string;
  name: string;
  organization?: string;
  mainSubject?: string | null;
  subField?: string | null;
  hIndexTotal?: number;
  hIndexLast5?: number;
  hIndexRatio?: number;
  worldRank?: number | null;
  countryRank?: number | null;
  universityRank?: number | null;
}

interface LinkedPublicRecord {
  nationciteId: string;
  scholarName?: string;
  orgName?: string;
  mainSubject?: string;
  subField?: string;
  hIndexTotal?: number;
  hIndexLast5?: number;
  worldRank?: number | null;
  countryRank?: number | null;
  universityRank?: number | null;
}

interface RegistrationData {
  registration: {
    id: number;
    nationciteId: string;
    type: string;
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
  linkedPublicRecord?: LinkedPublicRecord | null;
}

export default function RegistrationReviewPage() {
  const router = useRouter();
  const params = useParams();
  const ticketId = params.ticketId as string;

  const [data, setData] = useState<RegistrationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<string>("");
  const [customNationCiteId, setCustomNationCiteId] = useState("");
  const [useCustomId, setUseCustomId] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);

  const [showRevokeModal, setShowRevokeModal] = useState(false);

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

      if (result.data.potentialMatches?.length > 0) {
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
    setProcessing(true);

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
      setShowRejectModal(false);
      router.push("/admin-overview/registration-requests");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to reject");
    } finally {
      setProcessing(false);
    }
  };

  const handleRevoke = async () => {
    setProcessing(true);

    try {
      const response = await fetch("/api/registration/revoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ticketId }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to revoke registration");
      }

      alert(
        "Registration revoked. Account deleted and public record unlinked.",
      );
      setShowRevokeModal(false);
      fetchRegistrationData(); // Refresh data
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to revoke");
    } finally {
      setProcessing(false);
    }
  };

  const renderRegistrantField = (
    label: string,
    value: string | undefined | null,
  ) => {
    if (!value) return null;
    return (
      <div style={{ marginBottom: "12px" }}>
        <div style={{ fontSize: "12px", color: "#000", marginBottom: "4px" }}>
          {label}
        </div>
        <div style={{ fontSize: "14px", color: "#000" }}>{value}</div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="admin-layout">
        <DashboardSidebar activePage="registrations" />
        <main
          className="flex-1 ml-[260px] p-8 min-w-[1000px]"
          style={{ paddingLeft: "0px", paddingTop: "0px", paddingRight: "0px" }}
        >
          <DashboardHeader
            breadcrumbItems={[
              { label: "Home", href: "/" },
              {
                label: "Registration Requests",
                href: "/admin-overview/registration-requests",
              },
              { label: "Review" },
            ]}
          />
          <div style={{ padding: "60px", textAlign: "center", color: "#000" }}>
            Loading registration data...
          </div>
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="admin-layout">
        <DashboardSidebar activePage="registrations" />
        <main
          className="flex-1 ml-[260px] p-8 min-w-[1000px]"
          style={{ paddingLeft: "0px", paddingTop: "0px", paddingRight: "0px" }}
        >
          <DashboardHeader
            breadcrumbItems={[
              { label: "Home", href: "/" },
              {
                label: "Registration Requests",
                href: "/admin-overview/registration-requests",
              },
              { label: "Review" },
            ]}
          />
          <div
            style={{ padding: "60px", textAlign: "center", color: "#dc3545" }}
          >
            {error || "Registration not found"}
          </div>
        </main>
      </div>
    );
  }

  const isAlreadyProcessed = data.registration.status !== "PENDING";

  return (
    <div className="admin-layout">
      <DashboardSidebar activePage="registrations" />

      <main
        className="flex-1 ml-[260px] p-8 min-w-[1000px]"
        style={{ paddingLeft: "0px", paddingTop: "0px", paddingRight: "0px" }}
      >
        <DashboardHeader
          breadcrumbItems={[
            { label: "Home", href: "/" },
            {
              label: "Registration Requests",
              href: "/admin-overview/registration-requests",
            },
            { label: "Review" },
          ]}
        />

        <section className="admin-content" style={{ padding: "0 32px" }}>
          <button
            onClick={() => router.push("/admin-overview/registration-requests")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 0",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#000",
              marginBottom: "16px",
            }}
          >
            <ArrowLeft size={18} />
            Back to Registration Requests
          </button>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#000",
                  marginBottom: "4px",
                }}
              >
                Registration Review
              </h2>
              <p style={{ color: "#000", fontSize: "14px" }}>
                Ticket ID: {ticketId}
              </p>
            </div>

            {isAlreadyProcessed && (
              <div
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  background:
                    data.registration.status === "APPROVED"
                      ? "#d4edda"
                      : "#f8d7da",
                  color:
                    data.registration.status === "APPROVED"
                      ? "#155724"
                      : "#721c24",
                }}
              >
                {data.registration.status}
              </div>
            )}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.35fr",
              gap: "24px",
            }}
          >
            {/* Submitted Data Card */}
            <div
              style={{
                background: "#fff",
                border: "1px solid #e5e5e5",
                borderRadius: "12px",
                padding: "24px",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "20px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid #e5e5e5",
                  color: "#000",
                }}
              >
                Submitted Registration Data
              </h3>

              <div
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  background: "#f0f0f0",
                  fontSize: "12px",
                  fontWeight: "500",
                  marginBottom: "16px",
                  color: "#000",
                }}
              >
                {data.registration.type}
              </div>

              {renderRegistrantField("Name", data.registrantData?.name)}
              {renderRegistrantField("Email", data.registrantData?.email)}
              {renderRegistrantField("Mobile", data.registrantData?.mobile)}

              {data.registration.type === "RESEARCHER" && (
                <>
                  {renderRegistrantField(
                    "Institution",
                    data.registrantData?.institute,
                  )}
                  {renderRegistrantField(
                    "Institute Email",
                    data.registrantData?.instituteEmail,
                  )}
                  {renderRegistrantField(
                    "ORCID ID",
                    data.registrantData?.orcidId,
                  )}
                  {renderRegistrantField(
                    "Primary Domain",
                    data.registrantData?.primaryDomain,
                  )}
                  {renderRegistrantField(
                    "Google Scholar",
                    data.registrantData?.googleScholarUrl,
                  )}
                </>
              )}

              {data.registration.type === "MEDICAL" && (
                <>
                  {renderRegistrantField(
                    "Medical Council Reg. No.",
                    data.registrantData?.medCouncilRegNo,
                  )}
                  {renderRegistrantField(
                    "State Council",
                    data.registrantData?.stateCouncil,
                  )}
                  {renderRegistrantField(
                    "Primary Hospital",
                    data.registrantData?.primaryHospital,
                  )}
                  {renderRegistrantField(
                    "Specialty",
                    data.registrantData?.specialty,
                  )}
                  {renderRegistrantField(
                    "Research Focus",
                    data.registrantData?.researchFocus,
                  )}
                </>
              )}

              {data.registration.type === "ORG" && (
                <>
                  {renderRegistrantField("Domain", data.registrantData?.domain)}
                  {renderRegistrantField(
                    "Contact Number",
                    data.registrantData?.number,
                  )}
                </>
              )}

              <div
                style={{
                  marginTop: "16px",
                  paddingTop: "16px",
                  borderTop: "1px solid #e5e5e5",
                  fontSize: "12px",
                  color: "#000",
                }}
              >
                Submitted: {new Date(data.ticket.createdAt).toLocaleString()}
              </div>
            </div>

            {/* Match Selection Card */}
            <div
              style={{
                background: "#fff",
                border: "1px solid #e5e5e5",
                borderRadius: "12px",
                padding: "24px",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "20px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid #e5e5e5",
                  color: "#000",
                }}
              >
                Assign NationCite ID
              </h3>

              {!isAlreadyProcessed && (
                <>
                  {data.potentialMatches.length > 0 && (
                    <div style={{ marginBottom: "20px" }}>
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "12px",
                        }}
                      >
                        <input
                          type="radio"
                          checked={!useCustomId}
                          onChange={() => setUseCustomId(false)}
                        />
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#000",
                          }}
                        >
                          Select from potential matches
                        </span>
                      </label>

                      <div
                        style={{
                          maxHeight: "420px",
                          overflowY: "auto",
                          border: "1px solid #e5e5e5",
                          borderRadius: "8px",
                          opacity: useCustomId ? 0.5 : 1,
                        }}
                      >
                        {data.potentialMatches.map((match) => (
                          <label
                            key={match.nationciteId}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "12px",
                              padding: "12px",
                              borderBottom: "1px solid #f0f0f0",
                              cursor: useCustomId ? "not-allowed" : "pointer",
                              background:
                                selectedMatch === match.nationciteId &&
                                !useCustomId
                                  ? "#f8f9fa"
                                  : "transparent",
                            }}
                          >
                            <input
                              type="radio"
                              name="match"
                              value={match.nationciteId}
                              checked={
                                selectedMatch === match.nationciteId &&
                                !useCustomId
                              }
                              onChange={(e) => setSelectedMatch(e.target.value)}
                              disabled={useCustomId}
                            />
                            <div style={{ flex: 1 }}>
                              <div
                                style={{
                                  fontWeight: "500",
                                  fontSize: "14px",
                                  color: "#000",
                                }}
                              >
                                {match.name}
                              </div>
                              <div style={{ fontSize: "12px", color: "#000", marginTop: "2px" }}>
                                {match.nationciteId}
                                {match.organization &&
                                  ` - ${match.organization}`}
                              </div>
                              <div
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "1fr 1fr",
                                  gap: "6px 10px",
                                  marginTop: "8px",
                                  fontSize: "11px",
                                  color: "#333",
                                }}
                              >
                                {match.mainSubject && (
                                  <div>
                                    <span style={{ color: "#666" }}>Subject:</span> {match.mainSubject}
                                  </div>
                                )}
                                {match.subField && (
                                  <div>
                                    <span style={{ color: "#666" }}>Sub-field:</span> {match.subField}
                                  </div>
                                )}
                                {match.hIndexTotal !== undefined && (
                                  <div>
                                    <span style={{ color: "#666" }}>H Total:</span> {match.hIndexTotal}
                                  </div>
                                )}
                                {match.hIndexLast5 !== undefined && (
                                  <div>
                                    <span style={{ color: "#666" }}>H 5Y:</span> {match.hIndexLast5}
                                  </div>
                                )}
                                {match.hIndexRatio !== undefined && (
                                  <div>
                                    <span style={{ color: "#666" }}>H Ratio:</span> {match.hIndexRatio.toFixed(2)}
                                  </div>
                                )}
                                {match.worldRank && (
                                  <div>
                                    <span style={{ color: "#666" }}>World:</span> #{match.worldRank}
                                  </div>
                                )}
                                {match.countryRank && (
                                  <div>
                                    <span style={{ color: "#666" }}>Country:</span> #{match.countryRank}
                                  </div>
                                )}
                                {match.universityRank && (
                                  <div>
                                    <span style={{ color: "#666" }}>University:</span> #{match.universityRank}
                                  </div>
                                )}
                              </div>
                              {match.hIndexTotal === undefined && !match.mainSubject && !match.worldRank && (
                                <div style={{ fontSize: "11px", color: "#777", marginTop: "6px" }}>
                                  No additional public metrics available.
                                </div>
                              )}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "12px",
                      }}
                    >
                      <input
                        type="radio"
                        checked={useCustomId}
                        onChange={() => setUseCustomId(true)}
                      />
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#000",
                        }}
                      >
                        Enter NationCite ID manually
                      </span>
                    </label>

                    <input
                      type="text"
                      value={customNationCiteId}
                      onChange={(e) => setCustomNationCiteId(e.target.value)}
                      placeholder="e.g., SC0000001"
                      disabled={!useCustomId}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #e5e5e5",
                        borderRadius: "6px",
                        fontSize: "14px",
                        opacity: !useCustomId ? 0.5 : 1,
                        color: "#000",
                      }}
                    />
                  </div>

                  {data.potentialMatches.length === 0 && (
                    <div
                      style={{
                        padding: "16px",
                        background: "#fff3cd",
                        borderRadius: "8px",
                        marginTop: "16px",
                        display: "flex",
                        gap: "12px",
                        alignItems: "flex-start",
                      }}
                    >
                      <AlertCircle size={20} style={{ color: "#dc3545" }} />
                      <div style={{ fontSize: "13px", color: "#000" }}>
                        No matching pre-seeded records found. Please enter a
                        NationCite ID manually.
                      </div>
                    </div>
                  )}
                </>
              )}

              {isAlreadyProcessed && (
                <div>
                  {data.registration.status === "APPROVED" ? (
                    <div>
                      <div
                        style={{
                          padding: "16px",
                          background: "#d4edda",
                          borderRadius: "8px",
                          marginBottom: "16px",
                        }}
                      >
                        <p
                          style={{
                            color: "#155724",
                            fontWeight: "600",
                            marginBottom: "8px",
                          }}
                        >
                          Approved and Linked
                        </p>
                        <p style={{ color: "#155724", fontSize: "14px" }}>
                          NationCite ID:{" "}
                          <strong>{data.registration.nationciteId}</strong>
                        </p>
                      </div>

                      <div
                        style={{
                          padding: "16px",
                          background: "#f8f9fa",
                          borderRadius: "8px",
                          marginBottom: "16px",
                        }}
                      >
                        <h4
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            marginBottom: "12px",
                            color: "#222",
                          }}
                        >
                          Linked Public Record
                        </h4>
                        {data.linkedPublicRecord ? (
                          <div style={{ fontSize: "13px", color: "#444" }}>
                            <p style={{ marginBottom: "6px" }}>
                              <strong>NationCite ID:</strong>{" "}
                              {data.linkedPublicRecord.nationciteId}
                            </p>
                            <p style={{ marginBottom: "6px" }}>
                              <strong>Name:</strong>{" "}
                              {data.linkedPublicRecord.scholarName ||
                                data.linkedPublicRecord.orgName}
                            </p>
                            {data.linkedPublicRecord.orgName &&
                              data.registration.type !== "ORG" && (
                                <p style={{ marginBottom: "6px" }}>
                                  <strong>Organization:</strong>{" "}
                                  {data.linkedPublicRecord.orgName}
                                </p>
                              )}
                            {data.linkedPublicRecord.mainSubject && (
                              <p style={{ marginBottom: "6px" }}>
                                <strong>Main Subject:</strong>{" "}
                                {data.linkedPublicRecord.mainSubject}
                              </p>
                            )}
                            {data.linkedPublicRecord.subField && (
                              <p style={{ marginBottom: "6px" }}>
                                <strong>Sub-field:</strong>{" "}
                                {data.linkedPublicRecord.subField}
                              </p>
                            )}
                            <p style={{ marginBottom: "6px" }}>
                              <strong>H-Index (Total):</strong>{" "}
                              {data.linkedPublicRecord.hIndexTotal || 0}
                            </p>
                            <p style={{ marginBottom: "6px" }}>
                              <strong>H-Index (Last 5 Years):</strong>{" "}
                              {data.linkedPublicRecord.hIndexLast5 || 0}
                            </p>
                            {data.linkedPublicRecord.worldRank && (
                              <p style={{ marginBottom: "6px" }}>
                                <strong>World Rank:</strong> #
                                {data.linkedPublicRecord.worldRank}
                              </p>
                            )}
                            {data.linkedPublicRecord.countryRank && (
                              <p style={{ marginBottom: "6px" }}>
                                <strong>Country Rank:</strong> #
                                {data.linkedPublicRecord.countryRank}
                              </p>
                            )}
                            <p
                              style={{
                                marginBottom: "6px",
                                marginTop: "12px",
                                paddingTop: "12px",
                                borderTop: "1px solid #e5e5e5",
                              }}
                            >
                              <strong>Account Type:</strong>{" "}
                              {data.registration.type}
                            </p>
                            <p style={{ marginBottom: "6px" }}>
                              <strong>Account Email:</strong>{" "}
                              {data.registrantData?.email}
                            </p>
                            <p style={{ marginBottom: "6px" }}>
                              <strong>Account Status:</strong>{" "}
                              <span
                                style={{ color: "#28a745", fontWeight: "600" }}
                              >
                                Active
                              </span>
                            </p>
                          </div>
                        ) : (
                          <div
                            style={{
                              fontSize: "13px",
                              color: "#666",
                              fontStyle: "italic",
                            }}
                          >
                            <p>
                              No linked public record found. This may be a newly
                              created profile.
                            </p>
                            <p style={{ marginTop: "8px", fontSize: "12px" }}>
                              <strong>Account Email:</strong>{" "}
                              {data.registrantData?.email}
                            </p>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => setShowRevokeModal(true)}
                        style={{
                          width: "100%",
                          padding: "12px",
                          borderRadius: "6px",
                          border: "1px solid #dc3545",
                          background: "#fff",
                          color: "#dc3545",
                          fontWeight: "500",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                      >
                        Revoke Approval
                      </button>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#666",
                          marginTop: "8px",
                          textAlign: "center",
                        }}
                      >
                        This will delete the user account and unlink from public
                        record
                      </p>
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: "20px",
                        background: "#f8d7da",
                        borderRadius: "8px",
                        textAlign: "center",
                      }}
                    >
                      <p style={{ color: "#721c24", marginBottom: "8px" }}>
                        This registration has been rejected
                      </p>
                      <p style={{ fontWeight: "500", color: "#721c24" }}>
                        Status: {data.registration.status}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {!isAlreadyProcessed && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                marginTop: "24px",
                paddingTop: "24px",
                borderTop: "1px solid #e5e5e5",
              }}
            >
              <button
                onClick={() => setShowRejectModal(true)}
                disabled={processing}
                style={{
                  padding: "10px 24px",
                  borderRadius: "6px",
                  border: "1px solid #dc3545",
                  background: "#fff",
                  color: "#dc3545",
                  fontWeight: "500",
                  cursor: processing ? "not-allowed" : "pointer",
                  opacity: processing ? 0.7 : 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <X size={16} />
                Reject
              </button>

              <button
                onClick={handleApprove}
                disabled={
                  processing ||
                  (!selectedMatch && !customNationCiteId) ||
                  (useCustomId && !customNationCiteId)
                }
                style={{
                  padding: "10px 24px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#28a745",
                  color: "#fff",
                  fontWeight: "500",
                  cursor:
                    processing ||
                    (!selectedMatch && !customNationCiteId) ||
                    (useCustomId && !customNationCiteId)
                      ? "not-allowed"
                      : "pointer",
                  opacity:
                    processing ||
                    (!selectedMatch && !customNationCiteId) ||
                    (useCustomId && !customNationCiteId)
                      ? 0.7
                      : 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Check size={16} />
                {processing ? "Processing..." : "Approve & Assign"}
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Reject Modal */}
      {showRejectModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "24px",
              borderRadius: "12px",
              width: "100%",
              maxWidth: "450px",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "16px",
                color: "#000",
              }}
            >
              Reject Registration
            </h3>

            <p
              style={{ color: "#000", marginBottom: "16px", fontSize: "14px" }}
            >
              Are you sure you want to reject this registration? The user will
              be notified via email.
            </p>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#000",
                }}
              >
                Reason (optional)
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter reason for rejection..."
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #e5e5e5",
                  borderRadius: "6px",
                  minHeight: "80px",
                  resize: "vertical",
                  color: "#000",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
              }}
            >
              <button
                onClick={() => setShowRejectModal(false)}
                disabled={processing}
                style={{
                  padding: "10px 20px",
                  borderRadius: "6px",
                  border: "1px solid #e5e5e5",
                  background: "#fff",
                  cursor: "pointer",
                  color: "#000",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={processing}
                style={{
                  padding: "10px 20px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#dc3545",
                  color: "#fff",
                  fontWeight: "500",
                  cursor: processing ? "not-allowed" : "pointer",
                  opacity: processing ? 0.7 : 1,
                }}
              >
                {processing ? "Processing..." : "Confirm Reject"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Revoke Modal */}
      {showRevokeModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "24px",
              borderRadius: "12px",
              width: "100%",
              maxWidth: "450px",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "16px",
                color: "#dc3545",
              }}
            >
              Revoke Approval
            </h3>

            <p
              style={{ color: "#222", marginBottom: "16px", fontSize: "14px" }}
            >
              Are you sure you want to revoke this approval? This will:
            </p>

            <ul
              style={{
                color: "#444",
                marginBottom: "20px",
                fontSize: "13px",
                paddingLeft: "20px",
              }}
            >
              <li style={{ marginBottom: "6px" }}>
                Delete the user&apos;s login account
              </li>
              <li style={{ marginBottom: "6px" }}>
                Unlink from the public NationCite record
              </li>
              <li style={{ marginBottom: "6px" }}>
                Return registration to pending status
              </li>
            </ul>

            <p
              style={{
                color: "#666",
                marginBottom: "16px",
                fontSize: "12px",
                fontStyle: "italic",
              }}
            >
              The public record will remain in the database and can be re-linked
              later.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
              }}
            >
              <button
                onClick={() => setShowRevokeModal(false)}
                disabled={processing}
                style={{
                  padding: "10px 20px",
                  borderRadius: "6px",
                  border: "1px solid #e5e5e5",
                  background: "#fff",
                  cursor: "pointer",
                  color: "#000",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleRevoke}
                disabled={processing}
                style={{
                  padding: "10px 20px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#dc3545",
                  color: "#fff",
                  fontWeight: "500",
                  cursor: processing ? "not-allowed" : "pointer",
                  opacity: processing ? 0.7 : 1,
                }}
              >
                {processing ? "Processing..." : "Confirm Revoke"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}