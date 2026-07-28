"use client";

import { useState } from "react";
import Link from "next/link";
import { SigninSidebar } from "@/app/(auth)/signin/components/SigninSidebar";
import { SigninFlowRenderer } from "@/app/(auth)/signin/components/SigninFlowRenderer";
import { UserTypeCard } from "../signup/components/UserTypeCard";
import { LoginProgressLoader } from "@/components/auth/LoginProgressLoader";

// Reuse Types
enum UserType {
  Medical = "Medical Professional",
  Institution = "Institution/ Organisation",
  Researcher = "Researcher",
  Admin = "Admin",
}

export default function LoginPage() {
  const [userType, setUserType] = useState<UserType >(UserType.Admin);
  const [currentStep, setCurrentStep] = useState(1);
  const [pendingRedirect, setPendingRedirect] = useState<string | null>(null);

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      setUserType(UserType.Admin);
    }
  };

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
          {/* Mobile Header - Logo Only */}
          <div className="md:hidden w-full px-6 py-6 bg-gradient-to-br from-orange-100 via-orange-50 to-orange-50/50">
            <div className="flex justify-center">
              <img src="/logo.png" alt="NationCite" className="h-16 w-auto" />
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
                <p className="text-xs text-neutral-600">
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
    <>
      <LoginProgressLoader
        isVisible={pendingRedirect !== null}
        onComplete={() => {
          if (pendingRedirect) window.location.assign(pendingRedirect);
        }}
      />
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
        {/* Mobile Header - Logo Only */}
        <div className="md:hidden w-full px-6 py-6 bg-gradient-to-br from-orange-100 via-orange-50 to-orange-50/50">
          <div className="flex justify-center">
            <img src="/logo.png" className="h-16" alt="NationCite" />
          </div>
        </div>

        <div className="w-full h-full overflow-y-auto p-6 md:p-10 flex flex-col rounded-t-[30px] md:rounded-t-none -mt-6 md:mt-0 bg-white">
          {/* Back Button - Desktop only */}
          {/* <button
            onClick={handleBack}
            className="md:flex absolute top-6 left-6 p-2 hover:bg-neutral-100 rounded-full transition-colors z-30 hidden"
            aria-label="Go Back"
          >
            <Icon name="arrow-left" className="text-neutral-600" size={20} />
          </button> */}

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
                key={currentStep}
                userType={"Admin"}
                step={currentStep}
                setStep={setCurrentStep}
                onSuccess={setPendingRedirect}
              />
            </div>

            {/* Create Account Link */}
            <div className="mt-4 md:mt-6 text-center md:hidden">
              <p className="text-xs text-neutral-600">
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
    </>
  );
}
