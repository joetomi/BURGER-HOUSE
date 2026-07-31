"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface PremiumLoaderProps {
  onComplete?: () => void;
}

export const PremiumLoader: React.FC<PremiumLoaderProps> = ({ onComplete }) => {
  const shouldReduceMotion = useReducedMotion();
  const [stage, setStage] = useState<"initial" | "reflect" | "rotate" | "breathe" | "exit">("initial");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 5-second luxury animation sequence timeline
    const t1 = setTimeout(() => setStage("reflect"), 500);
    const t2 = setTimeout(() => setStage("rotate"), 1600);
    const t3 = setTimeout(() => setStage("breathe"), 2900);
    const t4 = setTimeout(() => {
      setStage("exit");
      setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 700);
    }, 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  // Custom senior motion designer cubic-bezier curve
  const luxuryEase = [0.22, 1, 0.36, 1] as const;

  return (
    <AnimatePresence>
      {stage !== "exit" && (
        <motion.div
          key="loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease: luxuryEase }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0F0F0F] overflow-hidden select-none"
        >
          {/* Restaurant Pattern Background (Barely visible under 88% dark overlay) */}
          <div
            className="absolute inset-0 bg-repeat bg-center opacity-12 pointer-events-none"
            style={{ backgroundImage: "url('/pattern.jpg')", backgroundSize: "320px" }}
          />
          <div className="absolute inset-0 bg-[#0F0F0F]/88 pointer-events-none" />

          {/* Centered Content Container */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4">
            {/* Hero Logo Frame */}
            <div className="relative overflow-hidden p-3 rounded-2xl">
              <motion.img
                src="/logo.png"
                alt="Burger House Logo"
                className="w-48 sm:w-56 md:w-64 h-auto object-contain drop-shadow-[0_12px_35px_rgba(0,0,0,0.85)]"
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.85, rotate: 0 }
                }
                animate={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : stage === "initial"
                    ? { opacity: 1, scale: 1, rotate: 0 }
                    : stage === "reflect"
                    ? { opacity: 1, scale: 1, rotate: 0 }
                    : stage === "rotate"
                    ? { opacity: 1, scale: 1, rotate: [-3, 3, 0] }
                    : {
                        opacity: 1,
                        scale: [1, 0.985, 1],
                        rotate: 0,
                      }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0.4 }
                    : stage === "initial"
                    ? { duration: 0.4, ease: luxuryEase }
                    : stage === "rotate"
                    ? { duration: 1.2, ease: "easeInOut" }
                    : stage === "breathe"
                    ? { duration: 2.0, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.4 }
                }
              />

              {/* Soft Gold Metallic Reflection Sweeping Left to Right */}
              {!shouldReduceMotion && (stage === "reflect" || stage === "rotate" || stage === "breathe") && (
                <motion.div
                  className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-[#D4A017]/35 to-transparent skew-x-[-25deg]"
                  initial={{ x: "-120%" }}
                  animate={{ x: "220%" }}
                  transition={{ duration: 1.1, ease: luxuryEase }}
                />
              )}
            </div>

            {/* Three Tiny Gold Dots Loading Indicator */}
            <div className="flex items-center gap-2 mt-8 mb-4">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-[#D4A017]"
                  initial={{ opacity: 0.2 }}
                  animate={
                    shouldReduceMotion
                      ? { opacity: 0.8 }
                      : { opacity: [0.2, 1, 0.2] }
                  }
                  transition={
                    shouldReduceMotion
                      ? {}
                      : {
                          duration: 1.2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut",
                        }
                  }
                />
              ))}
            </div>

            {/* Luxury Subtitle Text */}
            <p className="font-poppins font-medium text-xs sm:text-sm tracking-[0.08em] text-white/75 uppercase">
              Preparing your experience
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
