"use client";

import { useState } from "react";
import { Icon } from "../../signup/components/Icon";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForgotPasswordModal = ({
  isOpen,
  onClose,
}: ForgotPasswordModalProps) => {
  const [step, setStep] = useState(1); // 1: Enter Email, 2: Success
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (result.success) {
        setStep(2); // Move to success screen
      } else {
        setError(result.message || "Failed to send reset email");
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setEmail("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Step 1: Enter Email */}
        {step === 1 && (
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-neutral-800">
                Forgot Password
              </h3>
              <button
                onClick={handleClose}
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <Icon name="x" size={20} />
              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-neutral-600 mb-6">
              Enter your email address and we'll send you a temporary password
              to access your account.
            </p>

            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-xs font-medium text-neutral-700 mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="johndoe@email.com"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 outline-none transition-all"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isLoading) {
                    handleSubmit();
                  }
                }}
              />
              {error && (
                <p className="text-xs text-red-500 mt-2 ml-1">{error}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleSubmit}
                disabled={!email || isLoading}
                className="w-full bg-[var(--color-primary)] text-white py-3 rounded-xl font-semibold hover:bg-[var(--color-warm-200)] transition-all shadow-md disabled:opacity-50 disabled:shadow-none"
              >
                {isLoading ? "Sending..." : "Send Reset Password"}
              </button>
              <button
                onClick={handleClose}
                className="w-full border border-neutral-200 text-neutral-600 py-3 rounded-xl font-medium hover:bg-neutral-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Success */}
        {step === 2 && (
          <div className="p-6 md:p-8 text-center">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="mail" size={28} />
            </div>

            {/* Success Message */}
            <h3 className="text-xl font-semibold text-neutral-800 mb-3">
              Check Your Email
            </h3>
            <p className="text-sm text-neutral-600 mb-8 px-4">
              If an account exists with <strong>{email}</strong>, you will
              receive a temporary password shortly.
            </p>

            {/* Info Box */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 text-left">
              <h4 className="text-sm font-semibold text-neutral-800 mb-2">
                What's next?
              </h4>
              <ul className="text-xs text-neutral-600 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-primary)] mt-0.5">•</span>
                  <span>Check your email inbox for the temporary password</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-primary)] mt-0.5">•</span>
                  <span>Use it to login to your account</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-primary)] mt-0.5">•</span>
                  <span>
                    Change your password from settings after logging in
                  </span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleClose}
                className="w-full bg-[var(--color-primary)] text-white py-3 rounded-xl font-semibold hover:bg-[var(--color-warm-200)] transition-all shadow-md"
              >
                Back to Sign In
              </button>
              <button
                onClick={() => {
                  setStep(1);
                  setEmail("");
                }}
                className="w-full text-neutral-600 py-2 text-sm font-medium hover:text-neutral-800 transition-colors"
              >
                Try another email
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
