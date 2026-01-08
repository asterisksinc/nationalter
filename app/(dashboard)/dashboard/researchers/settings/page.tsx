"use client";

import React, { useState } from "react";
import {
    DashboardSidebar,
    DashboardHeader,
} from "../components";
import { SettingsTabs } from "./components/SettingsTabs";
import { AccountSettings } from "./components/AccountSettings";
import { LinkedAccounts } from "./components/LinkedAccounts";
import { DataPrivacy } from "./components/DataPrivacy";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("account");

    return (
        <div className="flex min-h-screen bg-[#f8f9fa] font-sans text-[#1e1e1e]">
            {/* Sidebar */}
            <DashboardSidebar activePage="settings" />

            {/* Main Content */}
            <main className="flex-1 ml-[260px] p-[24px] min-w-[1180px] bg-white text-[#333333]">
                {/* Header */}
                <DashboardHeader
                    breadcrumbItems={[
                        { label: "Home", href: "/dashboard/researchers" },
                        { label: "Settings & Privacy" },
                    ]}
                />

                {/* Page Title */}
                <div className="mb-[20px]">
                    <h4 className="font-semibold text-[16px] leading-[20px] text-[#0E121B] mb-[6px] tracking-[-0.006em]">
                        Settings & Privacy
                    </h4>
                    <p className="text-[14px] leading-[120%] text-[#525866]">
                        Manage your account settings and privacy preferences.
                    </p>
                </div>

                {/* Tabs */}
                <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

                {/* Tab Content */}
                <div className="bg-white rounded-[8px] p-[24px] border border-[#E1E4EA]">
                    {activeTab === "account" && <AccountSettings />}
                    {activeTab === "linked" && <LinkedAccounts />}
                    {activeTab === "data" && <DataPrivacy />}
                </div>
            </main>
        </div>
    );
}
