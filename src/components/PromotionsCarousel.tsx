"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import promotionsContent from "@/data/promotions.json";

interface Promotion {
  id: string;
  image: string;
  titleAr: string;
  titleEn: string;
  captionAr: string;
  captionEn: string;
  postUrl: string;
  enabled?: boolean;
}

const PROMOTIONS = (promotionsContent.items as Promotion[]).filter((promotion) => promotion.enabled !== false);
const STORY_DURATION = 6500;

export const PromotionsCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    PROMOTIONS.forEach((promotion) => {
      const image = new Image();
      image.src = promotion.image;
    });
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || PROMOTIONS.length < 2) return;

    const timeout = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % PROMOTIONS.length);
    }, STORY_DURATION);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, shouldReduceMotion]);

  if (PROMOTIONS.length === 0) return null;

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + PROMOTIONS.length) % PROMOTIONS.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % PROMOTIONS.length);
  };

  const activePromotion = PROMOTIONS[activeIndex];

  return (
    <section dir="rtl" lang="ar" className="px-4 py-5 sm:px-6 sm:py-7" aria-label="آخر عروضنا">
      <div className="mx-auto mb-6 flex flex-col items-center text-center sm:mb-8">
        <h2 className="font-poppins text-2xl font-bold tracking-[0.16em] text-white uppercase sm:text-3xl">
          WHAT&apos;S NEW
        </h2>
        <div className="mt-4 h-px w-12 bg-[#D4A017]/70" />
      </div>

      <div className="mx-auto w-full max-w-4xl">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/10 bg-[#111111] shadow-[0_24px_70px_rgba(0,0,0,0.38)] sm:aspect-[16/8]">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-40 flex gap-1.5 p-4 sm:p-5"
            dir="ltr"
            aria-hidden="true"
          >
            {PROMOTIONS.map((promotion, index) => (
              <div key={promotion.id} className="h-1 flex-1 overflow-hidden rounded-full bg-white/25 shadow-sm">
                <motion.div
                  key={`${activeIndex}-${promotion.id}`}
                  className="h-full w-full origin-left rounded-full bg-white"
                  initial={{ scaleX: index < activeIndex ? 1 : 0 }}
                  animate={{ scaleX: index <= activeIndex ? 1 : 0 }}
                  transition={
                    index === activeIndex && !shouldReduceMotion
                      ? { duration: STORY_DURATION / 1000, ease: "linear" }
                      : { duration: 0 }
                  }
                />
              </div>
            ))}
          </div>

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
                alt={activePromotion.titleAr}
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/10" />

              <button
                type="button"
                onClick={showPrevious}
                aria-label="المنشور السابق"
                className="absolute inset-y-0 left-0 z-20 w-1/2 cursor-pointer bg-transparent"
              />
              <button
                type="button"
                onClick={showNext}
                aria-label="المنشور التالي"
                className="absolute inset-y-0 right-0 z-20 w-1/2 cursor-pointer bg-transparent"
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 p-6 text-white sm:p-8 md:p-10" dir="rtl">
                <span className="mb-3 inline-flex rounded-full border border-white/15 bg-black/35 px-3 py-1.5 font-cairo text-[10px] font-semibold text-white/80 backdrop-blur-md">
                  منشوراتنا المميزة
                </span>
                <h2 className="font-cairo text-3xl font-bold sm:text-4xl">{activePromotion.titleAr}</h2>
                <p className="mt-2 font-cairo text-sm text-white/75 sm:text-base">{activePromotion.captionAr}</p>
                <a
                  href={activePromotion.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 font-cairo text-xs font-semibold text-white backdrop-blur-md transition-colors hover:border-[#D4A017]/60 hover:bg-[#D4A017]/15"
                >
                  عرض المنشور
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
