"use client";

import React from "react";
import { Languages } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const LanguageSwitcher: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const isArabic = language === "ar";

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      dir="ltr"
      aria-label={isArabic ? "Switch menu to English" : "تغيير القائمة إلى العربية"}
      className="absolute top-4 z-[60] inline-flex h-10 items-center gap-2 rounded-full border border-white/15 bg-[#111111]/90 px-4 text-sm font-semibold text-white shadow-lg shadow-black/25 backdrop-blur-xl transition-colors duration-200 hover:border-[#D4A017]/60 hover:bg-[#181818] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017]/70"
      style={{ insetInlineEnd: "1rem" }}
    >
      <Languages className="h-4 w-4 text-[#D4A017]" aria-hidden="true" />
      <span className={isArabic ? "font-poppins" : "font-cairo"}>{isArabic ? "English" : "العربية"}</span>
    </button>
  );
};
