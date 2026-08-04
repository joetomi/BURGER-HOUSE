"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Logo3D } from "./Logo3D";
import { Phone } from "lucide-react";

export const Footer: React.FC = () => {
  const { language } = useLanguage();

  return (
    <footer className="w-full py-16 px-6 border-t border-white/[0.05] bg-transparent text-center">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center">
        {/* Small 3D Logo */}
        <div className="mb-4">
          <Logo3D size="sm" />
        </div>

        {/* Restaurant Name */}
        <span className="font-poppins text-xs font-bold tracking-[0.3em] text-[#FFFFFF] uppercase mb-4">
          BURGER HOUSE
        </span>

        {/* Contact & Social Links */}
        <div className="mb-10 mt-3 flex w-full flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-3" dir="rtl" lang="ar">
            <span className="font-cairo text-base font-bold text-white/80 sm:text-lg">
              وسائل التواصل
            </span>
            <div className="h-px w-10 bg-[#D4A017]/70" />
          </div>

          <div className="grid w-full max-w-4xl grid-cols-1 gap-3 md:grid-cols-3" dir="ltr">
            <a
              href="tel:+218914391000"
              aria-label="Call Burger House at 0914391000"
              className="group flex min-h-14 items-center gap-3 rounded-2xl border border-white/10 bg-[#111111]/70 px-4 text-left text-[#C7C7C7] backdrop-blur-sm transition-all duration-300 hover:border-[#D4A017]/45 hover:bg-[#D4A017]/[0.07] hover:text-white"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D4A017]/10">
                <Phone className="h-[18px] w-[18px] text-[#D4A017]" aria-hidden="true" />
              </span>
              <span className="font-poppins text-sm font-semibold tracking-wide text-white/85">0914391000</span>
            </a>

            <a
              href="https://www.facebook.com/burgerhousemisurata"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Burger House on Facebook"
              className="group flex min-h-14 items-center gap-3 rounded-2xl border border-white/10 bg-[#111111]/70 px-4 text-left text-[#C7C7C7] backdrop-blur-sm transition-all duration-300 hover:border-[#D4A017]/45 hover:bg-[#D4A017]/[0.07] hover:text-white"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D4A017]/10">
                <svg className="h-[18px] w-[18px] text-[#D4A017]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 22v-9h3l.5-3.5h-3.5V7.25c0-1.01.28-1.7 1.75-1.7H17V2.42A23.5 23.5 0 0 0 14.44 2C11.9 2 10.16 3.55 10.16 6.4v3.1H7V13h3.16v9h3.34Z" />
                </svg>
              </span>
              <span className="font-poppins text-sm font-semibold text-white/85">Burger house misurata</span>
            </a>

            <a
              href="https://www.instagram.com/burger.house.misurata"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Burger House on Instagram"
              className="group flex min-h-14 items-center gap-3 rounded-2xl border border-white/10 bg-[#111111]/70 px-4 text-left text-[#C7C7C7] backdrop-blur-sm transition-all duration-300 hover:border-[#D4A017]/45 hover:bg-[#D4A017]/[0.07] hover:text-white"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D4A017]/10">
                <svg className="h-[18px] w-[18px] text-[#D4A017]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </span>
              <span className="font-poppins text-sm font-semibold text-white/85">burger.house.misurata</span>
            </a>
          </div>
        </div>

        {/* Simple Copyright */}
        <p
          className={`text-[11px] tracking-widest text-[#C7C7C7]/50 uppercase ${
            language === "ar" ? "font-cairo" : "font-poppins"
          }`}
        >
          &copy; {new Date().getFullYear()}{" "}
          {language === "ar"
            ? "برجر هاوس. جميع الحقوق محفوظة."
            : "BURGER HOUSE. ALL RIGHTS RESERVED."}
        </p>
      </div>
    </footer>
  );
};
