"use client";

import React, { useState, useEffect } from "react";
import { Download, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const DataPrivacy = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user data to get registration date
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/dashboard/scholar/me");
        const json = await res.json();
        if (json.success && json.data) {
          setUserData(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleDownloadData = async () => {
    setLoading(true);
    try {
      // TODO: Implement backend API for data export
      const response = await fetch("/api/user/export-data", {
        method: "POST"
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `nationcite-data-${new Date().toISOString().split("T")[0]}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {
        alert("Failed to download data. Please try again.");
      }
    } catch (error) {
      console.error("Download error:", error);
      alert("An error occurred while downloading your data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // TODO: Implement backend API for account deletion
      const response = await fetch("/api/user/delete-account", {
        method: "DELETE"
      });
      
      if (response.ok) {
        // Redirect to home or signup page after deletion
        window.location.href = "/";
      } else {
        alert("Failed to delete account. Please try again.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting your account.");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <>
      <div className="space-y-6 md:space-y-[32px]">
        {/* Data Export */}
        <section>
          <div className="flex items-center gap-[6px] mb-[12px]">
            <Download size={18} strokeWidth={1.5} className="text-[#525866]" />
            <div className="text-[15px] md:text-[16px] font-medium text-[#0E121B] tracking-[-0.006em]">
              Data Export
            </div>
          </div>
          <div className="border-b border-[#E1E4EA] mb-4 md:mb-[20px]"></div>

          <div className="space-y-[20px]">
            <div>
              <label className="block text-[13px] md:text-[14px] font-medium text-[#181B25] mb-[8px]">
                Status
              </label>
              <button 
                onClick={handleDownloadData}
                disabled={loading}
                className="flex items-center gap-[6px] px-[12px] py-[6px] bg-[#F2F5F8] rounded-[6px] text-[13px] md:text-[14px] text-[#525866] hover:bg-[#E1E4EA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Preparing..." : "Download Data"} <Download size={14} className="text-[#525866]" />
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
              <Link href="/legal" className="text-[#007AFF] cursor-pointer hover:underline">
                Terms of Service
              </Link>{" "}
              on {userData?.registration?.createdAt ? formatDate(userData.registration.createdAt) : "[Date]"}
            </p>
          </div>
        </section>

        <div className="pt-8 md:pt-[40px] text-center">
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="text-[#E82323] hover:text-[#DF120B] text-[13px] md:text-[14px] font-medium"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-semibold text-[#0E121B] mb-4">
              Delete Account
            </h3>
            <p className="text-sm text-[#525866] mb-6">
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm font-medium text-[#525866] bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 text-sm font-medium text-white bg-[#E82323] rounded-lg hover:bg-[#DF120B] transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
