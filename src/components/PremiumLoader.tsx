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
    const leaveTimer = window.setTimeout(() => setIsLeaving(true), 4200);
    const completeTimer = window.setTimeout(onComplete, 5000);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const entranceDuration = shouldReduceMotion ? 0 : 1.8;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#0F0F0F] px-6 transition-opacity duration-700 ease-in-out ${
        isLeaving ? "opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-label="Burger House menu is loading"
    >
      <div
        className="absolute inset-0 bg-repeat opacity-[0.055]"
        style={{ backgroundImage: "url('/pattern.jpg')", backgroundSize: "560px" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,160,23,0.10),transparent_48%)]" />

      <motion.div
        className="relative flex flex-col items-center text-center"
        animate={
          isLeaving
            ? { opacity: 0, scale: shouldReduceMotion ? 1 : 0.96, y: -8 }
            : { opacity: 1, scale: 1, y: 0 }
        }
        transition={{ duration: shouldReduceMotion ? 0 : 0.65, ease: "easeInOut" }}
      >
        <motion.div
          className="relative rounded-full border border-[#D4A017]/25 bg-black/40 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.55)]"
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0, scale: 0.86, filter: "blur(8px)" }
          }
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: entranceDuration, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/loader-brand.png"
            alt="Burger House logo"
            className="h-48 w-48 object-contain sm:h-56 sm:w-56"
          />
        </motion.div>

        <motion.div
          className="mt-7 flex flex-col items-center"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.9,
            delay: shouldReduceMotion ? 0 : 0.8,
            ease: "easeOut",
          }}
        >
          <h1 className="font-poppins text-xl font-bold tracking-[0.28em] text-white sm:text-2xl">
            BURGER HOUSE
          </h1>
          <div className="my-4 h-px w-12 bg-[#D4A017]" />
          <p className="font-poppins text-[11px] font-semibold tracking-[0.5em] text-[#D4A017]">
            MENU
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
