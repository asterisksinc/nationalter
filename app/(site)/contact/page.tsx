"use client";

import { useState } from "react";
import FinalCTA from "@/components/site/FinalCTA";
import Head from "next/head";
import { useCmsPage } from "@/lib/use-cms-page";

const DEFAULT_CMS = {
  hero: {
    desktop_background_image: "/Bg.jpg",
    mobile_background_image: "/Mobile_Responsive.jpg",
    kicker: "Get in Touch with Nationcite",
    heading_line_1: "Let's Build India's Research",
    heading_line_2: "Transparency Together",
    body:
      "Whether you're a researcher seeking profile support, an institution exploring analytics, or a partner interested in collaboration – our team is here to assist you with verified, secure, and transparent solutions.",
    trusted_by_text: "Trusted by 8,000+ Researchers in India",
  },
  form: {
    title: "Contact Form",
    success_title: "Message sent successfully!",
    success_body: "We'll get back to you soon.",
    error_title: "Failed to send message",
    error_body: "Please try again later.",
    submit_label: "Submit",
    submitting_label: "Submitting...",
  },
  final_cta: {
    kicker: "Get Verified",
    heading: "Your work deserves to be seen",
    body:
      "Don't let your hard-earned citations get lost in the noise. Join India's top researchers on the leaderboard today.",
    primary_cta_label: "Claim My Profile Now",
    banner_image: "/CTA Section Image - Nationcite.png",
    banner_alt: "Nationcite CTA Section",
  },
};

export default function ContactPage() {
  const cms = useCmsPage("contact", DEFAULT_CMS);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    institution: '',
    inquiryType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          institution: '',
          inquiryType: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  return (
    <>
       <Head>
        <title>Contact NationCite | Research Ranking Support</title>
        <meta
          name="description"
          content="Get assistance with profile claims, institutional dashboards, and ranking inquiries. Contact NationCite's research support team today."
        />
        <meta name="keywords" content="contact NationCite, research ranking support India" />
        <meta property="og:title" content="Contact NationCite | Research Ranking Support" />
      </Head>
      {/* Hero/Contact Section */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-[120px] pt-32 pb-12 bg-white min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center text-center md:text-left h-full">
            {/* BADGE */}
            <div className="inline-block bg-white text-[#F76A23] border border-[#F76A23]/30 px-3 py-1 rounded-[6px] font-medium text-xs tracking-wide uppercase mb-4 w-fit md:w-fit mx-auto md:mx-0">
              {cms.hero.kicker}
            </div>

            {/* HEADING */}
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 text-center md:text-left font-bold text-black">
              {cms.hero.heading_line_1}
              <br />
              {cms.hero.heading_line_2}
            </div>

            {/* DESCRIPTION */}
            <p className="text-sm sm:text-base lg:text-md text-[#5C5C5C] leading-relaxed mb-6 lg:mb-12 text-center md:text-left max-w-[500px] mx-auto md:mx-0">
              {cms.hero.body}
            </p>

            {/* Trusted By Section */}
            <div className="mt-auto pl-0 md:pl-8">
              <div className="text-sm sm:text-base font-medium text-[#1E1E1E] mb-4  md:text-left">
                {cms.hero.trusted_by_text}
              </div>

              <div className="flex flex-wrap gap-4 sm:gap-6 items-center">
                <img
                  src="/logos/Logo1.png"
                  alt="Luminous"
                  className="h-6 sm:h-7 object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
                <img
                  src="/logos/Logo2.png"
                  alt="Trace"
                  className="h-6 sm:h-7 object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
                <img
                  src="/logos/Logo3.png"
                  alt="ProNature"
                  className="h-6 sm:h-7 object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
                <img
                  src="/logos/Logo4.png"
                  alt="Nextmove"
                  className="h-6 sm:h-7 object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white shadow-xl rounded-xl p-5 sm:p-6 lg:p-8 border border-gray-100">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1E1E1E] mb-4">{cms.form.title}</div>
            
            {submitStatus === 'success' && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-green-800 font-medium text-sm">{cms.form.success_title}</div>
                <div className="text-green-600 text-xs">{cms.form.success_body}</div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-red-800 font-medium text-sm">{cms.form.error_title}</div>
                <div className="text-red-600 text-xs">{cms.form.error_body}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#1E1E1E] mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-black placeholder:text-black outline-none focus:border-[#FF7A00] focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/20 transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#1E1E1E] mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  required
                  className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-black placeholder:text-black outline-none focus:border-[#FF7A00] focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/20 transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#1E1E1E] mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-black placeholder:text-black outline-none focus:border-[#FF7A00] focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/20 transition-all"
                />
              </div>

              {/* Institution/Affiliation */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#1E1E1E] mb-1">
                  Institution/Affiliation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="Input Text"
                  required
                  className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-black placeholder:text-black outline-none focus:border-[#FF7A00] focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/20 transition-all"
                />
              </div>

              {/* Inquiry Type */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#1E1E1E] mb-1">
                  Inquiry Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    required
                    className="w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-black outline-none focus:border-[#FF7A00] focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/20 transition-all"
                  >
                    <option value="" disabled className="text-black">
                      Choose from the option
                    </option>
                    <option value="General Inquiry" className="text-black">General Inquiry</option>
                    <option value="Technical Support" className="text-black">Technical Support</option>
                    <option value="Partnership" className="text-black">Partnership</option>
                    <option value="Research Collaboration" className="text-black">Research Collaboration</option>
                    <option value="Media & Press" className="text-black">Media & Press</option>
                    <option value="Other" className="text-black">Other</option>
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 text-xs">
                    ▼
                  </span>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#1E1E1E] mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Long Answer"
                  required
                  className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-black placeholder:text-black outline-none focus:border-[#FF7A00] focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/20 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF7A00] text-white px-6 py-2.5 rounded-[7px] text-sm font-medium hover:bg-[#ff8d28] active:bg-[#ff6d00] transition duration-200 shadow-md hover:shadow-lg focus:ring-2 focus:ring-[#FF7A00] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isSubmitting ? cms.form.submitting_label : cms.form.submit_label}
              </button>
            </form>
          </div>
        </div>
      </section>

      <FinalCTA cms={cms.final_cta} />
    </>
  );
}
