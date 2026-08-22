"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Product {
  id: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  image: string;
  video_url: string;
  slug: string;
}

type TransparencyCms = {
  heading?: string;
  subheading?: string;
  cta_label?: string;
  cta_url?: string;
  items?: Product[];
};

const products: Product[] = [
  {
    id: "field-fairness",
    title: "Discipline-Based Ranking",
    tagline: "Field Fairness",
    category: "Fairness",
    description:
      "Researchers are ranked within their field and converted into percentiles for unbiased comparison.",
    image: "/dummy/placeholder-1.png",
    video_url: "/creatives/",
    slug: "field-fairness",
  },
  {
    id: "verified-data",
    title: "Trusted Bibliometric Sources",
    tagline: "Verified Data",
    category: "Data",
    description:
      "Metrics are sourced from Scopus, and Web of Science never self-reported.",
    image: "/dummy/placeholder-2.png",
    video_url: "/creatives/Trusted biometric sources_.mov",
    slug: "verified-data",
  },
  {
    id: "security-standards",
    title: "Privacy & Compliance",
    tagline: "Security Standards",
    category: "Compliance",
    description:
      "Built in alignment with India's DPDP Act, with full consent and audit transparency.",
    image: "/dummy/placeholder-3.png",
    video_url: "/creatives/Privacy and complience_.mov",
    slug: "security-standards",
  },
];

export default function TransparencySection({ cms }: { cms?: TransparencyCms }) {
  const renderedProducts = cms?.items && cms.items.length > 0 ? cms.items : products;
  const headingText = cms?.heading || "Built on Transparency.\nGoverned by Data Integrity.";
  const headingLines = headingText.split("\n");
  const [activeService, setActiveService] = useState(renderedProducts[0].id);
  const serviceRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToService = (id: string) => {
    const el = serviceRefs.current[id];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      for (const p of renderedProducts) {
        const el = serviceRefs.current[p.id];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) {
          setActiveService(p.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [renderedProducts]);

  return (
    <section className="py-12 md:py-16 w-full px-4 section-padding">
      <div className="w-full mx-auto">
        {/* HEADER */}
        <div className="mb-16 w-full text-center md:text-left">
          <h3 className="text-center md:text-left">
            {headingLines.map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < headingLines.length - 1 ? <br /> : null}
              </React.Fragment>
            ))}
          </h3>
          <p className="mt-4 text-sm sm:text-base max-w-xl text-gray-600 text-center md:text-left">
            {cms?.subheading ||
              "NationCite follows a reproducible, evidence-backed methodology using global open and licensed bibliometric sources. Every metric is source-labeled and continuously updated."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* LEFT STICKY COLUMN */}
          <div className="md:block">
            <div className="md:sticky md:top-32 space-y-6 md:space-y-10">
              <ul className="space-y-4 md:space-y-6">
                {renderedProducts.map((p) => (
                  <li
                    key={p.id}
                    onClick={() => scrollToService(p.id)}
                    className={`cursor-pointer border-b pb-3 md:pb-4 transition-all flex items-center justify-between text-xs md:text-base ${
                      activeService === p.id
                        ? "text-neutral-600 border-neutral-600"
                        : "text-neutral-400 border-neutral-200 hover:text-neutral-600"
                    }`}
                  >
                    <span>{p.tagline}</span>
                    <ArrowUpRight
                      className={`w-4 h-4 md:w-5 md:h-5 transition shrink-0 ml-2 ${
                        activeService === p.id ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </li>
                ))}
              </ul>

              <Link
                href={cms?.cta_url || "/methodology"}
                className="inline-block px-3 py-2 rounded-md sm:rounded-lg text-xs md:text-sm bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
              >
                {cms?.cta_label || "View Full Methodology"}
              </Link>
            </div>
          </div>

          {/* RIGHT SCROLLABLE CONTENT */}
          <div className="space-y-6 md:space-y-16">
            {renderedProducts.map((p) => (
              <div
                key={p.id}
                ref={(el) => {
                  if (el) serviceRefs.current[p.id] = el;
                }}
                className="scroll-mt-4"
              >
                <div className="space-y-2 md:space-y-6">
                  <div className="relative aspect-4/3 bg-neutral-100 rounded-md sm:rounded-lg overflow-hidden">
                    <video src={p.video_url} className="w-full h-full object-cover" loop autoPlay muted></video>
                  </div>

                  <div className="max-w-md block md:block mt-4 md:mt-0">
                    <h5 className="  mb-3 md:mb-4">{p.title}</h5>
                    <p className="mb-4 md:mb-6">{p.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
