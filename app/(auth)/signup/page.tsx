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
            className="hidden md:flex md:w-[35%] h-full bg-orange-50 items-center justify-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #ffe9c5 0%, #ffffff 100%)",
            }}
          >
            <div className="z-10 flex flex-col items-center">
              <div className="text-5xl font-bold tracking-tight text-black mb-3">
                NATIONCITE
              </div>
              <p className="text-xs text-black font-semibold tracking-[0.2em] uppercase">
                Powering India&apos;s Research Future
              </p>
            </div>
          </div>

          {/* Right Panel - Scrollable Form Area */}
          <div className="w-full md:w-[65%] h-full bg-white relative z-10 flex flex-col">
            <div className="w-full h-full overflow-y-auto p-6 md:p-10 flex flex-col">
              <div className="md:hidden mb-6 flex items-center gap-2">
                <div className="text-xl font-bold tracking-tight text-black">
                  NATIONCITE
                </div>
              </div>

              <div className="w-full max-w-xl mx-auto relative flex-1 flex flex-col justify-center">
                <div className="w-full bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col">
                  <div className="mb-4 text-center md:text-left">
                    <h4 className="mb-1 text-neutral-800 font-medium text-base">
                      Create New Account
                    </h4>
                    <p className="text-xs text-neutral-500">Sign Up as:</p>
                  </div>
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
                  <div>
                    <button
                      onClick={handleNextStep}
                      disabled={!userType}
                      className="w-full bg-[var(--color-primary)] text-white py-3 text-sm rounded-xl font-medium hover:bg-[var(--color-warm-200)] transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                      Next
                    </button>
                    <div className="mt-4 text-center md:text-left">
                      <p className="text-xs text-neutral-500 font-medium">
                        Already a User?{" "}
                        <Link
                          href="/signin"
                          className="text-blue-600 hover:underline font-bold"
                        >
                          Login
                        </Link>
                      </p>
                    </div>
                  </div>
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
        {/* Left Sidebar */}
        <div
          className="w-full md:w-[35%] h-auto md:h-full shrink-0 transition-all duration-500 relative z-20"
          style={{
            background: "linear-gradient(135deg, #ffe9c5 0%, #ffffff 100%)",
          }}
        >
          <SignupSidebar currentStep={isDashboardStep ? 4 : currentStep} />
        </div>

        {/* Right Panel - Scrollable Form Area */}
        <div className="w-full md:w-[65%] h-full bg-white relative z-10 flex flex-col">
          <div className="w-full h-full overflow-y-auto p-6 md:p-10 flex flex-col">
            {/* Back Button positioned relative to the content area or absolute if desired. 
                Keeping it layout-safe by putting it inside the flux but absolute to the panel.
            */}
            {!isDashboardStep && (
              <button
                onClick={handleBack}
                className="absolute top-4 left-4 md:top-6 md:left-6 p-2 hover:bg-neutral-100 rounded-full transition-colors z-30"
                aria-label="Go Back"
              >
                <Icon
                  name="arrow-left"
                  className="text-neutral-600"
                  size={20}
                />
              </button>
            )}

            <div className="w-full max-w-xl mx-auto relative flex-1 flex flex-col justify-center">
              {isDashboardStep ? (
                <div className="text-center bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm flex flex-col justify-center">
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
                <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col h-full">
                  <div className="mb-4 text-center md:text-left shrink-0">
                    <h4 className="mb-0.5 text-neutral-800 font-medium text-base">
                      Create New Account
                    </h4>
                    <p className="text-xs text-neutral-500">
                      Sign Up as:{" "}
                      <span className="text-[var(--color-accent)] font-medium">
                        {userType}
                      </span>
                    </p>
                  </div>
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
              )}
              {!isDashboardStep && (
                <div className="mt-4 text-center md:text-left">
                  <p className="text-xs font-medium text-neutral-900">
                    Already a User?{" "}
                    <Link href="/signin" className="text-blue-500 underline">
                      Login
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
