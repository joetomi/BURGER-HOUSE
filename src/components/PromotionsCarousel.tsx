"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const PROMOTIONS = [
  {
    id: "kofta-meal",
    image: "/ad-kofta.jpg",
    titleAr: "وجبة كفتة",
    titleEn: "Kofta Meal",
    captionAr: "خليها خيار لإفطارك 🌙",
    captionEn: "Make it your choice for Iftar.",
    postUrl:
      "https://www.facebook.com/burgerhousemisurata/posts/pfbid02B9N1TbACzZUZfzdUFCwWGxcMfMosQFvuUu5xNVaubM44tqFwPDevh4YBt2WEUfZzl",
  },
  {
    id: "cheese-deep-burger",
    image: "/ad-cheese-deep-burger.jpg",
    titleAr: "تشيز ديب برجر",
    titleEn: "Cheese Deep Burger",
    captionAr: "تجربة برجر غنية بالجبنة من برجر هاوس 💛",
    captionEn: "A cheese-loaded Burger House experience.",
    postUrl:
      "https://www.facebook.com/burgerhousemisurata/posts/pfbid02F7FUGCsoDBhjKSswHk2s4xjYXq4UbrPu5LDub2JpG6u5UrWHBWdgzBHAA8KErnLYl",
  },
];

export const PromotionsCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();

  useEffect(() => {
    PROMOTIONS.forEach((promotion) => {
      const image = new Image();
      image.src = promotion.image;
    });
  }, []);

  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % PROMOTIONS.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [isPaused, shouldReduceMotion]);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + PROMOTIONS.length) % PROMOTIONS.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % PROMOTIONS.length);
  };

  const activePromotion = PROMOTIONS[activeIndex];
  const isArabic = language === "ar";

  return (
    <section className="px-4 py-5 sm:px-6 sm:py-7" aria-label={isArabic ? "آخر عروضنا" : "Latest offers"}>
      <div
        className="mx-auto w-full max-w-4xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/10 bg-[#111111] shadow-[0_24px_70px_rgba(0,0,0,0.38)] sm:aspect-[16/8]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePromotion.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.015 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img
                src={activePromotion.image}
                alt={isArabic ? activePromotion.titleAr : activePromotion.titleEn}
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/10" />

              <div
                className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8 md:p-10"
                dir={isArabic ? "rtl" : "ltr"}
              >
                <span
                  className={`mb-3 inline-flex rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[10px] font-semibold text-white/80 backdrop-blur-md ${
                    isArabic ? "font-cairo" : "font-poppins uppercase tracking-[0.18em]"
                  }`}
                >
                  {isArabic ? "منشوراتنا المميزة" : "Featured posts"}
                </span>
                <h2 className={`text-3xl font-bold sm:text-4xl ${isArabic ? "font-cairo" : "font-poppins"}`}>
                  {isArabic ? activePromotion.titleAr : activePromotion.titleEn}
                </h2>
                <p className={`mt-2 text-sm text-white/75 sm:text-base ${isArabic ? "font-cairo" : "font-poppins"}`}>
                  {isArabic ? activePromotion.captionAr : activePromotion.captionEn}
                </p>
                <a
                  href={activePromotion.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:border-[#D4A017]/60 hover:bg-[#D4A017]/15 ${
                    isArabic ? "font-cairo" : "font-poppins"
                  }`}
                >
                  {isArabic ? "عرض المنشور" : "View post"}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={showPrevious}
            aria-label={isArabic ? "الإعلان السابق" : "Previous promotion"}
            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/80 backdrop-blur-md transition-colors hover:border-white/35 hover:bg-black/60 hover:text-white sm:left-5"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label={isArabic ? "الإعلان التالي" : "Next promotion"}
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/80 backdrop-blur-md transition-colors hover:border-white/35 hover:bg-black/60 hover:text-white sm:right-5"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2" aria-label={isArabic ? "اختيار الإعلان" : "Choose promotion"}>
          {PROMOTIONS.map((promotion, index) => (
            <button
              key={promotion.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`${isArabic ? "عرض الإعلان" : "Show promotion"} ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-8 bg-[#D4A017]" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
