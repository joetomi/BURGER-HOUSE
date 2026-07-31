"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Logo3D } from "./Logo3D";

export const Hero: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="relative pt-12 pb-4 px-6 text-center flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 max-w-2xl mx-auto flex flex-col items-center"
      >
        {/* Interactive 3D Logo */}
        <div className="mb-4">
          <Logo3D size="lg" />
        </div>

        {/* Restaurant Name */}
        <h1 className="font-poppins text-3xl md:text-5xl font-bold tracking-[0.3em] text-[#FFFFFF] uppercase mb-3 drop-shadow-md">
          BURGER HOUSE
        </h1>

        {/* Divider accent */}
        <div className="w-12 h-[1px] bg-[#D4A017] mb-4" />

        {/* Tagline */}
        <div
          dir={language === "ar" ? "rtl" : "ltr"}
          className={`flex items-center justify-center gap-3 md:gap-4 text-xs md:text-sm text-[#C7C7C7] uppercase mb-4 ${
            language === "ar"
              ? "font-cairo font-semibold max-md:tracking-normal tracking-[0.35em]"
              : "font-poppins font-semibold tracking-[0.35em]"
          }`}
        >
          <span>{language === "ar" ? "طازج." : "Fresh."}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" />
          <span>{language === "ar" ? "مشوي." : "Grilled."}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" />
          <span>{language === "ar" ? "فاخر." : "Premium."}</span>
        </div>
      </motion.div>
    </section>
  );
};
