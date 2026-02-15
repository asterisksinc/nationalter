"use client";

import { FormInput } from "./FormInput";
import { SearchableSelect } from "./SearchableSelect";
import { FileUpload } from "./FileUpload";
import { Icon } from "./Icon";

enum FlowStep {
  Identity = 1,
  Authentication = 2,
  Profile = 3,
  Welcome = 4,
}

interface MedicalFlowProps {
  step: number;
  onNext: () => void;
  onChange?: (field: string, value: string | File) => void;
  medicalForm: Record<string, string>;
  getFieldError: (field: string) => string | undefined;
  checkingEmail: boolean;
  emailError: string | null;
  councils: string[];
  hospitals: string[];
  specialties: string[];
  researchFocus: string[];
  loadingOptions: boolean;
}

export const MedicalFlow = ({
  step,
  onNext,
  onChange,
  medicalForm,
  getFieldError,
  checkingEmail,
  emailError,
  councils,
  hospitals,
  specialties,
  researchFocus,
  loadingOptions,
}: MedicalFlowProps) => {
  switch (step) {
    case FlowStep.Identity:
      return (
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-5 pb-2">
            <FormInput
              label="Full Name"
              placeholder="e.g. Dr. Rajesh Kumar"
              value={medicalForm.name}
              onChange={(value) => onChange?.("name", value)}
              error={getFieldError("name")}
              required
            />
            <FormInput
              label="Medical Council Registration Number"
              placeholder="e.g. MCI-12345"
              onChange={(value) => onChange?.("medCouncilRegNo", value)}
              value={medicalForm.medCouncilRegNo}
              error={getFieldError("medCouncilRegNo")}
              required
            />
            <SearchableSelect
              label="State Medical Council"
              options={councils}
              value={medicalForm.stateCouncil}
              onChange={(value) => onChange?.("stateCouncil", value)}
              error={getFieldError("stateCouncil")}
              loading={loadingOptions}
              placeholder="Search council..."
              required
            />
            <FormInput
              label="Email ID"
              name="email"
              type="email"
              value={medicalForm.email}
              placeholder="name@hospital.org"
              onChange={(value) => onChange?.("email", value)}
              error={getFieldError("email")}
              required
            />
            {checkingEmail && (
              <p className="text-xs text-neutral-500">Checking email...</p>
            )}
            <FormInput
              label="Mobile Number"
              name="mobile"
              type="tel"
              value={medicalForm.mobile}
              placeholder="e.g. 9876543210"
              onChange={(value) => onChange?.("mobile", value)}
              error={getFieldError("mobile")}
              required
            />
          </div>
          <div className="mt-auto pt-6 md:pt-4">
            <button
              onClick={onNext}
              disabled={!!emailError}
              className="w-full bg-[var(--color-primary)] text-white py-3.5 md:py-3 px-6 text-sm md:text-base font-semibold md:font-medium rounded-xl hover:bg-[var(--color-warm-200)] active:scale-[0.98] transition-all shadow-md hover:shadow-lg touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      );

    case FlowStep.Authentication:
      return (
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-5 pb-2">
            <SearchableSelect
              label="Primary Hospital/Clinic"
              options={hospitals}
              value={medicalForm.primaryHospital}
              onChange={(value) => onChange?.("primaryHospital", value)}
              error={getFieldError("primaryHospital")}
              loading={loadingOptions}
              placeholder="Search hospital..."
              required
            />
            <SearchableSelect
              label="Specialty"
              options={specialties}
              value={medicalForm.specialty}
              onChange={(value) => onChange?.("specialty", value)}
              error={getFieldError("specialty")}
              loading={loadingOptions}
              placeholder="Search specialty..."
              required
            />
            <SearchableSelect
              label="Research Focus"
              options={researchFocus}
              value={medicalForm.researchFocus}
              onChange={(value) => onChange?.("researchFocus", value)}
              error={getFieldError("researchFocus")}
              loading={loadingOptions}
              placeholder="Search research focus..."
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

    case FlowStep.Profile:
      return (
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-5 pb-2">
            <FileUpload
              label="Medical Degree"
              subLabel="Upload your MBBS/MD/MS degree certificate."
              value={medicalForm.medicalDegreeUrl}
              onChange={(value) => onChange?.("medicalDegreeUrl", value)}
            />
            <FileUpload
              label="Reg. Certificate"
              subLabel="Upload your Medical Council Registration certificate."
              onChange={(value) => onChange?.("regCertificateUrl", value)}
              value={medicalForm.regCertificateUrl}
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

    case FlowStep.Welcome:
      return (
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-5 pb-2">
            <label className="flex items-start gap-3 md:gap-4 p-3.5 md:p-4 border-2 rounded-xl cursor-pointer hover:border-[var(--color-primary)] active:border-[var(--color-primary)] transition-all bg-white group hover:shadow-lg touch-manipulation">
              <div className="mt-0.5">
                <input
                  type="radio"
                  name="plan"
                  className="w-5 h-5 md:w-4 md:h-4 accent-[var(--color-primary)] focus:ring-[var(--color-primary)] border-gray-300"
                  defaultChecked
                />
              </div>
              <div>
                <span className="block font-semibold md:font-medium text-neutral-800 text-sm md:text-base group-hover:text-[var(--color-primary)] transition-colors">
                  Standard (Free)
                </span>
                <span className="text-xs md:text-sm text-neutral-500">
                  Basic Listing
                </span>
              </div>
            </label>
            <label className="flex items-start gap-3 md:gap-4 p-3.5 md:p-4 border-2 rounded-xl cursor-pointer hover:border-[var(--color-primary)] active:border-[var(--color-primary)] transition-all bg-white group hover:shadow-lg touch-manipulation">
              <div className="mt-0.5">
                <input
                  type="radio"
                  name="plan"
                  className="w-5 h-5 md:w-4 md:h-4 accent-[var(--color-primary)] border-gray-300"
                />
              </div>
              <div>
                <span className="block font-semibold md:font-medium text-neutral-800 text-sm md:text-base group-hover:text-[var(--color-primary)] transition-colors">
                  Premium (Paid)
                </span>
                <span className="text-xs md:text-sm text-neutral-500">
                  Enhanced Patient Visibility & Analytics.
                </span>
              </div>
            </label>
          </div>
          <div className="mt-auto pt-6 md:pt-4">
            <button
              onClick={onNext}
              className="w-full bg-[var(--color-primary)] text-white py-3.5 md:py-3 px-6 text-sm md:text-base font-semibold md:font-medium rounded-xl hover:bg-[var(--color-warm-200)] active:scale-[0.98] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 touch-manipulation"
            >
              Complete Registration <Icon name="chevron-right" size={18} />
            </button>
          </div>
        </div>
      );

    default:
      return null;
  }
};
