"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface Logo3DProps {
  src?: string;
  alt?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo3D: React.FC<Logo3DProps> = ({
  src = "/logo.png",
  alt = "BURGER HOUSE Logo",
  className = "",
  size = "lg",
}) => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 14;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  };

  const sizeClasses =
    size === "sm"
      ? "w-8 h-8 md:w-9 md:h-9"
      : size === "md"
      ? "w-14 h-14 md:w-16 md:h-16"
      : "w-36 h-36 md:w-48 md:h-48";

  return (
    <div className="relative group flex items-center justify-center perspective-[1000px]">
      {/* Interactive 3D Card Container (Clean monochrome, zero background glows) */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          scale: isHovered ? 1.05 : 1,
          y: isHovered ? -4 : [0, -4, 0],
        }}
        transition={
          isHovered
            ? { type: "spring", stiffness: 350, damping: 25 }
            : {
                rotateX: { type: "spring", stiffness: 300, damping: 25 },
                rotateY: { type: "spring", stiffness: 300, damping: 25 },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              }
        }
        style={{ transformStyle: "preserve-3d" }}
        className={`relative ${sizeClasses} cursor-pointer ${className}`}
      >
        {/* 3D Depth Shadow Layer */}
        <div
          className="absolute inset-0 w-full h-full transform translate-z-[-10px] opacity-25 filter blur-[3px]"
          style={{ transform: "translateZ(-10px)" }}
        >
          <img src={src} alt="" className="w-full h-full object-contain brightness-0" />
        </div>

        {/* Foreground Logo */}
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)] transition-all duration-300 transform translate-z-[10px]"
          style={{ transform: "translateZ(12px)" }}
        />
      </motion.div>
    </div>
  );
};
