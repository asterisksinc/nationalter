import React from "react";
import { Mail, Lock, Shield } from "lucide-react";

export const AccountSettings = () => {
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
              researcher@iisc.ac.in
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

        <button className="text-[#007AFF] hover:text-[#0066CC] text-[13px] md:text-[14px] font-normal transition-colors">
          Reset your password
        </button>
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
