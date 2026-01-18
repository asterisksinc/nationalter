"use client";

import { useState } from "react";
import Link from "next/link";
import { SigninSidebar } from "./components/SigninSidebar";
import { SigninFlowRenderer } from "./components/SigninFlowRenderer";
import { UserTypeCard } from "../signup/components/UserTypeCard";
import { Icon } from "../signup/components/Icon";

// Reuse Types
enum UserType {
  Medical = "Medical Professional",
  Institution = "Institution/ Organisation",
  Researcher = "Researcher",
}

export default function LoginPage() {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      setUserType(null);
    }
  };

  // SUCCESS / DASHBOARD VIEW
  if (isSuccess) {
    return (
      <div className="h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden">
        {/* Left Sidebar */}
        <div
          className="hidden md:flex md:w-[355px] h-full shrink-0 relative z-20"
          style={{
            background: "linear-gradient(135deg, #ffe9c5 0%, #ffffff 100%)",
          }}
        >
          <SigninSidebar />
        </div>

        {/* Right Content */}
        <div className="flex-1 h-full bg-white relative z-10 flex flex-col">
          {/* Mobile Header */}
          <div className="md:hidden w-full px-6 py-6 bg-gradient-to-br from-orange-100 via-orange-50 to-orange-50/50">
            <div className="flex justify-center">
              <img src="/logo.png" alt="NationCite" className="h-24 w-auto" />
            </div>
          </div>

          <div className="w-full h-full flex flex-col items-center justify-center p-8">
            <div className="text-center bg-white border border-neutral-200 rounded-2xl p-8 shadow-none flex flex-col justify-center max-w-md w-full">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="check" size={24} />
              </div>
              <h4 className="text-lg font-medium mb-2 text-neutral-800">
                Welcome Back!
              </h4>
              <p className="text-xs text-neutral-500 mb-5">
                You have successfully signed in as <br />
                <span className="font-semibold text-[var(--color-primary)]">
                  {userType}
                </span>
              </p>
              <button
                className="bg-[var(--color-primary)] text-white py-3 px-8 text-sm rounded-xl font-medium hover:bg-[var(--color-warm-200)] transition-all shadow-md hover:shadow-lg w-full"
                onClick={() => (window.location.href = "/dashboard")}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // USER TYPE SELECTION VIEW (Step 0)
  if (!userType) {
    return (
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
          {/* Mobile Header */}
          <div className="md:hidden w-full px-6 pt-6 pb-10 bg-gradient-to-br from-orange-100 via-orange-50 to-orange-50/50">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="p-2 -ml-2 text-neutral-700 hover:text-neutral-900"
              >
                <Icon name="arrow-left" size={24} />
              </Link>
              <img src="/logo.png" alt="NationCite" className="h-30 w-auto" />
              <div className="w-10"></div>
            </div>
          </div>

          <div className="w-full h-full overflow-y-auto p-6 md:p-10 flex flex-col rounded-t-[30px] md:rounded-t-none -mt-6 md:mt-0 bg-white">
            <div className="w-full max-w-xl mx-auto relative flex-1 flex flex-col justify-start pt-4 md:pt-0 md:justify-center">
              {/* Heading */}
              <div className="text-center mb-4 md:mb-8">
                <div className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-2">
                  Login
                </div>
                <p className="text-sm text-neutral-600">
                  Select your user type to continue
                </p>
              </div>

              {/* Selection Cards */}
              <div className="w-full bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-sm md:shadow-none flex flex-col">
                <div className="space-y-4 mb-6">
                  <UserTypeCard
                    type={UserType.Medical}
                    icon="medical"
                    description="Access Medical user dashboards"
                    isSelected={false}
                    onClick={() => setUserType(UserType.Medical)}
                  />
                  <UserTypeCard
                    type={UserType.Institution}
                    icon="building"
                    description="Access Organisation dashboards"
                    isSelected={false}
                    onClick={() => setUserType(UserType.Institution)}
                  />
                  <UserTypeCard
                    type={UserType.Researcher}
                    icon="researcher"
                    description="Access Researcher dashboards"
                    isSelected={false}
                    onClick={() => setUserType(UserType.Researcher)}
                  />
                </div>
              </div>

              {/* Create Account Link */}
              <div className="mt-4 md:mt-6 text-center">
                <p className="text-xs md:text-sm text-neutral-600">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-[var(--color-primary)] font-semibold hover:underline"
                  >
                    Create New
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MAIN LOGIN FORM VIEW (Step 1 & 2)
  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Sidebar */}
      <div
        className="hidden md:flex md:w-[355px] h-full shrink-0 relative z-20"
        style={{
          background: "linear-gradient(135deg, #ffe9c5 0%, #ffffff 100%)",
        }}
      >
        <SigninSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 h-full bg-white relative z-10 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden w-full px-6 pt-6 pb-10 bg-gradient-to-br from-orange-100 via-orange-50 to-orange-50/50">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="p-2 -ml-2 text-neutral-700 hover:text-neutral-900"
            >
              <Icon name="arrow-left" size={24} />
            </button>
            <img src="/logo.png" className="h-16" alt="Logo" />
            <div className="w-10"></div>
          </div>
        </div>

        <div className="w-full h-full overflow-y-auto p-6 md:p-10 flex flex-col rounded-t-[30px] md:rounded-t-none -mt-6 md:mt-0 bg-white">
          {/* Back Button - Desktop only */}
          <button
            onClick={handleBack}
            className="md:flex absolute top-6 left-6 p-2 hover:bg-neutral-100 rounded-full transition-colors z-30 hidden"
            aria-label="Go Back"
          >
            <Icon name="arrow-left" className="text-neutral-600" size={20} />
          </button>

          <div className="w-full max-w-xl mx-auto relative flex-1 flex flex-col justify-start pt-4 md:pt-0 md:justify-center">
            {/* Heading */}
            <div className="text-center mb-4 md:mb-8">
              <div className="text-[28px] font-semibold text-neutral-900 mb-2 leading-tight">
                Login
              </div>
              <p className="text-sm text-neutral-600">
                Sign In as:{" "}
                <span className="text-[var(--color-primary)] font-semibold">
                  {userType}
                </span>
              </p>
            </div>

            {/* Form Container */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-sm md:shadow-none flex flex-col h-full md:h-auto">
              <SigninFlowRenderer
                userType={userType}
                step={currentStep}
                setStep={setCurrentStep}
                onSuccess={() => setIsSuccess(true)}
              />
            </div>

            {/* Link removed - moved to sidebar */}
          </div>
        </div>
      </div>
    </div>
  );
}
