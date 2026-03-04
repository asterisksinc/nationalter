"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SignupNavbar } from "./components/SignupNavbar";
import { SignupSidebar } from "./components/SignupSidebar";
import { UserTypeCard } from "./components/UserTypeCard";
import { FlowRenderer } from "./components/FlowRenderer";
import { Icon } from "./components/Icon";
import { useRouter, useSearchParams } from "next/navigation";
import { pickStoredUploadValue, uploadFileToS3 } from "@/lib/uploads/client";

// Types
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
  Dashboard = 5,
}

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string>("");

  const [userType, setUserType] = useState<UserType | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(60);
  const [researcherForm, setResearcherForm] = useState({
    name: "",
    institution: "",
    instituteEmail: "",
    orcidId: "",
    mobile: "",
    institutionalIdCardUrl: "",
    primaryDomain: "",
    googleScholarUrl: "",
    profilePhotoUrl: "",
    city: "",
    state: "",
    email: "",
  });
  const buildResearcherPayload = () => {
    const payload = {
      name: researcherForm.name,
      institute: researcherForm.institution,
      instituteEmail: researcherForm.instituteEmail.trim(),
      orcidId: normalizeOrcid(researcherForm.orcidId),
      institutionalIdCardUrl: researcherForm.institutionalIdCardUrl,
      primaryDomain: researcherForm.primaryDomain,
      googleScholarUrl: researcherForm.googleScholarUrl,
      profilePhotoUrl: researcherForm.profilePhotoUrl,
      city: researcherForm.city,
      state: researcherForm.state,
      type: "RESEARCHER",
      email: researcherForm.instituteEmail.trim(),
      mobile: normalizeMobileDigits(researcherForm.mobile),
    };

    return payload;
  };
  const [medicalForm, setMedicalForm] = useState({
    name: "",
    email: "",
    mobile: "",
    medCouncilRegNo: "",
    stateCouncil: "",
    primaryHospital: "",
    specialty: "",
    researchFocus: "",
    medicalDegreeUrl: "",
    regCertificateUrl: "",
    city: "",
    state: "",
  });
  const buildMedicalPayload = () => {
    return {
      type: "MEDICAL",
      name: medicalForm.name,
      email: medicalForm.email,
      mobile: normalizeMobileDigits(medicalForm.mobile),
      medCouncilRegNo: medicalForm.medCouncilRegNo,
      stateCouncil: medicalForm.stateCouncil,
      primaryHospital: medicalForm.primaryHospital,
      specialty: medicalForm.specialty,
      researchFocus: medicalForm.researchFocus,
      medicalDegreeUrl: medicalForm.medicalDegreeUrl,
      regCertificateUrl: medicalForm.regCertificateUrl,
      city: medicalForm.city,
      state: medicalForm.state,
    };
  };
  const handleMedicalInputChange = (field: string, value: string | File) => {
    if (value instanceof File) {
      setMedicalForm((prev) => ({
        ...prev,
        [field]: "",
      }));
      void uploadAndSetField(setMedicalForm, field, value, "registration/medical");
      return;
    }

    setMedicalForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const [institutionForm, setInstitutionForm] = useState({
    name: "",
    domain: "",
    email: "",
    number: "",
    name1: "",
    city: "",
    state: "",
    letterOfAuthorizationUrl: "",
    accreditationProofUrl: "",
  });
  const buildInstitutionPayload = () => {
    return {
      name: institutionForm.name,
      domain: institutionForm.domain,
      email: institutionForm.email,
      number: normalizeMobileDigits(institutionForm.number),
      letterOfAuthorizationUrl: institutionForm.letterOfAuthorizationUrl,
      accreditationProofUrl: institutionForm.accreditationProofUrl,
      city: institutionForm.city,
      state: institutionForm.state,
    };
  };
  const handleInstitutionInputChange = (
    field: string,
    value: string | File,
  ) => {
    if (value instanceof File) {
      // Keep field empty until upload finishes (prevents submitting just the filename)
      setInstitutionForm((prev) => ({
        ...prev,
        [field]: "",
      }));
      void uploadAndSetField(setInstitutionForm, field, value, "registration/org");
      return;
    }

    setInstitutionForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const router = useRouter();
  const searchParams = useSearchParams();

  const [uploadingFields, setUploadingFields] = useState<Record<string, boolean>>({});

  const hasUploadsInProgress = Object.values(uploadingFields).some(Boolean);

  const setUploading = (field: string, uploading: boolean) => {
    setUploadingFields((prev) => ({ ...prev, [field]: uploading }));
  };

  const uploadAndSetField = async <T extends Record<string, unknown>>(
    setter: React.Dispatch<React.SetStateAction<T>>,
    field: string,
    file: File,
    folder: string,
  ) => {
    setUploading(field, true);
    setValidationErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });

    try {
      const uploaded = await uploadFileToS3(file, folder);
      const stored = pickStoredUploadValue(uploaded);
      setter((prev) => ({
        ...prev,
        [field]: stored,
      }) as T);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setValidationErrors((prev) => ({
        ...prev,
        [field]: message,
      }));
    } finally {
      setUploading(field, false);
    }
  };

  const handleInputChange = (field: string, value: string | File) => {
    if (value instanceof File) {
      setResearcherForm((prev) => ({
        ...prev,
        [field]: "",
      }));
      void uploadAndSetField(
        setResearcherForm,
        field,
        value,
        "registration/researcher",
      );
      return;
    }

    setResearcherForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Prefill from Google OAuth signup (or any link with ?email=&name=)
  useEffect(() => {
    const prefillEmail = searchParams.get("email");
    const prefillName = searchParams.get("name");

    if (prefillEmail) {
      const email = prefillEmail.trim();
      if (email) {
        setResearcherForm((p) => ({ ...p, instituteEmail: email, email }));
        setMedicalForm((p) => ({ ...p, email }));
        setInstitutionForm((p) => ({ ...p, email }));
      }
    }

    if (prefillName) {
      const name = prefillName.trim();
      if (name) {
        setResearcherForm((p) => ({ ...p, name }));
        setMedicalForm((p) => ({ ...p, name }));
        setInstitutionForm((p) => ({ ...p, name1: name }));
      }
    }
  }, [searchParams]);

  // Validation state
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const normalizeOrcid = (input: string): string => {
    const trimmed = input.trim();
    if (!trimmed) return "";
    const withoutUrl = trimmed.replace(/^https?:\/\/orcid\.org\//i, "");
    return withoutUrl.replace(/\s+/g, "");
  };

  // ORCID ISO 7064 (MOD 11-2) check
  const isValidOrcid = (input: string): boolean => {
    const orcid = normalizeOrcid(input);
    if (!/^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/i.test(orcid)) return false;

    const digits = orcid.replace(/-/g, "").toUpperCase();
    let total = 0;
    for (let i = 0; i < 15; i++) {
      total = (total + Number(digits[i])) * 2;
    }
    const remainder = total % 11;
    const result = (12 - remainder) % 11;
    const checkDigit = result === 10 ? "X" : String(result);
    return digits[15] === checkDigit;
  };

  const normalizeMobileDigits = (input: string): string => {
    return input.replace(/\D/g, "");
  };

  const validateMobile = (input: string): boolean => {
    const digits = normalizeMobileDigits(input);
    // Keep flexible but reject obviously invalid numbers
    return digits.length >= 10 && digits.length <= 15;
  };

  const validateDomain = (domain: string): boolean => {
    const value = domain.trim();
    if (!value) return false;
    // Basic domain pattern, avoids protocol/paths
    return /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i.test(
      value,
    );
  };

  const validateRequired = (value: string): boolean => {
    return value.trim().length > 0;
  };

  const validateResearcherStep = (
    step: number,
  ): { valid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!validateRequired(researcherForm.name)) {
        errors.name = "Full name is required";
      }
      if (!validateRequired(researcherForm.institution)) {
        errors.institution = "Institution is required";
      }
    } else if (step === 2) {
      if (!validateRequired(researcherForm.instituteEmail)) {
        errors.instituteEmail = "Institutional email is required";
      } else if (!validateEmail(researcherForm.instituteEmail)) {
        errors.instituteEmail = "Please enter a valid email";
      }
      if (!validateRequired(researcherForm.mobile)) {
        errors.mobile = "Mobile number is required";
      } else if (!validateMobile(researcherForm.mobile)) {
        errors.mobile = "Enter a valid mobile number";
      }
      if (!validateRequired(researcherForm.city)) {
        errors.city = "City is required";
      }
      if (!validateRequired(researcherForm.state)) {
        errors.state = "State is required";
      }
      if (!validateRequired(researcherForm.orcidId)) {
        errors.orcidId = "ORCID ID is required";
      } else if (!isValidOrcid(researcherForm.orcidId)) {
        errors.orcidId = "Enter a valid ORCID (e.g. 0000-0002-1825-0097)";
      }
    } else if (step === 3) {
      if (!validateRequired(researcherForm.primaryDomain)) {
        errors.primaryDomain = "Primary domain is required";
      }
      if (!validateRequired(researcherForm.googleScholarUrl)) {
        errors.googleScholarUrl = "Google Scholar URL is required";
      }
      if (!validateRequired(researcherForm.profilePhotoUrl)) {
        errors.profilePhotoUrl = "Profile photo is required";
      }
    }

    return { valid: Object.keys(errors).length === 0, errors };
  };

  const validateMedicalStep = (
    step: number,
  ): { valid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!validateRequired(medicalForm.name)) {
        errors.name = "Name is required";
      }
      if (!validateRequired(medicalForm.medCouncilRegNo)) {
        errors.medCouncilRegNo =
          "Medical council registration number is required";
      }
      if (!validateRequired(medicalForm.stateCouncil)) {
        errors.stateCouncil = "State council is required";
      }
      if (!validateRequired(medicalForm.email)) {
        errors.email = "Email is required";
      } else if (!validateEmail(medicalForm.email)) {
        errors.email = "Please enter a valid email";
      }
      if (!validateRequired(medicalForm.mobile)) {
        errors.mobile = "Mobile number is required";
      } else if (!validateMobile(medicalForm.mobile)) {
        errors.mobile = "Enter a valid mobile number";
      }
      if (!validateRequired(medicalForm.city)) {
        errors.city = "City is required";
      }
      if (!validateRequired(medicalForm.state)) {
        errors.state = "State is required";
      }
    } else if (step === 2) {
      if (!validateRequired(medicalForm.primaryHospital)) {
        errors.primaryHospital = "Primary hospital is required";
      }
      if (!validateRequired(medicalForm.specialty)) {
        errors.specialty = "Specialty is required";
      }
      if (!validateRequired(medicalForm.researchFocus)) {
        errors.researchFocus = "Research focus is required";
      }
    }

    return { valid: Object.keys(errors).length === 0, errors };
  };

  const validateInstitutionStep = (
    step: number,
  ): { valid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!validateRequired(institutionForm.name)) {
        errors.name = "Organization name is required";
      }
      if (!validateRequired(institutionForm.domain)) {
        errors.domain = "Official domain is required";
      } else if (!validateDomain(institutionForm.domain)) {
        errors.domain = "Enter a valid domain (e.g. university.edu.in)";
      }
    } else if (step === 2) {
      if (!validateRequired(institutionForm.name1)) {
        errors.name1 = "Administrator name is required";
      }
      if (!validateRequired(institutionForm.email)) {
        errors.email = "Email is required";
      } else if (!validateEmail(institutionForm.email)) {
        errors.email = "Please enter a valid email";
      }
      if (!validateRequired(institutionForm.number)) {
        errors.number = "Mobile number is required";
      } else if (!validateMobile(institutionForm.number)) {
        errors.number = "Enter a valid mobile number";
      }
      if (!validateRequired(institutionForm.city)) {
        errors.city = "City is required";
      }
      if (!validateRequired(institutionForm.state)) {
        errors.state = "State is required";
      }
    } else if (step === 3) {
      if (!validateRequired(institutionForm.letterOfAuthorizationUrl)) {
        errors.letterOfAuthorizationUrl = "Letter of authorization is required";
      }
      if (!validateRequired(institutionForm.accreditationProofUrl)) {
        errors.accreditationProofUrl = "Accreditation proof is required";
      }
    }

    return { valid: Object.keys(errors).length === 0, errors };
  };

  const validateCurrentStep = (): boolean => {
    let result = { valid: true, errors: {} as Record<string, string> };

    if (userType === UserType.Researcher) {
      result = validateResearcherStep(currentStep);
    } else if (userType === UserType.Medical) {
      result = validateMedicalStep(currentStep);
    } else if (userType === UserType.Institution) {
      result = validateInstitutionStep(currentStep);
    }

    setValidationErrors(result.errors);
    return result.valid;
  };

  // Timer effect for OTP
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer((p) => p - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  // Reset OTP state when step changes
  useEffect(() => {
    setOtpSent(false);
    setTimer(60);
    setValidationErrors({});
    setApiError(""); // Clear API errors when navigating between steps
  }, [currentStep]);

  const handleNextStep = () => {
    if (currentStep === 0) {
      if (userType) setCurrentStep(1);
      return;
    }

    if (hasUploadsInProgress) {
      setApiError("Please wait for file uploads to finish.");
      return;
    }

    // Validate current step before proceeding
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep < FlowStep.Dashboard) {
      // If going to Dashboard, call API
      if (currentStep === FlowStep.Welcome) {
        submitRegistration();
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handleSendInstitutionOtp = () => {
    // Validate step 2 (Authentication) fields before showing OTP UI
    if (!validateCurrentStep()) return;
    setOtpSent(true);
  };
  const submitRegistration = async () => {
    // Prevent double submission
    if (hasSubmitted || isSubmitting) {
      return;
    }

    if (hasUploadsInProgress) {
      setApiError("Please wait for file uploads to finish.");
      return;
    }

    let payload: any;
    let apiUrl = "";

    switch (userType) {
      case UserType.Researcher:
        payload = buildResearcherPayload();
        apiUrl = "/api/registration/scholars";
        break;

      case UserType.Medical:
        payload = buildMedicalPayload();
        apiUrl = "/api/registration/scholars";
        break;

      case UserType.Institution:
        payload = buildInstitutionPayload();
        apiUrl = "/api/registration/orgs";
        break;

      default:
        setApiError("Invalid user type selected");
        return;
    }

    setIsSubmitting(true);
    setApiError(""); // Clear any previous errors

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = "Registration failed. Please try again.";
        let fieldErrors: Record<string, string> | undefined;

        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          }
          if (errorData.fieldErrors && typeof errorData.fieldErrors === "object") {
            fieldErrors = errorData.fieldErrors;
          }
        } catch (parseError) {
          // If response body is not JSON, use default error message
          console.error("Failed to parse error response:", parseError);
        }

        if (fieldErrors && Object.keys(fieldErrors).length > 0) {
          setValidationErrors(fieldErrors);

          const fieldStepMap: Record<string, number> =
            userType === UserType.Researcher
              ? {
                  name: 1,
                  institution: 1,
                  instituteEmail: 2,
                  mobile: 2,
                  city: 2,
                  state: 2,
                  orcidId: 2,
                  primaryDomain: 3,
                  googleScholarUrl: 3,
                  profilePhotoUrl: 3,
                }
              : userType === UserType.Medical
                ? {
                    name: 1,
                    medCouncilRegNo: 1,
                    stateCouncil: 1,
                    email: 1,
                    mobile: 1,
                    city: 1,
                    state: 1,
                    primaryHospital: 2,
                    specialty: 2,
                    researchFocus: 2,
                    medicalDegreeUrl: 3,
                    regCertificateUrl: 3,
                  }
                : {
                    name: 1,
                    domain: 1,
                    name1: 2,
                    email: 2,
                    number: 2,
                    city: 2,
                    state: 2,
                    letterOfAuthorizationUrl: 3,
                    accreditationProofUrl: 3,
                  };

          const firstBadStep = Math.min(
            ...Object.keys(fieldErrors)
              .map((k) => fieldStepMap[k])
              .filter((v): v is number => typeof v === "number"),
          );
          if (Number.isFinite(firstBadStep)) {
            setCurrentStep(firstBadStep);
          }
        }

        setApiError(errorMessage);
        setHasSubmitted(false); // Allow retry
        console.error("Registration failed:", errorMessage);
        return;
      }

      const data = await response.json();
      setHasSubmitted(true);

      // 🔐 cookie for middleware
      // document.cookie = `nationciteId=${data.data.nationciteId}; path=/; max-age=86400`;
      // document.cookie = `userType=${userType}; path=/; max-age=86400`; // 👈 add this

      // // 💾 local storage
      // localStorage.setItem(
      //   "userInfo",
      //   JSON.stringify({
      //     ticketId: data.data.ticketId,
      //     nationciteId: data.data.nationciteId,
      //     registrationId: data.data.registrationId,
      //     userType,

      //   })
      // );

      setCurrentStep(FlowStep.Dashboard);
    } catch (error) {
      console.error("Network error:", error);
      setApiError("Network error. Please check your connection and try again.");
      setHasSubmitted(false); // Allow retry
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDashboardRoute = (type: UserType | null) => {
    switch (type) {
      case UserType.Researcher:
        return "/dashboard/researchers";
      case UserType.Medical:
        return "/dashboard/medical";
      case UserType.Institution:
        return "/dashboard/institution";
      default:
        return "/";
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepClick = (step: number) => {
    // Only allow clicking on completed steps
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  const isSelectionStep = currentStep === 0;
  const isDashboardStep = currentStep === FlowStep.Dashboard;

  if (isSelectionStep) {
    return (
      <>
        {/* Main Layout - Fixed Height */}
        <div className="h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden">
          {/* Left Panel - Branding */}
          <div
            className="hidden md:flex md:w-[355px] h-full bg-orange-50 items-center justify-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #ffe9c5 0%, #ffffff 100%)",
            }}
          >
            <div className="mb-10">
              <div className="inline-flex items-center justify-center px-2 py-1 rounded-md bg-inherit">
                <img
                  src="/logo.png"
                  alt="NationCite Logo"
                  className="h-[200px] w-auto"
                />
              </div>
            </div>
          </div>

          {/* Right Panel - Scrollable Form Area */}
          <div className="flex-1 h-full bg-white relative z-10 flex flex-col overflow-hidden">
            {/* Mobile Header - Logo Only */}
            <div className="md:hidden w-full px-6 py-6 bg-gradient-to-br from-orange-100 via-orange-50 to-orange-50/50">
              <div className="flex justify-center">
                <img src="/logo.png" alt="NationCite" className="h-16 w-auto" />
              </div>
            </div>

            <div className="w-full h-full overflow-y-auto p-6 md:p-10 flex flex-col">
              <div className="w-full max-w-xl mx-auto relative flex-1 flex flex-col justify-start pt-4 md:pt-0 md:justify-center">
                {/* Heading Section - Separated and Centered */}
                <div className="text-center mb-4 md:mb-8">
                  <div className="text-[28px] font-medium text-neutral-900 mb-2">
                    Create New Account
                  </div>
                  <p className="text-sm text-neutral-600">Sign Up as:</p>
                </div>

                {/* Form Container */}
                <div className="w-full bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-sm md:shadow-none flex flex-col">
                  <div className="space-y-4 mb-6">
                    <UserTypeCard
                      type={UserType.Medical}
                      icon="medical"
                      description="Access Medical user dashboards"
                      isSelected={userType === UserType.Medical}
                      onClick={() => setUserType(UserType.Medical)}
                    />
                    <UserTypeCard
                      type={UserType.Institution}
                      icon="building"
                      description="Access Organisation dashboards"
                      isSelected={userType === UserType.Institution}
                      onClick={() => setUserType(UserType.Institution)}
                    />
                    <UserTypeCard
                      type={UserType.Researcher}
                      icon="researcher"
                      description="Access Researcher dashboards"
                      isSelected={userType === UserType.Researcher}
                      onClick={() => setUserType(UserType.Researcher)}
                    />
                  </div>
                  <button
                    onClick={handleNextStep}
                    disabled={!userType}
                    className="w-full bg-[var(--color-primary)] text-white py-3.5 md:py-3 text-sm md:text-base font-semibold rounded-xl hover:bg-[var(--color-warm-200)] transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    Next
                  </button>

                  <div className="relative flex py-6 items-center">
                    <div className="flex-grow border-t border-neutral-200"></div>
                    <span className="flex-shrink mx-4 text-neutral-400 text-xs">
                      or
                    </span>
                    <div className="flex-grow border-t border-neutral-200"></div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      window.location.href = "/api/auth/google/start?mode=signup";
                    }}
                    className="w-full flex items-center justify-center gap-3 py-3 border border-neutral-300 rounded-xl hover:bg-neutral-50 transition-all group"
                  >
                    <img
                      src="https://www.google.com/favicon.ico"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    <span className="text-neutral-700 font-medium text-sm group-hover:text-black">
                      Continue with Google
                    </span>
                  </button>
                </div>

                {/* Login Link */}
                <div className="mt-4 md:mt-6 text-center md:hidden">
                  <p className="text-xs text-neutral-600">
                    Already a User?{" "}
                    <Link
                      href="/signin"
                      className="text-[var(--color-primary)] font-semibold hover:underline"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // WIZARD LAYOUT (Steps 1+)
  return (
    <>
      <div className="h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden">
        {/* Mobile Progress Bar with Back Button */}
        <div className="md:hidden w-full px-4 pt-5 pb-4 bg-gradient-to-br from-orange-100 via-orange-50 to-orange-50/50 border-b border-orange-200">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="p-2 -ml-2 mb-3 text-neutral-700 hover:text-neutral-900"
          >
            <Icon name="arrow-left" size={24} />
          </button>
          {/* Progress Indicator */}
          <div className="flex gap-1.5 mb-3">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-1 flex-1 rounded-full transition-all ${
                  currentStep >= step
                    ? "bg-[var(--color-primary)]"
                    : "bg-neutral-200"
                }`}
              />
            ))}
          </div>
          <div className="text-center">
            <p className="text-[11px] text-neutral-500 mb-0.5">
              Step {currentStep}
            </p>
            <h3 className="text-sm font-semibold text-neutral-900">
              {currentStep === 1 && "Identity Verification"}
              {currentStep === 2 && "Authentication"}
              {currentStep === 3 && "Profile Enrichment"}
              {currentStep === 4 && "Welcome onboard!"}
            </h3>
          </div>
        </div>

        {/* Left Sidebar - Hidden on Mobile */}
        <div
          className="hidden md:flex md:w-[355px] h-full shrink-0 transition-all duration-500 relative z-20"
          style={{
            background: "linear-gradient(135deg, #ffe9c5 0%, #ffffff 100%)",
          }}
        >
          <SignupSidebar
            currentStep={isDashboardStep ? 4 : currentStep}
            onStepClick={handleStepClick}
          />
        </div>

        {/* Right Panel - Scrollable Form Area */}
        <div className="flex-1 h-full bg-white relative z-10 flex flex-col overflow-hidden">
          <div className="w-full h-full overflow-y-auto p-6 md:p-10 flex flex-col bg-white">
            {/* Back Button - Desktop only */}
            {!isDashboardStep && (
              <button
                onClick={handleBack}
                className="hidden md:flex absolute top-6 left-6 p-2 hover:bg-neutral-100 rounded-full transition-colors z-30"
                aria-label="Go Back"
              >
                <Icon
                  name="arrow-left"
                  className="text-neutral-600"
                  size={20}
                />
              </button>
            )}

            <div className="w-full max-w-xl mx-auto relative flex-1 flex flex-col justify-start md:pt-0 md:justify-center">
              {isSubmitting ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
                  <div className="h-10 w-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-neutral-600">
                    Creating your account…
                  </p>
                </div>
              ) : isDashboardStep ? (
                <div className="text-center bg-white border border-neutral-200 rounded-2xl p-8 shadow-none flex flex-col justify-center">
                  <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="check" size={24} />
                  </div>
                  <h4 className="text-lg font-medium mb-2 text-neutral-800">
                    Welcome!
                  </h4>
                  <p className="text-xs text-neutral-500 mb-5 max-w-md mx-auto">
                    Your account is under review. After successful verification,
                    you will receive your credentials via email.
                  </p>
                  <button
                    className="bg-[var(--color-primary)] text-white py-3 px-8 text-sm rounded-xl font-medium hover:bg-[var(--color-warm-200)] transition-all shadow-md hover:shadow-lg w-full max-w-xs mx-auto"
                    onClick={() => router.push("/")}
                  >
                    Go to Home
                  </button>
                </div>
              ) : (
                <>
                  {/* Heading Section - Separated and Centered */}
                  <div className="text-center mb-4 md:mb-8">
                    <div className="text-[28px] font-medium text-neutral-900 mb-2 leading-tight">
                      Create New Account
                    </div>
                    <p className="text-sm text-neutral-600">
                      Sign Up as:{" "}
                      <span className="text-[var(--color-primary)] font-semibold">
                        {userType}
                      </span>
                    </p>
                  </div>

                  {/* Error Message Display */}
                  {apiError && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Icon
                          name="alert-circle"
                          className="text-red-600 shrink-0 mt-0.5"
                          size={20}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-red-800">
                            Registration Error
                          </p>
                          <p className="text-xs text-red-600 mt-1">
                            {apiError}
                          </p>
                        </div>
                        <button
                          onClick={() => setApiError("")}
                          className="text-red-400 hover:text-red-600 transition-colors shrink-0"
                          aria-label="Dismiss error"
                        >
                          <Icon name="x" size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Form Container */}
                  <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-sm md:shadow-none flex flex-col h-full">
                    <div className="flex-1 flex flex-col min-h-0">
                      {userType && (
                        <FlowRenderer
                          key={currentStep}
                          userType={userType}
                          step={currentStep}
                          onNext={handleNextStep}
                          onSendOtp={
                            userType === UserType.Institution
                              ? handleSendInstitutionOtp
                              : undefined
                          }
                          otpSent={otpSent}
                          setOtpSent={setOtpSent}
                          timer={timer}
                          onChange={
                            userType === UserType.Medical
                              ? handleMedicalInputChange
                              : userType === UserType.Institution
                                ? handleInstitutionInputChange
                                : handleInputChange
                          }
                          researcherForm={researcherForm}
                          medicalForm={medicalForm}
                          institutionForm={institutionForm}
                          validationErrors={validationErrors}
                        />
                      )}
                    </div>
                  </div>
                  {/* Login Link */}
                  <div className="mt-4 md:mt-6 text-center md:hidden">
                    <p className="text-xs text-neutral-600">
                      Already a User?{" "}
                      <Link
                        href="/signin"
                        className="text-[var(--color-primary)] font-semibold hover:underline"
                      >
                        Login
                      </Link>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
