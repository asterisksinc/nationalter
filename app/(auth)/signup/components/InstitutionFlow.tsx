"use client";

import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";
import { FileUpload } from "./FileUpload";
import { Icon } from "./Icon";

enum FlowStep {
  Identity = 1,
  Authentication = 2,
  Profile = 3,
  Welcome = 4,
}

interface InstitutionFlowProps {
  step: number;
  onNext: () => void;
  onChange?: (field: string, value: string | File) => void;
  institutionForm: Record<string, string>;
  getFieldError: (field: string) => string | undefined;
}

export const InstitutionFlow = ({
  step,
  onNext,
  onChange,
  institutionForm,
  getFieldError,
}: InstitutionFlowProps) => {
  switch (step) {
    case FlowStep.Identity:
      return (
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-5 pb-2">
            <FormInput
              label="Organization Name"
              placeholder="e.g. National Institute of Technology"
              value={institutionForm.name}
              onChange={(value) => onChange?.("name", value)}
              error={getFieldError("name")}
              required
            />
            <FormInput
              label="Official Domain Name"
              placeholder="e.g. university.edu.in"
              value={institutionForm.domain}
              onChange={(value) => onChange?.("domain", value)}
              error={getFieldError("domain")}
              required
            />
            <p className="text-[10px] md:text-xs text-neutral-500 -mt-1 ml-1">
              We will verify the domain DNS records automatically.
            </p>
          </div>
          <div className="mt-auto pt-6 md:pt-4">
            <button
              onClick={onNext}
              className="w-full bg-[var(--color-primary)] text-white py-3.5 md:py-3 px-6 text-sm md:text-base font-semibold md:font-medium rounded-xl hover:bg-[var(--color-warm-200)] active:scale-[0.98] transition-all shadow-md hover:shadow-lg touch-manipulation"
            >
              Verify Domain
            </button>
          </div>
        </div>
      );

    case FlowStep.Authentication:
      return (
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-5 pb-2">
            <FormInput
              label="Administrator Full Name"
              placeholder="e.g. Registrar Name"
              value={institutionForm.name1}
              onChange={(value) => onChange?.("name1", value)}
              error={getFieldError("name1")}
            />
            <FormInput
              label="Official Email Address"
              placeholder="registrar@university.ac.in"
              type="email"
              value={institutionForm.email}
              onChange={(value) => onChange?.("email", value)}
              error={getFieldError("email")}
            />
            <FormInput
              label="Registered Mobile Number"
              placeholder="+91 98765 43210"
              type="tel"
              value={institutionForm.number}
              onChange={(value) => onChange?.("number", value)}
              error={getFieldError("number")}
            />
            <FormInput
              label="City"
              placeholder="e.g. Chennai"
              value={institutionForm.city}
              onChange={(value) => onChange?.("city", value)}
              error={getFieldError("city")}
              required
            />
            <FormInput
              label="State"
              placeholder="e.g. Tamil Nadu"
              value={institutionForm.state}
              onChange={(value) => onChange?.("state", value)}
              error={getFieldError("state")}
              required
            />
          </div>
          <div className="mt-auto pt-6 md:pt-4">
            <button
              onClick={onNext}
              className="w-full bg-[var(--color-primary)] text-white py-3.5 md:py-3 px-6 text-sm md:text-base font-semibold md:font-medium rounded-xl hover:bg-[var(--color-warm-200)] active:scale-[0.98] transition-all shadow-md hover:shadow-lg touch-manipulation"
            >
              Continue
            </button>
          </div>
        </div>
      );

    case FlowStep.Profile:
      return (
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-5 pb-2">
            <FileUpload
              label="Letter of Authorization"
              subLabel="Signed by the Head of Institution"
              onChange={(value) =>
                onChange?.("letterOfAuthorizationUrl", value)
              }
              value={institutionForm.letterOfAuthorizationUrl}
              error={getFieldError("letterOfAuthorizationUrl")}
            />
            <FileUpload
              label="NAAC/ NIRF Accreditation Proof"
              onChange={(value) => onChange?.("accreditationProofUrl", value)}
              value={institutionForm.accreditationProofUrl}
              error={getFieldError("accreditationProofUrl")}
            />
          </div>
          <div className="mt-auto pt-6">
            <button
              onClick={onNext}
              className="w-full bg-[var(--color-primary)] text-white py-3.5 md:py-3 px-6 text-sm md:text-base font-semibold md:font-medium rounded-xl hover:bg-[var(--color-warm-200)] active:scale-[0.98] transition-all shadow-md hover:shadow-lg touch-manipulation"
            >
              Submit for Review
            </button>
          </div>
        </div>
      );

    case FlowStep.Welcome:
      return (
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-5 pb-2">
            <FormSelect
              label="Add your key departments"
              options={[
                "Computer Science",
                "Mechanical Engineering",
                "Physics",
                "Biology",
                "Business Administration",
              ]}
              onChange={(value) => onChange?.("domain", value)}
            />
          </div>
          <div className="mt-auto pt-6">
            <button
              onClick={onNext}
              className="w-full bg-[var(--color-primary)] text-white py-3.5 md:py-3 px-6 text-sm md:text-base font-semibold md:font-medium rounded-xl hover:bg-[var(--color-warm-200)] active:scale-[0.98] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 touch-manipulation"
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
