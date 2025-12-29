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
  slug: string;
}

const products: Product[] = [
  {
    id: "open-data",
    title: "Open & Licensed Data Sources",
    tagline: "Transparent data foundation",
    category: "Data",
    description:
      "We ingest validated data from OpenAlex (open), and optionally from Scopus & Web of Science (licensed) where available.",
    image: "/dummy/placeholder-1.png",
    slug: "open-data-sources",
  },
  {
    id: "verification",
    title: "Evidence-Based Verification",
    tagline: "Moderated accuracy",
    category: "Verification",
    description:
      "All profile corrections and claims require documentary evidence and undergo structured moderation.",
    image: "/dummy/placeholder-2.png",
    slug: "evidence-verification",
  },
  {
    id: "refresh",
    title: "Continuous Refresh & Audit",
    tagline: "Real-time reliability",
    category: "Audit",
    description:
      "Nightly updates, weekly recomputations, and immutable audit trails ensure metric reliability.",
    image: "/dummy/placeholder-3.png",
    slug: "continuous-refresh",
  },
];

export default function TransparencySection() {
  const [activeService, setActiveService] = useState(products[0].id);
  const serviceRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToService = (id: string) => {
    const el = serviceRefs.current[id];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      for (const p of products) {
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
  }, []);

  return (
    <section className="py-12 md:py-16 w-full px-4 md:px-[72px]">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-16 w-full">
          <h3>
            Built on Transparency.
            <br />
            Governed by Data Integrity.
          </h3>
          <p className="mt-4 max-w-xl text-gray-600">
            NationCite follows a reproducible, evidence-backed methodology using
            global open and licensed bibliometric sources. Every metric is
            source-labeled, auditable, and continuously updated.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-0 md:gap-12">
          {/* LEFT STICKY COLUMN */}
          <div className="md:block">
            <div className="md:sticky md:top-32 space-y-6 md:space-y-10">
              <ul className="space-y-4 md:space-y-6">
                {products.map((p) => (
                  <li
                    key={p.id}
                    onClick={() => scrollToService(p.id)}
                    className={`cursor-pointer border-b pb-3 md:pb-4 transition-all flex items-center justify-between text-xs md:text-base ${
                      activeService === p.id
                        ? "text-neutral-600 border-neutral-600"
                        : "text-neutral-400 border-neutral-200 hover:text-neutral-600"
                    }`}
                  >
                    <span>{p.title}</span>
                    <ArrowUpRight
                      className={`w-4 h-4 md:w-5 md:h-5 transition flex-shrink-0 ml-2 ${
                        activeService === p.id ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </li>
                ))}
              </ul>

              <Link
                href="/methodology"
                className="inline-block px-3 py-2 rounded-lg text-xs md:text-sm bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
              >
                View Full Methodology
              </Link>
            </div>
          </div>

          {/* RIGHT SCROLLABLE CONTENT */}
          <div className="space-y-6 md:space-y-16">
            {products.map((p) => (
              <div
                key={p.id}
                ref={(el) => {
                  if (el) serviceRefs.current[p.id] = el;
                }}
                className="scroll-mt-4"
              >
                <div className="space-y-2 md:space-y-6">
                  <div className="relative aspect-4/3 bg-neutral-100 rounded-lg overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="max-w-md hidden md:block">
                    <h5 className="mb-4">{p.title}</h5>
                    <p className=" mb-6">{p.description}</p>
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
