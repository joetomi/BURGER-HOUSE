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

  if (isLoading) {
    return <PremiumLoader onComplete={finishLoading} />;
  }

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
