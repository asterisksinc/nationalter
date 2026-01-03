"use client";
import { useState } from "react";
import "./style.css";
import Link from "next/link";
import SiteHero from "@/components/site/SiteHero";
import Badge from "@/components/ui/Badge";

export default function LegalPage() {
  return (
    <>
      <SiteHero>
        <Badge>Privacy Policy</Badge>
        <h1 className="mb-8">Nationcite&apos;s Privacy Policy</h1>
        <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#5C5C5C] pt-4 mb-10 max-w-[500px] mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </SiteHero>
      <section className="w-full flex justify-center bg-white ">
        <article className="w-full max-w-5xl px-6 md:px-0 text-center md:text-left">
          <h2 className="topsubtitle mb-6 text-center md:text-left">
            Lorem ipsum
            <br />
            dolor self amet
          </h2>

          <div className="space-y-6 topbody">
            {Array.from({ length: 5 }).map((_, i) => (
              <p key={i} className="mar-btm">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
                urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
                egestas. Iaculis massa nisl malesuada lacinia integer nunc
                posuere. Ut hendrerit semper vel class aptent taciti sociosqu.
                Ad litora torquent per conubia nostra inceptos himenaeos.
              </p>
            ))}
          </div>
        </article>
      </section>
    </>
  );
}
