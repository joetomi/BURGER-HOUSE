"use client";

import React from "react";
import { MenuItem } from "@/data/menu";
import { useLanguage } from "@/context/LanguageContext";

interface MenuItemRowProps {
  item: MenuItem;
}

export const MenuItemRow: React.FC<MenuItemRowProps> = ({ item }) => {
  const { language } = useLanguage();
  const ingredients = language === "ar"
    ? item.ingredientsAr?.trim() || item.ingredientsEn?.trim()
    : item.ingredientsEn?.trim() || item.ingredientsAr?.trim();

  return (
    <div className="py-3 sm:py-3.5">
      <div className="group relative flex items-baseline justify-between gap-4 transition-colors duration-200">
        {/* Item Name */}
        <span
          dir={language === "ar" ? "rtl" : "ltr"}
          className={`text-base sm:text-lg font-semibold text-[#FFFFFF] group-hover:text-[#F2B94B] transition-colors duration-200 shrink-0 ${
            language === "ar" ? "font-cairo" : "font-poppins"
          }`}
        >
          {language === "ar" ? item.nameAr : item.nameEn}
        </span>

        {/* Luxury Dotted Leader Line */}
        <div className="flex-1 border-b border-dotted border-white/15 min-w-[20px] mb-1.5 opacity-60 group-hover:opacity-100 group-hover:border-[#D4A017]/40 transition-all duration-200" />

        {/* Price & Currency */}
        <span
          dir={language === "ar" ? "rtl" : "ltr"}
          className={`text-base sm:text-lg font-bold text-[#D4A017] group-hover:text-[#F2B94B] transition-colors duration-200 shrink-0 tracking-tight flex items-baseline gap-1 ${
            language === "ar" ? "font-cairo" : "font-poppins font-mono"
          }`}
        >
          <span>{item.price}</span>
          <span className="text-xs sm:text-sm font-semibold opacity-90">
            {language === "ar" ? "د.ل" : "LYD"}
          </span>
        </span>
      </div>
      {item.ingredientsVisible === true && ingredients && (
        <p className={`mt-1 whitespace-pre-line break-words text-start text-[13px] font-light leading-relaxed text-[#D4A017] sm:text-[15px] ${language === "ar" ? "font-cairo" : "font-poppins"}`}>
          {ingredients}
        </p>
      )}
    </div>
  );
};
