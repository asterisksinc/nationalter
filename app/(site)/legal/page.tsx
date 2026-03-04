"use client";
import { useState } from "react";
import "./style.css";
import Link from "next/link";
import SiteHero from "@/components/site/SiteHero";
import Badge from "@/components/ui/Badge";
import Head from "next/head";

type LegalSection = {
  title: string;
  content: string[];
};

const privacyPolicySections: LegalSection[] = [
  {
    title: "1. Information We Collect",
    content: [
      "We collect information you provide directly to us, including your name, email address, institutional affiliation, ORCID identifier, professional credentials, and any other information you choose to provide when registering for an account or using our services.",
      "We automatically collect certain information when you use our platform, including your IP address, browser type, operating system, device information, pages viewed, and the dates/times of your visits. This helps us improve our services and ensure platform security.",
      "For researchers and medical professionals, we may collect publication data, citation metrics, h-index calculations, and other scholarly metrics from publicly available academic databases to provide our ranking and analytics services.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "We use the information we collect to provide, maintain, and improve our services, including calculating citation metrics, generating researcher rankings, and displaying leaderboard information.",
      "Your information helps us communicate with you about your account, respond to inquiries, provide customer support, and send important notices about changes to our services or policies.",
      "We may use aggregated, anonymized data for research purposes, trend analysis, and to improve the overall quality and accuracy of our academic metrics and ranking algorithms.",
    ],
  },
  {
    title: "3. Information Sharing and Disclosure",
    content: [
      "We do not sell your personal information to third parties. Your data is shared only as described in this policy or with your explicit consent.",
      "Public profile information, including your name, institutional affiliation, and scholarly metrics, may be displayed on our public leaderboards and ranking pages as part of our core service offering.",
      "We may share information with service providers who assist us in operating our platform, conducting our business, or serving our users, provided they agree to keep this information confidential.",
      "We may disclose information if required by law, legal process, or government request, or to protect the rights, property, and safety of NationCite, our users, or the public.",
    ],
  },
  {
    title: "4. Data Security",
    content: [
      "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
      "Your account is protected by a password for your privacy and security. We use industry-standard encryption protocols (SSL/TLS) to protect data transmitted to and from our platform.",
      "While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.",
    ],
  },
  {
    title: "5. Your Rights and Choices",
    content: [
      "You may access, update, or delete your account information at any time through your dashboard settings. You can also request a complete export of your data.",
      "You may opt out of receiving promotional communications from us by following the unsubscribe instructions in those messages. You will continue to receive essential service-related communications.",
      "Depending on your location, you may have additional rights under applicable data protection laws, including the right to access, rectify, port, or erase your data, and to restrict or object to certain processing.",
    ],
  },
  {
    title: "6. Data Retention",
    content: [
      "We retain your personal information for as long as your account is active or as needed to provide you services, comply with legal obligations, resolve disputes, and enforce our agreements.",
      "When you delete your account, we will delete or anonymize your personal information within 30 days, except where we are required to retain certain information for legal or legitimate business purposes.",
    ],
  },
  {
    title: "7. Cookies and Tracking Technologies",
    content: [
      "We use cookies and similar tracking technologies to collect and store information about your preferences and activity on our platform. This helps us provide a personalized experience and improve our services.",
      "You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our platform.",
    ],
  },
  {
    title: "8. Third-Party Links and Services",
    content: [
      "Our platform may contain links to third-party websites, services, or applications. We are not responsible for the privacy practices of these third parties, and we encourage you to review their privacy policies.",
    ],
  },
  {
    title: "9. International Data Transfers",
    content: [
      "Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws different from your country. We ensure appropriate safeguards are in place for international transfers.",
    ],
  },
  {
    title: "10. Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the 'Last Updated' date.",
      "Your continued use of our services after any changes to this Privacy Policy constitutes your acceptance of the updated policy.",
    ],
  },
  {
    title: "11. Contact Us",
    content: [
      "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at privacy@nationcite.com or through our Contact page.",
    ],
  },
];

const termsOfServiceSections: LegalSection[] = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By accessing or using NationCite's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.",
      "We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the modified terms.",
    ],
  },
  {
    title: "2. Account Registration",
    content: [
      "To access certain features, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate.",
      "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use.",
      "We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent, abusive, or illegal activities.",
    ],
  },
  {
    title: "3. Permitted Use",
    content: [
      "NationCite grants you a limited, non-exclusive, non-transferable license to access and use our platform for personal and professional research purposes in accordance with these terms.",
      "You may not use our services for any unlawful purpose, to distribute malware, to scrape or harvest data without permission, or to interfere with the proper functioning of our platform.",
      "Commercial use of our data or services requires a separate commercial license agreement. Contact us for enterprise and institutional licensing options.",
    ],
  },
  {
    title: "4. Intellectual Property",
    content: [
      "All content, features, and functionality of our platform, including text, graphics, logos, algorithms, and software, are owned by NationCite and are protected by intellectual property laws.",
      "Our ranking algorithms, h-index ratio calculations, and proprietary metrics are trade secrets of NationCite. You may not reverse-engineer, decompile, or attempt to extract these algorithms.",
      "User-generated content remains the property of respective users, but you grant NationCite a license to use, display, and distribute such content in connection with our services.",
    ],
  },
  {
    title: "5. Data Accuracy and Disclaimers",
    content: [
      "While we strive to provide accurate citation metrics and rankings, we make no warranties about the completeness, reliability, or accuracy of this data. Metrics are calculated from publicly available sources and may contain errors.",
      "Rankings and metrics are provided for informational purposes only and should not be the sole basis for academic hiring, funding, or evaluation decisions.",
      "OUR SERVICES ARE PROVIDED 'AS IS' WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.",
    ],
  },
  {
    title: "6. Limitation of Liability",
    content: [
      "In no event shall NationCite, its directors, employees, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.",
      "Our total liability for any claim arising from these terms or your use of our services shall not exceed the amount you paid us in the twelve months preceding the claim.",
    ],
  },
  {
    title: "7. Dispute Resolution",
    content: [
      "Any disputes arising from these terms or your use of our services shall be resolved through binding arbitration in accordance with applicable arbitration rules, except where prohibited by law.",
      "You agree to waive any right to participate in class action lawsuits or class-wide arbitration against NationCite.",
    ],
  },
  {
    title: "8. Termination",
    content: [
      "We may terminate or suspend your access to our services immediately, without prior notice, for any reason, including breach of these terms.",
      "Upon termination, your right to use our services will cease immediately. Provisions that should survive termination will remain in effect.",
    ],
  },
  {
    title: "9. Governing Law",
    content: [
      "These terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.",
    ],
  },
  {
    title: "10. Contact Information",
    content: [
      "For questions about these Terms of Service, please contact us at legal@nationcite.com or through our Contact page.",
    ],
  },
];

type TabType = "privacy" | "terms";

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState<TabType>("privacy");

  const sections =
    activeTab === "privacy" ? privacyPolicySections : termsOfServiceSections;
  const lastUpdated = "February 15, 2026";

  return (
    <>
      <Head>
        <title>Privacy Policy | Research Data Protection India</title>
        <meta
          name="description"
          content="Review how NationCite protects researcher data, consent logs, and citation records under India's data protection framework."
        />
        <meta name="keywords" content="researcher privacy policy India, DPDP compliance research platform" />
      </Head>
      <SiteHero>
        <Badge>
          {activeTab === "privacy" ? "Privacy Policy" : "Terms of Service"}
        </Badge>
        <h1 className="mb-8">
          {activeTab === "privacy"
            ? "NationCite's Privacy Policy"
            : "NationCite's Terms of Service"}
        </h1>
        <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#5C5C5C] pt-4 mb-10 max-w-[600px] mx-auto">
          {activeTab === "privacy"
            ? "Your privacy matters to us. This policy explains how we collect, use, and protect your personal information when you use NationCite."
            : "Please read these terms carefully before using NationCite. By using our services, you agree to be bound by these terms."}
        </p>
        {/* Tab Switcher */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === "privacy"
                ? "bg-[var(--color-primary)] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab("terms")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === "terms"
                ? "bg-[var(--color-primary)] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Terms of Service
          </button>
        </div>
      </SiteHero>

      <section className="w-full flex justify-center bg-white py-12">
        <article className="w-full max-w-4xl px-6 md:px-8">
          {/* Last Updated */}
          <p className="text-sm text-gray-500 mb-8 text-center md:text-left">
            Last Updated: {lastUpdated}
          </p>

          {/* Table of Contents */}
          <nav className="mb-12 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Table of Contents
            </h3>
            <ul className="space-y-2">
              {sections.map((section, index) => (
                <li key={index}>
                  <a
                    href={`#section-${index}`}
                    className="text-[var(--color-primary)] hover:underline text-sm"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content Sections */}
          <div className="space-y-10">
            {sections.map((section, index) => (
              <div key={index} id={`section-${index}`} className="scroll-mt-24">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 p-6 bg-[var(--color-primary-light)] rounded-xl text-center">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Have Questions?
            </h3>
            <p className="text-gray-600 mb-4">
              If you have any questions about our{" "}
              {activeTab === "privacy" ? "Privacy Policy" : "Terms of Service"},
              please don&apos;t hesitate to reach out.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-2 bg-[var(--color-primary)] text-white rounded-full hover:opacity-90 transition-opacity"
            >
              Contact Us
            </Link>
          </div>
        </article>
      </section>
    </>
  );
}
