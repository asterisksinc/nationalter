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
    title: "Controlled Data Sources",
    tagline: "Curated Ingestion",
    category: "Data",
    description:
      "We don't just grab data from the messy web. We ingest structured records from trusted global repositories, ensuring no junk data enters your profile.",
    image: "",
    slug: "open-data-sources",
  },
  {
    id: "verification",
    title: 'The "Human-in-the-Loop" Check',
    tagline: "Human Governance",
    category: "Verification",
    description:
      "Algorithms make mistakes. People don't. Our management team manually reviews and processes data uploads to ensure that Dr. A. Sharma is the right Dr. A. Sharma.",
    image: "",
    slug: "evidence-verification",
  },
  {
    id: "refresh",
    title: "Live Leaderboards",
    tagline: "Dynamic Ranking",
    category: "Audit",
    description:
      "Once verified, your score is pushed to the National Leaderboard. You aren't just a number in a database; you are ranked against peers in your specific field and state.",
    image: "",
    slug: "continuous-refresh",
  },
];

export default function TransparencySection() {
  const [activeService, setActiveService] = useState(products[0].id);
  const serviceRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToService = (id: string) => {
    const el = serviceRefs.current[id];
    if (!el) return;
    const offset = 120;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const onScroll = () => {
      const viewportCenter = window.innerHeight / 3;
      let closestId = products[0].id;
      let minDistance = Infinity;

      for (const p of products) {
        const el = serviceRefs.current[p.id];
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        // Distance from the center of the element to the target viewport line
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestId = p.id;
        }
      }
      setActiveService(closestId);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Check on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="py-12 md:py-16 w-full px-4 sm:px-6 md:px-[120px]">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-16">
          <h3>Built on Verified Truth</h3>
          <p className="mt-4 max-w-xl text-gray-600 text-sm sm:text-base leading-relaxed">
            We refuse to rely on buggy automated scrapers. Our data is curated,
            governed, and locked-in by experts.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative">
          {/* LEFT STICKY COLUMN */}
          <div className="hidden md:block">
            <div className="sticky top-32">
              <ul className="space-y-6">
                {products.map((p) => (
                  <li
                    key={p.id}
                    onClick={() => {
                      setActiveService(p.id);
                      scrollToService(p.id);
                    }}
                    className={`cursor-pointer border-b pb-4 transition-all flex items-center justify-between ${
                      activeService === p.id
                        ? "text-neutral-900 border-neutral-900 font-medium"
                        : "text-neutral-400 border-neutral-200 hover:text-neutral-600"
                    }`}
                  >
                    <span>{p.tagline}</span>
                    <ArrowUpRight
                      className={`w-5 h-5 transition ${
                        activeService === p.id ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </li>
                ))}
              </ul>

              <Link
                href="/methodology"
                className="inline-block mt-10 px-4 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
              >
                Learn Our Process
              </Link>
            </div>
          </div>

          {/* Mobile Navigation (Optional, but good for UX) */}
          <div className="md:hidden mb-8">
            <ul className="flex flex-col gap-3">
              {products.map((p) => (
                <li
                  key={p.id}
                  onClick={() => {
                    setActiveService(p.id);
                    scrollToService(p.id);
                  }}
                  className={`cursor-pointer text-sm px-4 py-2 rounded-lg transition-colors ${
                    activeService === p.id
                      ? "bg-neutral-900 inter font-semibold text-white "
                      : "bg-neutral-100 inter font-semibold text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {p.tagline}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT CONTENT */}
          <div className="space-y-12 md:space-y-24">
            {products.map((p) => (
              <div
                key={p.id}
                ref={(el) => {
                  if (el) serviceRefs.current[p.id] = el;
                }}
                className="scroll-mt-32"
              >
                <div className="space-y-6">
                  <div className="relative aspect-[4/3] bg-neutral-100 rounded-lg overflow-hidden">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <div className="w-12 h-12 bg-neutral-200 rounded" />
                      </div>
                    )}
                  </div>

                  <div className="w-full">
                    <h5 className="text-lg font-semibold mb-4">{p.title}</h5>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {p.description}
                    </p>
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
