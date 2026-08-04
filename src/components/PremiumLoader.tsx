"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface PremiumLoaderProps {
  onComplete: () => void;
}

export const PremiumLoader: React.FC<PremiumLoaderProps> = ({ onComplete }) => {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isLogoReady, setIsLogoReady] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isLogoReady) return;

    const leaveTimer = window.setTimeout(() => setIsLeaving(true), 4200);
    const completeTimer = window.setTimeout(onComplete, 5000);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(completeTimer);
    };
  }, [isLogoReady, onComplete]);

  const entranceDuration = shouldReduceMotion ? 0 : 1.8;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#090909] px-6 transition-opacity duration-700 ease-in-out ${
        isLeaving ? "opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-label="Burger House menu is loading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.055),transparent_48%)]" />

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
          className="relative rounded-full border border-white/10 bg-white/[0.015] p-1 shadow-[0_24px_70px_rgba(0,0,0,0.65)]"
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.86, filter: "blur(8px)" }}
          animate={
            isLogoReady
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, scale: shouldReduceMotion ? 1 : 0.86, filter: "blur(8px)" }
          }
          transition={{ duration: entranceDuration, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/loader-brand.png"
            alt="Burger House logo"
            className="h-48 w-48 object-contain sm:h-56 sm:w-56"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            onLoad={(event) => {
              event.currentTarget
                .decode()
                .catch(() => undefined)
                .finally(() => setIsLogoReady(true));
            }}
            onError={() => setIsLogoReady(true)}
          />
        </motion.div>

        <motion.div
          className="mt-7 flex flex-col items-center"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={isLogoReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.9,
            delay: shouldReduceMotion ? 0 : 0.8,
            ease: "easeOut",
          }}
        >
          <h1 className="font-poppins text-xl font-bold tracking-[0.24em] text-white sm:text-2xl">
            BURGER HOUSE
          </h1>
          <div className="my-4 h-px w-10 bg-white/25" />
          <div className="rounded-full border border-white/15 px-5 py-2">
            <p className="font-poppins text-[10px] font-medium tracking-[0.38em] text-white/70">
              DIGITAL MENU
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
