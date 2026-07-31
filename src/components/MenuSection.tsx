"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MENU_DATA, MenuCategory } from "@/data/menu";
import { MenuItemRow } from "./MenuItemRow";
import { useLanguage } from "@/context/LanguageContext";
import { TransparentConnectorLine } from "./TransparentConnectorLine";

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("burgers");
  
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const floatingContainerRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { language } = useLanguage();

  // Robust ScrollSpy to highlight active category tab as user manually scrolls
  useEffect(() => {
    const handleScrollSpy = () => {
      if (isClickScrolling.current) return;

      let bestCat = "";
      let minDistance = Infinity;
      const targetOffset = 180;

      for (const category of MENU_DATA) {
        const element = document.getElementById(`category-${category.id}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Active section: top is above target offset zone and bottom is below it
          if (rect.top <= targetOffset + 60 && rect.bottom >= targetOffset) {
            bestCat = category.id;
            break;
          }
          // Fallback: find section top closest to target offset
          const dist = Math.abs(rect.top - targetOffset);
          if (dist < minDistance) {
            minDistance = dist;
            bestCat = category.id;
          }
        }
      }

      if (bestCat) {
        setActiveCategory((prev) => (prev === bestCat ? prev : bestCat));
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  // Auto-scroll active tab into view inside container on mobile
  useEffect(() => {
    if (activeTabRef.current && floatingContainerRef.current) {
      const container = floatingContainerRef.current;
      const tab = activeTabRef.current;
      const tabLeft = tab.offsetLeft;
      const tabWidth = tab.offsetWidth;
      const containerWidth = container.offsetWidth;

      container.scrollTo({
        left: tabLeft - containerWidth / 2 + tabWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeCategory]);

  const handleTabClick = (categoryId: string) => {
    isClickScrolling.current = true;
    setActiveCategory(categoryId);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const yOffset = -85;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    // Lock ScrollSpy during smooth scroll transition to prevent flicker
    scrollTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 1400);
  };

  return (
    <section id="menu" className="relative pt-4 pb-12 px-4 sm:px-6 max-w-6xl mx-auto min-h-screen">
      {/* Menu Main Section Header */}
      <div className="text-center mb-8" dir={language === "ar" ? "rtl" : "ltr"}>
        <span
          className={`text-xs font-semibold text-[#D4A017] uppercase block mb-3 ${
            language === "ar"
              ? "font-cairo max-md:tracking-normal tracking-[0.35em]"
              : "font-poppins tracking-[0.35em]"
          }`}
        >
          {language === "ar" ? "تشكيلتنا المميزة" : "Our Selection"}
        </span>
        <h2
          className={`text-3xl md:text-5xl font-bold text-[#FFFFFF] uppercase mb-4 ${
            language === "ar"
              ? "font-cairo max-md:tracking-normal tracking-wider"
              : "font-poppins tracking-wider"
          }`}
        >
          {language === "ar" ? "قائمة الطعام" : "MENU"}
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4A017] to-transparent mx-auto" />
      </div>

      {/* Menu Wrapper bounding Sticky Dock behavior */}
      <div className="relative">
        {/* Pure Native Sticky Top Dock */}
        <div className="sticky top-4 sm:top-6 z-50 flex justify-center mb-8 pointer-events-none">
          <div className="pointer-events-auto relative max-w-[94vw] sm:max-w-max bg-[#121212]/94 backdrop-blur-2xl border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.85)] rounded-full p-1.5 sm:p-2 flex items-center">
            <div
              ref={floatingContainerRef}
              className="flex items-center gap-1.5 overflow-x-auto scrollbar-none no-scrollbar py-0.5 px-1 max-w-full"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {MENU_DATA.map((category) => {
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    ref={isActive ? activeTabRef : null}
                    onClick={() => handleTabClick(category.id)}
                    className={`relative z-10 px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-bold tracking-wider uppercase rounded-full transition-all duration-300 whitespace-nowrap focus:outline-none cursor-pointer shrink-0 ${
                      isActive
                        ? "text-[#0F0F0F] bg-[#D4A017] shadow-md shadow-[#D4A017]/25"
                        : "text-[#C7C7C7] hover:text-[#FFFFFF] hover:bg-white/5"
                    } ${language === "ar" ? "font-cairo" : "font-poppins"}`}
                  >
                    {language === "ar" ? category.titleAr : category.titleEn}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Full Categories Listing */}
        <div className="space-y-14 sm:space-y-20">
          {MENU_DATA.map((category: MenuCategory) => {
            const halfLength = Math.ceil(category.items.length / 2);
            const col1 = category.items.slice(0, halfLength);
            const col2 = category.items.slice(halfLength);
            const isBurgersCategory = category.id === "burgers";
            const isSandwichesCategory = category.id === "sandwiches";
            const isMealsCategory = category.id === "meals";

            return (
              <div key={category.id} className="flex flex-col items-center">
                {/* Hero Burger Showcase Image & Connector Line */}
                {isBurgersCategory && (
                  <div className="flex flex-col items-center w-full">
                    <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg rounded-3xl overflow-hidden border border-white/10 bg-[#121212]/70 backdrop-blur-md">
                      <div className="absolute top-4 left-5 z-20 pointer-events-none">
                        <span className="font-poppins text-xs sm:text-sm font-bold tracking-[0.35em] text-[#FFFFFF]/90 uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                          BURGER
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#D4A017]/10 via-transparent to-transparent pointer-events-none z-10" />
                      <img
                        src="/hero-burger.png"
                        alt="Signature Burger House Burger"
                        className="w-full h-auto object-contain"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/60 to-transparent z-20" />
                    </div>
                    {/* Centered Golden Connector Line */}
                    <TransparentConnectorLine />
                  </div>
                )}

                {/* Hero Wrap Showcase Image & Connector Line */}
                {isSandwichesCategory && (
                  <div className="flex flex-col items-center w-full">
                    <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg rounded-3xl overflow-hidden border border-white/10 bg-[#121212]/70 backdrop-blur-md">
                      <div className="absolute top-4 left-5 z-20 pointer-events-none">
                        <span className="font-poppins text-xs sm:text-sm font-bold tracking-[0.35em] text-[#FFFFFF]/90 uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                          WRAPS
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#D4A017]/10 via-transparent to-transparent pointer-events-none z-10" />
                      <img
                        src="/category-wraps.png"
                        alt="Signature Burger House Wrap"
                        className="w-full h-auto object-contain"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/60 to-transparent z-20" />
                    </div>
                    {/* Centered Golden Connector Line */}
                    <TransparentConnectorLine />
                  </div>
                )}

                {/* Hero Meal Showcase Image & Connector Line */}
                {isMealsCategory && (
                  <div className="flex flex-col items-center w-full">
                    <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg rounded-3xl overflow-hidden border border-white/10 bg-[#121212]/70 backdrop-blur-md">
                      <div className="absolute top-4 left-5 z-20 pointer-events-none">
                        <span className="font-poppins text-xs sm:text-sm font-bold tracking-[0.35em] text-[#FFFFFF]/90 uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                          MEALS
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#D4A017]/10 via-transparent to-transparent pointer-events-none z-10" />
                      <img
                        src="/category-meals.png"
                        alt="Signature Burger House Meal"
                        className="w-full h-auto object-contain"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/60 to-transparent z-20" />
                    </div>
                    {/* Centered Golden Connector Line */}
                    <TransparentConnectorLine />
                  </div>
                )}

                {/* Category Menu Card */}
                <motion.div
                  id={`category-${category.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative w-full scroll-mt-28 bg-gradient-to-[#121212]/55 via-[#121212]/35 to-[#121212]/55 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.3)]"
                >
                  {/* Category Title Header */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6 sm:mb-8 pb-4 border-b border-white/[0.06]">
                    <h3
                      dir={language === "ar" ? "rtl" : "ltr"}
                      className={`text-2xl md:text-3xl font-bold text-[#FFFFFF] uppercase ${
                        language === "ar"
                          ? "font-cairo text-right max-md:tracking-normal tracking-wider"
                          : "font-poppins text-left tracking-wider"
                      }`}
                    >
                      {language === "ar" ? category.titleAr : category.titleEn}
                    </h3>
                    <span
                      className={`text-xs tracking-widest text-[#C7C7C7]/60 uppercase ${
                        language === "ar" ? "font-cairo" : "font-poppins"
                      }`}
                    >
                      {category.items.length}{" "}
                      {language === "ar"
                        ? "صنف"
                        : category.items.length === 1
                        ? "Item"
                        : "Items"}
                    </span>
                  </div>

                  {/* Items Grid */}
                  {col2.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-1">
                      <div className="space-y-1">
                        {col1.map((item) => (
                          <MenuItemRow key={item.id} item={item} />
                        ))}
                      </div>
                      <div className="space-y-1">
                        {col2.map((item) => (
                          <MenuItemRow key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-2xl space-y-1">
                      {col1.map((item) => (
                        <MenuItemRow key={item.id} item={item} />
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
