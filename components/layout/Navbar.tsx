"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "hidden" : ""
      }`}
    >
      {/* Desktop: Centered white container */}
      <div className="hidden md:flex md:justify-center md:py-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-[80%] max-w-[1000px] min-w-[750px] px-6  flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-900 font-bold hover:opacity-80 transition-opacity"
          >
            <div className="h-12 w-48">
              <Image
                src="/logos/pcLogo.png"
                alt="Nationcite Logo"
                height={24}
                width={144}
                priority
              />
            </div>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/about"
              className="text-neutral-900 font-medium text-sm tracking-normal hover:text-[#FF7A00] transition-colors"
            >
              About
            </Link>

            <div className="relative group">
              <button className="flex items-center gap-1 text-neutral-900 font-medium text-sm tracking-normal hover:text-[#FF7A00] transition-colors py-4">
                Leaderboard
                <ChevronDown
                  size={14}
                  className="group-hover:rotate-180 transition-transform duration-200"
                />
              </button>

              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 py-2">
                  <Link
                    href="/leaderboard/scholars"
                    className="block px-4 py-2 text-slate-700 hover:bg-orange-50 hover:text-[#FF7A00] transition-colors"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Scholars
                  </Link>
                  <Link
                    href="/leaderboard/universities"
                    className="block px-4 py-2 text-slate-700 hover:bg-orange-50 hover:text-[#FF7A00] transition-colors"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Universities
                  </Link>
                  <Link
                    href="/leaderboard/doctors"
                    className="block px-4 py-2 text-slate-700 hover:bg-orange-50 hover:text-[#FF7A00] transition-colors"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Doctors
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/methodology"
              className="text-neutral-900 font-medium text-sm tracking-normal hover:text-[#FF7A00] transition-colors"
            >
              Methodology
            </Link>

            <Link
              href="/pricing"
              className="text-neutral-900 font-medium text-sm tracking-normal hover:text-[#FF7A00] transition-colors"
            >
              Pricing
            </Link>

            <Link
              href="/blog"
              className="text-neutral-900 font-medium text-sm tracking-normal hover:text-[#FF7A00] transition-colors"
            >
              Blogs
            </Link>

            <div className="relative group">
              <button className="flex items-center gap-1 font-inter bg-[#FF7A00] text-white font-medium text-sm px-4 py-1.5 rounded-xl hover:bg-[#f76a23] transition-colors">
                Sign Up/In
                <ChevronDown
                  size={14}
                  className="group-hover:rotate-180 transition-transform duration-200"
                />
              </button>

              <div className="absolute top-full right-0 pt-2 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden py-2">
                  <Link
                    href="/signin"
                    className="block px-4 py-2 text-slate-700 hover:bg-orange-50 hover:text-[#FF7A00] transition-colors text-sm font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-4 py-2 text-slate-700 hover:bg-orange-50 hover:text-[#FF7A00] transition-colors text-sm font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Full width (unchanged) */}
      <div className="md:hidden w-full flex items-center justify-between px-2 py-2 bg-white border-b border-gray-200">
        {/* Mobile Logo */}
        <Link href="/" className="flex items-center h-full flex-1">
          <Image
            src="/logos/mobilelogo.png"
            alt="Nationcite Mobile Logo"
            width={120}
            height={120}
            priority
            className="h-full w-auto object-contain"
          />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="flex flex-col gap-1 p-2 h-full flex items-center justify-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="w-6 h-0.5 bg-gray-900"></span>
          <span className="w-6 h-0.5 bg-gray-900"></span>
          <span className="w-6 h-0.5 bg-gray-900"></span>
        </button>
      </div>

      {/* Mobile Menu (unchanged) */}
      {isMenuOpen && (
        <div className="md:hidden w-full h-14 flex items-center justify-between px-4 bg-white border-b border-gray-200">
          {/* Mobile Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logos/mobilelogo.png"
              alt="Nationcite Mobile Logo"
              width={120} // any value, will be constrained
              height={40}
              priority
              className="h-8 w-auto object-contain"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="w-6 h-0.5 bg-gray-900"></span>
            <span className="w-6 h-0.5 bg-gray-900"></span>
            <span className="w-6 h-0.5 bg-gray-900"></span>
          </button>
        </div>
      )}
    </nav>
  );
}
