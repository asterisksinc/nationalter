import React from "react";
import { Link2, Building2, Globe } from "lucide-react";

export const LinkedAccounts = () => {
  return (
    <div className="space-y-6 md:space-y-[32px]">
      {/* ORCID Integration */}
      <section>
        <div className="flex items-center gap-[6px] mb-[12px]">
          <Link2 size={18} strokeWidth={1.5} className="text-[#525866]" />
          <div className="text-[15px] md:text-[16px] font-medium text-[#0E121B] tracking-[-0.006em]">
            ORCID Integration
          </div>
        </div>
        <div className="border-b border-[#E1E4EA] mb-4 md:mb-[20px]"></div>

        <div>
          <label className="block text-[13px] md:text-[14px] font-medium text-[#181B25] mb-[6px]">
            Status
          </label>
          <div className="text-[#27B973] text-[13px] md:text-[14px] font-medium">
            Connected
          </div>
        </div>
      </section>

      {/* Institutional SSO */}
      <section>
        <div className="flex items-center gap-[6px] mb-[12px]">
          <Building2 size={18} strokeWidth={1.5} className="text-[#525866]" />
          <div className="text-[15px] md:text-[16px] font-medium text-[#0E121B] tracking-[-0.006em]">
            Institutional SSO
          </div>
          <button className="ml-auto text-[#007AFF] hover:underline text-[13px] md:text-[14px] font-medium">
            Unlink
          </button>
        </div>
        <div className="border-b border-[#E1E4EA] mb-4 md:mb-[20px]"></div>

        <div className="space-y-[16px]">
          <div>
            <label className="block text-[13px] md:text-[14px] font-medium text-[#181B25] mb-[8px]">
              Status
            </label>
            <div className="bg-[#F2F5F8] px-[12px] py-[6px] rounded-[6px] inline-block text-[13px] md:text-[14px] text-[#525866]">
              Affiliated with IIT Delhi
            </div>
          </div>
          <div>
            <label className="block text-[13px] md:text-[14px] font-medium text-[#181B25] mb-[6px]">
              Status
            </label>
            <div className="text-[13px] md:text-[14px]">
              <span className="text-[#27B973] font-medium">Verified</span>
              <span className="text-[#525866]"> via admin@iitd.ac.in</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section>
        <div className="flex items-center gap-[6px] mb-[12px]">
          <Globe size={18} strokeWidth={1.5} className="text-[#525866]" />
          <div className="text-[15px] md:text-[16px] font-medium text-[#0E121B] tracking-[-0.006em]">
            Social Links
          </div>
        </div>
        <div className="border-b border-[#E1E4EA] mb-4 md:mb-[20px]"></div>

        <div className="space-y-[12px]">
          <div>
            <label className="block text-[13px] md:text-[14px] font-medium text-[#181B25] mb-[6px]">
              LinkedIn
            </label>
            <input
              type="text"
              placeholder="www."
              className="w-full h-[42px] md:h-[38px] px-[12px] bg-white border border-[#D1D1D6] rounded-lg md:rounded-[4px] text-[14px] text-[#000000] focus:outline-none focus:border-[#FF7A00] placeholder-[#C7C7CC]"
            />
          </div>
          <div>
            <label className="block text-[13px] md:text-[14px] font-medium text-[#181B25] mb-[6px]">
              Google Scholar Profile
            </label>
            <input
              type="text"
              placeholder="www."
              className="w-full h-[42px] md:h-[38px] px-[12px] bg-white border border-[#D1D1D6] rounded-lg md:rounded-[4px] text-[14px] text-[#000000] focus:outline-none focus:border-[#FF7A00] placeholder-[#C7C7CC]"
            />
          </div>
          <div>
            <label className="block text-[13px] md:text-[14px] font-medium text-[#181B25] mb-[6px]">
              Personal Website
            </label>
            <input
              type="text"
              placeholder="www."
              className="w-full h-[42px] md:h-[38px] px-[12px] bg-white border border-[#D1D1D6] rounded-lg md:rounded-[4px] text-[14px] text-[#000000] focus:outline-none focus:border-[#FF7A00] placeholder-[#C7C7CC]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
