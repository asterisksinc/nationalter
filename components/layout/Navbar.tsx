"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronDown, LogOut } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is logged in and fetch registration type from API
    const checkAuth = async () => {
      const nationciteId = document.cookie
        .split("; ")
        .find((row) => row.startsWith("nationciteId="));

      if (nationciteId) {
        try {
          // Call API to get user's registration type
          const response = await fetch("/api/dashboard/scholar/me", {
            method: "GET",
            credentials: "include",
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success && data.data?.registration?.type) {
              setIsLoggedIn(true);
              setUserType(data.data.registration.type);
            }
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    checkAuth();
  }, []);

  const getDashboardLink = () => {
    if (!userType) return "/dashboard/researchers";

    const typeMap: { [key: string]: string } = {
      MEDICAL: "/dashboard/medical",
      RESEARCHER: "/dashboard/researchers",
      ORG: "/dashboard/organizations",
    };

    return typeMap[userType] || "/dashboard/researchers";
  };

  const handleLogout = () => {
    // Clear authentication cookies
    document.cookie =
      "nationciteId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    setUserType(null);
    window.location.href = "/";
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "hidden" : ""
      }`}
    >
      {/* Desktop: Centered white container */}
      <div className="hidden md:flex md:justify-center md:py-4">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-none border border-gray-100 w-[80%] max-w-[1000px] min-w-[750px] px-6  flex items-center justify-between">
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
                <div className="bg-white rounded-lg sm:rounded-xl shadow-xl border border-slate-100 py-2">
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

            <Link
              href="/contact"
              className="text-neutral-900 font-medium text-sm tracking-normal hover:text-[#FF7A00] transition-colors"
            >
              Contact
            </Link>

            {isLoggedIn ? (
              <div className="relative group">
                <button className="flex items-center gap-1 font-inter bg-[#FF7A00] text-white font-medium text-sm px-4 py-1.5 rounded-[7px] hover:bg-[#f76a23] transition-colors">
                  Dashboard
                  <ChevronDown
                    size={14}
                    className="group-hover:rotate-180 transition-transform duration-200"
                  />
                </button>

                <div className="absolute top-full right-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <div className="bg-white rounded-lg sm:rounded-xl shadow-xl border border-slate-100 overflow-hidden py-2">
                    <Link
                      href="/dashboard/researchers"
                      className="block px-4 py-2 text-slate-700 hover:bg-orange-50 hover:text-[#FF7A00] transition-colors text-sm font-medium"
                    >
                      Researcher Dashboard
                    </Link>
                    <Link
                      href="/dashboard/organizations"
                      className="block px-4 py-2 text-slate-700 hover:bg-orange-50 hover:text-[#FF7A00] transition-colors text-sm font-medium"
                    >
                      Organization Dashboard
                    </Link>
                    <Link
                      href="/dashboard/medical"
                      className="block px-4 py-2 text-slate-700 hover:bg-orange-50 hover:text-[#FF7A00] transition-colors text-sm font-medium"
                    >
                      Medical Dashboard
                    </Link>
                    <Link
                      href="/dashboard/admin"
                      className="block px-4 py-2 text-slate-700 hover:bg-orange-50 hover:text-[#FF7A00] transition-colors text-sm font-medium"
                    >
                      Admin Dashboard
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-orange-50 hover:text-[#FF7A00] transition-colors text-sm font-medium flex items-center gap-2"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative group">
                <button className="flex items-center gap-1 font-inter bg-[#FF7A00] text-white font-medium text-sm px-4 py-1.5 rounded-[7px] hover:bg-[#f76a23] transition-colors">
                  Sign Up/In
                  <ChevronDown
                    size={14}
                    className="group-hover:rotate-180 transition-transform duration-200"
                  />
                </button>

                <div className="absolute top-full right-0 pt-2 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <div className="bg-white rounded-lg sm:rounded-xl shadow-xl border border-slate-100 overflow-hidden py-2">
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
            )}
          </div>
        </div>
      </div>

      {/* Mobile: Full width */}
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
          className="flex flex-col gap-1 p-2 h-full items-center justify-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="w-6 h-0.5 bg-gray-900"></span>
          <span className="w-6 h-0.5 bg-gray-900"></span>
          <span className="w-6 h-0.5 bg-gray-900"></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown (compact) */}
      {isMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 mt-2 mx-2 z-50">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-200 py-3 px-4 flex flex-col gap-1 animate-dropdown">
            <nav className="flex flex-col gap-1">
              <Link
                href="/about"
                className="text-neutral-900 font-medium text-base py-2 px-2 rounded hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              {/* Leaderboard with submenu */}
              <div>
                <button
                  className="flex items-center gap-1 text-neutral-900 font-medium text-base py-2 px-2 w-full rounded hover:bg-gray-50"
                  onClick={() => setIsLeaderboardOpen((v) => !v)}
                  aria-expanded={isLeaderboardOpen}
                  aria-controls="mobile-leaderboard-menu"
                >
                  Leaderboard
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      isLeaderboardOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isLeaderboardOpen && (
                  <div
                    id="mobile-leaderboard-menu"
                    className="ml-4 flex flex-col gap-1"
                  >
                    <Link
                      href="/leaderboard/scholars"
                      className="py-2 px-2 text-slate-700 hover:text-[#FF7A00] hover:bg-orange-50 rounded"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Scholars
                    </Link>
                    <Link
                      href="/leaderboard/universities"
                      className="py-2 px-2 text-slate-700 hover:text-[#FF7A00] hover:bg-orange-50 rounded"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Universities
                    </Link>
                    <Link
                      href="/leaderboard/doctors"
                      className="py-2 px-2 text-slate-700 hover:text-[#FF7A00] hover:bg-orange-50 rounded"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Doctors
                    </Link>
                  </div>
                )}
              </div>
              <Link
                href="/methodology"
                className="text-neutral-900 font-medium text-base py-2 px-2 rounded hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Methodology
              </Link>
              <Link
                href="/pricing"
                className="text-neutral-900 font-medium text-base py-2 px-2 rounded hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/blog"
                className="text-neutral-900 font-medium text-base py-2 px-2 rounded hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Blogs
              </Link>
              <Link
                href="/contact"
                className="text-neutral-900 font-medium text-base py-2 px-2 rounded hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {isLoggedIn ? (
                <>
                  {/* Dashboard with submenu */}
                  <div>
                    <button
                      className="flex items-center gap-1 bg-[#FF7A00] text-white font-medium text-base px-4 py-2 rounded-[7px] w-full mt-2"
                      onClick={() => setIsAuthOpen((v) => !v)}
                      aria-expanded={isAuthOpen}
                      aria-controls="mobile-dashboard-menu"
                    >
                      Dashboard
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          isAuthOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isAuthOpen && (
                      <div
                        id="mobile-dashboard-menu"
                        className="ml-4 flex flex-col gap-1 mt-2"
                      >
                        <Link
                          href="/dashboard/researchers"
                          className="py-2 px-2 text-slate-700 hover:text-[#FF7A00] hover:bg-orange-50 rounded"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Researcher Dashboard
                        </Link>
                        <Link
                          href="/dashboard/organizations"
                          className="py-2 px-2 text-slate-700 hover:text-[#FF7A00] hover:bg-orange-50 rounded"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Organization Dashboard
                        </Link>
                        <Link
                          href="/dashboard/medical"
                          className="py-2 px-2 text-slate-700 hover:text-[#FF7A00] hover:bg-orange-50 rounded"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Medical Dashboard
                        </Link>
                        <Link
                          href="/dashboard/admin"
                          className="py-2 px-2 text-slate-700 hover:text-[#FF7A00] hover:bg-orange-50 rounded"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                          className="py-2 px-2 text-slate-700 hover:text-[#FF7A00] hover:bg-orange-50 rounded flex items-center gap-2 text-left"
                        >
                          <LogOut size={14} /> Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Sign Up/In with submenu */}
                  <div>
                    <button
                      className="flex items-center gap-1 bg-[#FF7A00] text-white font-medium text-base px-4 py-2 rounded-[7px] w-full mt-2"
                      onClick={() => setIsAuthOpen((v) => !v)}
                      aria-expanded={isAuthOpen}
                      aria-controls="mobile-auth-menu"
                    >
                      Sign Up/In
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          isAuthOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isAuthOpen && (
                      <div
                        id="mobile-auth-menu"
                        className="ml-4 flex flex-col gap-1"
                      >
                        <Link
                          href="/signin"
                          className="py-2 px-2 text-slate-700 hover:text-[#FF7A00] hover:bg-orange-50 rounded"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/signup"
                          className="py-2 px-2 text-slate-700 hover:text-[#FF7A00] hover:bg-orange-50 rounded"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}
