import React from "react";
import { Link2, Building2, Globe } from "lucide-react";

export const LinkedAccounts = () => {
    return (
        <div className="space-y-[40px]">
            {/* ORCID Integration */}
            <section>
                <div className="flex items-center gap-[8px] mb-[16px]">
                    <Link2 size={20} className="text-[#FF8D28]" />
                    <h4 className="text-[16px] font-medium text-[#0E121B] tracking-[-0.006em]">ORCID Integration</h4>
                </div>
                <div className="border-b border-[#E1E4EA] mb-[24px]"></div>

                <div>
                    <label className="block text-[14px] font-medium text-[#525866] mb-[6px]">
                        Status
                    </label>
                    <div className="text-[#27B973] text-[14px] font-medium">Connected</div>
                </div>
            </section>

            {/* Institutional SSO */}
            <section>
                <div className="flex items-center gap-[8px] mb-[16px]">
                    <Building2 size={20} className="text-[#FF8D28]" />
                    <h4 className="text-[16px] font-medium text-[#0E121B] tracking-[-0.006em]">Institutional SSO</h4>
                    <button className="ml-auto text-[#0088FF] hover:underline text-[14px] font-medium">
                        Unlink
                    </button>
                </div>
                <div className="border-b border-[#E1E4EA] mb-[24px]"></div>

                <div className="space-y-[16px]">
                    <div>
                        <label className="block text-[14px] font-medium text-[#525866] mb-[8px]">
                            Status
                        </label>
                        <div className="bg-[#F2F5F8] px-[12px] py-[6px] rounded-[6px] inline-block text-[14px] text-[#525866]">
                            Affiliated with IIT Delhi
                        </div>
                    </div>
                    <div>
                        <label className="block text-[14px] font-medium text-[#525866] mb-[6px]">
                            Status
                        </label>
                        <div className="text-[14px]">
                            <span className="text-[#27B973] font-medium">Verified</span>
                            <span className="text-[#525866]"> via admin@iitd.ac.in</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Links */}
            <section>
                <div className="flex items-center gap-[8px] mb-[16px]">
                    <Globe size={20} className="text-[#FF8D28]" />
                    <h4 className="text-[16px] font-medium text-[#0E121B] tracking-[-0.006em]">Social Links</h4>
                </div>
                <div className="border-b border-[#E1E4EA] mb-[24px]"></div>

                <div className="space-y-[10px]">
                    <div>
                        <label className="block text-[14px] font-medium text-[#525866] mb-[6px]">
                            LinkedIn
                        </label>
                        <input
                            type="text"
                            placeholder="www."
                            className="w-full h-[42px] px-[12px] bg-white border border-[#AEAEB2] rounded-[6px] text-[14px] text-[#000000] focus:outline-none focus:border-[#FF7A00] placeholder-[#8E8E93]"
                        />
                    </div>
                    <div>
                        <label className="block text-[14px] font-medium text-[#525866] mb-[6px]">
                            Google Scholar Profile
                        </label>
                        <input
                            type="text"
                            placeholder="www."
                            className="w-full h-[42px] px-[12px] bg-white border border-[#AEAEB2] rounded-[6px] text-[14px] text-[#000000] focus:outline-none focus:border-[#FF7A00] placeholder-[#8E8E93]"
                        />
                    </div>
                    <div>
                        <label className="block text-[14px] font-medium text-[#525866] mb-[6px]">
                            Personal Website
                        </label>
                        <input
                            type="text"
                            placeholder="www."
                            className="w-full h-[42px] px-[12px] bg-white border border-[#AEAEB2] rounded-[6px] text-[14px] text-[#000000] focus:outline-none focus:border-[#FF7A00] placeholder-[#8E8E93]"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};
