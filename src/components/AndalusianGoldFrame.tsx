import React from "react";

interface AndalusianGoldFrameProps {
  children: React.ReactNode;
}

export const AndalusianGoldFrame: React.FC<AndalusianGoldFrameProps> = ({ children }) => {
  return (
    <div className="relative group my-10 px-2 sm:px-4">
      {/* Outer Thin Gold Andalusian Vector Frame Overlay with Extra Clearance */}
      <div className="absolute -inset-4 sm:-inset-6 pointer-events-none z-20">
        <svg
          className="w-full h-full text-[#D4A017] filter drop-shadow-[0_2px_8px_rgba(212,160,23,0.35)]"
          preserveAspectRatio="none"
          viewBox="0 0 800 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Andalusian Unified Outline Path - Widened Top Arch for Zero Image Overlap */}
          <path
            d="
              M 400 4 
              C 480 4, 550 20, 610 60
              C 645 82, 650 140, 650 220
              C 650 250, 675 260, 775 260
              C 790 260, 795 272, 795 290
              L 795 972
              C 795 990, 782 995, 762 995
              L 440 995
              C 420 995, 410 999, 400 999
              C 390 999, 380 995, 360 995
              L 38 995
              C 18 995, 5 990, 5 972
              L 5 290
              C 5 272, 10 260, 25 260
              C 125 260, 150 250, 150 220
              C 150 140, 155 82, 190 60
              C 250 20, 320 4, 400 4
              Z
            "
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* Inner Accent Line for Andalusian Engraving Detail */}
          <path
            d="
              M 400 10 
              C 475 10, 543 25, 603 63
              C 638 84, 643 140, 643 218
              C 643 245, 670 254, 770 254
              C 783 254, 789 266, 789 284
              L 789 966
              C 789 984, 776 989, 756 989
              L 440 989
              L 360 989
              L 44 989
              C 24 989, 11 984, 11 966
              L 11 284
              C 11 266, 17 254, 30 254
              C 130 254, 157 245, 157 218
              C 157 140, 162 84, 197 63
              C 257 25, 325 10, 400 10
              Z
            "
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="4 3"
            opacity="0.65"
            vectorEffect="non-scaling-stroke"
          />

          {/* Andalusian Peak Finial Motif Star (Top Center) */}
          <circle cx="400" cy="4" r="3" fill="currentColor" />
          <path d="M 400 -1 L 400 9 M 395 4 L 405 4" stroke="currentColor" strokeWidth="1" />

          {/* Andalusian Corner Diamond Accents */}
          <polygon points="11,284 16,279 21,284 16,289" fill="currentColor" opacity="0.85" />
          <polygon points="789,284 784,279 779,284 784,289" fill="currentColor" opacity="0.85" />
          <polygon points="11,966 16,961 21,966 16,971" fill="currentColor" opacity="0.85" />
          <polygon points="789,966 784,961 779,966 784,971" fill="currentColor" opacity="0.85" />
        </svg>
      </div>

      {/* Frame Content with Inner Padding for Zero Overlap */}
      <div className="relative z-10 p-2 sm:p-3">{children}</div>
    </div>
  );
};
