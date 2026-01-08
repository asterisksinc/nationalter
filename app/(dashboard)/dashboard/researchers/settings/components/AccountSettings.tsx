import React from "react";
import { Mail, Lock, Shield } from "lucide-react";

export const AccountSettings = () => {
    return (
        <div className="space-y-[40px]">
            {/* Email Engagement */}
            <section>
                <div className="flex items-center gap-[8px] mb-[16px]">
                    <Mail size={20} className="text-[#FF8D28]" />
                    <h4 className="text-[16px] leading-[20px] font-medium text-[#0E121B] tracking-[-0.006em]">Email Engagement</h4>
                </div>
                <div className="border-b border-[#E1E4EA] mb-[24px]"></div>

                <div className="space-y-[20px]">
                    <div>
                        <label className="block text-[14px] font-medium text-[#525866] mb-[6px]">
                            Primary Email
                        </label>
                        <div className="text-[#181B25] text-[14px]">researcher@iisc.ac.in</div>
                    </div>

                    <div>
                        <label className="block text-[14px] font-medium text-[#525866] mb-[6px]">
                            Add Secondary Email
                        </label>
                        <input
                            type="email"
                            placeholder="johndoe@org.in"
                            className="w-full h-[42px] px-[12px] bg-white border border-[#AEAEB2] rounded-[6px] text-[14px] text-[#000000] focus:outline-none focus:border-[#FF7A00] placeholder-[#8E8E93]"
                        />
                    </div>
                </div>
            </section>

            {/* Password Change */}
            <section>
                <div className="flex items-center gap-[8px] mb-[16px]">
                    <Lock size={20} className="text-[#FF8D28]" />
                    <h4 className="text-[16px] leading-[20px] font-medium text-[#0E121B] tracking-[-0.006em]">Password Change</h4>
                </div>
                <div className="border-b border-[#E1E4EA] mb-[24px]"></div>

                <button className="text-[#0088FF] hover:text-[#0066CC] text-[14px] font-medium transition-colors">
                    Reset your password
                </button>
            </section>

            {/* Two-Factor Authentication */}
            <section>
                <div className="flex items-center gap-[8px] mb-[16px]">
                    <Shield size={20} className="text-[#FF8D28]" />
                    <h4 className="text-[16px] leading-[20px] font-medium text-[#0E121B] tracking-[-0.006em]">
                        Two-Factor Authentication (2FA)
                    </h4>
                </div>
                <div className="border-b border-[#E1E4EA] mb-[24px]"></div>

                <div className="flex items-center gap-[12px]">
                    <span className="text-[14px] font-medium text-[#525866]">Disable</span>
                    {/* Toggle Switch */}
                    <button className="w-[35px] h-[18px] bg-[#E0E0E0] border border-[#C7C7CC] rounded-[23.5px] relative transition-colors focus:outline-none flex items-center">
                        <span className="absolute left-0 w-[17px] h-[17px] bg-[#A3A3A3] rounded-[16.7857px] shadow-sm transition-transform"></span>
                    </button>
                    <span className="text-[14px] font-medium text-[#525866]">Enable</span>
                </div>
            </section>
        </div>
    );
};
