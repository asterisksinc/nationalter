"use client";

import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";
import { SearchableSelect } from "./SearchableSelect";
import { FileUpload } from "./FileUpload";
import { Icon } from "./Icon";

enum FlowStep {
  Identity = 1,
  Authentication = 2,
  Profile = 3,
  Welcome = 4,
}

interface ResearcherFlowProps {
  step: number;
  onNext: () => void;
  onChange?: (field: string, value: string | File) => void;
  researcherForm: Record<string, string>;
  getFieldError: (field: string) => string | undefined;
  checkingEmail: boolean;
  institutions: string[];
  domains: string[];
  loadingOptions: boolean;
}

export const ResearcherFlow = ({
  step,
  onNext,
  onChange,
  researcherForm,
  getFieldError,
  checkingEmail,
  institutions,
  domains,
  loadingOptions,
}: ResearcherFlowProps) => {
  switch (step) {
    case FlowStep.Identity:
      return (
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-5 pb-2">
            <FormInput
              label="Full Name"
              name="fullName"
              placeholder="e.g. Dr. Aditi Sharma"
              value={researcherForm.name}
              onChange={(value) => onChange?.("name", value)}
              error={getFieldError("name")}
              required
            />

            <SearchableSelect
              label="Select Institution"
              options={institutions}
              value={researcherForm.institution}
              onChange={(value) => onChange?.("institution", value)}
              error={getFieldError("institution")}
              loading={loadingOptions}
              placeholder="Search institution..."
              required
            />
          </div>
          <div className="mt-auto pt-6 md:pt-4">
            <button
              onClick={onNext}
              className="w-full bg-[var(--color-primary)] text-white py-3.5 md:py-3 px-6 text-sm md:text-base font-semibold md:font-medium rounded-xl hover:bg-[var(--color-warm-200)] active:scale-[0.98] transition-all shadow-md hover:shadow-lg touch-manipulation"
            >
              Next
            </button>
          </div>
        </div>
      );

    case FlowStep.Authentication:
      return (
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-3 pb-2">
            <FormInput
              label="Institutional Email ID"
              name="institutionEmail"
              type="email"
              value={researcherForm.instituteEmail}
              placeholder="name@institute.edu.in"
              onChange={(value) => onChange?.("instituteEmail", value)}
              error={getFieldError("instituteEmail")}
              required
            />
            {checkingEmail && (
              <p className="text-xs text-neutral-500">Checking email...</p>
            )}
            <FormInput
              label="Mobile Number"
              name="mobile"
              type="tel"
              value={researcherForm.mobile}
              placeholder="e.g. 9876543210"
              onChange={(value) => onChange?.("mobile", value)}
              error={getFieldError("mobile")}
              required
            />
            <FormInput
              label="City"
              placeholder="e.g. Bengaluru"
              value={researcherForm.city}
              onChange={(value) => onChange?.("city", value)}
              error={getFieldError("city")}
              required
            />
            <FormInput
              label="State"
              placeholder="e.g. Karnataka"
              value={researcherForm.state}
              onChange={(value) => onChange?.("state", value)}
              error={getFieldError("state")}
              required
            />
            <FormInput
              label="ORCID ID"
              placeholder="e.g. 0000-0002-1825-0097"
              value={researcherForm.orcidId}
              onChange={(value) => onChange?.("orcidId", value)}
              error={getFieldError("orcidId")}
              required
            />
            <FileUpload
              label="Institutional ID Card"
              subLabel="Upload a clear scan of your ID card."
              value={researcherForm.institutionalIdCardUrl}
              onChange={(value) =>
                onChange?.("institutionalIdCardUrl", value as File)
              }
            />
          </div>
          <div className="mt-auto pt-6 md:pt-4">
            <button
              onClick={onNext}
              className="w-full bg-[var(--color-primary)] text-white py-3.5 md:py-3 px-6 text-sm md:text-base font-semibold md:font-medium rounded-xl hover:bg-[var(--color-warm-200)] active:scale-[0.98] transition-all shadow-md hover:shadow-lg touch-manipulation"
            >
              Verify Identity
            </button>
          </div>
        </div>
      );

    case FlowStep.Profile:
      return (
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-5 pb-2">
            <SearchableSelect
              label="Primary Research Domain"
              options={domains}
              value={researcherForm.primaryDomain}
              onChange={(value) => onChange?.("primaryDomain", value)}
              error={getFieldError("primaryDomain")}
              loading={loadingOptions}
              placeholder="Search domain..."
              required
            />
            <FormInput
              value={researcherForm.googleScholarUrl}
              label="Google Scholar Profile URL"
              placeholder="https://scholar.google.com/citations?user=..."
              onChange={(value) => onChange?.("googleScholarUrl", value)}
              error={getFieldError("googleScholarUrl")}
              required
            />
            <FileUpload
              label="Profile Photography"
              subLabel="Upload a professional headshot."
              value={researcherForm.profilePhotoUrl}
              onChange={(value) => onChange?.("profilePhotoUrl", value as File)}
              error={getFieldError("profilePhotoUrl")}
            />
          </div>
          <div className="mt-auto pt-6 md:pt-4">
            <button
              onClick={onNext}
              className="w-full bg-[var(--color-primary)] text-white py-3.5 md:py-3 px-6 text-sm md:text-base font-semibold md:font-medium rounded-xl hover:bg-[var(--color-warm-200)] active:scale-[0.98] transition-all shadow-md hover:shadow-lg touch-manipulation"
            >
              Complete Profile
            </button>
          </div>
        </div>
      );

    case FlowStep.Welcome:
      return (
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-5 pb-2">
            <div className="mb-2">
              <label className="block text-xs font-medium text-neutral-700 mb-1.5 font-sans tracking-wide">
                Impact Card Preview
              </label>
              <div className="bg-neutral-50 border border-dashed border-neutral-300 rounded-xl p-4 text-center flex flex-col items-center">
                <div className="bg-white p-2 rounded-full mb-2 text-neutral-500 shadow-none">
                  <Icon name="upload" size={16} />
                </div>
                <p className="text-xs font-medium mb-1 text-neutral-700">
                  Click or Drag File to This Area to Upload
                </p>
                <p className="text-[10px] text-neutral-400 mb-2">
                  Support for a single or bulk upload. Allowed: PDF, JPG, PNG.
                </p>
                <button
                  type="button"
                  className="px-3 py-1.5 bg-white border border-neutral-300 rounded-lg text-xs text-neutral-700 font-medium"
                >
                  Browse File
                </button>
              </div>
            </div>
            <FormSelect
              label="What will you be using Nationcite for?"
              options={[
                "Academic Research",
                "Grant Applications",
                "Collaboration",
                "Teaching Resources",
              ]}
              value={researcherForm.useCase}
              onChange={(value) => onChange?.("useCase", value)}
            />
            <FormSelect
              label="How did you hear about us?"
              options={[
                "Social Media",
                "Colleague",
                "University Portal",
                "Search Engine",
              ]}
              value={researcherForm.heardFrom}
              onChange={(value) => onChange?.("heardFrom", value)}
            />
          </div>
          <div className="mt-auto pt-6">
            <button
              onClick={onNext}
              className="w-full bg-[var(--color-primary)] text-white py-3.5 px-6 text-sm rounded-xl font-medium hover:bg-[var(--color-warm-200)] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              Complete Registration <Icon name="chevron-right" size={20} />
            </button>
          </div>
        </div>
      );

    default:
      return null;
  }
};
