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
      className={`login-progress-overlay fixed inset-0 z-[100] flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[var(--background)] px-5 py-8 text-[var(--foreground)] ${
        isExiting ? "login-progress-overlay--exiting" : ""
      }`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="login-progress-orb login-progress-orb--one" aria-hidden="true" />
      <div className="login-progress-orb login-progress-orb--two" aria-hidden="true" />
      <div className="login-progress-grid absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-md text-center">
        <div className="login-progress-logo-shell mx-auto mb-7 flex h-32 w-32 items-center justify-center rounded-[var(--radius-lg)] sm:h-36 sm:w-36">
          <div className="login-progress-logo-halo absolute inset-0 rounded-[var(--radius-lg)]" />
          <Image
            src="/logo.png"
            alt="NationCite"
            width={450}
            height={270}
            priority
            className="login-progress-logo relative h-auto w-28 sm:w-32"
          />
        </div>

        <h1 className="mb-2 text-xl font-semibold tracking-[-0.02em] text-[var(--foreground)] sm:text-2xl">
          Preparing your workspace…
        </h1>
        <p className="mb-7 text-sm text-[var(--foreground)] opacity-60 sm:text-base">
          Your research dashboard is almost ready.
        </p>

        <div
          className="login-progress-track h-2.5 w-full overflow-hidden rounded-[var(--radius-pill)]"
          role="progressbar"
          aria-label="Preparing your workspace"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div
            className="login-progress-fill h-full rounded-[var(--radius-pill)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs font-medium sm:text-sm">
          <span className="text-[var(--foreground)] opacity-50">Signing you in securely</span>
          <span className="tabular-nums text-[var(--color-primary)]">
            {progress}%
          </span>
        </div>
      </div>

      <style jsx>{`
        .login-progress-overlay {
          animation: login-overlay-in ${FADE_DURATION}ms ease-out both;
          isolation: isolate;
        }

        .login-progress-overlay--exiting {
          animation: login-overlay-out ${FADE_DURATION}ms ease-in both;
        }

        .login-progress-grid {
          background-image:
            linear-gradient(
              color-mix(in srgb, var(--color-primary) 7%, transparent) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              color-mix(in srgb, var(--color-primary) 7%, transparent) 1px,
              transparent 1px
            );
          background-size: 44px 44px;
          mask-image: radial-gradient(circle at center, black, transparent 72%);
          opacity: 0.65;
          animation: login-grid-drift 12s linear infinite;
        }

        .login-progress-orb {
          position: absolute;
          width: min(55vw, 32rem);
          aspect-ratio: 1;
          border-radius: var(--radius-pill);
          background: var(--color-primary);
          filter: blur(100px);
          opacity: 0.1;
          animation: login-orb-float 5s ease-in-out infinite alternate;
        }

        .login-progress-orb--one {
          top: -22%;
          left: -10%;
        }

        .login-progress-orb--two {
          right: -12%;
          bottom: -24%;
          background: var(--color-accent);
          animation-delay: -2.5s;
        }

        .login-progress-logo-shell {
          position: relative;
          background: color-mix(
            in srgb,
            var(--color-warm-100) 32%,
            var(--background)
          );
          border: 1px solid
            color-mix(in srgb, var(--color-primary) 18%, transparent);
          box-shadow: var(--shadow-md);
        }

        .login-progress-logo-halo {
          border: 1px solid
            color-mix(in srgb, var(--color-primary) 38%, transparent);
          animation: login-logo-halo 1.8s ease-out infinite;
        }

        .login-progress-logo {
          animation: login-logo-float 1.8s ease-in-out infinite;
        }

        .login-progress-track {
          background: color-mix(
            in srgb,
            var(--foreground) 10%,
            var(--background)
          );
          box-shadow: inset 0 1px 2px
            color-mix(in srgb, var(--foreground) 8%, transparent);
        }

        .login-progress-fill {
          background: linear-gradient(
            90deg,
            var(--color-primary),
            var(--color-accent)
          );
          box-shadow: 0 0 16px
            color-mix(in srgb, var(--color-primary) 38%, transparent);
          transition: width 80ms linear;
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
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-5px) scale(1.025);
          }
        }

        @keyframes login-logo-halo {
          0% {
            opacity: 0.7;
            transform: scale(0.92);
          }
          100% {
            opacity: 0;
            transform: scale(1.22);
          }
        }

        @keyframes login-grid-drift {
          to {
            transform: translate3d(44px, 44px, 0);
          }
        }

        @keyframes login-orb-float {
          to {
            transform: translate3d(8%, 10%, 0) scale(1.08);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .login-progress-overlay,
          .login-progress-overlay--exiting,
          .login-progress-grid,
          .login-progress-orb,
          .login-progress-logo,
          .login-progress-logo-halo {
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
