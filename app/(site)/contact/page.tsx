import "./style.css";
import FinalCTA from "@/components/site/FinalCTA";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10 ">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pt-10 md:pt-[50px]">
        <div className="flex flex-col justify-center">
          <p className="text-[#ff8d28] font-medium text-lg tracking-tight pb-4 md:pb-[60px]">
            Get in Touch with Nationcite
          </p>
          <h1 className="text-black font-medium text-3xl md:text-[56px] leading-[1.0] md:leading-[1.0] tracking-tighter">
            Let's Build India's Research
            <br />
            Transparency Together
          </h1>
          <p className="text-[#5d5d65] text-base md:text-lg leading-relaxed pt-5">
            Whether you&apos;re a researcher seeking profile support, an
            institution exploring analytics, or a partner interested in
            collaboration our team is here to assist you with verified, secure,
            and transparent solutions.
          </p>
          <div className="mt-10 md:mt-[150px]">
            <p className="font-medium text-lg leading-none tracking-tight text-black">
              Trusted by 8,000+ Researchers India
            </p>

            <div className="flex flex-wrap gap-6 items-center text-gray-400 text-sm mt-8">
              <img
                src="/logos/Logo1.png"
                alt="Luminous"
                className="font-semibold text-gray-500"
              />
              <img
                src="/logos/Logo2.png"
                alt="Trace"
                className="font-semibold text-gray-500"
              />
              <img
                src="/logos/Logo3.png"
                alt="ProNature"
                className="font-semibold text-gray-500"
              />
              <img
                src="/logos/Logo4.png"
                alt="Nextmove"
                className="font-semibold text-gray-500"
              />
            </div>
          </div>
        </div>
        <div className="bg-white shadow-xl rounded-3xl p-6 md:p-8 border border-gray-100 ml-0 md:ml-[58px]">
          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Input"
                  className="input-main w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:bg-white focus:ring-1 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter Input"
                  className=" input-main w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:bg-white focus:ring-1 focus:ring-orange-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medical School / Affiliation{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Input"
                className=" input-main w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:bg-white focus:ring-1 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Research Paper Focus
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500 outline-none focus:border-orange-400 focus:bg-white focus:ring-1 focus:ring-orange-400"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Chose from the option
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Describe Your Mentorship Needs{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Enter Input"
                className=" input-main w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:bg-white focus:ring-1 focus:ring-orange-400"
              />
            </div>

            <button
              type="submit"
              className="font-inter mt-2 w-full rounded-xl bg-[#FF7A00] px-4 py-2 text-sm font-medium text-white hover:bg-[#e66e00] transition-colors shadow-lg shadow-orange-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <FinalCTA />
    </div>
  );
}
