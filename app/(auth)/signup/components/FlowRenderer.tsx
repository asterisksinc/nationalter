"use client";

import { useState, useEffect } from "react";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";
import { FileUpload } from "./FileUpload";
import { Icon } from "./Icon";

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
}

export const FlowRenderer = ({
  userType,
  step,
  onNext,
  otpSent,
  setOtpSent,
  timer,
}: FlowRendererProps) => {
  // RESEARCHER FLOW
  if (userType === UserType.Researcher) {
    switch (step) {
      case FlowStep.Identity:
        return (
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-4 pb-2">
              <FormInput
                label="Full Name"
                placeholder="e.g. Dr. Aditi Sharma"
              />
              <FormSelect label="Select Institution" options={INSTITUTIONS} />
            </div>
            <div className="mt-auto pt-4">
              <button
                onClick={onNext}
                className="w-full bg-[var(--color-primary)] text-white py-3 px-6 text-sm rounded-xl font-medium hover:bg-[var(--color-warm-200)] transition-all shadow-md hover:shadow-lg"
              >
                Continue to Next Step
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
                placeholder="name@institute.edu.in"
                type="email"
              />
              <FormInput
                label="ORCID iD"
                placeholder="e.g. 0000-0002-1825-0097"
              />
              <FileUpload
                label="Institutional ID Card"
                subLabel="Upload a clear scan of your ID card."
              />
            </div>
            <div className="mt-auto pt-4">
              <button
                onClick={onNext}
                className="w-full bg-[var(--color-primary)] text-white py-3 px-6 text-sm rounded-xl font-medium hover:bg-[var(--color-warm-200)] transition-all shadow-md hover:shadow-lg"
              >
                Verify Identity
              </button>
            </div>
          </div>
        );
      case FlowStep.Profile:
        return (
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-3 pb-2">
              <FormSelect
                label="Primary Research Domain"
                options={[
                  "Life Sciences",
                  "Physical Sciences",
                  "Engineering",
                  "Humanities",
                  "Social Sciences",
                ]}
              />
              <FormInput
                label="Google Scholar Profile URL"
                placeholder="https://scholar.google.com/citations?user=..."
              />
              <FileUpload
                label="Profile Photography"
                subLabel="Upload a professional headshot."
              />
            </div>
            <div className="mt-auto pt-4">
              <button
                onClick={onNext}
                className="w-full bg-[var(--color-primary)] text-white py-3 px-6 text-sm rounded-xl font-medium hover:bg-[var(--color-warm-200)] transition-all shadow-md hover:shadow-lg"
              >
                Complete Profile
              </button>
            </div>
          </div>
        );
      case FlowStep.Welcome:
        return (
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-4 pb-2">
              <div className="mb-2">
                <label className="block text-xs font-medium text-neutral-700 mb-1.5 font-sans tracking-wide">
                  Impact Card Preview
                </label>
                <div className="bg-neutral-50 border border-dashed border-neutral-300 rounded-xl p-4 text-center flex flex-col items-center justify-center">
                  <div className="bg-white p-2 rounded-full mb-2 text-neutral-500 shadow-sm">
                    <Icon name="upload" size={16} />
                  </div>
                  <p className="text-xs font-medium mb-1 text-neutral-700">
                    Click or Drag File to This Area to Upload
                  </p>
                  <p className="text-[10px] text-neutral-400 mb-2">
                    Support for a single or bulk upload. Allowed: PDF, JPG, PNG.
                  </p>
                  <button className="px-3 py-1.5 bg-white border border-neutral-300 rounded-lg text-xs text-neutral-700 font-medium">
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
              />
              <FormSelect
                label="How did you hear about us?"
                options={[
                  "Social Media",
                  "Colleague",
                  "University Portal",
                  "Search Engine",
                ]}
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
            <div className="space-y-4 pb-2">
              <FormInput label="Name" placeholder="e.g. Dr. Rajesh Kumar" />
              <FormSelect
                label="Medical Council Registration Number"
                options={["MCI-12345", "MCI-67890", "Select Manually..."]}
              />
              <FormSelect
                label="State Council"
                options={[
                  "Delhi Medical Council",
                  "Maharashtra Medical Council",
                  "Karnataka Medical Council",
                ]}
              />
            </div>
            <div className="mt-auto pt-4">
              <button
                onClick={onNext}
                className="w-full bg-[var(--color-primary)] text-white py-3 px-6 text-sm rounded-xl font-medium hover:bg-[var(--color-warm-200)] transition-all shadow-md hover:shadow-lg"
              >
                Next
              </button>
            </div>
          </div>
        );
      case FlowStep.Authentication:
        return (
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-4 pb-2">
              <FormSelect
                label="Primary Hospital/Clinic"
                options={[
                  "Apollo Hospitals",
                  "Max Healthcare",
                  "Fortis Healthcare",
                  "Private Practice",
                ]}
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
              />
              <FormSelect
                label="Research Focus:"
                options={[
                  "Clinical Trials",
                  "Public Health",
                  "Epidemiology",
                  "Genetics",
                ]}
              />
            </div>
            <div className="mt-auto pt-4">
              <button
                onClick={onNext}
                className="w-full bg-[var(--color-primary)] text-white py-3 px-6 text-sm rounded-xl font-medium hover:bg-[var(--color-warm-200)] transition-all shadow-md hover:shadow-lg"
              >
                Next
              </button>
            </div>
          </div>
        );
      case FlowStep.Profile:
        return (
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-3 pb-2">
              <FileUpload
                label="Medical Degree"
                subLabel="Upload your MBBS/MD/MS degree certificate."
              />
              <FileUpload
                label="Reg. Certificate"
                subLabel="Upload your Medical Council Registration certificate."
              />
            </div>
            <div className="mt-auto pt-4">
              <button
                onClick={onNext}
                className="w-full bg-[var(--color-primary)] text-white py-3 px-6 text-sm rounded-xl font-medium hover:bg-[var(--color-warm-200)] transition-all shadow-md hover:shadow-lg"
              >
                Next
              </button>
            </div>
          </div>
        );
      case FlowStep.Welcome:
        return (
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-4 pb-2">
              <label className="flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer hover:border-[var(--color-primary)] transition-all bg-white group hover:shadow-lg">
                <div className="mt-0.5">
                  <input
                    type="radio"
                    name="plan"
                    className="w-4 h-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)] border-gray-300"
                    defaultChecked
                  />
                </div>
                <div>
                  <span className="block font-medium text-neutral-800 text-sm group-hover:text-[var(--color-primary)] transition-colors">
                    Standard (Free)
                  </span>
                  <span className="text-xs text-neutral-500">
                    Basic Listing
                  </span>
                </div>
              </label>
              <label className="flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer hover:border-[var(--color-primary)] transition-all bg-white group hover:shadow-lg">
                <div className="mt-0.5">
                  <input
                    type="radio"
                    name="plan"
                    className="w-4 h-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)] border-gray-300"
                  />
                </div>
                <div>
                  <span className="block font-medium text-neutral-800 text-sm group-hover:text-[var(--color-primary)] transition-colors">
                    Premium (Paid)
                  </span>
                  <span className="text-xs text-neutral-500">
                    Enhanced Patient Visibility & Analytics.
                  </span>
                </div>
              </label>
            </div>
            <div className="mt-auto pt-4">
              <button
                onClick={onNext}
                className="w-full bg-[var(--color-primary)] text-white py-3 px-6 text-sm rounded-xl font-medium hover:bg-[var(--color-warm-200)] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
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
            <div className="space-y-4 pb-2">
              <FormInput
                label="Official Domain Name"
                placeholder="www.university.ac.in"
              />
              <p className="text-[10px] text-neutral-500 -mt-2 ml-1">
                We will verify the domain DNS records automatically.
              </p>
            </div>
            <div className="mt-auto pt-4">
              <button
                onClick={onNext}
                className="w-full bg-[var(--color-primary)] text-white py-3 px-6 text-sm rounded-xl font-medium hover:bg-[var(--color-warm-200)] transition-all shadow-md hover:shadow-lg"
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
              <div className="space-y-4 pb-2">
                <FormInput
                  label="Administrator Full Name"
                  placeholder="e.g. Registrar Name"
                />
                <FormInput
                  label="Official Email Address"
                  placeholder="registrar@university.ac.in"
                  type="email"
                />
                <FormInput
                  label="Registered Mobile Number"
                  placeholder="+91 98765 43210"
                  type="tel"
                />
              </div>
              <div className="mt-auto pt-4">
                <button
                  onClick={() => setOtpSent(true)}
                  className="w-full bg-[var(--color-primary)] text-white py-3 px-6 text-sm rounded-xl font-medium hover:bg-[var(--color-warm-200)] transition-all shadow-md hover:shadow-lg"
                >
                  Send Verification OTP
                </button>
              </div>
            </div>
          );
        } else {
          return (
            <div className="flex flex-col h-full text-center">
              <div className="flex-1 flex flex-col justify-center py-3">
                <h5 className="mb-2 text-neutral-800 text-base font-medium">
                  Enter Verification Code
                </h5>
                <p className="text-xs mb-5 text-neutral-500">
                  We sent a 4-digit code to your registered mobile number.
                </p>
                <div className="flex justify-center gap-3 mb-5">
                  {[1, 2, 3, 4].map((i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      className="w-9 h-9 border-2 border-neutral-300 rounded-xl text-center text-base font-medium text-[var(--color-primary)] focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 outline-none transition-all shadow-sm"
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center text-xs mb-6 px-3 bg-neutral-50 py-2.5 rounded-xl border border-neutral-100">
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
              <div className="mt-auto pt-4 flex flex-col gap-2.5">
                <button
                  onClick={onNext}
                  className="w-full bg-[var(--color-primary)] text-white py-3 px-6 text-sm rounded-xl font-medium hover:bg-[var(--color-warm-200)] transition-all shadow-md hover:shadow-lg"
                >
                  Verify & Proceed
                </button>
                <button
                  onClick={() => setOtpSent(false)}
                  className="w-full border-2 border-neutral-200 py-2.5 px-6 text-sm rounded-xl font-medium text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 transition-all"
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
            <div className="space-y-3 pb-2">
              <FileUpload
                label="Letter of Authorization"
                subLabel="Signed by the Head of Institution"
              />
              <FileUpload label="NAAC/ NIRF Accreditation Proof" />
            </div>
            <div className="mt-auto pt-6">
              <button
                onClick={onNext}
                className="w-full bg-[var(--color-primary)] text-white py-3.5 px-6 text-sm rounded-xl font-medium hover:bg-[var(--color-warm-200)] transition-all shadow-md hover:shadow-lg"
              >
                Submit for Review
              </button>
            </div>
          </div>
        );
      case FlowStep.Welcome:
        return (
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-4 pb-2">
              <FormSelect
                label="Add your key departments"
                options={[
                  "Computer Science",
                  "Mechanical Engineering",
                  "Physics",
                  "Biology",
                  "Business Administration",
                ]}
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

  return <div>Flow not implemented for this user type.</div>;
};
