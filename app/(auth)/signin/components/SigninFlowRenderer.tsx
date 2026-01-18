"use client";

import { useState, useEffect } from "react";
import { FormInput } from "../../signup/components/FormInput";
import { Icon } from "../../signup/components/Icon";

enum UserType {
  Medical = "Medical Professional",
  Institution = "Institution/ Organisation",
  Researcher = "Researcher",
}

interface SigninFlowRendererProps {
  userType: string;
  step: number;
  setStep: (step: number) => void;
  onSuccess: () => void;
}

export const SigninFlowRenderer = ({
  userType,
  step,
  setStep,
  onSuccess,
}: SigninFlowRendererProps) => {
  // const [step, setStep] = useState(1); // MIGRATED TO PROPS
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  // Form States
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orcid, setOrcid] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);

  // Timer Logic
  useEffect(() => {
    let interval: any;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((p) => p - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleMobileSubmit = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(2); // Move to OTP
      setTimer(60);
    }, 1000);
  };

  const handleEmailPassSubmit = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (userType === UserType.Institution) {
        // Institution needs mobile verification after email auth
        setStep(2);
      } else {
        // Others login directly
        onSuccess();
      }
    }, 1000);
  };

  const handleOtpSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 1000);
  };

  const GoogleButton = () => (
    <button className="w-full flex items-center justify-center gap-3 py-3 border border-neutral-300 rounded-xl hover:bg-neutral-50 transition-all group">
      <img
        src="https://www.google.com/favicon.ico"
        alt="Google"
        className="w-5 h-5"
      />
      <span className="text-neutral-700 font-medium text-sm group-hover:text-black">
        Sign in with Google
      </span>
    </button>
  );

  const Divider = ({ text = "or" }) => (
    <div className="relative flex py-6 items-center">
      <div className="flex-grow border-t border-neutral-200"></div>
      <span className="flex-shrink mx-4 text-neutral-400 text-xs">{text}</span>
      <div className="flex-grow border-t border-neutral-200"></div>
    </div>
  );

  // OTP Input Logic
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const renderOtpStep = (message: string) => (
    <div className="flex flex-col h-full text-center">
      <div className="flex-1 flex flex-col justify-center py-3">
        <h5 className="mb-2 text-neutral-800 text-lg font-semibold">
          OTP Verification
        </h5>
        <p className="text-sm mb-6 text-neutral-500 px-4">{message}</p>
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              maxLength={1}
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleOtpChange(i, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !digit && i > 0) {
                  const prev = document.getElementById(`otp-${i - 1}`);
                  prev?.focus();
                }
              }}
              className="w-16 h-16 md:w-[80px] md:h-[80px] border-2 border-neutral-300 rounded-xl text-center text-2xl font-semibold text-[var(--color-primary)] focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 outline-none transition-all"
            />
          ))}
        </div>
        <div className="flex justify-between items-center text-xs mb-6 px-3 bg-neutral-50 py-2.5 rounded-xl border border-neutral-100">
          <span className={timer > 0 ? "text-neutral-600" : "text-neutral-400"}>
            Expires in:{" "}
            <span className="font-mono font-medium">
              00:{timer.toString().padStart(2, "0")}
            </span>
          </span>
          <button
            className="text-[var(--color-primary)] font-medium hover:underline disabled:opacity-50"
            disabled={timer > 0}
            onClick={() => setTimer(60)}
          >
            Resend
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleOtpSubmit}
            disabled={otp.some((d) => !d) || isLoading}
            className="w-full bg-[var(--color-primary)] text-white py-3.5 rounded-xl font-semibold hover:bg-[var(--color-warm-200)] transition-all shadow-md disabled:opacity-50 disabled:shadow-none"
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>
          <button
            onClick={() => setStep(1)}
            className="w-full border border-neutral-200 text-neutral-600 py-3.5 rounded-xl font-medium hover:bg-neutral-50 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // --- MEDICAL FLOW ---
  if (userType === UserType.Medical) {
    if (step === 2)
      return renderOtpStep("Please enter the OTP sent to your mobile number.");

    return (
      <div className="flex flex-col space-y-4">
        {/* Mobile Section */}
        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-1.5 ml-1">
            Mobile Number
          </label>
          <input
            type="tel"
            placeholder="9876543210"
            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 outline-none transition-all"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        {mobile && (
          <button
            onClick={handleMobileSubmit}
            className="w-full bg-[var(--color-primary)] text-white py-3 mt-2 rounded-xl font-semibold hover:bg-[var(--color-warm-200)] transition-all"
          >
            {isLoading ? "Sending OTP..." : "Send OTP"}
          </button>
        )}

        <Divider />

        {/* Email Section */}
        <div className="space-y-4">
          <FormInput
            label="Email"
            type="email"
            placeholder="johndoe@org.in"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <div className="relative">
            <FormInput
              label="Password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <button className="absolute right-0 top-0 text-[10px] text-[var(--color-primary)] font-medium hover:underline p-1">
              Forgot?
            </button>
          </div>
          <button
            onClick={handleEmailPassSubmit}
            disabled={!email || !password}
            className="w-full bg-[var(--color-primary)] text-white py-3 rounded-xl font-semibold hover:bg-[var(--color-warm-200)] transition-all shadow-md disabled:opacity-50 disabled:shadow-none"
          >
            Login
          </button>
        </div>

        <Divider />

        <GoogleButton />
      </div>
    );
  }

  // --- INSTITUTION FLOW ---
  if (userType === UserType.Institution) {
    if (step === 2)
      return renderOtpStep("For security, please verify your mobile number.");

    return (
      <div className="flex flex-col space-y-4">
        <div className="space-y-4">
          <FormInput label="Institutional SSO" placeholder="abc1234" />
          <Divider />
          <FormInput
            label="Work Email"
            type="email"
            placeholder="johndoe@institution.edu"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <FormInput
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <button
            onClick={handleEmailPassSubmit}
            disabled={!email || !password}
            className="w-full bg-[var(--color-primary)] text-white py-3 rounded-xl font-semibold hover:bg-[var(--color-warm-200)] transition-all shadow-md disabled:opacity-50 disabled:shadow-none"
          >
            Next
          </button>
        </div>

        <Divider />

        <GoogleButton />
      </div>
    );
  }

  // --- RESEARCHER FLOW ---
  if (userType === UserType.Researcher) {
    return (
      <div className="flex flex-col space-y-4">
        <FormInput label="Enter ORCID" placeholder="0000-0000-0000-0000" />

        <Divider />

        <div className="space-y-4">
          <FormInput
            label="Email"
            type="email"
            placeholder="johndoe@email.com"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <FormInput
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <button
            onClick={handleEmailPassSubmit}
            disabled={!email || !password}
            className="w-full bg-[var(--color-primary)] text-white py-3 rounded-xl font-semibold hover:bg-[var(--color-warm-200)] transition-all shadow-md disabled:opacity-50 disabled:shadow-none"
          >
            Login
          </button>
        </div>

        <Divider />

        <GoogleButton />
      </div>
    );
  }

  return <div>Unknown User Type</div>;
};
