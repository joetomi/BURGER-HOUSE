"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface PremiumLoaderProps {
  onComplete: () => void;
}

export const PremiumLoader: React.FC<PremiumLoaderProps> = ({ onComplete }) => {
  const [isLeaving, setIsLeaving] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setIsLeaving(true), 4300);
    const completeTimer = window.setTimeout(onComplete, 5000);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-[#0F0F0F] px-6 transition-all duration-700 ease-in-out ${
        isLeaving ? "opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-label="Burger House is loading"
    >
      <div
        className="absolute inset-0 bg-repeat opacity-[0.08]"
        style={{ backgroundImage: "url('/pattern.jpg')", backgroundSize: "520px" }}
      />

      <div className="relative flex flex-col items-center text-center">
        <motion.img
          src="/logo.png"
          alt="BURGER HOUSE"
          className="h-36 w-36 object-contain sm:h-44 sm:w-44"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.82, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 2.2, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="mt-6 h-px w-12 bg-[#D4A017]" />

        <p className="mt-5 font-poppins text-sm font-semibold tracking-[0.32em] text-white sm:text-base">
          MENU
        </p>
      </div>
    </div>
  );
};
