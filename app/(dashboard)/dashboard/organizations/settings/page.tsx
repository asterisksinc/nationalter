"use client";

import React, { useState } from "react";
import { SettingsTabs } from "./components/SettingsTabs";
import { AccountSettings } from "./components/AccountSettings";
import { LinkedAccounts } from "./components/LinkedAccounts";
import { DataPrivacy } from "./components/DataPrivacy";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <>
      {/* Page Title */}
      <div className="mb-4 md:mb-6 pb-3 md:pb-4 border-b border-[#E1E4EA] -mx-4 md:-mx-6 px-4 md:px-6">
        <div className="font-bold md:font-medium text-[18px] md:text-[16px] leading-[20px] text-[#0E121B] mb-[6px] tracking-[-0.006em]">
          Settings & Privacy
        </div>
        <p className="text-[13px] md:text-[14px] leading-[120%] text-[#8E8E93]">
          Manage your account settings and privacy preferences.
        </p>
      </div>

      {/* Tabs */}
      <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <div className="pt-4 md:pt-[20px]">
        {activeTab === "account" && <AccountSettings />}
        {activeTab === "linked" && <LinkedAccounts />}
        {activeTab === "data" && <DataPrivacy />}
      </div>
    </>
  );
}
