"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SignupNavbar } from "./components/SignupNavbar";
import { SignupSidebar } from "./components/SignupSidebar";
import { UserTypeCard } from "./components/UserTypeCard";
import { FlowRenderer } from "./components/FlowRenderer";
import { Icon } from "./components/Icon";
import { useRouter } from "next/navigation";

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
    institutionalIdCardUrl: "www.demo",
    primaryDomain: "",
    googleScholarUrl: "",
    profilePhotoUrl: "www.demo",
    email: "test@gmail.com",
    mobile: "1234567890",
  });
  const buildResearcherPayload = () => {
    const payload = {
      name: researcherForm.name,
      institute: researcherForm.institution,
      instituteEmail: researcherForm.instituteEmail,
      orcidId: researcherForm.orcidId,
      institutionalIdCardUrl: researcherForm.institutionalIdCardUrl,
      primaryDomain: researcherForm.primaryDomain,
      googleScholarUrl: researcherForm.googleScholarUrl,
      profilePhotoUrl: researcherForm.profilePhotoUrl,
      type: "RESEARCHER",
      email: researcherForm.instituteEmail,
      mobile: "12345678855", // Replace with actual mobile from backend / user input
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
  });
  const buildMedicalPayload = () => {
    return {
      type: "MEDICAL",
      name: medicalForm.name,
      email: medicalForm.email,
      mobile: medicalForm.mobile,
      medCouncilRegNo: medicalForm.medCouncilRegNo,
      stateCouncil: medicalForm.stateCouncil,
      primaryHospital: medicalForm.primaryHospital,
      specialty: medicalForm.specialty,
      researchFocus: medicalForm.researchFocus,
      medicalDegreeUrl: medicalForm.medicalDegreeUrl,
      regCertificateUrl: medicalForm.regCertificateUrl,
    };
  };
  const handleMedicalInputChange = (field: string, value: string | File) => {
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
    letterOfAuthorizationUrl: "www.demo",
    accreditationProofUrl: "www.demo",
  });
  const buildInstitutionPayload = () => {
    return {
      type: "INSTITUTION",
      name: institutionForm.name,
      domain: institutionForm.domain,
      email: institutionForm.email,
      number: institutionForm.number,
      letterOfAuthorizationUrl: institutionForm.letterOfAuthorizationUrl,
      accreditationProofUrl: institutionForm.accreditationProofUrl,
    };
  };
  const handleInstitutionInputChange = (
    field: string,
    value: string | File,
  ) => {
    setInstitutionForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const router = useRouter();

  const handleInputChange = (field: string, value: string | File) => {
    setResearcherForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Validation state
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
      if (!validateRequired(researcherForm.orcidId)) {
        errors.orcidId = "ORCID ID is required";
      }
    } else if (step === 3) {
      if (!validateRequired(researcherForm.primaryDomain)) {
        errors.primaryDomain = "Primary domain is required";
      }
      if (!validateRequired(researcherForm.googleScholarUrl)) {
        errors.googleScholarUrl = "Google Scholar URL is required";
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
        errors.name = "Domain name is required";
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
  const submitRegistration = async () => {
    // Prevent double submission
    if (hasSubmitted || isSubmitting) {
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

        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (parseError) {
          // If response body is not JSON, use default error message
          console.error("Failed to parse error response:", parseError);
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
