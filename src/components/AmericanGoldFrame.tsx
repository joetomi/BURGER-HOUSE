import React from "react";

interface AmericanGoldFrameProps {
  children: React.ReactNode;
}

export const AmericanGoldFrame: React.FC<AmericanGoldFrameProps> = ({ children }) => {
  return (
    <div className="relative group my-10 px-2 sm:px-4">
      {/* Outer Thin Gold Vintage American Diner & Smokehouse Vector Frame */}
      <div className="absolute -inset-4 sm:-inset-6 pointer-events-none z-20">
        <svg
          className="w-full h-full text-[#D4A017] filter drop-shadow-[0_2px_10px_rgba(212,160,23,0.35)]"
          preserveAspectRatio="none"
          viewBox="0 0 800 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Outer American Diner Shield Line */}
          <path
            d="
              M 400 8
              L 580 8
              C 620 8, 645 25, 650 60
              L 650 215
              L 660 235
              L 775 235
              C 790 235, 796 245, 796 265
              L 796 975
              C 796 990, 785 995, 765 995
              L 35 995
              C 15 995, 4 990, 4 975
              L 4 265
              C 4 245, 10 235, 25 235
              L 140 235
              L 150 215
              L 150 60
              C 155 25, 180 8, 220 8
              Z
            "
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* Inner American Pinstripe Line (Classic Hot-Rod / Diner Gold Pinstriping) */}
          <path
            d="
              M 400 15
              L 575 15
              C 612 15, 638 30, 643 62
              L 643 210
              L 654 228
              L 768 228
              C 782 228, 788 238, 788 258
              L 788 968
              C 788 983, 778 988, 758 988
              L 42 988
              C 22 988, 12 983, 12 968
              L 12 258
              C 12 238, 18 228, 32 228
              L 146 228
              L 157 210
              L 157 62
              C 162 30, 188 15, 225 15
              Z
            "
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="5 3"
            opacity="0.6"
            vectorEffect="non-scaling-stroke"
          />

          {/* Top American Diner Shield Peak Emblem Star */}
          <path d="M 400 1 L 404 10 L 413 10 L 406 15 L 408 24 L 400 19 L 392 24 L 394 15 L 387 10 L 396 10 Z" fill="currentColor" opacity="0.9" />

          {/* Classic American Vintage Rivets at Corners */}
          <circle cx="150" cy="235" r="3" fill="currentColor" opacity="0.85" />
          <circle cx="650" cy="235" r="3" fill="currentColor" opacity="0.85" />
          <circle cx="25" cy="235" r="3.5" fill="currentColor" opacity="0.85" />
          <circle cx="775" cy="235" r="3.5" fill="currentColor" opacity="0.85" />
          <circle cx="35" cy="995" r="3.5" fill="currentColor" opacity="0.85" />
          <circle cx="765" cy="995" r="3.5" fill="currentColor" opacity="0.85" />
          <circle cx="4" cy="975" r="3" fill="currentColor" opacity="0.85" />
          <circle cx="796" cy="975" r="3" fill="currentColor" opacity="0.85" />
        </svg>
      </div>

      {/* Frame Content */}
      <div className="relative z-10 p-2 sm:p-3">{children}</div>
    </div>
  );
};
