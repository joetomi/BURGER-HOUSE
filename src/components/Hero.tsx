"use client";

import React from "react";

export const Hero: React.FC = () => (
  <section className="relative flex flex-col items-center overflow-hidden px-6 pb-4 pt-[4.5rem] text-center">
    <h1 className="mb-5 w-full max-w-3xl">
      <span className="relative block aspect-[1690/298] -translate-x-[2.04%] overflow-hidden [clip-path:polygon(0_0,100%_0,100%_92%,64%_92%,64%_100%,0_100%)]">
        <img src="/hero-brand.svg" alt="Burger House" className="absolute left-0 top-0 w-full max-w-none -translate-y-[25%]" />
        {/* The replacement fills the inside of the original white rim. */}
        <span className="absolute left-[52.07%] top-[50.95%] h-[86.14%] w-[15.37%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-black">
          <img src="/hero-badge.svg" alt="" className="block h-full w-full object-fill" />
        </span>
      </span>
      <span className="relative mx-auto block aspect-[1690/200] w-[90%] overflow-hidden [clip-path:polygon(0_15%,64%_15%,64%_0,100%_0,100%_100%,0_100%)]">
        <img src="/hero-brand.svg" alt="BH Café" className="absolute left-0 top-0 w-full max-w-none -translate-y-[53.8%]" />
      </span>
    </h1>
    <div className="mb-4 h-px w-12 bg-[#D4A017]" aria-hidden="true" />
  </section>
);
