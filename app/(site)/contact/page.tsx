"use client";

import { useState } from "react";
import FinalCTA from "@/components/site/FinalCTA";
import { Zap, Triangle, Sprout, MousePointer2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    institution: "",
    inquiryType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          phone: "",
          email: "",
          institution: "",
          inquiryType: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-[100px] py-16 md:py-24 bg-white font-sans">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Content */}
          <div className="flex flex-col pt-4">
            {/* BADGE */}
            <div className="inline-block border border-[#F76A23]/30 bg-[#F76A23]/5 px-3 py-1 rounded-md mb-8 w-fit">
              <span className="text-[#F76A23] font-semibold text-xs md:text-sm uppercase tracking-wider">
                GET IN TOUCH WITH NATIONCITE
              </span>
            </div>

            {/* HEADING replacement with div */}
            <div className="text-[40px] md:text-[64px] font-extrabold leading-[1.05] tracking-tight text-black mb-8 max-w-[600px]">
              Let&apos;s Build India&apos;s
              <br />
              Research
              <br />
              Transparency
              <br />
              Together
            </div>

            {/* DESCRIPTION */}
            <div className="text-base md:text-lg text-[#5C5C5C] leading-relaxed mb-16 max-w-[500px]">
              Whether you&apos;re a researcher seeking profile support, an
              institution exploring analytics, or a partner interested in
              collaboration – our team is here to assist you with verified,
              secure, and transparent solutions.
            </div>

            {/* Trusted By Section */}
            <div>
              <div className="text-[24px] md:text-[32px] font-bold text-black mb-10">
                Trusted by 8,000+ Researchers India
              </div>

              <div className="flex flex-wrap items-center gap-10 opacity-70">
                {/* Luminous */}
                <div className="flex items-center gap-2">
                  <Zap className="w-8 h-8 text-black" />
                  <span className="text-2xl font-bold text-black tracking-tight">luminous</span>
                </div>
                {/* Trace */}
                <div className="flex items-center gap-2">
                  <Triangle className="w-8 h-8 text-black fill-transparent" />
                  <span className="text-2xl font-bold text-black tracking-tight">Trace</span>
                </div>
                {/* ProNature */}
                <div className="flex items-center gap-2">
                  <Sprout className="w-8 h-8 text-black" />
                  <span className="text-2xl font-bold text-black tracking-tight">ProNature</span>
                </div>
                {/* Nextmove */}
                <div className="flex items-center gap-2">
                  <MousePointer2 className="w-8 h-8 text-black" />
                  <span className="text-2xl font-bold text-black tracking-tight">Nextmove</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form Card */}
          <div className="bg-white shadow-[0_10px_50px_rgba(0,0,0,0.06)] rounded-[20px] p-8 md:p-12 border border-black/[0.03]">
            <div className="text-[32px] md:text-[48px] font-bold text-black mb-10 leading-none">
              Contact Form
            </div>

            {submitStatus === "success" && (
              <div className="mb-8 p-4 bg-green-50 border border-green-100 rounded-xl">
                <div className="text-green-800 font-medium">Message sent!</div>
                <div className="text-green-600 text-sm">We&apos;ll be in touch.</div>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl">
                <div className="text-red-800 font-medium">Something went wrong</div>
                <div className="text-red-600 text-sm">Please try again.</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-black">
                  Name <span className="text-red-500">*</span>
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="w-full rounded-xl border-none bg-[#F9FAFB] px-4 py-4 text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#FF7A00]/20 transition-all"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-black">
                  Phone <span className="text-red-500">*</span>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  required
                  className="w-full rounded-xl border-none bg-[#F9FAFB] px-4 py-4 text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#FF7A00]/20 transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-black">
                  Email Address <span className="text-red-500">*</span>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full rounded-xl border-none bg-[#F9FAFB] px-4 py-4 text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#FF7A00]/20 transition-all"
                />
              </div>

              {/* Institution/Affiliation */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-black">
                  Institution/Affiliation <span className="text-red-500">*</span>
                </div>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="Input Text"
                  required
                  className="w-full rounded-xl border-none bg-[#F9FAFB] px-4 py-4 text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#FF7A00]/20 transition-all"
                />
              </div>

              {/* Inquiry Type */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-black">
                  Inquiry Type <span className="text-red-500">*</span>
                </div>
                <div className="relative">
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    required
                    className="w-full appearance-none rounded-xl border-none bg-[#F9FAFB] px-4 py-4 text-gray-800 outline-none focus:ring-2 focus:ring-[#FF7A00]/20 transition-all"
                  >
                    <option value="" disabled>
                      Choose from the option
                    </option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="research">Research Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                    <span className="text-gray-400 text-xs">▼</span>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-black">
                  Message <span className="text-red-500">*</span>
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Long Answer"
                  required
                  className="w-full rounded-xl border-none bg-[#F9FAFB] px-4 py-4 text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#FF7A00]/20 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF7A00] text-white py-4 rounded-xl text-lg font-bold hover:bg-[#e66e00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-200"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

