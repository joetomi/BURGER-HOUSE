"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Logo3D } from "./Logo3D";

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
