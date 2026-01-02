"use client";
import { useState } from "react";
import "./style.css";
import Link from "next/link";

export default function LegalPage() {
  return (
    <>
      <div className=" flex items-center justify-center bg-white page-bg">
        <section className="text-center px-4 pad-top">
          <button className="faqtitle rounded-full px-4 py-1 mb-6 border border-[#f9a96a]/40">
            • Privacy Policy
          </button>
          <h1 className="mb-4 text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight text-black text-center">
            Nationcite's Privacy Policy
          </h1>

          <p className="max-w-xl mx-auto mb-8 text-sm sm:text-sm md:text-base lg:text-lg text-gray-500 sub-listhead text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </section>
      </div>
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
