"use client";

import Link from "next/link";

export const SigninSidebar = () => {
  return (
    <div className="w-full h-full p-8 flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50 -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-50 -ml-32 -mb-32" />

      {/* Logo at top */}
      <div className="relative">
        <img src="/logo.png" alt="NationCite Logo" className="h-16 w-auto" />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer link at bottom */}
      <div className="relative">
        <div className="text-sm text-neutral-900">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-[#0EA5E9] font-medium hover:underline"
          >
            Create New
          </Link>
        </div>
      </div>
    </div>
  );
};
