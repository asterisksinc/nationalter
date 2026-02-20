"use client";

import { useState } from "react";
import FinalCTA from "@/components/site/FinalCTA";

export default function ContactPage() {
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
    } catch (error) {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  return (
    <>
      {/* Hero/Contact Section */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-[120px] py-10 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center text-center md:text-left">
            {/* BADGE */}
            <span className="inline-block bg-white text-[#F76A23] border border-[#F76A23]/30 px-2 sm:px-3 md:px-3 lg:px-3 py-1 rounded-[6px] font-medium text-xs sm:text-sm md:text-sm lg:text-sm tracking-wide uppercase shadow-none mb-4 sm:mb-6 md:mb-6 lg:mb-8 w-fit md:w-fit mx-auto md:mx-0">
              Get in Touch with Nationcite
            </span>

            {/* HEADING */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 sm:mb-6 md:mb-6 lg:mb-6 text-center md:text-left font-bold">
              Let's Build India's Research
              <br />
              Transparency Together
            </h1>

            {/* DESCRIPTION */}
            <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#5C5C5C] leading-relaxed mb-8 sm:mb-12 md:mb-16 lg:mb-24 text-center md:text-left max-w-[500px] mx-auto md:mx-0">
              Whether you're a researcher seeking profile support, an
              institution exploring analytics, or a partner interested in
              collaboration – our team is here to assist you with verified,
              secure, and transparent solutions.
            </p>

            {/* Trusted By Section */}
            <div>
              <h2 className="text-sm sm:text-base md:text-base lg:text-lg font-medium text-[#1E1E1E] mb-4 sm:mb-6 md:mb-6 lg:mb-6 text-center md:text-left">
                Trusted by 8,000+ Researchers India
              </h2>

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
          <div className="bg-white shadow-xl rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10 border border-gray-100">
            <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-[#1E1E1E] mb-6">Contact Form</h2>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-green-800 font-medium">Message sent successfully!</div>
                <div className="text-green-600 text-sm">We'll get back to you soon.</div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-red-800 font-medium">Failed to send message</div>
                <div className="text-red-600 text-sm">Please try again later.</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-5 lg:space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm sm:text-sm md:text-sm lg:text-sm font-medium text-[#1E1E1E] mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="w-full rounded-md sm:rounded-lg border border-gray-200 bg-gray-50 px-3 sm:px-4 md:px-4 lg:px-4 py-2 sm:py-2.5 md:py-2.5 lg:py-2.5 text-sm sm:text-sm md:text-sm lg:text-sm outline-none focus:border-[#FF7A00] focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/20 transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm sm:text-sm md:text-sm lg:text-sm font-medium text-[#1E1E1E] mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  required
                  className="w-full rounded-md sm:rounded-lg border border-gray-200 bg-gray-50 px-3 sm:px-4 md:px-4 lg:px-4 py-2 sm:py-2.5 md:py-2.5 lg:py-2.5 text-sm sm:text-sm md:text-sm lg:text-sm outline-none focus:border-[#FF7A00] focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/20 transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm sm:text-sm md:text-sm lg:text-sm font-medium text-[#1E1E1E] mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full rounded-md sm:rounded-lg border border-gray-200 bg-gray-50 px-3 sm:px-4 md:px-4 lg:px-4 py-2 sm:py-2.5 md:py-2.5 lg:py-2.5 text-sm sm:text-sm md:text-sm lg:text-sm outline-none focus:border-[#FF7A00] focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/20 transition-all"
                />
              </div>

              {/* Institution/Affiliation */}
              <div>
                <label className="block text-sm sm:text-sm md:text-sm lg:text-sm font-medium text-[#1E1E1E] mb-2">
                  Institution/Affiliation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="Input Text"
                  required
                  className="w-full rounded-md sm:rounded-lg border border-gray-200 bg-gray-50 px-3 sm:px-4 md:px-4 lg:px-4 py-2 sm:py-2.5 md:py-2.5 lg:py-2.5 text-sm sm:text-sm md:text-sm lg:text-sm outline-none focus:border-[#FF7A00] focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/20 transition-all"
                />
              </div>

              {/* Inquiry Type */}
              <div>
                <label className="block text-sm sm:text-sm md:text-sm lg:text-sm font-medium text-[#1E1E1E] mb-2">
                  Inquiry Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    required
                    className="w-full appearance-none rounded-md sm:rounded-lg border border-gray-200 bg-gray-50 px-3 sm:px-4 md:px-4 lg:px-4 py-2 sm:py-2.5 md:py-2.5 lg:py-2.5 text-sm sm:text-sm md:text-sm lg:text-sm outline-none focus:border-[#FF7A00] focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/20 transition-all"
                  >
                    <option value="" disabled>
                      Choose from the option
                    </option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="research">Research Collaboration</option>
                    <option value="media">Media & Press</option>
                    <option value="other">Other</option>
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 text-xs">
                    ▼
                  </span>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm sm:text-sm md:text-sm lg:text-sm font-medium text-[#1E1E1E] mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Long Answer"
                  required
                  className="w-full rounded-md sm:rounded-lg border border-gray-200 bg-gray-50 px-3 sm:px-4 md:px-4 lg:px-4 py-2 sm:py-2.5 md:py-2.5 lg:py-2.5 text-sm sm:text-sm md:text-sm lg:text-sm outline-none focus:border-[#FF7A00] focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/20 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-auto sm:w-full bg-[#FF7A00] text-white px-4 sm:px-6 md:px-6 lg:px-6 py-2 sm:py-3 md:py-3 lg:py-3 rounded-[7px] text-sm sm:text-base md:text-base lg:text-base font-medium hover:bg-[#ff8d28] active:bg-[#ff6d00] transition duration-200 shadow-lg shadow-orange-200 hover:shadow-md focus:ring-2 focus:ring-[#FF7A00] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
