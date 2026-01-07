import React, { useState } from "react";
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

interface AddPublicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddPublicationModal = ({
  isOpen,
  onClose,
}: AddPublicationModalProps) => {
  const [step, setStep] = useState<ModalStep>("choose");
  const [formData, setFormData] = useState<AddPublicationForm>({
    method: "doi",
  });
  const [confirmed, setConfirmed] = useState(false);

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
    // Simulate fetching
    setTimeout(() => {
      setFormData({
        ...formData,
        title: "Advanced Neural Networks in Medical Imaging",
        authors: "Mitchell, S., Thompson, R.",
        journal: "Journal of Medical AI Research",
        year: "2024",
        publisher: "Elsevier",
        doi: "10.1234/jmar.2024.5678",
      });
      setStep("review");
    }, 2000);
  };

  const handleManualNext = () => {
    setStep("review");
  };

  const handleSubmit = () => {
    console.log("Submitting:", formData);
    onClose();
    resetModal();
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
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Step 1: Choose Method */}
        {step === "choose" && (
          <div className="p-6">
            <h4 className="mb-6">Add Missing Publication</h4>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">Choose one:</p>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  checked={formData.method === "doi"}
                  onChange={() => handleMethodSelect("doi")}
                  className="mt-1 w-4 h-4 text-[#f76a23] focus:ring-[#f76a23]"
                />
                <div>
                  <span className="text-sm font-medium text-gray-900">
                    Search by DOI / Publication URL{" "}
                    <span className="text-gray-500 font-normal italic">
                      (recommended)
                    </span>
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  checked={formData.method === "manual"}
                  onChange={() => handleMethodSelect("manual")}
                  className="mt-1 w-4 h-4 text-[#f76a23] focus:ring-[#f76a23]"
                />
                <div>
                  <span className="text-sm font-medium text-gray-900">
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
            <h4 className="mb-6">Add Missing Publication</h4>

            <div className="mb-4">
              <label className="flex items-start gap-3 mb-4">
                <input
                  type="radio"
                  checked
                  readOnly
                  className="mt-1 w-4 h-4 text-[#f76a23]"
                />
                <span className="text-sm font-medium text-gray-900">
                  Search by DOI / Publication URL{" "}
                  <span className="text-gray-500 font-normal italic">
                    (recommended)
                  </span>
                </span>
              </label>

              <input
                type="text"
                placeholder="Enter the DOI/ URL"
                value={formData.doiUrl || ""}
                onChange={(e) =>
                  setFormData({ ...formData, doiUrl: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f76a23] text-sm"
              />
            </div>

            <button
              onClick={handleDoiNext}
              className="w-full bg-[#f76a23] hover:bg-[#e05a1a] text-white py-3 rounded-lg font-medium transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 3: Manual Form */}
        {step === "manual-form" && (
          <div className="p-6">
            <h4 className="mb-6">Add Missing Publication</h4>

            <div className="mb-4">
              <label className="flex items-start gap-3 mb-6">
                <input
                  type="radio"
                  checked
                  readOnly
                  className="mt-1 w-4 h-4 text-[#f76a23]"
                />
                <span className="text-sm font-medium text-gray-900">
                  Add Manually
                </span>
              </label>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Publication Title*"
                  value={formData.title || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f76a23] text-sm placeholder:text-gray-400"
                />

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Author(s)*"
                    value={formData.authors || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, authors: e.target.value })
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f76a23] text-sm placeholder:text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="DOI"
                    value={formData.doi || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, doi: e.target.value })
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f76a23] text-sm placeholder:text-gray-400"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Journal / Conference name*"
                  value={formData.journal || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, journal: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f76a23] text-sm placeholder:text-gray-400"
                />

                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Publisher Name"
                    value={formData.publisher || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, publisher: e.target.value })
                    }
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f76a23] text-sm placeholder:text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Publication Type"
                    value={formData.publicationType || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        publicationType: e.target.value,
                      })
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f76a23] text-sm placeholder:text-gray-400"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Year of publication*"
                  value={formData.year || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f76a23] text-sm placeholder:text-gray-400"
                />
              </div>
            </div>

            <button
              onClick={handleManualNext}
              className="w-full bg-[#f76a23] hover:bg-[#e05a1a] text-white py-3 rounded-lg font-medium transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 4: Fetching */}
        {step === "fetching" && (
          <div className="p-6">
            <h4 className="mb-6">Add Missing Publication</h4>

            <div className="border-2 border-dashed border-blue-300 rounded-lg p-12 flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
              <p className="text-sm text-gray-500">
                Fetching Data (Loading symbol)
              </p>
            </div>
          </div>
        )}

        {/* Step 5: Review & Submit */}
        {step === "review" && (
          <div className="p-6">
            <h4 className="mb-6">Add Missing Publication</h4>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-4 text-green-600">
                <CheckCircle size={18} />
                <span className="text-sm font-semibold">Paper Found</span>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold text-gray-900">
                    Paper Title
                  </span>
                  <p className="text-gray-600">{formData.title}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Authors</span>
                  <p className="text-gray-600">{formData.authors}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">
                    Journal / Conference name
                  </span>
                  <p className="text-gray-600">{formData.journal}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">
                    Year of publication
                  </span>
                  <p className="text-gray-600">{formData.year}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Publisher</span>
                  <p className="text-gray-600">{formData.publisher}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">DOI</span>
                  <p className="text-gray-600">{formData.doi}</p>
                </div>
              </div>

              <label className="flex items-start gap-3 mt-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-1 w-4 h-4 text-green-600 focus:ring-green-500 rounded"
                />
                <span className="text-xs text-gray-700">
                  I confirm that I am an author or co-author of this
                  publication. I understand that any false or misleading
                  information may result in strict action.
                </span>
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!confirmed}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                confirmed
                  ? "bg-[#f76a23] hover:bg-[#e05a1a] text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
