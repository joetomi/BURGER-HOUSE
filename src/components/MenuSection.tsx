"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Coffee, UtensilsCrossed } from "lucide-react";
import { CAFE_MENU_DATA, MENU_DATA, MenuCategory } from "@/data/menu";
import { MenuItemRow } from "./MenuItemRow";
import { useLanguage } from "@/context/LanguageContext";
import { TransparentConnectorLine } from "./TransparentConnectorLine";

export const MenuSection: React.FC = () => {
  const [menuMode, setMenuMode] = useState<"food" | "cafe">("food");
  const [activeCategory, setActiveCategory] = useState<string>("burgers");
  
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const floatingContainerRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { language } = useLanguage();
  const menuData = menuMode === "food" ? MENU_DATA : CAFE_MENU_DATA;

  // Continuous Mathematical Page Partitioning (Zero-gap ScrollSpy)
  useEffect(() => {
    const handleScrollSpy = () => {
      if (isClickScrolling.current) return;

      const viewportOffset = 160; // Offset below floating sticky navbar
      const currentY = window.scrollY + viewportOffset;

      // Extract exact absolute Y-top coordinates of all category sections
      const categoryPositions = menuData.map((category) => {
        const elem = document.getElementById(`category-${category.id}`);
        if (elem) {
          const top = elem.getBoundingClientRect().top + window.pageYOffset;
          return { id: category.id, top };
        }
        return null;
      }).filter((item): item is { id: string; top: number } => item !== null);

      if (categoryPositions.length === 0) return;

      // Zone 0: Before first section top (Hero area) -> Always first category ("burgers")
      if (currentY < categoryPositions[0].top) {
        setActiveCategory((prev) => (prev === categoryPositions[0].id ? prev : categoryPositions[0].id));
        return;
      }

      // Zone N: After last section top -> Always last category ("drinks")
      const lastIndex = categoryPositions.length - 1;
      if (currentY >= categoryPositions[lastIndex].top) {
        setActiveCategory((prev) => (prev === categoryPositions[lastIndex].id ? prev : categoryPositions[lastIndex].id));
        return;
      }

      // Midpoint Partitioning between consecutive categories (Zero-gap Coverage)
      let activeId = categoryPositions[0].id;
      for (let i = 0; i < categoryPositions.length - 1; i++) {
        const current = categoryPositions[i];
        const next = categoryPositions[i + 1];
        const midpoint = (current.top + next.top) / 2;

        if (currentY >= current.top && currentY < midpoint) {
          activeId = current.id;
          break;
        } else if (currentY >= midpoint && currentY < next.top) {
          activeId = next.id;
          break;
        }
      }

      if (activeId) {
        setActiveCategory((prev) => (prev === activeId ? prev : activeId));
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy(); // Initial execution
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [menuData]);

  // Auto-scroll active tab into view inside floating horizontal dock on mobile
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
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    // Lock ScrollSpy during smooth scroll transition to prevent flicker
    scrollTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 1000);
  };

  const handleMenuModeChange = (mode: "food" | "cafe") => {
    if (mode === menuMode) return;

    setMenuMode(mode);
    setActiveCategory((mode === "food" ? MENU_DATA : CAFE_MENU_DATA)[0]?.id || "");
    isClickScrolling.current = false;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
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
          {menuMode === "food"
            ? language === "ar"
              ? "تشكيلتنا المميزة"
              : "Our Selection"
            : language === "ar"
              ? "مشروباتنا المختارة"
              : "Coffee & Refreshments"}
        </span>
        <h2
          className={`text-3xl md:text-5xl font-bold text-[#FFFFFF] uppercase mb-4 ${
            language === "ar"
              ? "font-cairo max-md:tracking-normal tracking-wider"
              : "font-poppins tracking-wider"
          }`}
        >
          {menuMode === "food"
            ? language === "ar"
              ? "قائمة الطعام"
              : "FOOD MENU"
            : language === "ar"
              ? "منيو الكافيه"
              : "CAFÉ MENU"}
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4A017] to-transparent mx-auto" />
      </div>

      <div className="mb-8 flex justify-center" dir={language === "ar" ? "rtl" : "ltr"}>
        <div className="inline-flex items-center rounded-2xl border border-white/10 bg-[#111111]/80 p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.3)] backdrop-blur-xl">
          <button
            type="button"
            onClick={() => handleMenuModeChange("food")}
            aria-pressed={menuMode === "food"}
            className={`inline-flex min-w-[132px] items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 sm:min-w-[160px] ${
              menuMode === "food"
                ? "bg-[#D4A017] text-[#0F0F0F] shadow-lg shadow-[#D4A017]/20"
                : "text-white/65 hover:bg-white/5 hover:text-white"
            } ${language === "ar" ? "font-cairo" : "font-poppins"}`}
          >
            <UtensilsCrossed className="h-4 w-4" aria-hidden="true" />
            <span>{language === "ar" ? "منيو الطعام" : "Food Menu"}</span>
          </button>

          <button
            type="button"
            onClick={() => handleMenuModeChange("cafe")}
            aria-pressed={menuMode === "cafe"}
            className={`inline-flex min-w-[132px] items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 sm:min-w-[160px] ${
              menuMode === "cafe"
                ? "bg-[#D4A017] text-[#0F0F0F] shadow-lg shadow-[#D4A017]/20"
                : "text-white/65 hover:bg-white/5 hover:text-white"
            } ${language === "ar" ? "font-cairo" : "font-poppins"}`}
          >
            <Coffee className="h-4 w-4" aria-hidden="true" />
            <span>{language === "ar" ? "منيو الكافيه" : "Café Menu"}</span>
          </button>
        </div>
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
              {menuData.map((category) => {
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
          {menuData.map((category: MenuCategory) => {
            const halfLength = Math.ceil(category.items.length / 2);
            const col1 = category.items.slice(0, halfLength);
            const col2 = category.items.slice(halfLength);
            const isBurgersCategory = category.id === "burgers";
            const isSandwichesCategory = category.id === "sandwiches";
            const isMealsCategory = category.id === "meals";

            return (
              <div
                key={category.id}
                id={`category-${category.id}`}
                className="flex flex-col items-center w-full scroll-mt-28"
              >
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative w-full bg-gradient-to-b from-[#121212]/55 via-[#121212]/35 to-[#121212]/55 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.3)]"
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
