"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface LoginProgressLoaderProps {
  onComplete: () => void;
  duration?: number;
}

const DEFAULT_DURATION = 10_000;
const PROGRESS_STEPS = 10;
const COMPLETION_PAUSE = 120;
const FADE_DURATION = 240;

export function LoginProgressLoader({
  onComplete,
  duration = DEFAULT_DURATION,
}: LoginProgressLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let currentStep = 0;
    let completionTimer = 0;
    let redirectTimer = 0;
    const stepDuration = duration / PROGRESS_STEPS;

    const progressTimer = window.setInterval(() => {
      currentStep += 1;
      setProgress(currentStep * 10);

      if (currentStep === PROGRESS_STEPS) {
        window.clearInterval(progressTimer);
        completionTimer = window.setTimeout(() => {
          setIsExiting(true);
          redirectTimer = window.setTimeout(
            () => onCompleteRef.current(),
            FADE_DURATION,
          );
        }, COMPLETION_PAUSE);
      }
    }, stepDuration);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(completionTimer);
      window.clearTimeout(redirectTimer);
    };
  }, [duration]);

  return (
    <div
      className={`login-progress-overlay fixed inset-0 z-[100] flex min-h-[100dvh] items-center justify-center overflow-hidden bg-white px-5 py-8 text-[var(--neutral-600)] ${
        isExiting ? "login-progress-overlay--exiting" : ""
      }`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="w-full max-w-[560px] text-center">
        <div className="mx-auto mb-6 flex h-28 w-56 items-center justify-center sm:h-32 sm:w-64">
          <Image
            src="/logo.png"
            alt="NationCite"
            width={450}
            height={270}
            priority
            className="login-progress-logo h-auto w-44 sm:w-52"
          />
        </div>

        <div className="flex w-full items-center gap-3">
          <div
            className="login-progress-track h-3 flex-1 overflow-hidden rounded-[var(--radius-md)]"
            role="progressbar"
            aria-label="Preparing your workspace"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="login-progress-fill h-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="w-10 text-left text-xs font-medium tabular-nums text-[var(--neutral-500)]">
            {progress}%
          </span>
        </div>

        <p className="mt-3 text-sm font-medium text-[var(--neutral-500)]">
          Preparing Your Workspace
        </p>
      </div>

      <style jsx>{`
        .login-progress-overlay {
          animation: login-overlay-in ${FADE_DURATION}ms ease-out both;
        }

        .login-progress-overlay--exiting {
          animation: login-overlay-out ${FADE_DURATION}ms ease-in both;
        }

        .login-progress-logo {
          animation: login-logo-float 2s ease-in-out infinite;
        }

        .login-progress-track {
          background: white;
          border: 2px solid var(--neutral-200);
        }

        .login-progress-fill {
          background: var(--color-primary);
          transition: width 350ms ease-out;
        }

        @keyframes login-overlay-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes login-overlay-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes login-logo-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .login-progress-overlay,
          .login-progress-overlay--exiting,
          .login-progress-logo {
            animation: none;
          }

          .login-progress-fill {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
