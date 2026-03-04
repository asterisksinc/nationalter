"use client";

import React, { useState } from "react";
import { X, ArrowLeft, Upload, CheckCircle, Loader2 } from "lucide-react";
import { pickStoredUploadValue, uploadFileToS3 } from "@/lib/uploads/client";

// --- Types & Enums ---

export enum TicketStep {
  CATEGORY = "CATEGORY",
  SUB_CATEGORY = "SUB_CATEGORY",
  SEARCH = "SEARCH",
  PAPER_DETAILS = "PAPER_DETAILS",
  ISSUE_REASON = "ISSUE_REASON",
  UPLOAD = "UPLOAD",
  IMPACT = "IMPACT",
  NOTES = "NOTES",
  SUCCESS = "SUCCESS",
}

interface PaperData {
  id?: number;
  title: string;
  authors?: string;
  journalName: string;
  datePublished: string;
  publisher?: string;
  doi?: string;
  citationsTotal?: number;
  citationsLast5Years?: number;
}

type TicketType =
  | "profile-identity"
  | "publications-citations"
  | "affiliation-institution"
  | "credentials"
  | "other";

type IssueReason = "not-mine" | "not-author" | "different-person";

type ImpactLevel = "low" | "medium" | "high";

interface TicketFormData {
  userType: "Researcher" | "Organization" | "Medical Professional";
  ticketType: TicketType | null;
  subCategory?: string;
  selectedPaper?: PaperData;
  issueReason?: IssueReason;
  uploadedFile?: File | null;
  supportLinks?: string;
  impactLevel?: ImpactLevel;
  preferredOutcome?: string;
  additionalNotes?: string;
  consent: boolean;
}

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType: "Researcher" | "Organization" | "Medical Professional";
  nationciteId: string;
  userName: string;
  onSuccess?: () => void;
}

// Sub-category options for each type
const profileSubcategories = [
  "Name spelling/correction",
  "H-Index incorrect",
  "Ranking incorrect",
  "Duplicate profile",
  "Profile information outdated",
  "Other",
];

const affiliationSubcategories = [
  "Changed institution",
  "Institution ranking wrong",
  "Institutional email mismatch",
  "Organization details incorrect",
  "Other",
];

const credentialSubcategories = [
  "License expired/renewed",
  "Specialty/board change",
  "Council registration update",
  "Qualification addition",
  "Other",
];

export const CreateTicketModal: React.FC<CreateTicketModalProps> = ({
  isOpen,
  onClose,
  userType,
  nationciteId,
  userName,
  onSuccess,
}) => {
  const [history, setHistory] = useState<TicketStep[]>([TicketStep.CATEGORY]);
  const [formData, setFormData] = useState<TicketFormData>({
    userType,
    ticketType: null,
    consent: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<PaperData[]>([]);
  const [searching, setSearching] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [createdTicketId, setCreatedTicketId] = useState("");

  const currentStep = history[history.length - 1];

  const resetModal = () => {
    setHistory([TicketStep.CATEGORY]);
    setFormData({
      userType,
      ticketType: null,
      consent: false,
    });
    setSearchQuery("");
    setSearchResults([]);
    setCreatedTicketId("");
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetModal, 300);
  };

  const pushStep = (step: TicketStep) => {
    setHistory((prev) => [...prev, step]);
  };

  const popStep = () => {
    if (history.length > 1) {
      setHistory((prev) => prev.slice(0, -1));
    }
  };

  // --- Handlers ---

  const handleTicketTypeSelect = (type: TicketType) => {
    setFormData({ ...formData, ticketType: type });
  };

  const handleCategoryNext = () => {
    if (!formData.ticketType) return;

    if (formData.ticketType === "publications-citations") {
      pushStep(TicketStep.SEARCH);
    } else {
      pushStep(TicketStep.SUB_CATEGORY);
    }
  };

  const handlePaperSearch = async () => {
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      // Call Publications API
      const res = await fetch(
        `/api/publications?title=${encodeURIComponent(searchQuery)}`,
      );
      const json = await res.json();

      if (json.success && json.publications) {
        setSearchResults(json.publications);
        if (json.publications.length > 0) {
          // Auto-select first result
          const paper = json.publications[0];
          setFormData({
            ...formData,
            selectedPaper: {
              id: paper.id,
              title: paper.title,
              journalName: paper.journalName,
              datePublished: new Date(paper.datePublished)
                .getFullYear()
                .toString(),
              citationsTotal: paper.citationsTotal,
              citationsLast5Years: paper.citationsLast5Years,
            },
          });
          pushStep(TicketStep.PAPER_DETAILS);
        } else {
          alert("No publications found. Try a different search term.");
        }
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("Failed to search publications. Please try again.");
    } finally {
      setSearching(false);
    }
  };

  const handleIssueReasonSelect = (reason: IssueReason) => {
    setFormData({ ...formData, issueReason: reason });
    if (reason === "not-mine") {
      // Fast track
      pushStep(TicketStep.NOTES);
    } else {
      pushStep(TicketStep.UPLOAD);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, uploadedFile: e.target.files[0] });
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      let attachmentValue: string | null = null;
      if (formData.uploadedFile) {
        const uploaded = await uploadFileToS3(formData.uploadedFile, "tickets");
        attachmentValue = pickStoredUploadValue(uploaded);
      }

      const ticketData = {
        nationciteId,
        name: userName,
        type: formData.ticketType,
        issueType: formData.subCategory || formData.ticketType,
        description: formData.additionalNotes || "N/A",
        issueReason: formData.issueReason || null,
        links: formData.supportLinks ? [formData.supportLinks] : [],
        attachments: attachmentValue ? [attachmentValue] : [],
        impactLevel: formData.impactLevel || null,
        preferredOutcome: formData.preferredOutcome || null,
        comment: formData.selectedPaper
          ? `Paper: ${formData.selectedPaper.title} (${formData.selectedPaper.journalName})`
          : null,
      };

      const res = await fetch("/api/tickets/tickets-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticketData),
      });

      const json = await res.json();

      if (json.success) {
        setCreatedTicketId(json.ticket.ticketId);
        pushStep(TicketStep.SUCCESS);
        if (onSuccess) onSuccess();
      } else {
        alert("Failed to create ticket: " + json.message);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  // Helper to get sub-category options
  const getSubCategoryOptions = () => {
    switch (formData.ticketType) {
      case "profile-identity":
        return profileSubcategories;
      case "affiliation-institution":
        return affiliationSubcategories;
      case "credentials":
        return credentialSubcategories;
      default:
        return [];
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-2xl z-10">
          {history.length > 1 && currentStep !== TicketStep.SUCCESS ? (
            <button
              onClick={popStep}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
          ) : (
            <div className="w-7" />
          )}

          <div className="flex-1 text-center text-base font-semibold leading-5 tracking-[-0.006em] text-[#0E121B]">
            {currentStep === TicketStep.SUCCESS
              ? "Ticket Created 🎉"
              : "Create a New Ticket"}
          </div>

          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {/* STEP: Category Selection */}
          {currentStep === TicketStep.CATEGORY && (
            <div className="space-y-4">
              <p className="text-[14px] font-normal leading-[150%] tracking-[-0.02em] text-[#525866] mb-4">
                You are submitting as:{" "}
                <span className="text-[#f76a23] font-medium">{userType}</span>
              </p>

              <div className="space-y-2 mb-4">
                {[
                  { id: "profile-identity", label: "Profile & Identity" },
                  {
                    id: "publications-citations",
                    label: "Publications & Citations",
                  },
                  {
                    id: "affiliation-institution",
                    label: "Affiliation & Institution",
                  },
                  {
                    id: "credentials",
                    label: "Credentials (Medical only)",
                    disabled: userType !== "Medical Professional",
                  },
                  { id: "other", label: "Other" },
                ].map((type) => (
                  <label
                    key={type.id}
                    onClick={() =>
                      !type.disabled &&
                      handleTicketTypeSelect(type.id as TicketType)
                    }
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                      type.disabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-orange-50/20"
                    } ${
                      formData.ticketType === type.id
                        ? "border border-[#FF8D28] bg-orange-50/30"
                        : "border border-transparent hover:border-[#FF8D28]/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="ticketType"
                      checked={formData.ticketType === type.id}
                      disabled={type.disabled}
                      onChange={() => {}}
                      style={{ accentColor: "#FF8D28" }}
                      className="w-3.5 h-3.5 shrink-0 cursor-pointer"
                    />
                    <span className="text-[14px] font-medium leading-[120%] text-[#0E121B]">
                      {type.label}
                    </span>
                  </label>
                ))}
              </div>

              <button
                onClick={handleCategoryNext}
                disabled={!formData.ticketType}
                className="w-full bg-[#f76a23] hover:bg-[#e05a1a] disabled:bg-gray-300 text-white text-[14px] font-semibold leading-[120%] py-3 rounded-lg transition-colors"
              >
                Next
              </button>
            </div>
          )}

          {/* STEP: Sub Category */}
          {currentStep === TicketStep.SUB_CATEGORY && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 mb-4">
                <input
                  type="radio"
                  checked
                  readOnly
                  style={{ accentColor: "#FF8D28" }}
                  className="mt-1 w-4 h-4 shrink-0 cursor-pointer"
                />
                <span className="text-[14px] font-medium leading-[120%] text-[#0E121B] capitalize">
                  {formData.ticketType?.replace(/-/g, " & ")}
                </span>
              </div>

              {formData.ticketType === "other" ? (
                <textarea
                  placeholder="Describe your issue..."
                  value={formData.additionalNotes || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      additionalNotes: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f76a23] text-[14px] font-normal leading-[150%] tracking-[-0.02em] resize-none placeholder-[#8E8E93]"
                />
              ) : (
                <select
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f76a23] text-[14px] font-normal leading-[150%] tracking-[-0.02em] text-[#333333]"
                  onChange={(e) =>
                    setFormData({ ...formData, subCategory: e.target.value })
                  }
                  value={formData.subCategory || ""}
                >
                  <option value="">Select issue type</option>
                  {getSubCategoryOptions().map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}

              <div className="pt-2">
                <button
                  onClick={() => pushStep(TicketStep.SEARCH)}
                  className="w-full bg-white border-2 border-[#f76a23] text-[#f76a23] hover:bg-orange-50 text-[14px] font-semibold leading-[120%] py-3 rounded-lg transition-colors mb-3"
                >
                  Search & Attach Publication
                </button>
                <button
                  onClick={() => pushStep(TicketStep.NOTES)}
                  className="w-full bg-[#f76a23] hover:bg-[#e05a1a] text-white text-[14px] font-semibold leading-[120%] py-3 rounded-lg transition-colors"
                >
                  Continue Without Publication
                </button>
              </div>
            </div>
          )}

          {/* STEP: Search */}
          {currentStep === TicketStep.SEARCH && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 mb-4">
                <p className="text-[14px] font-medium leading-[120%] text-[#0E121B]">
                  Search & Attach Publication
                </p>
              </div>

              <input
                type="text"
                placeholder="Search by title, DOI, or journal"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handlePaperSearch()}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f76a23] text-[14px] font-normal leading-[150%] tracking-[-0.02em] placeholder-[#8E8E93]"
              />

              <button
                onClick={handlePaperSearch}
                disabled={!searchQuery.trim() || searching}
                className="w-full bg-[#f76a23] hover:bg-[#e05a1a] disabled:bg-gray-300 text-white text-[14px] font-semibold leading-[120%] py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {searching && <Loader2 size={16} className="animate-spin" />}
                {searching ? "Searching..." : "Search"}
              </button>
            </div>
          )}

          {/* STEP: Paper Details */}
          {currentStep === TicketStep.PAPER_DETAILS &&
            formData.selectedPaper && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600 mb-4">
                  <CheckCircle size={18} />
                  <span className="text-[14px] font-semibold leading-[120%]">
                    Paper Found
                  </span>
                </div>

                <div className="space-y-2 text-[14px]">
                  <div>
                    <span className="font-semibold leading-[120%] text-[#0E121B]">
                      Paper Title
                    </span>
                    <p className="font-normal leading-[150%] tracking-[-0.02em] text-[#333333]">
                      {formData.selectedPaper.title}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold leading-[120%] text-[#0E121B]">
                      Journal / Conference
                    </span>
                    <p className="font-normal leading-[150%] tracking-[-0.02em] text-[#333333]">
                      {formData.selectedPaper.journalName}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold leading-[120%] text-[#0E121B]">
                      Year
                    </span>
                    <p className="font-normal leading-[150%] tracking-[-0.02em] text-[#333333]">
                      {formData.selectedPaper.datePublished}
                    </p>
                  </div>
                  {formData.selectedPaper.citationsTotal && (
                    <div>
                      <span className="font-semibold leading-[120%] text-[#0E121B]">
                        Citations
                      </span>
                      <p className="font-normal leading-[150%] tracking-[-0.02em] text-[#333333]">
                        Total: {formData.selectedPaper.citationsTotal} | Last 5
                        years: {formData.selectedPaper.citationsLast5Years}
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => pushStep(TicketStep.ISSUE_REASON)}
                  className="w-full bg-[#f76a23] hover:bg-[#e05a1a] text-white text-[14px] font-semibold leading-[120%] py-3 rounded-lg transition-colors"
                >
                  Next
                </button>
              </div>
            )}

          {/* STEP: Issue Reason */}
          {currentStep === TicketStep.ISSUE_REASON && (
            <div className="space-y-4">
              <p className="text-[14px] font-semibold leading-[120%] text-[#0E121B] mb-4">
                What is wrong?
              </p>

              <div className="space-y-3">
                {[
                  { id: "not-mine", label: "This publication is not mine" },
                  {
                    id: "not-author",
                    label: "I am not an author on this paper",
                  },
                  {
                    id: "different-person",
                    label: "Author name matches but this is a different person",
                  },
                ].map((reason) => (
                  <label
                    key={reason.id}
                    onClick={() =>
                      handleIssueReasonSelect(reason.id as IssueReason)
                    }
                    className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#f76a23] hover:bg-orange-50/30 cursor-pointer transition-all"
                  >
                    <input
                      type="radio"
                      name="issueReason"
                      checked={formData.issueReason === reason.id}
                      onChange={() => {}}
                      style={{ accentColor: "#FF8D28" }}
                      className="mt-0.5 w-4 h-4 shrink-0 cursor-pointer"
                    />
                    <span className="text-[14px] font-normal leading-[120%] text-[#0E121B]">
                      {reason.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* STEP: Upload */}
          {currentStep === TicketStep.UPLOAD && (
            <div className="space-y-4">
              <p className="text-[14px] font-semibold leading-[120%] text-[#0E121B] mb-2">
                Upload proof documents
                <span className="text-red-500">*</span>
              </p>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#f76a23] transition-colors relative">
                <input
                  type="file"
                  id="fileUpload"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileUpload}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <div className="flex flex-col items-center pointer-events-none">
                  <Upload size={32} className="text-gray-400 mb-3" />
                  <p className="text-[14px] font-normal leading-[150%] tracking-[-0.02em] text-[#333333] mb-1">
                    <span className="text-[#f76a23] font-medium">
                      Click or Drag File To Upload
                    </span>
                  </p>
                  <p className="text-[12px] font-normal leading-[120%] text-[#8E8E93]">
                    Allowed: PDF, JPG, PNG
                  </p>
                  {formData.uploadedFile && (
                    <p className="text-[14px] font-medium leading-[120%] text-green-600 mt-2">
                      ✓ {formData.uploadedFile.name}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-normal leading-[120%] text-[#525866] mb-2">
                  Add supporting links
                  <br />
                  <span className="text-[#8E8E93]">
                    (Google Scholar, PubMed, ORCID, etc.)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Paste link here"
                  value={formData.supportLinks || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, supportLinks: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f76a23] text-[14px] font-normal leading-[150%] tracking-[-0.02em] placeholder-[#8E8E93]"
                />
              </div>

              <button
                onClick={() => pushStep(TicketStep.IMPACT)}
                className="w-full bg-[#f76a23] hover:bg-[#e05a1a] text-white text-[14px] font-semibold leading-[120%] py-3 rounded-lg transition-colors"
              >
                Next
              </button>
            </div>
          )}

          {/* STEP: Impact */}
          {currentStep === TicketStep.IMPACT && (
            <div className="space-y-4">
              <p className="text-[14px] font-semibold leading-[120%] text-[#0E121B] mb-2">
                Impact Level
              </p>

              <div className="space-y-3">
                {[
                  {
                    id: "low",
                    label: "Low",
                    desc: "Minor correction, does not affect my ranking.",
                  },
                  {
                    id: "medium",
                    label: "Medium",
                    desc: "Affects how my profile appears to others.",
                  },
                  {
                    id: "high",
                    label: "High",
                    desc: "Serious error affecting my reputation or compliance.",
                  },
                ].map((level) => (
                  <label
                    key={level.id}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        impactLevel: level.id as ImpactLevel,
                      })
                    }
                    className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                      formData.impactLevel === level.id
                        ? "border-[#f76a23] bg-orange-50/30"
                        : "border-gray-200 hover:border-[#f76a23] hover:bg-orange-50/20"
                    }`}
                  >
                    <input
                      type="radio"
                      name="impact"
                      checked={formData.impactLevel === level.id}
                      onChange={() => {}}
                      style={{ accentColor: "#FF8D28" }}
                      className="mt-0.5 w-4 h-4 shrink-0 cursor-pointer"
                    />
                    <div className="flex-1">
                      <span className="text-[14px] font-medium leading-[120%] text-[#0E121B] block">
                        {level.label}
                      </span>
                      <span className="text-[12px] font-normal leading-[120%] text-[#525866]">
                        {level.desc}
                      </span>
                    </div>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-[14px] font-medium leading-[120%] text-[#525866] mb-2">
                  Preferred Outcome*
                </label>
                <select
                  value={formData.preferredOutcome || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preferredOutcome: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f76a23] text-[14px] font-normal leading-[150%] tracking-[-0.02em] text-[#333333]"
                >
                  <option value="">Select</option>
                  <option value="remove">Remove publication</option>
                  <option value="correct">Correct information</option>
                  <option value="verify">Verify authorship</option>
                  <option value="update">Update profile data</option>
                </select>
              </div>

              <button
                onClick={() => pushStep(TicketStep.NOTES)}
                className="w-full bg-[#f76a23] hover:bg-[#e05a1a] text-white text-[14px] font-semibold leading-[120%] py-3 rounded-lg transition-colors"
              >
                Next
              </button>
            </div>
          )}

          {/* STEP: Notes */}
          {currentStep === TicketStep.NOTES && (
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium leading-[120%] text-[#525866] mb-2">
                  Additional Notes{" "}
                  <span className="text-[#8E8E93] font-normal">(Optional)</span>
                </label>
                <textarea
                  placeholder="Anything else the review team should know?"
                  value={formData.additionalNotes || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      additionalNotes: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f76a23] text-[14px] font-normal leading-[150%] tracking-[-0.02em] resize-none placeholder-[#8E8E93]"
                />
              </div>

              <label className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) =>
                    setFormData({ ...formData, consent: e.target.checked })
                  }
                  className="mt-0.5 w-4 h-4 text-green-600 focus:ring-green-500 rounded"
                />
                <span className="text-[12px] font-normal leading-[120%] text-[#333333]">
                  I confirm that all information provided is accurate. I
                  understand that any false or misleading information may result
                  in strict action.
                </span>
              </label>

              <button
                onClick={handleSubmit}
                disabled={!formData.consent || submitting}
                className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  formData.consent && !submitting
                    ? "bg-[#f76a23] hover:bg-[#e05a1a] text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {submitting && <Loader2 size={16} className="animate-spin" />}
                {submitting ? "Submitting..." : "Submit Ticket"}
              </button>
            </div>
          )}

          {/* STEP: Success */}
          {currentStep === TicketStep.SUCCESS && (
            <div className="space-y-4 text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>

              <p className="text-[16px] font-semibold text-[#0E121B]">
                Ticket Created Successfully!
              </p>
              <p className="text-[14px] font-normal leading-[150%] tracking-[-0.02em] text-[#525866]">
                Your ticket has been submitted to our review team.
              </p>

              <div className="space-y-2 text-[14px] bg-gray-50 p-4 rounded-lg text-left">
                <div>
                  <span className="font-semibold leading-[120%] text-[#0E121B]">
                    Ticket ID
                  </span>
                  <p className="font-normal leading-[150%] tracking-[-0.02em] text-[#333333]">
                    {createdTicketId}
                  </p>
                </div>
                <div>
                  <span className="font-semibold leading-[120%] text-[#0E121B]">
                    Issue Type
                  </span>
                  <p className="font-normal leading-[150%] tracking-[-0.02em] text-[#333333] capitalize">
                    {formData.ticketType?.replace(/-/g, " ")}
                  </p>
                </div>
                <div>
                  <span className="font-semibold leading-[120%] text-[#0E121B]">
                    Status
                  </span>
                  <p className="font-normal leading-[150%] tracking-[-0.02em] text-green-600">
                    Open – Awaiting review
                  </p>
                </div>
                <div>
                  <span className="font-semibold leading-[120%] text-[#0E121B]">
                    Estimated Review Time
                  </span>
                  <p className="font-normal leading-[150%] tracking-[-0.02em] text-[#333333]">
                    Within 3–5 working days
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full bg-[#f76a23] hover:bg-[#e05a1a] text-white py-2.5 rounded-lg text-[14px] font-semibold leading-[120%] transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
