"use client";

import React, { useState } from "react";
import { Mail, Lock, Shield, Eye, EyeOff } from "lucide-react";

export const AccountSettings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({ type: "error", text: "All fields are required" });
      return;
    }

    if (newPassword.length < 8) {
      setMessage({
        type: "error",
        text: "New password must be at least 8 characters long",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage({ type: "success", text: "Password changed successfully!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to change password",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Email Engagement */}
      <section>
        <div className="flex items-center gap-1.5 mb-3">
          <Mail size={18} strokeWidth={1.5} className="text-[#525866]" />
          <div className="text-[15px] md:text-[16px] leading-5 font-medium text-[#0E121B] tracking-[-0.006em]">
            Email Engagement
          </div>
        </div>
        <div className="border-b border-[#E1E4EA] mb-4 md:mb-5"></div>

        <div className="space-y-4">
          <div>
            <label className="block text-[13px] md:text-[14px] font-medium text-[#181B25] mb-1.5">
              Primary Email
            </label>
            <div className="text-[#525866] text-[13px] md:text-[14px]">
              doctor@hospital.com
            </div>
          </div>

          <div>
            <label className="block text-[13px] md:text-[14px] font-medium text-[#181B25] mb-1.5">
              Add Secondary Email
            </label>
            <input
              type="email"
              placeholder="johndoe@org.in"
              className="w-full h-[42px] md:h-[38px] px-3 bg-white border border-[#D1D1D6] rounded-lg md:rounded-sm text-[14px] text-[#000000] focus:outline-none focus:border-[#FF7A00] placeholder-[#C7C7CC]"
            />
          </div>
        </div>
      </section>

      {/* Password Change */}
      <section>
        <div className="flex items-center gap-1.5 mb-3">
          <Lock size={18} strokeWidth={1.5} className="text-[#525866]" />
          <div className="text-[15px] md:text-[16px] leading-5 font-medium text-[#0E121B] tracking-[-0.006em]">
            Password Change
          </div>
        </div>
        <div className="border-b border-[#E1E4EA] mb-4 md:mb-5"></div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-[13px] md:text-[14px] font-medium text-[#181B25] mb-1.5">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full h-[42px] md:h-[38px] px-3 pr-10 bg-white border border-[#D1D1D6] rounded-lg md:rounded-sm text-[14px] text-[#000000] focus:outline-none focus:border-[#FF7A00] placeholder-[#C7C7CC]"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#525866] hover:text-[#181B25]"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-[13px] md:text-[14px] font-medium text-[#181B25] mb-1.5">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min. 8 characters)"
                className="w-full h-[42px] md:h-[38px] px-3 pr-10 bg-white border border-[#D1D1D6] rounded-lg md:rounded-sm text-[14px] text-[#000000] focus:outline-none focus:border-[#FF7A00] placeholder-[#C7C7CC]"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#525866] hover:text-[#181B25]"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-[13px] md:text-[14px] font-medium text-[#181B25] mb-1.5">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full h-[42px] md:h-[38px] px-3 pr-10 bg-white border border-[#D1D1D6] rounded-lg md:rounded-sm text-[14px] text-[#000000] focus:outline-none focus:border-[#FF7A00] placeholder-[#C7C7CC]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#525866] hover:text-[#181B25]"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`p-3 rounded-lg text-[13px] md:text-[14px] ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto px-6 h-[42px] md:h-[38px] bg-[#FF7A00] hover:bg-[#E66D00] disabled:bg-[#FFB366] disabled:cursor-not-allowed text-white text-[14px] font-medium rounded-lg md:rounded-sm transition-colors"
          >
            {isLoading ? "Changing Password..." : "Change Password"}
          </button>
        </form>
      </section>

      {/* Two-Factor Authentication */}
      <section>
        <div className="flex items-center gap-1.5 mb-3">
          <Shield size={18} strokeWidth={1.5} className="text-[#525866]" />
          <div className="text-[15px] md:text-[16px] leading-5 font-medium text-[#0E121B] tracking-[-0.006em]">
            Two-Factor Authentication (2FA)
          </div>
        </div>
        <div className="border-b border-[#E1E4EA] mb-4 md:mb-5"></div>

        <div className="flex items-center gap-[10px]">
          <span className="text-[13px] md:text-[14px] font-medium text-[#525866]">
            Disable
          </span>
          {/* Toggle Switch */}
          <button className="w-[32px] h-[16px] bg-[#E8E8ED] border border-[#D1D1D6] rounded-[20px] relative transition-colors focus:outline-none flex items-center">
            <span className="absolute left-[1px] w-[14px] h-[14px] bg-[#FFFFFF] rounded-full transition-transform"></span>
          </button>
          <span className="text-[13px] md:text-[14px] font-medium text-[#525866]">
            Enable
          </span>
        </div>
      </section>
    </div>
  );
};
