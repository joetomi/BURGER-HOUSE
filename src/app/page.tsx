"use client";

import React from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { Footer } from "@/components/Footer";
import { PromotionsCarousel } from "@/components/PromotionsCarousel";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LocationSection } from "@/components/LocationSection";

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-transparent font-poppins text-[#FFFFFF] selection:bg-[#D4A017]/30 selection:text-[#FFFFFF]">
        <LanguageSwitcher />
        <Hero />
        <PromotionsCarousel />
        <MenuSection />
        <LocationSection />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
