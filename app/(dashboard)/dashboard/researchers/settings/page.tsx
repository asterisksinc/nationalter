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
      <div className="mb-[20px]">
        <div className="font-medium text-[16px] leading-[20px] text-[#0E121B] mb-[6px] tracking-[-0.006em]">
          Settings & Privacy
        </div>
        <p className="text-[14px] leading-[120%] text-[#8E8E93]">
          Manage your account settings and privacy preferences.
        </p>
      </div>

      {/* Tabs */}
      <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <div className="pt-[20px]">
        {activeTab === "account" && <AccountSettings />}
        {activeTab === "linked" && <LinkedAccounts />}
        {activeTab === "data" && <DataPrivacy />}
      </div>
    </>
  );
}
