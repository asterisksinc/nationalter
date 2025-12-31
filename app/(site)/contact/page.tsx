import "./style.css";
import FinalCTA from "@/components/site/FinalCTA";

export default function ContactPage() {
  return (
    <>
      {/* Hero/Contact Section */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-[120px] py-10 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center">
            {/* BADGE */}
            <span className="inline-block bg-white text-[#F76A23] border border-[#F76A23]/30 px-2 sm:px-3 md:px-3 lg:px-3 py-1 rounded-[6px] font-medium text-xs sm:text-sm md:text-sm lg:text-sm tracking-wide uppercase shadow-sm mb-4 sm:mb-6 md:mb-6 lg:mb-8 w-fit">
              Get in Touch with Nationcite
            </span>

            {/* HEADING */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 sm:mb-6 md:mb-6 lg:mb-6">
              Let's Build India's Research
              <br />
              Transparency Together
            </h1>

            {/* DESCRIPTION */}
            <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#5C5C5C] leading-relaxed mb-8 sm:mb-12 md:mb-16 lg:mb-24">
              Whether you're a researcher seeking profile support, an
              institution exploring analytics, or a partner interested in
              collaboration – our team is here to assist you with verified,
              secure, and transparent solutions.
            </p>

            {/* Trusted By Section */}
            <div>
              <h5 className="text-sm sm:text-base md:text-base lg:text-lg font-medium text-[#1E1E1E] mb-4 sm:mb-6 md:mb-6 lg:mb-6">
                Trusted by 8,000+ Researchers India
              </h5>

              <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-6 lg:gap-6 items-center">
                <img
                  src="/logos/Logo1.png"
                  alt="Luminous"
                  className="h-6 sm:h-7 md:h-8 lg:h-8 object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
                <img
                  src="/logos/Logo2.png"
                  alt="Trace"
                  className="h-6 sm:h-7 md:h-8 lg:h-8 object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
                <img
                  src="/logos/Logo3.png"
                  alt="ProNature"
                  className="h-6 sm:h-7 md:h-8 lg:h-8 object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
                <img
                  src="/logos/Logo4.png"
                  alt="Nextmove"
                  className="h-6 sm:h-7 md:h-8 lg:h-8 object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white shadow-xl rounded-xl sm:rounded-2xl md:rounded-2xl lg:rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10 border border-gray-100">
            <form className="space-y-4 sm:space-y-5 md:space-y-5 lg:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm md:text-sm lg:text-sm font-medium text-[#1E1E1E] mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Input"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 sm:px-4 md:px-4 lg:px-4 py-2 sm:py-2.5 md:py-2.5 lg:py-2.5 text-xs sm:text-sm md:text-sm lg:text-sm outline-none focus:border-[#FF7A00] focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm md:text-sm lg:text-sm font-medium text-[#1E1E1E] mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Input"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 sm:px-4 md:px-4 lg:px-4 py-2 sm:py-2.5 md:py-2.5 lg:py-2.5 text-xs sm:text-sm md:text-sm lg:text-sm outline-none focus:border-[#FF7A00] focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/20 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm md:text-sm lg:text-sm font-medium text-[#1E1E1E] mb-2">
                  Medical School / Affiliation{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Input"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 sm:px-4 md:px-4 lg:px-4 py-2 sm:py-2.5 md:py-2.5 lg:py-2.5 text-xs sm:text-sm md:text-sm lg:text-sm outline-none focus:border-[#FF7A00] focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm md:text-sm lg:text-sm font-medium text-[#1E1E1E] mb-2">
                  Research Paper Focus
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3 sm:px-4 md:px-4 lg:px-4 py-2 sm:py-2.5 md:py-2.5 lg:py-2.5 text-xs sm:text-sm md:text-sm lg:text-sm text-gray-500 outline-none focus:border-[#FF7A00] focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/20 transition-all"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Choose from the option
                    </option>
                    <option>Clinical Research</option>
                    <option>Public Health</option>
                    <option>Medical Education</option>
                    <option>Other</option>
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 text-xs">
                    ▼
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm md:text-sm lg:text-sm font-medium text-[#1E1E1E] mb-2">
                  Describe Your Mentorship Needs{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter Input"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 sm:px-4 md:px-4 lg:px-4 py-2 sm:py-2.5 md:py-2.5 lg:py-2.5 text-xs sm:text-sm md:text-sm lg:text-sm outline-none focus:border-[#FF7A00] focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/20 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF7A00] text-white px-4 sm:px-6 md:px-6 lg:px-6 py-2 sm:py-3 md:py-3 lg:py-3 rounded-lg sm:rounded-xl md:rounded-xl lg:rounded-xl text-sm sm:text-base md:text-base lg:text-base font-medium hover:bg-[#ff8d28] active:bg-[#ff6d00] transition duration-200 shadow-lg shadow-orange-200 hover:shadow-md focus:ring-2 focus:ring-[#FF7A00] focus:ring-offset-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
