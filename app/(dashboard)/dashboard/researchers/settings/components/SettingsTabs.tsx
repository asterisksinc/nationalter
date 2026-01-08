import React from "react";
import { ShieldCheck, Link2, Database } from "lucide-react";

interface SettingsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const SettingsTabs = ({ activeTab, onTabChange }: SettingsTabsProps) => {
  const tabs = [
    { id: "account", label: "Account & Security", icon: ShieldCheck },
    { id: "linked", label: "Linked Accounts", icon: Link2 },
    { id: "data", label: "Data & Privacy", icon: Database },
  ];

  return (
    <div className="flex border-b border-[#D1D1D6] mb-[20px] h-[45px]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center justify-center gap-[8px] px-[14px] h-full text-[14px] font-semibold transition-colors relative tracking-[-0.02em] ${
              isActive
                ? "text-[#FF7A00]"
                : "text-[#000000] hover:text-[#525866]"
            }`}
          >
            <Icon size={20} strokeWidth={1.5} />
            {tab.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF7A00]"></span>
            )}
          </button>
        );
      })}
    </div>
  );
};
