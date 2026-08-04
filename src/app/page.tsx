"use client";

import React, { useCallback, useState } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { Footer } from "@/components/Footer";
import { PremiumLoader } from "@/components/PremiumLoader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const finishLoading = useCallback(() => setIsLoading(false), []);

  return (
    <LanguageProvider>
      {isLoading && <PremiumLoader onComplete={finishLoading} />}
      <main
        aria-hidden={isLoading}
        className={`min-h-screen bg-transparent text-[#FFFFFF] font-poppins selection:bg-[#D4A017]/30 selection:text-[#FFFFFF] transition-all duration-300 ${
          isLoading ? "pointer-events-none" : ""
        }`}
      >
        <Hero />
        <MenuSection />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
