"use client";

import { useState, useEffect } from "react";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";
import { FileUpload } from "./FileUpload";
import { Icon } from "./Icon";
import { useRouter } from "next/navigation";

enum UserType {
  Medical = "Medical Professional",
  Institution = "Institution/ Organisation",
  Researcher = "Researcher",
}

enum FlowStep {
  Identity = 1,
  Authentication = 2,
  Profile = 3,
  Welcome = 4,
}

const INSTITUTIONS = [
  "Indian Institute of Technology, Delhi",
  "All India Institute of Medical Sciences",
  "Indian Institute of Science",
  "Delhi University",
];

interface FlowRendererProps {
  userType: string;
  step: number;
  onNext: () => void;
  otpSent: boolean;
  setOtpSent: (value: boolean) => void;
  timer: number;
  onChange?: (field: string, value: string | File) => void;
  researcherForm: any,
  medicalForm: any,
  institutionForm: any
}

export const FlowRenderer = ({
  userType,
  step,
  onNext,
  otpSent,
  setOtpSent,
  timer,
  onChange,
  researcherForm,
  medicalForm,
  institutionForm
}: FlowRendererProps) => {
  const router = useRouter();

  // RESEARCHER FLOW
  if (userType === UserType.Researcher) {
    switch (step) {
      case FlowStep.Identity:
        return (
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-5 pb-2">
              <FormInput
                label="Full Name"
                name="fullName"
                placeholder="e.g. Dr. Aditi Sharma"
                value={researcherForm.name} onChange={(value) => onChange?.("name", value)}
              />

              <FormSelect
                label="Select Institution"
                options={INSTITUTIONS}
                onChange={(value) => onChange?.("institution", value)}
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
                value={researcherForm.instituteEmail} placeholder="name@institute.edu.in"
                onChange={(value) => onChange?.("instituteEmail", value)}
              />
              <FormInput
                label="ORCID ID"
                placeholder="e.g. 0000-0002-1825-0097"
                value={researcherForm.orcidId}
                onChange={(value) => onChange?.("orcidId", value)}
              />
              <FileUpload
                label="Institutional ID Card"
                subLabel="Upload a clear scan of your ID card."

                onChange={(value) => onChange?.("institutionalIdCardUrl", value as File)}
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
              <FormSelect
                label="Primary Research Domain"
                options={[
                  "Life Sciences",
                  "Physical Sciences",
                  "Engineering",
                  "Humanities",
                  "Social Sciences",
                ]}
                onChange={(value) => onChange?.("primaryDomain", value)}
              />
              <FormInput
                value={researcherForm.googleScholarUrl}

                label="Google Scholar Profile URL"
                placeholder="https://scholar.google.com/citations?user=..."
                onChange={(value) => onChange?.("googleScholarUrl", value)}
              />
              <FileUpload
                label="Profile Photography"
                subLabel="Upload a professional headshot."
                onChange={(value) => onChange?.("profilePhotoUrl", value as File)}
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
                onChange={(value) => onChange?.("heardFrom", value)}
              />
            </div>
            <div className="mt-auto pt-6">
              <button
                onClick={onNext}
                className="w-full bg-[var(--color-primary)] text-white py-3.5 px-6 text-sm rounded-xl font-medium hover:bg-[var(--color-warm-200)] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                Go to Dashboard <Icon name="chevron-right" size={20} />
              </button>
            </div>
          </div>
        );
    }
  }

  // MEDICAL PROFESSIONAL FLOW
  if (userType === UserType.Medical) {
    switch (step) {
      case FlowStep.Identity:
        return (
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-5 pb-2">
              <FormInput label="Name" placeholder="e.g. Dr. Rajesh Kumar"
                value={medicalForm.name} onChange={(value) => onChange?.("name", value)} />
              <FormSelect
                label="Medical Council Registration Number"
                options={["MCI-12345", "MCI-67890", "Select Manually..."]}
                onChange={(value) => onChange?.("medCouncilRegNo", value)} />
              <FormSelect
                label="State Council"
                options={[
                  "Delhi Medical Council",
                  "Maharashtra Medical Council",
                  "Karnataka Medical Council",
                ]}
                onChange={(value) => onChange?.("stateCouncil", value)}
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
            <div className="space-y-5 pb-2">
              <FormSelect
                label="Primary Hospital/Clinic"
                options={[
                  "Apollo Hospitals",
                  "Max Healthcare",
                  "Fortis Healthcare",
                  "Private Practice",
                ]}
                onChange={(value) => onChange?.("primaryHospital", value)}

              />
              <FormSelect
                label="Specialty"
                options={[
                  "Cardiology",
                  "Neurology",
                  "Orthopedics",
                  "Pediatrics",
                  "General Medicine",
                ]}
                onChange={(value) => onChange?.("specialty", value)}

              />
              <FormSelect
                label="Research Focus:"
                options={[
                  "Clinical Trials",
                  "Public Health",
                  "Epidemiology",
                  "Genetics",
                ]}
                onChange={(value) => onChange?.("researchFocus", value)}

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
                onChange={(value) => onChange?.("medicalDegreeUrl", value)}
              />
              <FileUpload
                label="Reg. Certificate"
                subLabel="Upload your Medical Council Registration certificate."
                onChange={(value) => onChange?.("regCertificateUrl", value)}

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
    }
  }

  // INSTITUTION FLOW
  if (userType === UserType.Institution) {
    switch (step) {
      case FlowStep.Identity:
        return (
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-5 pb-2">
              <FormInput
                label="Official Domain Name"
                placeholder="namen"
                value={institutionForm.name} onChange={(value) => onChange?.("name", value)}
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
        if (!otpSent) {
          return (
            <div className="flex flex-col h-full justify-between">
              <div className="space-y-5 pb-2">
                <FormInput
                  label="Administrator Full Name"
                  placeholder="e.g. Registrar Name"
                  value={institutionForm.name1}
                  onChange={(value) => onChange?.("name1", value)}

                />
                <FormInput
                  label="Official Email Address"
                  placeholder="registrar@university.ac.in"
                  type="email"
                  value={institutionForm.email}
                  onChange={(value) => onChange?.("email", value)}

                />
                <FormInput
                  label="Registered Mobile Number"
                  placeholder="+91 98765 43210"
                  type="tel"
                  value={institutionForm.number}
                  onChange={(value) => onChange?.("number", value)}

                />
              </div>
              <div className="mt-auto pt-6 md:pt-4">
                <button
                  onClick={() => setOtpSent(true)}
                  className="w-full bg-[var(--color-primary)] text-white py-3.5 md:py-3 px-6 text-sm md:text-base font-semibold md:font-medium rounded-xl hover:bg-[var(--color-warm-200)] active:scale-[0.98] transition-all shadow-md hover:shadow-lg touch-manipulation"
                >
                  Send Verification OTP
                </button>
              </div>
            </div>
          );
        } else {
          return (
            <div className="flex flex-col h-full text-center">
              <div className="flex-1 flex flex-col py-6">
                <h5 className="mb-3 text-neutral-800 text-base md:text-lg font-semibold md:font-medium">
                  Enter Verification Code
                </h5>
                <p className="text-xs md:text-sm mb-8 md:mb-7 pt-2 text-neutral-500 px-4">
                  We sent a 4-digit code to your registered mobile number.
                </p>
                <div className="flex justify-center pt-3 gap-2.5 md:gap-3 mb-8 md:mb-7">
                  {[1, 2, 3, 4].map((i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      inputMode="numeric"
                      className="w-20 h-20 md:w-20 md:h-20 border-2 border-neutral-300 rounded-xl text-center text-2xl md:text-2xl font-semibold text-[var(--color-primary)] focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 outline-none transition-all shadow-none touch-manipulation"
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center text-xs mb-8 px-3 bg-neutral-50 py-2.5 rounded-xl border border-neutral-100">
                  <span
                    className={
                      timer > 0 ? "text-neutral-600" : "text-neutral-400"
                    }
                  >
                    Expires in:{" "}
                    <span className="font-mono font-medium">
                      00:{timer.toString().padStart(2, "0")}
                    </span>
                  </span>
                  <button
                    className="text-[var(--color-primary)] font-medium hover:underline disabled:opacity-50 text-xs"
                    disabled={timer > 0}
                  >
                    Resend Code
                  </button>
                </div>
              </div>
              <div className="mt-auto pt-6 md:pt-4 flex flex-col gap-3 md:gap-2.5">
                <button
                  onClick={onNext}
                  className="w-full bg-[var(--color-primary)] text-white py-3.5 md:py-3 px-6 text-sm md:text-base font-semibold md:font-medium rounded-xl hover:bg-[var(--color-warm-200)] active:scale-[0.98] transition-all shadow-md hover:shadow-lg touch-manipulation"
                >
                  Verify & Proceed
                </button>
                <button
                  onClick={() => setOtpSent(false)}
                  className="w-full border-2 border-neutral-200 py-3 md:py-2.5 px-6 text-sm md:text-base font-semibold md:font-medium rounded-xl text-neutral-600 hover:bg-neutral-50 hover:text-neutral-700 active:scale-[0.98] transition-all touch-manipulation"
                >
                  Change Contact Details
                </button>
              </div>
            </div>
          );
        }
      case FlowStep.Profile:
        return (
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-5 pb-2">
              <FileUpload
                label="Letter of Authorization"
                subLabel="Signed by the Head of Institution"
                onChange={(value) => onChange?.("letterOfAuthorizationUrl", value)}
              />
              <FileUpload label="NAAC/ NIRF Accreditation Proof"
                onChange={(value) => onChange?.("accreditationProofUrl", value)}
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
                Go to Dashboard <Icon name="chevron-right" size={20} />
              </button>
            </div>
          </div>
        );
    }
  }

  return <div>Flow not implemented for this user type.</div>;
};
