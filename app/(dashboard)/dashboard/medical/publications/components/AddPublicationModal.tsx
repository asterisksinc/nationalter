import React, { useState, useEffect } from "react";
import { X, CheckCircle, Loader2 } from "lucide-react";

export type ModalStep =
  | "choose"
  | "doi-input"
  | "manual-form"
  | "fetching"
  | "review";

export interface AddPublicationForm {
  method: "doi" | "manual";
  doiUrl?: string;
  title?: string;
  authors?: string;
  journal?: string;
  year?: string;
  publicationType?: string;
  publisher?: string;
  doi?: string;
}

export interface EditingPublication {
  id: number;
  title: string;
  journalName: string;
  year: number;
  field: string;
  doi: string;
  publisher: string;
  authors: string;
}

interface AddPublicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingPublication?: EditingPublication | null;
}

export const AddPublicationModal = ({
  isOpen,
  onClose,
  onSuccess,
  editingPublication,
}: AddPublicationModalProps) => {
  const isEditMode = !!editingPublication;

  const [step, setStep] = useState<ModalStep>(isEditMode ? "manual-form" : "choose");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<AddPublicationForm>({
    method: "manual",
  });
  const [confirmed, setConfirmed] = useState(false);

  // Pre-fill form when editing
  useEffect(() => {
    if (editingPublication) {
      setFormData({
        method: "manual",
        title: editingPublication.title,
        authors: editingPublication.authors || "",
        journal: editingPublication.journalName,
        year: String(editingPublication.year),
        publicationType: editingPublication.field,
        publisher: editingPublication.publisher || "",
        doi: editingPublication.doi || "",
      });
      setStep("manual-form");
      setConfirmed(false);
    } else {
      resetModal();
    }
  }, [editingPublication, isOpen]);

  const handleMethodSelect = (method: "doi" | "manual") => {
    setFormData({ ...formData, method });
    if (method === "doi") {
      setStep("doi-input");
    } else {
      setStep("manual-form");
    }
  };

  const handleDoiNext = () => {
    setStep("fetching");
    // Simulate DOI lookup (real implementation would call CrossRef or similar)
    setTimeout(() => {
      setFormData({
        ...formData,
        title: "Advanced Neural Networks in Medical Imaging",
        authors: "Mitchell, S., Thompson, R.",
        journal: "Journal of Medical AI Research",
        year: "2024",
        publisher: "Elsevier",
        publicationType: "Journal Article",
        doi: formData.doiUrl || "10.1234/jmar.2024.5678",
      });
      setStep("review");
    }, 2000);
  };

  const handleManualNext = () => {
    // Basic validation
    if (!formData.title?.trim()) {
      alert("Please enter a publication title.");
      return;
    }
    if (!formData.journal?.trim()) {
      alert("Please enter the journal or conference name.");
      return;
    }
    if (!formData.year?.trim()) {
      alert("Please enter the year of publication.");
      return;
    }
    setStep("review");
  };

  const handleSubmit = async () => {
    if (!confirmed) return;

    setIsSubmitting(true);
    try {
      if (isEditMode && editingPublication) {
        // UPDATE existing publication
        const response = await fetch("/api/publications/publication-update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingPublication.id,
            title: formData.title,
            journalName: formData.journal,
            datePublished: formData.year ? `${formData.year}-01-01` : undefined,
            field: formData.publicationType || "General",
          }),
        });

        const result = await response.json();

        if (result.success) {
          if (onSuccess) onSuccess();
          onClose();
          resetModal();
        } else {
          alert(result.message || "Failed to update publication");
        }
      } else {
        // CREATE new publication
        const response = await fetch("/api/publications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formData.title,
            journalName: formData.journal,
            datePublished: formData.year
              ? `${formData.year}-01-01`
              : new Date().toISOString(),
            publicationType: formData.publicationType || "General",
            authors: formData.authors,
            publisher: formData.publisher,
            doi: formData.doi,
            citationsTotal: 0,
            citationsLast5Years: 0,
          }),
        });

        const result = await response.json();

        if (result.success) {
          if (onSuccess) onSuccess();
          onClose();
          resetModal();
        } else {
          alert(result.message || "Failed to save publication");
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while connecting to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setStep("choose");
    setFormData({ method: "doi" });
    setConfirmed(false);
  };

  const handleClose = () => {
    onClose();
    resetModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Step 1: Choose Method (only for new publications) */}
        {step === "choose" && !isEditMode && (
          <div className="p-6">
            <div className="text-[16px] font-semibold leading-5 tracking-[-0.006em] text-[#0E121B] mb-6">
              Add Missing Publication
            </div>
            <div className="space-y-4">
              <p className="text-[14px] font-normal leading-[150%] tracking-[-0.02em] text-[#525866] mb-4">
                Choose one:
              </p>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  checked={formData.method === "doi"}
                  onChange={() => handleMethodSelect("doi")}
                  className="mt-1 w-4 h-4 accent-[#f76a23]"
                />
                <div className="flex-1">
                  <span className="text-[14px] font-medium leading-[120%] text-[#0E121B]">
                    Search by DOI / Publication URL{" "}
                    <span className="text-[#525866] font-normal italic">
                      (recommended)
                    </span>
                  </span>
                  {formData.method === "doi" && (
                    <input
                      type="text"
                      placeholder="e.g., 10.1000/xyz123 or https://doi.org/10.1000/xyz123"
                      value={formData.doiUrl || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, doiUrl: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-2xl text-[14px] font-normal leading-[150%] tracking-[-0.02em] placeholder-[#8E8E93] focus:outline-none focus:border-[#f76a23] mt-2"
                    />
                  )}
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  checked={formData.method === "manual"}
                  onChange={() => handleMethodSelect("manual")}
                  className="mt-1 w-4 h-4 accent-[#f76a23]"
                />
                <div>
                  <span className="text-[14px] font-medium leading-[120%] text-[#0E121B]">
                    Add Manually
                  </span>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Step 2: DOI Input */}
        {step === "doi-input" && (
          <div className="p-6">
            <div className="text-[16px] font-semibold leading-5 tracking-[-0.006em] text-[#0E121B] mb-6">
              Add Missing Publication
            </div>

            <div className="mb-4">
              <label className="flex items-start gap-3 mb-4">
                <input
                  type="radio"
                  checked
                  readOnly
                  className="mt-1 w-4 h-4 accent-[#f76a23]"
                />
                <span className="text-[14px] font-medium leading-[120%] text-[#0E121B]">
                  Search by DOI / Publication URL{" "}
                  <span className="text-[#525866] font-normal italic">
                    (recommended)
                  </span>
                </span>
              </label>

              <input
                type="text"
                placeholder="e.g., 10.1000/xyz123 or https://doi.org/10.1000/xyz123"
                value={formData.doiUrl || ""}
                onChange={(e) =>
                  setFormData({ ...formData, doiUrl: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-2xl text-[14px] font-normal leading-[150%] tracking-[-0.02em] placeholder-[#8E8E93] focus:outline-none focus:border-[#f76a23]"
              />
            </div>

            <button
              onClick={handleDoiNext}
              className="w-full bg-[#f76a23] hover:bg-[#e05a1a] text-white text-[14px] font-semibold leading-[120%] py-3 rounded-lg transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 3: Manual Form */}
        {step === "manual-form" && (
          <div className="p-6">
            <div className="text-[16px] font-semibold leading-5 tracking-[-0.006em] text-[#0E121B] mb-6">
              {isEditMode ? "Edit Publication" : "Add Missing Publication"}
            </div>

            <div className="mb-4">
              {!isEditMode && (
                <label className="flex items-start gap-3 mb-6">
                  <input
                    type="radio"
                    checked
                    readOnly
                    className="mt-1 w-4 h-4 accent-[#f76a23]"
                  />
                  <span className="text-[14px] font-medium leading-[120%] text-[#0E121B]">
                    Add Manually
                  </span>
                </label>
              )}

              <div className="space-y-3">
                <div>
                  <label className="block text-[12px] font-medium text-[#525866] mb-1">
                    Publication Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Impact of Artificial Intelligence on Drug Discovery in Oncology"
                    value={formData.title || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-2xl text-[14px] font-normal leading-[150%] tracking-[-0.02em] placeholder-[#8E8E93] focus:outline-none focus:border-[#f76a23]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-medium text-[#525866] mb-1">
                      Author(s) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Smith, J., Lee, K., Patel, R."
                      value={formData.authors || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, authors: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-2xl text-[14px] font-normal leading-[150%] tracking-[-0.02em] placeholder-[#8E8E93] focus:outline-none focus:border-[#f76a23]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-[#525866] mb-1">
                      DOI
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 10.1038/s41586-021-03819-2"
                      value={formData.doi || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, doi: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-2xl text-[14px] font-normal leading-[150%] tracking-[-0.02em] placeholder-[#8E8E93] focus:outline-none focus:border-[#f76a23]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-[#525866] mb-1">
                    Journal / Conference Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Nature Medicine, IEEE Conference on AI"
                    value={formData.journal || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, journal: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-2xl text-[14px] font-normal leading-[150%] tracking-[-0.02em] placeholder-[#8E8E93] focus:outline-none focus:border-[#f76a23]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-medium text-[#525866] mb-1">
                      Publisher
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Springer Nature, Elsevier, Wiley"
                      value={formData.publisher || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, publisher: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-2xl text-[14px] font-normal leading-[150%] tracking-[-0.02em] placeholder-[#8E8E93] focus:outline-none focus:border-[#f76a23]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-[#525866] mb-1">
                      Publication Type
                    </label>
                    <select
                      value={formData.publicationType || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          publicationType: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-2xl text-[14px] font-normal leading-[150%] tracking-[-0.02em] text-[#0E121B] focus:outline-none focus:border-[#f76a23] bg-white"
                    >
                      <option value="">Select type...</option>
                      <option value="Journal Article">Journal Article</option>
                      <option value="Conference Paper">Conference Paper</option>
                      <option value="Book Chapter">Book Chapter</option>
                      <option value="Review Article">Review Article</option>
                      <option value="Clinical Trial">Clinical Trial</option>
                      <option value="Case Report">Case Report</option>
                      <option value="Thesis">Thesis / Dissertation</option>
                      <option value="Preprint">Preprint</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-[#525866] mb-1">
                    Year of Publication <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 2024"
                    min="1900"
                    max="2099"
                    value={formData.year || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-2xl text-[14px] font-normal leading-[150%] tracking-[-0.02em] placeholder-[#8E8E93] focus:outline-none focus:border-[#f76a23]"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleManualNext}
              className="w-full bg-[#f76a23] hover:bg-[#e05a1a] text-white text-[14px] font-semibold leading-[120%] py-3 rounded-lg transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 4: Fetching */}
        {step === "fetching" && (
          <div className="p-6">
            <div className="text-[16px] font-semibold leading-5 tracking-[-0.006em] text-[#0E121B] mb-6">
              Add Missing Publication
            </div>

            <div className="border-2 border-dashed border-blue-300 rounded-2xl p-12 flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
              <p className="text-[14px] font-normal leading-[150%] tracking-[-0.02em] text-[#525866]">
                Looking up publication details…
              </p>
            </div>
          </div>
        )}

        {/* Step 5: Review & Submit */}
        {step === "review" && (
          <div className="p-6">
            <div className="text-[16px] font-semibold leading-5 tracking-[-0.006em] text-[#0E121B] mb-6">
              {isEditMode ? "Review Changes" : "Review & Submit"}
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-4 text-green-600">
                <CheckCircle size={18} />
                <span className="text-[14px] font-semibold leading-[120%]">
                  {isEditMode ? "Ready to Update" : "Paper Found"}
                </span>
              </div>

              <div className="space-y-3 text-[14px]">
                <div>
                  <span className="font-semibold leading-[120%] text-[#0E121B]">
                    Paper Title
                  </span>
                  <p className="font-normal leading-[150%] tracking-[-0.02em] text-[#333333]">
                    {formData.title}
                  </p>
                </div>
                <div>
                  <span className="font-semibold leading-[120%] text-[#0E121B]">
                    Authors
                  </span>
                  <p className="font-normal leading-[150%] tracking-[-0.02em] text-[#333333]">
                    {formData.authors || "—"}
                  </p>
                </div>
                <div>
                  <span className="font-semibold leading-[120%] text-[#0E121B]">
                    Journal / Conference Name
                  </span>
                  <p className="font-normal leading-[150%] tracking-[-0.02em] text-[#333333]">
                    {formData.journal}
                  </p>
                </div>
                <div>
                  <span className="font-semibold leading-[120%] text-[#0E121B]">
                    Year of Publication
                  </span>
                  <p className="font-normal leading-[150%] tracking-[-0.02em] text-[#333333]">
                    {formData.year}
                  </p>
                </div>
                {formData.publisher && (
                  <div>
                    <span className="font-semibold leading-[120%] text-[#0E121B]">
                      Publisher
                    </span>
                    <p className="font-normal leading-[150%] tracking-[-0.02em] text-[#333333]">
                      {formData.publisher}
                    </p>
                  </div>
                )}
                {formData.publicationType && (
                  <div>
                    <span className="font-semibold leading-[120%] text-[#0E121B]">
                      Publication Type
                    </span>
                    <p className="font-normal leading-[150%] tracking-[-0.02em] text-[#333333]">
                      {formData.publicationType}
                    </p>
                  </div>
                )}
                {formData.doi && (
                  <div>
                    <span className="font-semibold leading-[120%] text-[#0E121B]">
                      DOI
                    </span>
                    <p className="font-normal leading-[150%] tracking-[-0.02em] text-[#333333]">
                      {formData.doi}
                    </p>
                  </div>
                )}
              </div>

              <label className="flex items-start gap-3 mt-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-1 w-4 h-4 text-green-600 focus:ring-green-500 rounded"
                />
                <span className="text-[12px] font-normal leading-[120%] text-[#333333]">
                  {isEditMode
                    ? "I confirm the updated details are accurate."
                    : "I confirm that I am an author or co-author of this publication. I understand that any false or misleading information may result in strict action."}
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("manual-form")}
                className="flex-1 text-[14px] font-semibold leading-[120%] py-3 rounded-lg transition-colors border border-gray-300 text-[#525866] hover:bg-gray-50"
              >
                Back to Edit
              </button>
              <button
                onClick={handleSubmit}
                disabled={!confirmed || isSubmitting}
                className={`flex-1 text-[14px] font-semibold leading-[120%] py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${confirmed && !isSubmitting
                    ? "bg-[#f76a23] hover:bg-[#e05a1a] text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isEditMode ? "Updating..." : "Submitting..."}
                  </>
                ) : isEditMode ? (
                  "Update"
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
