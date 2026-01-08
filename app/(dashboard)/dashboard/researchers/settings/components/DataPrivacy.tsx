import React from "react";
import { Download, ShieldCheck } from "lucide-react";

export const DataPrivacy = () => {
    return (
        <div className="space-y-[40px]">
            {/* Data Export */}
            <section>
                <div className="flex items-center gap-[8px] mb-[16px]">
                    <Download size={20} className="text-[#FF8D28]" />
                    <h4 className="text-[16px] font-medium text-[#0E121B] tracking-[-0.006em]">Data Export</h4>
                    <button className="ml-auto text-[#0088FF] hover:underline text-[14px] font-medium">
                        Unlink
                    </button>
                </div>
                <div className="border-b border-[#E1E4EA] mb-[24px]"></div>

                <div className="space-y-[20px]">
                    <div>
                        <label className="block text-[14px] font-medium text-[#525866] mb-[8px]">
                            Status
                        </label>
                        <button className="flex items-center gap-[6px] px-[12px] py-[6px] bg-[#F2F5F8] rounded-[6px] text-[14px] text-[#525866] hover:bg-[#E1E4EA] transition-colors">
                            Download Data <Download size={14} className="text-[#525866]" />
                        </button>
                    </div>

                    <div>
                        <label className="block text-[14px] font-medium text-[#525866] mb-[6px]">
                            Description
                        </label>
                        <p className="text-[14px] text-[#8E8E93]">Get a copy of your profile, publications, and analytics.</p>
                    </div>

                    <div>
                        <label className="block text-[14px] font-medium text-[#525866] mb-[6px]">
                            Formats
                        </label>
                        <p className="text-[14px] text-[#8E8E93]">JSON (Machine readable) or CSV (Excel)</p>
                    </div>
                </div>
            </section>

            {/* Consent Management */}
            <section>
                <div className="flex items-center gap-[8px] mb-[16px]">
                    <ShieldCheck size={20} className="text-[#FF8D28]" />
                    <h4 className="text-[16px] font-medium text-[#0E121B] tracking-[-0.006em]">
                        Consent Management
                    </h4>
                </div>
                <div className="border-b border-[#E1E4EA] mb-[24px]"></div>

                <div>
                    <label className="block text-[14px] font-medium text-[#525866] mb-[6px]">
                        Log
                    </label>
                    <p className="text-[14px] text-[#8E8E93]">
                        You accepted <span className="text-[#0088FF] cursor-pointer">Terms of Service</span> on [Date]
                    </p>
                </div>
            </section>

            <div className="pt-[40px] text-center">
                <button className="text-[#E82323] hover:text-[#DF120B] text-[14px] font-medium">
                    Delete Account
                </button>
            </div>
        </div>
    );
};
