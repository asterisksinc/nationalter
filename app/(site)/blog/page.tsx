"use client";
import { useState, useEffect } from "react";
import "./style.css";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import SiteHero from "@/components/site/SiteHero";
import FinalCTA from "@/components/site/FinalCTA";
import FAQSection from "@/components/site/FAQSection";
import Head from "next/head";

interface BlogCard {
  id: number;
  title: string;
  coverImage: string | null;
  intro: string;
  createdAt: string;
  author: { name: string };
}

const BLOG_PORTAL_CONTENT = {
  hero: {
    desktop_background_image: "/Bg.jpg",
    mobile_background_image: "/Mobile_Responsive.jpg",
    badge_text: "Resources",
    heading_line_1: "Insights & Research",
    heading_line_2: "from NationCite",
    subheading:
      "Stay updated with the latest articles on academic research, publishing, and the future of scholarly communication.",
  },
  listing: {
    search_placeholder: "Search for articles…",
    loading_text: "Loading articles…",
    empty_filtered_text: "No articles match your search.",
    empty_text: "No articles published yet.",
    read_more_label: "Read more",
  },
  faq: {
    kicker: "Know Nationcite",
    title: "Everything You Need to Know About Us",
    body:
      "This section answers the most common questions about Nationcite, who we are, how we operate, and what makes our company different in the digital ecosystem.",
    faq_items: [
      {
        question: "How often are blog insights updated?",
        answer: "We publish new and refreshed research insights regularly based on active editorial and analytics cycles.",
      },
      {
        question: "Are blog rankings data-backed?",
        answer: "Yes. Content is aligned with verified citation and ranking methodology where applicable.",
      },
      {
        question: "Can institutions contribute?",
        answer: "Institutions and experts can collaborate through our editorial and partnership channels.",
      },
      {
        question: "Do posts include practical guidance?",
        answer: "Articles are designed to include actionable frameworks, not just commentary.",
      },
      {
        question: "Can I reference this content for academic planning?",
        answer: "Yes, the content is intended to support decision-making and strategic research planning.",
      },
    ],
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

export default function BlogPage() {
  const cms = BLOG_PORTAL_CONTENT;

  const [blogs, setBlogs] = useState<BlogCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ limit: "50" });
        if (search) params.set("title", search);
        const res = await fetch(`/api/blogs?${params}`);
        const json = await res.json();
        let list: BlogCard[] = json.blogs || [];
        if (sortBy === "oldest") list = [...list].reverse();
        setBlogs(list);
      } catch {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchBlogs, 300);
    return () => clearTimeout(debounce);
  }, [search, sortBy]);

  return (
    <> <Head>
        <title>India Research Insights | H-Index & Citation Trends</title>
        <meta
          name="description"
          content="Read data-driven analysis on Indian research trends, citation benchmarks, institutional performance, and academic policy insights. Explore Articles."
        />
        <meta 
          name="keywords" 
          content="India research trends, h-index insights India, citation analysis India" 
        />
        <meta property="og:title" content="India Research Insights | H-Index & Citation Trends" />
        <meta property="og:description" content="Data-driven analysis of Indian research trends and citation benchmarks." />
      </Head>
    <main className="w-full bg-white">
      {/* Hero Section */}
      <SiteHero cms={cms.hero}>
        <Badge>{cms.hero.badge_text}</Badge>
        <h1 className="mb-8">
          {cms.hero.heading_line_1}
          <br className="hidden sm:block" /> {cms.hero.heading_line_2}
        </h1>
        <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#5C5C5C] pt-4 mb-10 max-w-[500px] mx-auto">
          {cms.hero.subheading}
        </p>
      </SiteHero>

      {/* Blog Grid Section */}
      <section className="w-full section-padding py-0 bg-white">
        <div className="w-full mx-auto">
          {/* Search and Filter */}
          <div className="bg-[#f5f5f5] rounded-lg sm:rounded-xl p-1 sm:p-1 md:p-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-10 lg:mb-10">
            <div className="w-full sm:flex-1">
              <input
                type="text"
                placeholder={cms.listing.search_placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 sm:py-2.5 text-sm text-black rounded-md sm:rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent font-inter placeholder-gray-500"
              />
            </div>

            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-sm text-black border border-gray-200 bg-white rounded-md sm:rounded-lg hover:bg-gray-100 hover:border-gray-600 transition-colors font-inter shadow-md z-50"
                >
                  <span>{sortBy === "newest" ? "Newest" : "Oldest"}</span>
                  <svg className={`w-4 h-4 transition-transform ${sortOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>

                {sortOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md sm:rounded-lg shadow-lg z-10">
                    <button onClick={() => { setSortBy("newest"); setSortOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm font-inter transition-colors ${sortBy === "newest" ? "bg-orange-50 text-[#FF7A00]" : "text-black hover:bg-gray-50"}`}>
                      Newest
                    </button>
                    <button onClick={() => { setSortBy("oldest"); setSortOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm font-inter transition-colors border-t border-gray-200 ${sortBy === "oldest" ? "bg-orange-50 text-[#FF7A00]" : "text-black hover:bg-gray-50"}`}>
                      Oldest
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Blog Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-gray-400 text-sm font-inter">{cms.listing.loading_text}</div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-gray-400 text-sm font-inter">
                {search ? cms.listing.empty_filtered_text : cms.listing.empty_text}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
              {blogs.map((blog) => (
                <article key={blog.id}
                  className="group cursor-pointer rounded-md sm:rounded-lg bg-white shadow-none hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="w-full bg-[#f5f5f5]">
                    <img src={blog.coverImage || "/dummy/test.png"} alt={blog.title}
                      className="w-full h-40 sm:h-48 md:h-48 lg:h-48 object-cover" />
                  </div>
                  <div className="p-3 sm:p-4 md:p-4 lg:p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-[#6B6B6B] font-inter">{blog.author.name}</span>
                      <span className="text-xs text-[#ccc]">·</span>
                      <span className="text-xs text-[#6B6B6B] font-inter">
                        {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <h5 className="text-base sm:text-base md:text-base lg:text-lg font-medium text-[#1E1E1E] mb-2 leading-snug">
                      {blog.title}
                    </h5>
                    <p className="text-sm sm:text-sm md:text-sm lg:text-sm text-[#6B6B6B] mb-3 leading-relaxed line-clamp-2">
                      {blog.intro.slice(0, 140)}…
                    </p>
                    <Link href={`/blog/${blog.id}`}
                      className="text-sm sm:text-sm md:text-sm lg:text-sm font-medium text-[#FF7A00] hover:text-[#ff8d28] transition-colors inline-flex items-center gap-1">
                      {cms.listing.read_more_label} <span>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <FAQSection
        cms={{
          ...cms.faq,
          faqItems: cms.faq.faq_items,
        }}
      />
      <FinalCTA cms={cms.final_cta} />
    </main></>
  );
}
