"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Logo3D } from "./Logo3D";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0F0F0F]/85 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-2xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo & Name */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 group focus:outline-none cursor-pointer"
          aria-label="Burger House Home"
        >
          <Logo3D size="sm" />
          <span className="font-poppins text-xs md:text-sm font-bold tracking-[0.25em] text-[#FFFFFF] uppercase transition-colors group-hover:text-[#D4A017]">
            BURGER HOUSE
          </span>
        </button>

        {/* Navigation Links & Language Toggle */}
        <div className="flex items-center gap-4 md:gap-8">
          <nav className="flex items-center gap-4 md:gap-8">
            <button
              onClick={() => scrollTo("menu")}
              className={`text-xs md:text-sm font-medium tracking-widest text-[#C7C7C7] hover:text-[#FFFFFF] transition-colors duration-200 uppercase focus:outline-none cursor-pointer ${
                language === "ar" ? "font-cairo" : "font-poppins"
              }`}
            >
              {language === "ar" ? "القائمة" : "Menu"}
            </button>
            <button
              onClick={() => scrollTo("category-meals")}
              className={`text-xs md:text-sm font-medium tracking-widest text-[#C7C7C7] hover:text-[#FFFFFF] transition-colors duration-200 uppercase focus:outline-none cursor-pointer ${
                language === "ar" ? "font-cairo" : "font-poppins"
              }`}
            >
              {language === "ar" ? "الوجبات" : "Meals"}
            </button>
            <button
              onClick={() => scrollTo("category-sides")}
              className={`text-xs md:text-sm font-medium tracking-widest text-[#C7C7C7] hover:text-[#FFFFFF] transition-colors duration-200 uppercase focus:outline-none cursor-pointer ${
                language === "ar" ? "font-cairo" : "font-poppins"
              }`}
            >
              {language === "ar" ? "المقبلات" : "Sides"}
            </button>
            <button
              onClick={() => scrollTo("category-drinks")}
              className={`text-xs md:text-sm font-medium tracking-widest text-[#C7C7C7] hover:text-[#FFFFFF] transition-colors duration-200 uppercase focus:outline-none cursor-pointer ${
                language === "ar" ? "font-cairo" : "font-poppins"
              }`}
            >
              {language === "ar" ? "المشروبات" : "Drinks"}
            </button>
          </nav>

          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            aria-label="Toggle Language"
            className="flex items-center gap-2 px-3 py-1.5 border border-white/15 hover:border-[#D4A017] bg-white/[0.03] hover:bg-[#D4A017]/10 rounded-full transition-all duration-300 focus:outline-none cursor-pointer group"
          >
            <svg
              className="w-3.5 h-3.5 text-[#D4A017] group-hover:rotate-12 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M12 21a9 9 0 100-18 9 9 0 000 18zM2.05 12h19.9M12 2.05c3 3.5 4.5 6.5 4.5 9.95s-1.5 6.45-4.5 9.95c-3-3.5-4.5-6.5-4.5-9.95s1.5-6.45 4.5-9.95z"
              />
            </svg>
            <span className="font-poppins text-xs font-semibold tracking-wider text-[#FFFFFF] group-hover:text-[#D4A017] uppercase transition-colors">
              {language === "en" ? "العربية" : "EN"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
