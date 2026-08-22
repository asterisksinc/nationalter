"use client";

import React from "react";
import SiteHero from "@/components/site/SiteHero";
import Badge from "@/components/ui/Badge";
import TrustedBy from "@/components/site/TrustedBy";
import FAQSection from "@/components/site/FAQSection";
import { Check } from "lucide-react";
import Head from "next/head";
import { useCmsPage } from "@/lib/use-cms-page";

const DEFAULT_CMS = {
  hero: {
    desktop_background_image: "/Bg.jpg",
    mobile_background_image: "/Mobile_Responsive.jpg",
    badge_text: "India’s Research Impact Standard",
    heading:
      "The Digital Backbone of India’s Research Ecosystem.",
    subheading:
      "NationCite exists to make India’s academic impact transparent, defensible, and globally visible without bias, manipulation, or black-box metrics.",
    cta_label: "Explore the Platform →",
  },
  trusted_by: {
    heading: "Trusted by India&apos;s Top Institutions",
  },
  image_collage: {
    left_image: "",
    left_image_alt: "Image 1",
    right_image: "",
    right_image_alt: "Image 2",
  },
  who_we_are: {
    kicker: "Who we are",
    heading: "A Research Impact Platform Built by People Who Understand Academia.",
    paragraphs: [
      { text: "NationCite is led by a team of academic technologists, doctors, data engineers, and research professionals who have experienced the same frustrations you might be facing: misrepresented metrics, unfair comparisons across disciplines, profile inaccuracies, and opaque ranking systems. We built NationCite because we needed it ourselves: a system grounded in methodological integrity, data transparency, and responsible evaluation." },
      { text: "NationCite is for researchers seeking clarity, for institutions demanding defensible analytics, and for administrators who require fair, field-aware benchmarking. Whether you are an early-career scholar or a Vice-Chancellor, NationCite provides a structured, verifiable view of academic impact without distortion." },
      // { text: "Today, Nationcite stands as the definitive platform for academic benchmarking, empowering thousands of researchers to reclaim the credit they deserve and helping institutions measure their true standing in the global arena." },
    ],
  },
  feature_visual: {
    image: "",
    alt_text: "Feature visual",
  },
  reasons: {
    kicker: "Why NationCite",
    heading: "Why Researchers Choose Nationcite",
    subheading:
      "A verified platform built for precision, transparency, and long-term academic growth.",
    reasons: [
      { title: "Unfair Comparisons", description: "Tired of being compared to researchers outside your discipline.", },
      { title: "Hidden Formulas", description: "Frustrated by rankings that don’t explain how scores are calculated." },
      { title: "Inaccurate Profiles", description: "Publications missing, affiliations outdated, duplicates unresolved." },
      { title: "Career Bias", description: "Early-career researchers overshadowed by tenure-length advantage." },
      { title: "Global Visibility", description: "No self-reported inflation only verifiable bibliometric sources." },
      { title: "Data Integrity", description: "We grow with you, from your first paper to your emeritus status." },
      { title: "Field Fairness", description: "Percentile rankings within your discipline not across unrelated fields." },
      { title: "Impact Context", description: "Scores explained in plain language, not just raw numbers." },
      { title: "ORCID Verified", description: "Secure authentication ensures profile ownership and credibility." },
      { title: "Institutional Analytics", description: "Universities gain cohort-level insight without manual spreadsheets." },
      { title: "Duplicate Detection", description: "Intelligent merging prevents fragmented academic records." },
      { title: "Correction Workflow", description: "Submit evidence-backed requests with full audit transparency." },
      { title: "Responsible Metrics", description: "Designed to support evaluation not replace peer review." },
      { title: "Grant-Ready Reports", description: "Downloadable analytics formatted for promotions and funding." },
      { title: "India-Focused", description: "A national framework tailored to India’s research ecosystem." },
    ],
  },
  faq: {
    kicker: "Common Questions",
    title: "Clarity Before You Begin",
    body:
      "Everything you need to know about NationCite, its purpose, and how it works.",
    faq_items: [
      {
        question: "What is NationCite?",
        answer:
          "NationCite is India’s research impact platform providing transparent, field-normalized bibliometric rankings and verified researcher profiles.",
      },
      {
        question: "How are rankings calculated?",
        answer:
          "Rankings are based on documented formulas integrating H-index, productivity balance, career normalization, and recent citation momentum.",
      },
      {
        question: "What data sources are used?",
        answer:
          "Metrics are sourced from recognized academic databases such as Scopus, and Web of Science, with clear source labeling.",
      },
      {
        question: "Can I claim my profile?",
        answer:
          "Yes. Researchers can authenticate using ORCID and securely claim ownership of their profile.",
      },
      {
        question: "What if my data is incorrect?",
        answer:
          "You can submit a correction request with supporting evidence through our structured moderation workflow.",
      },
      {
        question: "Are metrics self-reported?",
        answer:
          "No. NationCite does not accept unverified self-reported bibliometric data.",
      },
      {
        question: "Is NationCite free to use?",
        answer:
          "Basic access is free. Advanced analytics and institutional dashboards are available under subscription tiers.",
      },
      {
        question: "Does NationCite replace peer review?",
        answer:
          "No. Metrics support benchmarking and evaluation, but qualitative peer review remains essential.",
      },
    ],
  },
  final_cta: {
    kicker: "Join the Ecosystem",
    heading: "Take Control of Your Academic Visibility",
    body:
      "NationCite gives you the tools to verify, correct, and strengthen your academic profile with full transparency.",
    primary_cta_label: "Claim My Profile →",
    secondary_cta_label: "Report an Issue →",
    banner_image: "/CTA Section Image - Nationcite.png",
    banner_alt: "Nationcite CTA Section",
  },
};

export default function AboutPage() {
  const cms = useCmsPage("about", DEFAULT_CMS);

  const scrollToNextSection = () => {
    const heroSection = document.querySelector("section");
    const nextSection = heroSection?.nextElementSibling;
    nextSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <><Head>
      <title>About NationCite | India&apos;s Research Ranking Platform</title>
      <meta
        name="description"
        content="NationCite unifies India&apos;s researcher and institutional rankings into one transparent platform with verified metrics and compliance standards. Learn More."
      />
      <meta
        name="keywords"
        content="about NationCite, India research ranking platform, h-index India platform"
      />
      <meta property="og:title" content="About NationCite | India&apos;s Research Ranking Platform" />
      <meta property="og:description" content="NationCite: India&apos;s unified research ranking platform with verified h-index metrics." />
    </Head>
      <main className="w-full bg-white">
        {/* Hero Section */}
        <SiteHero cms={cms.hero}>
          {/* BADGE */}
          <Badge>{cms.hero.badge_text}</Badge>

          {/* HEADING */}
          <h1 className="mb-8 text-center">
            <span className="block sm:inline">
              {cms.hero.heading}
            </span>
            <span className="block sm:inline"></span>
          </h1>

          {/* DESCRIPTION */}
          <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#5C5C5C] pt-4 mb-10 max-w-[600px] mx-auto">
            {cms.hero.subheading}
          </p>

          {/* CTA */}
          <div className="flex justify-center w-full">
            <button
              onClick={scrollToNextSection}
              className="font-inter bg-[#FF7A00] text-white px-4 py-2 rounded-[7px] font-medium text-base transition-colors hover:bg-[#ff8c1a] shadow-lg shadow-orange-200 mt-6"
            >
              {cms.hero.cta_label}
            </button>
          </div>
        </SiteHero>

        {/* Who We Are */}
        <section className="w-full section-padding py-10 sm:py-16 md:py-20 lg:py-24 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-start">
          <div className="text-center md:text-left">
            <span
              className="
  inline-block
  bg-white
  text-[#F76A23]
  border border-[#F76A23]/30
  px-2 sm:px-3 md:px-3 lg:px-3 py-1
  rounded-[7px]
  font-medium text-xs sm:text-sm md:text-sm lg:text-sm
  tracking-wide uppercase
  shadow-none mb-3 sm:mb-4 md:mb-4 lg:mb-4  
"
            >
              {cms.who_we_are.kicker}
            </span>
            <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl leading-snug">
              {cms.who_we_are.heading}
            </h3>
          </div>
          <div className="space-y-3 sm:space-y-6 md:space-y-6 lg:space-y-8 text-[#5C5C5C] text-center md:text-left">
            <p className="text-sm sm:text-base md:text-base lg:text-base leading-relaxed">{cms.who_we_are.paragraphs?.[0]?.text}</p>
            <br />
            <p className="text-sm sm:text-base md:text-base lg:text-base leading-relaxed">{cms.who_we_are.paragraphs?.[1]?.text}</p>
            <br />
            <p className="text-sm sm:text-base md:text-base lg:text-base leading-relaxed">{cms.who_we_are.paragraphs?.[2]?.text}</p>
          </div>
        </section>
        <section className="section-padding w-full py-8 sm:py-10 md:py-12 lg:py-12">
          <div className="w-full h-[380px] sm:h-[380px] md:h-[500px] lg:h-[650px] mb-8 sm:mb-10 md:mb-12 lg:mb-12 bg-orange-100 border-2 rounded-md sm:rounded-lg overflow-hidden">
            {cms.feature_visual.image ? <img src={cms.feature_visual.image} alt={cms.feature_visual.alt_text} className="w-full h-full object-cover" /> : null}
          </div>
        </section>

        <TrustedBy cms={cms.trusted_by} />

        {/* 15 Reasons to Join Us */}
        <section className="w-full section-padding py-10 sm:py-16 md:py-20 lg:py-24 flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-16">
          <div className="lg:w-2/5 lg:sticky lg:top-24 lg:self-start text-center lg:text-left">
            <Badge>{cms.reasons.kicker}</Badge>
            <h3 className="mb-4 sm:mb-6 md:mb-6 lg:mb-6 text-xl sm:text-2xl md:text-2xl lg:text-3xl">
              {cms.reasons.heading}
            </h3>
            <p className="text-sm sm:text-base md:text-base lg:text-base text-[#5C5C5C] leading-relaxed">
              {cms.reasons.subheading}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 lg:w-3/5 lg:ml-auto gap-3 sm:gap-4 md:gap-5 lg:gap-6 lg:max-w-xl">
            {(cms.reasons.reasons || []).map((reason: any, i: number) => (
              <div
                key={i}
                className="bg-white p-3 sm:p-4 md:p-4 lg:p-5 rounded-md sm:rounded-lg border border-gray-100 shadow-none hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-2 sm:gap-3 md:gap-3 lg:gap-3">
                  <div className="w-6 sm:w-6 md:w-7 lg:w-7 mt-1 sm:mt-2 md:mt-2 lg:mt-2 h-6 sm:h-6 md:h-7 lg:h-7 text-[#F76A23] bg-orange-50 rounded-md sm:rounded-lg flex items-center justify-center shrink-0">
                    <Check className="w-6 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-7 lg:h-7" />
                  </div>
                  <div>
                    <h5 className="font-medium text-sm sm:text-base md:text-base lg:text-lg text-neutral-800">
                      {reason.title}
                    </h5>
                    <p className="text-xs sm:text-sm md:text-sm lg:text-base text-[#5C5C5C] mt-1 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <FAQSection
          cms={{
            ...cms.faq,
            faqItems: cms.faq.faq_items,
          }}
        />

        {/* Custom CTA for About Page */}
        <section className="w-full py-12 md:py-16 bg-white section-padding">
          <div className="w-full mx-auto flex flex-col items-center text-center">
            <div className="mb-8 md:mb-10">
              <span className="bg-[#FFF5EB] text-[#FF7A00] px-4 py-1 rounded-lg text-xs sm:text-sm font-medium border border-[#FFD6B3] inline-block">
                {cms.final_cta.kicker}
              </span>
            </div>

            <h3 className="text-[#1E1E1E] mb-8 md:mb-12 text-3xl md:text-3xl text-center">
              {cms.final_cta.heading}
            </h3>

            <p className="text-[#5C5C5C] text-sm md:text-base mt-6 mb-10 md:mb-16 w-full md:w-[600px] text-center leading-relaxed">
              {cms.final_cta.body}
            </p>

            <div className="flex py-6 flex-row md:flex-row gap-3 justify-center items-center">
              <button className="font-inter bg-[#1E1E1E] text-white px-4 py-1.5 rounded-[7px] font-medium text-sm sm:text-lg hover:bg-black transition-colors w-auto text-center whitespace-nowrap">
                {cms.final_cta.secondary_cta_label}
              </button>

              <button className="font-inter bg-[#FF7A00] text-white px-4 py-1.5 rounded-[7px] font-medium text-sm sm:text-lg hover:bg-[#e66e00] transition-colors shadow-lg shadow-orange-200 w-auto text-center whitespace-nowrap">
                {cms.final_cta.primary_cta_label}
              </button>
            </div>
          </div>

          {/* Full-width Image Section */}
          <div className="w-full mt-12 md:mt-16">
            <img
              src={cms.final_cta.banner_image}
              alt={cms.final_cta.banner_alt}
              className="w-full h-auto rounded-md sm:rounded-lg"
            />
          </div>
        </section>

        {/* CTA Banner Section */}
      </main></>
  );
}
