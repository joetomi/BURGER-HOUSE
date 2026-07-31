"use client";

import React from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-transparent text-[#FFFFFF] font-poppins selection:bg-[#D4A017]/30 selection:text-[#FFFFFF] transition-all duration-300">
        <Hero />
        <MenuSection />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
