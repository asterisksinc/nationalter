import React from "react";
import { Instagram, Twitter, Youtube, X } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white pt-12 md:pt-20 pb-8 font-sans site-footer w-full">
      <div className="w-full mx-auto section-padding">
        {/* Separator Line */}
        <div className="w-full h-px bg-gray-800/60 mb-10 md:mb-16"></div>

        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-4 mb-10 md:mb-16">
          {/* Logo Section (Left) */}
          <div className="lg:w-1/3">
            <img
              src="/logos/pcLogo.png"
              alt="NationCite"
              className="h-10 md:h-12 lg:h-16 w-auto"
            />
          </div>

          {/* Navigation & Socials Container (Right) */}
          <div className="flex flex-wrap lg:flex-nowrap gap-6 md:gap-10 lg:gap-20 w-full lg:w-auto justify-between lg:justify-end">
            {/* Company Column */}
            <div className="flex flex-col min-w-[130px]">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-slate-900 mb-3 md:mb-4">
                Company
              </h3>
              <div className="flex flex-col gap-2 md:gap-4">
                <a
                  href="/about"
                  className="text-slate-700 hover:text-slate-900 transition-colors text-sm md:text-sm"
                >
                  About
                </a>
                <a
                  href="/methodology"
                  className="text-slate-700 hover:text-slate-900 transition-colors text-sm md:text-sm"
                >
                  Methodology
                </a>
                <a
                  href="/blog"
                  className="text-slate-700 hover:text-slate-900 transition-colors text-sm md:text-sm"
                >
                  Blogs
                </a>
                <a
                  href="/contact"
                  className="text-slate-700 hover:text-slate-900 transition-colors text-sm md:text-sm"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Leaderboards Column */}
            <div className="flex flex-col min-w-[130px]">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-slate-900 mb-3 md:mb-4">
                Leaderboards
              </h3>
              <div className="flex flex-col gap-2 md:gap-4">
                <a
                  href="/leaderboard/scholars"
                  className="text-slate-700 hover:text-slate-900 transition-colors text-sm md:text-sm"
                >
                  Researchers
                </a>
                <a
                  href="/leaderboard/universities"
                  className="text-slate-700 hover:text-slate-900 transition-colors text-sm md:text-sm"
                >
                  Universities
                </a>
                <a
                  href="/leaderboard/doctors"
                  className="text-slate-700 hover:text-slate-900 transition-colors text-sm md:text-sm"
                >
                  Medical Professionals
                </a>
              </div>
            </div>

            {/* Resources Column */}
            <div className="flex flex-col min-w-[130px]">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-slate-900 mb-3 md:mb-4">
                Resources
              </h3>
              <div className="flex flex-col gap-2 md:gap-4">
                <a
                  href="/blog"
                  className="text-slate-700 hover:text-slate-900 transition-colors text-sm md:text-sm"
                >
                  Blog
                </a>
                <a
                  href="/contact"
                  className="text-slate-700 hover:text-slate-900 transition-colors text-sm md:text-sm"
                >
                  Case Studies
                </a>
                <a
                  href="/contact"
                  className="text-slate-700 hover:text-slate-900 transition-colors text-sm md:text-sm"
                >
                  Whitepapers
                </a>
                <a
                  href="/contact"
                  className="text-slate-700 hover:text-slate-900 transition-colors text-sm md:text-sm"
                >
                  eBooks
                </a>
              </div>
            </div>

            {/* Social Icons Column (Vertical Stack on Desktop, Horizontal on Mobile) */}
            <div className="flex flex-row lg:flex-col gap-2 md:gap-3 pt-0 md:pt-2 w-full lg:w-auto justify-start lg:justify-start">
              <a
                href="#"
                className="w-8 md:w-10 h-8 md:h-10 bg-white rounded-[7px] flex items-center justify-center hover:bg-gray-200 transition-colors group"
              >
                {/* Instagram Icon */}
                <svg
                  width="16"
                  height="16"
                  className="md:w-5 md:h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="#"
                className="w-8 md:w-10 h-8 md:h-10 bg-white rounded-[7px] flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                {/* X (Twitter) Icon */}
                <svg
                  width="14"
                  height="14"
                  className="md:w-[18px] md:h-[18px]"
                  viewBox="0 0 24 24"
                  fill="black"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-8 md:w-10 h-8 md:h-10 bg-white rounded-[7px] flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                {/* Youtube Icon */}
                <svg
                  width="18"
                  height="18"
                  className="md:w-6 md:h-6"
                  viewBox="0 0 24 24"
                  fill="black"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/60 pt-6 md:pt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-4 md:gap-6 text-center md:text-left">
          <p className="text-slate-700 text-sm md:text-sm">
            © copyright Nationcite 2025
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-8">
            <a
              href="/privacy"
              className="text-slate-700 hover:text-slate-900 transition-colors text-sm md:text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="/legal"
              className="text-slate-700 hover:text-slate-900 transition-colors text-sm md:text-sm"
            >
              Legal
            </a>
            <a
              href="/terms"
              className="text-slate-700 hover:text-slate-900 transition-colors text-sm md:text-sm"
            >
              Term of Services
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
