"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LoginProgressLoader } from "@/components/auth/LoginProgressLoader";

const ALLOWED_REDIRECTS = new Set([
  "/dashboard",
  "/dashboard/medical",
  "/dashboard/organizations",
  "/dashboard/researchers",
  "/admin-overview",
]);

function GoogleLoginCompletion() {
  const searchParams = useSearchParams();
  const requestedRedirect = searchParams.get("next") ?? "/dashboard";
  const redirectUrl = ALLOWED_REDIRECTS.has(requestedRedirect)
    ? requestedRedirect
    : "/dashboard";

  return (
    <LoginProgressLoader
      isVisible
      onComplete={() => window.location.replace(redirectUrl)}
    />
  );
}

export default function LoginCompletePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[100dvh] bg-[var(--background)]" aria-hidden="true" />
      }
    >
      <GoogleLoginCompletion />
    </Suspense>
  );
}
