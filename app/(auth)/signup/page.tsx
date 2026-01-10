"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SignupNavbar } from "./components/SignupNavbar";
import { SignupSidebar } from "./components/SignupSidebar";
import { UserTypeCard } from "./components/UserTypeCard";
import { FlowRenderer } from "./components/FlowRenderer";
import { Icon } from "./components/Icon";

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
  const [userType, setUserType] = useState<UserType | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(60);

  // Timer effect for OTP
  useEffect(() => {
    let interval: any;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer((p) => p - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  // Reset OTP state when step changes
  useEffect(() => {
    setOtpSent(false);
    setTimer(60);
  }, [currentStep]);

  const handleNextStep = () => {
    if (currentStep === 0) {
      if (userType) setCurrentStep(1);
      return;
    }
    if (currentStep < FlowStep.Dashboard) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
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
          <div className="w-full md:w-[65%] h-full bg-white relative z-10 flex flex-col">
            <div className="w-full h-full overflow-y-auto px-4 py-4 md:p-10 flex flex-col">
              {/* Mobile Logo */}
              <div className="md:hidden mb-4 flex justify-center">
                <img src="/logo.png" alt="NationCite" className="h-20 w-auto" />
              </div>

              <div className="w-full max-w-xl mx-auto relative flex-1 flex flex-col justify-start pt-4 md:pt-0 md:justify-center">
                {/* Heading Section - Separated and Centered */}
                <div className="text-center mb-4 md:mb-8">
                  <div className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-2">
                    Create New Account
                  </div>
                  <p className="text-sm text-neutral-600">Sign Up as:</p>
                </div>

                {/* Form Container */}
                <div className="w-full bg-white border border-neutral-200 rounded-2xl p-4 md:p-8 shadow-sm md:shadow-none flex flex-col">
                  <div className="space-y-2.5 mb-6">
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

                {/* Already User Link - Below form */}
                <div className="mt-4 md:mt-6 text-center">
                  <p className="text-xs md:text-sm text-neutral-600">
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
        {/* Mobile Progress Bar */}
        <div className="md:hidden w-full px-4 pt-5 pb-4 bg-gradient-to-br from-orange-100 via-orange-50 to-orange-50/50 border-b border-orange-200">
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
          <SignupSidebar currentStep={isDashboardStep ? 4 : currentStep} />
        </div>

        {/* Right Panel - Scrollable Form Area */}
        <div className="w-full md:w-[65%] h-full bg-white relative z-10 flex flex-col">
          <div className="w-full h-full overflow-y-auto px-4 py-4 md:p-10 flex flex-col">
            {/* Back Button - Hidden on mobile (use browser back) */}
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

            <div className="w-full max-w-xl mx-auto relative flex-1 flex flex-col justify-start pt-4 md:pt-0 md:justify-center">
              {isDashboardStep ? (
                <div className="text-center bg-white border border-neutral-200 rounded-2xl p-8 shadow-none flex flex-col justify-center">
                  <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="check" size={24} />
                  </div>
                  <h4 className="text-lg font-medium mb-2 text-neutral-800">
                    Welcome to Dashboard!
                  </h4>
                  <p className="text-xs text-neutral-500 mb-5 max-w-md mx-auto">
                    Your account has been successfully created and you are now
                    logged in.
                  </p>
                  <button
                    className="bg-[var(--color-primary)] text-white py-3 px-8 text-sm rounded-xl font-medium hover:bg-[var(--color-warm-200)] transition-all shadow-md hover:shadow-lg w-full max-w-xs mx-auto"
                    onClick={() => window.location.reload()}
                  >
                    Go to Home
                  </button>
                </div>
              ) : (
                <>
                  {/* Heading Section - Separated and Centered */}
                  <div className="text-center mb-4 md:mb-8">
                    <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-2">
                      Create New Account
                    </h1>
                    <p className="text-sm text-neutral-600">
                      Sign Up as:{" "}
                      <span className="text-[var(--color-primary)] font-semibold">
                        {userType}
                      </span>
                    </p>
                  </div>

                  {/* Form Container */}
                  <div className="bg-white border border-neutral-200 rounded-2xl p-4 md:p-8 shadow-sm md:shadow-none flex flex-col h-full">
                    <div className="flex-1 flex flex-col min-h-0">
                      {userType && (
                        <FlowRenderer
                          userType={userType}
                          step={currentStep}
                          onNext={handleNextStep}
                          otpSent={otpSent}
                          setOtpSent={setOtpSent}
                          timer={timer}
                        />
                      )}
                    </div>
                  </div>

                  {/* Already User Link - Below form */}
                  {!isDashboardStep && (
                    <div className="mt-4 md:mt-6 text-center">
                      <p className="text-xs md:text-sm text-neutral-600">
                        Already a User?{" "}
                        <Link
                          href="/signin"
                          className="text-[var(--color-primary)] font-semibold hover:underline"
                        >
                          Login
                        </Link>
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
