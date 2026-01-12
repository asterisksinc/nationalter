import React from "react";
import { ShieldCheck, Link2, Database } from "lucide-react";

interface SettingsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const SettingsTabs = ({ activeTab, onTabChange }: SettingsTabsProps) => {
  const tabs = [
    {
      id: "account",
      label: "Account & Security",
      shortLabel: "Account",
      icon: ShieldCheck,
    },
    {
      id: "linked",
      label: "Linked Accounts",
      shortLabel: "Linked",
      icon: Link2,
    },
    {
      id: "data",
      label: "Data & Privacy",
      shortLabel: "Privacy",
      icon: Database,
    },
  ];

  return (
    <div className="flex overflow-x-auto border-b border-[#D1D1D6] mb-4 md:mb-[20px] h-[45px] -mx-4 md:mx-0 px-4 md:px-0">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center justify-center gap-[6px] md:gap-[8px] px-3 md:px-[14px] h-full text-[13px] md:text-[14px] font-semibold transition-colors relative tracking-[-0.02em] whitespace-nowrap ${
              isActive
                ? "text-[#FF7A00]"
                : "text-[#000000] hover:text-[#525866]"
            }`}
          >
            <Icon size={18} className="md:w-5 md:h-5" strokeWidth={1.5} />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.shortLabel}</span>
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF7A00]"></span>
            )}
          </button>
        );
      })}
    </div>
  );
};
