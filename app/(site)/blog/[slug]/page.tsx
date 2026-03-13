"use client";

import { useState, useEffect } from "react";
import "../style.css";
import Link from "next/link";
import SiteHero from "@/components/site/SiteHero";
import Badge from "@/components/ui/Badge";
import { useParams } from "next/navigation";

interface BlogSection {
  heading: string;
  text: string;
  image?: string;
}

interface Blog {
  id: number;
  title: string;
  coverImage: string | null;
  intro: string;
  sections: BlogSection[];
  conclusion: string | null;
  createdAt: string;
  author: { name: string; email: string };
}

export default function BlogPostPage() {
  const cms = {
    hero: {
      badge_text: "Blog",
      desktop_background_image: "/Bg.jpg",
      mobile_background_image: "/Mobile_Responsive.jpg",
    },
    states: {
      loading_text: "Loading article…",
      back_to_articles_label: "← Back to all articles",
      not_found_text: "Blog not found",
      failed_text: "Failed to load blog",
    },
    article: {
      section_prefix: "Section",
      conclusion_heading: "Conclusion",
    },
  };

  const params = useParams();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/blogs/${slug}`);
        const json = await res.json();
        if (!json.success || !json.blog) {
          setError(cms.states.not_found_text);
          return;
        }
        setBlog(json.blog);
      } catch {
        setError(cms.states.failed_text);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <main className="w-full bg-white min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-sm font-inter">{cms.states.loading_text}</p>
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="w-full bg-white min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-base font-inter">{error || cms.states.not_found_text}</p>
        <Link href="/blog" className="text-sm font-medium text-[#FF7A00] hover:text-[#ff8d28] font-inter">
          {cms.states.back_to_articles_label}
        </Link>
      </main>
    );
  }

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <SiteHero cms={cms.hero}>
        <Badge>{cms.hero.badge_text}</Badge>
        <h1 className="mb-8" style={{ maxWidth: "700px", margin: "0 auto 2rem" }}>
          {blog.title}
        </h1>
        <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#5C5C5C] pt-4 mb-4 max-w-[500px] mx-auto">
          {blog.intro.slice(0, 160)}…
        </p>
        <p className="text-xs sm:text-sm text-[#6B6B6B]">
          {blog.author.name} · {formattedDate}
        </p>
      </SiteHero>

      {/* Cover Image */}
      {blog.coverImage && (
        <section className="w-full flex justify-center bg-white py-8">
          <div className="w-full max-w-5xl px-6 md:px-0">
            <div className="rounded-[16px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-[300px] md:h-[420px] object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Intro Section */}
      <section className="w-full flex justify-center bg-white">
        <article className="w-full max-w-5xl px-6 md:px-0 text-center md:text-left">
          <p className="topbody text-sm sm:text-base text-[#5C5C5C] mar-btm" style={{ lineHeight: "1.8" }}>
            {blog.intro}
          </p>
        </article>
      </section>

      {/* Sections */}
      {(blog.sections as BlogSection[]).map((section, index) => (
        <section key={index} className="w-full flex justify-center bg-white">
          <article className="w-full max-w-5xl px-6 md:px-0 text-center md:text-left">
            <p className="toptitle mb-2 text-center md:text-left text-xs sm:text-sm text-[#FF7A00]">
              {cms.article.section_prefix} {index + 1}
            </p>
            <h2 className="topsubtitle mb-6 text-center md:text-left" style={{ fontSize: "28px", lineHeight: "1.2" }}>
              {section.heading}
            </h2>

            {section.image && (
              <div className="rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.04)] mb-6">
                <img
                  src={section.image}
                  alt={section.heading}
                  className="w-full h-[250px] md:h-[340px] object-cover"
                />
              </div>
            )}

            <div className="topbody text-sm sm:text-base text-[#5C5C5C] mar-btm" style={{ lineHeight: "1.8" }}>
              {section.text}
            </div>
          </article>
        </section>
      ))}

      {/* Conclusion */}
      {blog.conclusion && (
        <section className="w-full flex justify-center bg-white pb-16">
          <article className="w-full max-w-5xl px-6 md:px-0 text-center md:text-left">
            <div style={{
              borderTop: "2px solid #FF7A00",
              paddingTop: "24px",
              marginTop: "8px",
            }}>
              <h2 className="topsubtitle mb-6 text-center md:text-left" style={{ fontSize: "28px", lineHeight: "1.2" }}>
                {cms.article.conclusion_heading}
              </h2>
              <div className="topbody text-sm sm:text-base text-[#5C5C5C]" style={{ lineHeight: "1.8" }}>
                {blog.conclusion}
              </div>
            </div>
          </article>
        </section>
      )}

      {/* Back link */}
      <section className="w-full flex justify-center bg-white pb-16">
        <div className="w-full max-w-5xl px-6 md:px-0">
          <Link
            href="/blog"
            className="text-sm font-medium text-[#FF7A00] hover:text-[#ff8d28] transition-colors inline-flex items-center gap-1 font-inter"
          >
            {cms.states.back_to_articles_label}
          </Link>
        </div>
      </section>
    </>
  );
}
