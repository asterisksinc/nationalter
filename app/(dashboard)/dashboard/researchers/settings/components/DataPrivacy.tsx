import React from "react";
import { Download, ShieldCheck } from "lucide-react";

export const DataPrivacy = () => {
  return (
    <div className="space-y-6 md:space-y-[32px]">
      {/* Data Export */}
      <section>
        <div className="flex items-center gap-[6px] mb-[12px]">
          <Download size={18} strokeWidth={1.5} className="text-[#525866]" />
          <div className="text-[15px] md:text-[16px] font-medium text-[#0E121B] tracking-[-0.006em]">
            Data Export
          </div>
          <button className="ml-auto text-[#007AFF] hover:underline text-[13px] md:text-[14px] font-medium">
            Unlink
          </button>
        </div>
        <div className="border-b border-[#E1E4EA] mb-4 md:mb-[20px]"></div>

        <div className="space-y-[20px]">
          <div>
            <label className="block text-[13px] md:text-[14px] font-medium text-[#181B25] mb-[8px]">
              Status
            </label>
            <button className="flex items-center gap-[6px] px-[12px] py-[6px] bg-[#F2F5F8] rounded-[6px] text-[13px] md:text-[14px] text-[#525866] hover:bg-[#E1E4EA] transition-colors">
              Download Data <Download size={14} className="text-[#525866]" />
            </button>
          </div>

          <div>
            <label className="block text-[13px] md:text-[14px] font-medium text-[#181B25] mb-[6px]">
              Description
            </label>
            <p className="text-[13px] md:text-[14px] text-[#8E8E93]">
              Get a copy of your profile, publications, and analytics.
            </p>
          </div>

          <div>
            <label className="block text-[13px] md:text-[14px] font-medium text-[#181B25] mb-[6px]">
              Formats
            </label>
            <p className="text-[13px] md:text-[14px] text-[#8E8E93]">
              JSON (Machine readable) or CSV (Excel)
            </p>
          </div>
        </div>
      </section>

      {/* Consent Management */}
      <section>
        <div className="flex items-center gap-[6px] mb-[12px]">
          <ShieldCheck size={18} strokeWidth={1.5} className="text-[#525866]" />
          <div className="text-[15px] md:text-[16px] font-medium text-[#0E121B] tracking-[-0.006em]">
            Consent Management
          </div>
        </div>
        <div className="border-b border-[#E1E4EA] mb-4 md:mb-[20px]"></div>

        <div>
          <label className="block text-[13px] md:text-[14px] font-medium text-[#181B25] mb-[6px]">
            Log
          </label>
          <p className="text-[13px] md:text-[14px] text-[#8E8E93]">
            You accepted{" "}
            <span className="text-[#007AFF] cursor-pointer">
              Terms of Service
            </span>{" "}
            on [Date]
          </p>
        </div>
      </section>

      <div className="pt-8 md:pt-[40px] text-center">
        <button className="text-[#E82323] hover:text-[#DF120B] text-[13px] md:text-[14px] font-medium">
          Delete Account
        </button>
      </div>
    </div>
  );
};
