"use client";

import { useState, useEffect, useCallback } from "react";
import { ResearcherFlow } from "./ResearcherFlow";
import { MedicalFlow } from "./MedicalFlow";
import { InstitutionFlow } from "./InstitutionFlow";

enum UserType {
  Medical = "Medical Professional",
  Institution = "Institution/ Organisation",
  Researcher = "Researcher",
}

interface FlowRendererProps {
  userType: string;
  step: number;
  onNext: () => void;
  onChange?: (field: string, value: string | File) => void;
  researcherForm: Record<string, string>;
  medicalForm: Record<string, string>;
  institutionForm: Record<string, string>;
  validationErrors?: Record<string, string>;
}

export const FlowRenderer = ({
  userType,
  step,
  onNext,
  onChange,
  researcherForm,
  medicalForm,
  institutionForm,
  validationErrors = {},
}: FlowRendererProps) => {
  // Options state
  const [institutions, setInstitutions] = useState<string[]>([]);
  const [hospitals, setHospitals] = useState<string[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [councils, setCouncils] = useState<string[]>([]);
  const [domains, setDomains] = useState<string[]>([]);
  const [researchFocus, setResearchFocus] = useState<string[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(false);

  // Email check state
  const [emailError, setEmailError] = useState<string | null>(null);
  const [checkingEmail, setCheckingEmail] = useState(false);

  // Helper to get field error
  const getFieldError = (field: string): string | undefined => {
    if (field === "email" && emailError) return emailError;
    if (field === "instituteEmail" && emailError) return emailError;
    return validationErrors[field];
  };

  // Fetch options on mount
  useEffect(() => {
    const fetchOptions = async (
      type: string,
      setter: (data: string[]) => void,
    ) => {
      try {
        const res = await fetch(`/api/registration/options?type=${type}`);
        const data = await res.json();
        if (data.success) {
          setter(data.data);
        }
      } catch (error) {
        console.error(`Failed to fetch ${type}:`, error);
      }
    };

    setLoadingOptions(true);
    Promise.all([
      fetchOptions("institutions", setInstitutions),
      fetchOptions("hospitals", setHospitals),
      fetchOptions("specialties", setSpecialties),
      fetchOptions("councils", setCouncils),
      fetchOptions("domains", setDomains),
      fetchOptions("researchFocus", setResearchFocus),
    ]).finally(() => setLoadingOptions(false));
  }, []);

  // Email check function
  const checkEmail = useCallback(async (email: string) => {
    if (!email || !email.includes("@")) {
      setEmailError(null);
      return;
    }

    setCheckingEmail(true);
    try {
      const res = await fetch("/api/registration/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.exists) {
        setEmailError(data.message);
      } else {
        setEmailError(null);
      }
    } catch (error) {
      console.error("Email check failed:", error);
    } finally {
      setCheckingEmail(false);
    }
  }, []);

  // Debounced email check
  useEffect(() => {
    const email =
      userType === UserType.Researcher
        ? researcherForm.instituteEmail
        : medicalForm.email;

    const timeout = setTimeout(() => {
      if (email) checkEmail(email);
    }, 500);

    return () => clearTimeout(timeout);
  }, [researcherForm.instituteEmail, medicalForm.email, userType, checkEmail]);

  // Render appropriate flow based on user type
  if (userType === UserType.Researcher) {
    return (
      <ResearcherFlow
        step={step}
        onNext={onNext}
        onChange={onChange}
        researcherForm={researcherForm}
        getFieldError={getFieldError}
        checkingEmail={checkingEmail}
        institutions={institutions}
        domains={domains}
        loadingOptions={loadingOptions}
      />
    );
  }

  if (userType === UserType.Medical) {
    return (
      <MedicalFlow
        step={step}
        onNext={onNext}
        onChange={onChange}
        medicalForm={medicalForm}
        getFieldError={getFieldError}
        checkingEmail={checkingEmail}
        emailError={emailError}
        councils={councils}
        hospitals={hospitals}
        specialties={specialties}
        researchFocus={researchFocus}
        loadingOptions={loadingOptions}
      />
    );
  }

  if (userType === UserType.Institution) {
    return (
      <InstitutionFlow
        step={step}
        onNext={onNext}
        onChange={onChange}
        institutionForm={institutionForm}
        getFieldError={getFieldError}
      />
    );
  }

  return <div>Flow not implemented for this user type.</div>;
};
