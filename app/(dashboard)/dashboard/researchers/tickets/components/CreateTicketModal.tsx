import React, { useState } from "react";
import { X, ArrowLeft, Upload, CheckCircle } from "lucide-react";

// --- Types ---

interface PaperData {
  title: string;
  authors: string;
  journal: string;
  year: string;
  publisher: string;
  doi: string;
}

type TicketType =
  | "profile-identity"
  | "publications-citations"
  | "affiliation-institution"
  | "credentials"
  | "other"
  | "search-attach";

type IssueReason = "not-mine" | "not-author" | "different-person";

type ImpactLevel = "low" | "medium" | "high";

interface TicketFormData {
  userType: string;
  ticketType: TicketType | null;
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
}

export const CreateTicketModal: React.FC<CreateTicketModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TicketFormData>({
    userType: "Researcher",
    ticketType: null,
    consent: false,
  });

  const mockPaper: PaperData = {
    title: "Lorem ipsum Lorem ipsum Lorem ipsum",
    authors: "Lorem ipsum",
    journal: "JFLFLFLN",
    year: "2021",
    publisher: "IEEE",
    doi: "829129",
  };

  const resetModal = () => {
    setCurrentStep(1);
    setFormData({
      userType: "Researcher",
      ticketType: null,
      consent: false,
    });
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetModal, 300);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleTicketTypeSelect = (type: TicketType) => {
    setFormData({ ...formData, ticketType: type });
    if (type === "search-attach") {
      setCurrentStep(10); // Search flow
    } else if (type === "publications-citations") {
      setFormData({ ...formData, selectedPaper: mockPaper });
      setCurrentStep(20); // Paper issue flow
    } else {
      setCurrentStep(2);
    }
  };

  const handleIssueReasonSelect = (reason: IssueReason) => {
    setFormData({ ...formData, issueReason: reason });
    if (reason === "not-mine") {
      // Flow 2.3 (Fast track)
      setCurrentStep(25);
    } else {
      // Flow 2.1 & 2.2 (Full flow)
      setCurrentStep(22);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, uploadedFile: e.target.files[0] });
    }
  };

  const handleSubmit = () => {
    console.log("Submitting ticket:", formData);
    setCurrentStep(99); // Success screen
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-2xl">
          {currentStep > 1 && currentStep !== 99 && (
            <button
              onClick={handleBack}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
          )}
          <h4 className="flex-1 text-center">
            {currentStep === 99 ? "Ticket Created 🎉" : "Create a New Ticket"}
          </h4>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: User Type & Ticket Type Selection */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                You are submitting as:{" "}
                <span className="text-[#f76a23] font-medium">Researcher</span>
              </p>

              <div className="space-y-2">
                <label
                  onClick={() => handleTicketTypeSelect("profile-identity")}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#f76a23] hover:bg-orange-50/30 cursor-pointer transition-all"
                >
                  <input
                    type="radio"
                    name="ticketType"
                    checked={formData.ticketType === "profile-identity"}
                    onChange={() => {}}
                    className="w-4 h-4 text-[#f76a23] focus:ring-[#f76a23]"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    Profile & Identity
                  </span>
                </label>

                <label
                  onClick={() =>
                    handleTicketTypeSelect("publications-citations")
                  }
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#f76a23] hover:bg-orange-50/30 cursor-pointer transition-all"
                >
                  <input
                    type="radio"
                    name="ticketType"
                    checked={formData.ticketType === "publications-citations"}
                    onChange={() => {}}
                    className="w-4 h-4 text-[#f76a23] focus:ring-[#f76a23]"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    Publications & Citations
                  </span>
                </label>

                <label
                  onClick={() =>
                    handleTicketTypeSelect("affiliation-institution")
                  }
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#f76a23] hover:bg-orange-50/30 cursor-pointer transition-all"
                >
                  <input
                    type="radio"
                    name="ticketType"
                    checked={formData.ticketType === "affiliation-institution"}
                    onChange={() => {}}
                    className="w-4 h-4 text-[#f76a23] focus:ring-[#f76a23]"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    Affiliation & Institution
                  </span>
                </label>

                <label
                  onClick={() => handleTicketTypeSelect("credentials")}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#f76a23] hover:bg-orange-50/30 cursor-pointer transition-all"
                >
                  <input
                    type="radio"
                    name="ticketType"
                    checked={formData.ticketType === "credentials"}
                    onChange={() => {}}
                    className="w-4 h-4 text-[#f76a23] focus:ring-[#f76a23]"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    Credentials (Medics only)
                  </span>
                </label>

                <label
                  onClick={() => handleTicketTypeSelect("other")}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#f76a23] hover:bg-orange-50/30 cursor-pointer transition-all"
                >
                  <input
                    type="radio"
                    name="ticketType"
                    checked={formData.ticketType === "other"}
                    onChange={() => {}}
                    className="w-4 h-4 text-[#f76a23] focus:ring-[#f76a23]"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    Other
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Step 2: Sub-category */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 mb-4">
                <input
                  type="radio"
                  checked
                  readOnly
                  className="mt-1 w-4 h-4 text-[#f76a23]"
                />
                <span className="text-sm font-medium text-gray-900">
                  Profile & Identity
                </span>
              </div>

              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f76a23] text-sm text-gray-600">
                <option>Select</option>
                <option>Name incorrect</option>
                <option>Affiliation wrong</option>
                <option>Other profile issue</option>
              </select>

              <button
                onClick={handleNext}
                className="w-full bg-[#f76a23] hover:bg-[#e05a1a] text-white py-3 rounded-lg font-medium transition-colors"
              >
                Next
              </button>
            </div>
          )}

          {/* Step 10: Search Flow */}
          {currentStep === 10 && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 mb-4">
                <input
                  type="radio"
                  checked
                  readOnly
                  className="mt-1 w-4 h-4 text-[#f76a23]"
                />
                <span className="text-sm font-medium text-gray-900">
                  Search & Attach Publication
                </span>
              </div>

              <input
                type="text"
                placeholder="Search by title, DOI, or journal"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f76a23] text-sm"
              />

              <button
                onClick={() => {
                  setFormData({ ...formData, selectedPaper: mockPaper });
                  setCurrentStep(11);
                }}
                className="w-full bg-[#f76a23] hover:bg-[#e05a1a] text-white py-3 rounded-lg font-medium transition-colors"
              >
                Search
              </button>
            </div>
          )}

          {/* Step 11: Paper Found */}
          {currentStep === 11 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600 mb-4">
                <CheckCircle size={18} />
                <span className="text-sm font-semibold">Paper Found</span>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold text-gray-900">
                    Paper Title
                  </span>
                  <p className="text-gray-600">{mockPaper.title}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Authors</span>
                  <p className="text-gray-600">{mockPaper.authors}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">
                    Journal / Conference name
                  </span>
                  <p className="text-gray-600">{mockPaper.journal}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">
                    Year of publication
                  </span>
                  <p className="text-gray-600">{mockPaper.year}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Publisher</span>
                  <p className="text-gray-600">{mockPaper.publisher}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">DOI</span>
                  <p className="text-gray-600">{mockPaper.doi}</p>
                </div>
              </div>

              <button
                onClick={() => setCurrentStep(20)}
                className="w-full bg-[#f76a23] hover:bg-[#e05a1a] text-white py-3 rounded-lg font-medium transition-colors"
              >
                Next
              </button>
            </div>
          )}

          {/* Step 20: What is wrong? (For paper issues) */}
          {currentStep === 20 && (
            <div className="space-y-4">
              <p className="text-sm font-semibold text-gray-900 mb-4">
                What is wrong?
              </p>

              <div className="space-y-3">
                <label
                  onClick={() => handleIssueReasonSelect("not-mine")}
                  className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#f76a23] hover:bg-orange-50/30 cursor-pointer transition-all"
                >
                  <input
                    type="radio"
                    name="issueReason"
                    checked={formData.issueReason === "not-mine"}
                    onChange={() => {}}
                    className="mt-0.5 w-4 h-4 text-[#f76a23] focus:ring-[#f76a23]"
                  />
                  <span className="text-sm text-gray-900">
                    This publication is not mine
                  </span>
                </label>

                <label
                  onClick={() => handleIssueReasonSelect("not-author")}
                  className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#f76a23] hover:bg-orange-50/30 cursor-pointer transition-all"
                >
                  <input
                    type="radio"
                    name="issueReason"
                    checked={formData.issueReason === "not-author"}
                    onChange={() => {}}
                    className="mt-0.5 w-4 h-4 text-[#f76a23] focus:ring-[#f76a23]"
                  />
                  <span className="text-sm text-gray-900">
                    I am not an author on this paper
                  </span>
                </label>

                <label
                  onClick={() => handleIssueReasonSelect("different-person")}
                  className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#f76a23] hover:bg-orange-50/30 cursor-pointer transition-all"
                >
                  <input
                    type="radio"
                    name="issueReason"
                    checked={formData.issueReason === "different-person"}
                    onChange={() => {}}
                    className="mt-0.5 w-4 h-4 text-[#f76a23] focus:ring-[#f76a23]"
                  />
                  <span className="text-sm text-gray-900">
                    Author name matches but this is a different person
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Step 22: Upload Files (Flow 2.1 & 2.2) */}
          {currentStep === 22 && (
            <div className="space-y-4">
              <p className="text-sm font-semibold text-gray-900 mb-2">
                Upload screenshots, letters, certificates, or ID
              </p>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#f76a23] transition-colors">
                <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload size={32} className="text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="text-[#f76a23] font-medium">
                      Click or Drag File To This Area to Upload
                    </span>
                  </p>
                  <p className="text-xs text-gray-400">
                    Support for a single or bulk upload. Allowed: PDF, JPG, PNG
                  </p>
                </label>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-2">
                  Add supporting links*
                  <br />
                  <span className="text-gray-400">
                    (Google Scholar, PubMed, ORCID, hospital website)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Paste here"
                  value={formData.supportLinks || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, supportLinks: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f76a23] text-sm"
                />
              </div>

              <button
                onClick={() => setCurrentStep(23)}
                className="w-full bg-[#f76a23] hover:bg-[#e05a1a] text-white py-3 rounded-lg font-medium transition-colors"
              >
                Next
              </button>
            </div>
          )}

          {/* Step 23: Impact Level (Flow 2.1 & 2.2) */}
          {currentStep === 23 && (
            <div className="space-y-4">
              <p className="text-sm font-semibold text-gray-900 mb-2">
                Impact Level
              </p>

              <div className="space-y-3">
                <label
                  onClick={() =>
                    setFormData({ ...formData, impactLevel: "low" })
                  }
                  className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                    formData.impactLevel === "low"
                      ? "border-[#f76a23] bg-orange-50/30"
                      : "border-gray-200 hover:border-[#f76a23] hover:bg-orange-50/20"
                  }`}
                >
                  <input
                    type="radio"
                    name="impact"
                    checked={formData.impactLevel === "low"}
                    onChange={() => {}}
                    className="mt-0.5 w-4 h-4 text-[#f76a23] focus:ring-[#f76a23]"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-900 block">
                      Low
                    </span>
                    <span className="text-xs text-gray-500">
                      Minor correction, does not affect my ranking.
                    </span>
                  </div>
                </label>

                <label
                  onClick={() =>
                    setFormData({ ...formData, impactLevel: "medium" })
                  }
                  className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                    formData.impactLevel === "medium"
                      ? "border-[#f76a23] bg-orange-50/30"
                      : "border-gray-200 hover:border-[#f76a23] hover:bg-orange-50/20"
                  }`}
                >
                  <input
                    type="radio"
                    name="impact"
                    checked={formData.impactLevel === "medium"}
                    onChange={() => {}}
                    className="mt-0.5 w-4 h-4 text-[#f76a23] focus:ring-[#f76a23]"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-900 block">
                      Medium
                    </span>
                    <span className="text-xs text-gray-500">
                      Affects how my profile appears to others.
                    </span>
                  </div>
                </label>

                <label
                  onClick={() =>
                    setFormData({ ...formData, impactLevel: "high" })
                  }
                  className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                    formData.impactLevel === "high"
                      ? "border-[#f76a23] bg-orange-50/30"
                      : "border-gray-200 hover:border-[#f76a23] hover:bg-orange-50/20"
                  }`}
                >
                  <input
                    type="radio"
                    name="impact"
                    checked={formData.impactLevel === "high"}
                    onChange={() => {}}
                    className="mt-0.5 w-4 h-4 text-[#f76a23] focus:ring-[#f76a23]"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-900 block">
                      High
                    </span>
                    <span className="text-xs text-gray-500">
                      Serious error affecting my reputation or compliance.
                    </span>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f76a23] text-sm"
                >
                  <option value="">Select</option>
                  <option value="remove">Remove publication</option>
                  <option value="correct">Correct information</option>
                  <option value="verify">Verify authorship</option>
                </select>
              </div>

              <button
                onClick={() => setCurrentStep(24)}
                className="w-full bg-[#f76a23] hover:bg-[#e05a1a] text-white py-3 rounded-lg font-medium transition-colors"
              >
                Next
              </button>
            </div>
          )}

          {/* Step 24: Additional Notes (Flow 2.1 & 2.2) */}
          {currentStep === 24 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Additional Notes{" "}
                  <span className="text-gray-400 font-normal">(Optional)</span>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f76a23] text-sm resize-none"
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
                <span className="text-xs text-gray-700">
                  I confirm that I am an author or co-author of this
                  publication. I understand that any false or misleading
                  information may result in strict action.
                </span>
              </label>

              <button
                onClick={handleSubmit}
                disabled={!formData.consent}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  formData.consent
                    ? "bg-[#f76a23] hover:bg-[#e05a1a] text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Submit Ticket
              </button>
            </div>
          )}

          {/* Step 25: Additional Notes (Flow 2.3 - Fast Track) */}
          {currentStep === 25 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Additional Notes{" "}
                  <span className="text-gray-400 font-normal">(Optional)</span>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f76a23] text-sm resize-none"
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
                <span className="text-xs text-gray-700">
                  I understand that any false or misleading information may
                  result in strict action.
                </span>
              </label>

              <button
                onClick={handleSubmit}
                disabled={!formData.consent}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  formData.consent
                    ? "bg-[#f76a23] hover:bg-[#e05a1a] text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Submit Ticket
              </button>
            </div>
          )}

          {/* Step 99: Success */}
          {currentStep === 99 && (
            <div className="space-y-4 text-center py-4">
              <p className="text-sm text-gray-600">
                Your ticket has been submitted!
              </p>

              <div className="space-y-2 text-sm bg-gray-50 p-4 rounded-lg text-left">
                <div>
                  <span className="font-semibold text-gray-900">Ticket ID</span>
                  <p className="text-gray-600">TKT-REQ-2048</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Issue</span>
                  <p className="text-gray-600">Publication is missing</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Status</span>
                  <p className="text-green-600">Open – Awaiting review</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">
                    Estimated Review Time
                  </span>
                  <p className="text-gray-600">Within 3–5 working days</p>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                We will contact you at{" "}
                <span className="text-[#f76a23] font-medium">[email]</span> if
                we need more information
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Back to Dashboard
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 bg-[#f76a23] hover:bg-[#e05a1a] text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                  View Ticket Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
