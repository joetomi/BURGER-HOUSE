import React from "react";

// Arrow 1 (Burger): Clean hand-drawn twin-line loop pointing from bottom-right of image down to category title
export const ElegantArrowBurger: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    className={`w-20 h-24 sm:w-24 sm:h-28 text-[#D4A017] filter drop-shadow-[0_3px_10px_rgba(212,160,23,0.4)] ${className}`}
    viewBox="0 0 100 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Twin Line 1 */}
    <path
      d="M 20 10 C 65 15, 90 45, 55 70 C 25 90, 20 40, 60 105"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Twin Line 2 */}
    <path
      d="M 23 13 C 68 18, 93 48, 58 73 C 28 93, 23 43, 63 108"
      stroke="currentColor"
      strokeWidth="2.0"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.8"
    />
    {/* Arrowhead pointing down */}
    <path
      d="M 45 96 L 62 107 L 66 88"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M 47 98 L 64 109 L 68 90"
      stroke="currentColor"
      strokeWidth="2.0"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.8"
    />
  </svg>
);

// Arrow 2 (Wraps): Clean hand-drawn twin-line S-swoosh pointing from bottom-left of image down to category title
export const ElegantArrowWraps: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    className={`w-20 h-24 sm:w-24 sm:h-28 text-[#D4A017] filter drop-shadow-[0_3px_10px_rgba(212,160,23,0.4)] ${className}`}
    viewBox="0 0 100 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Twin Line 1 */}
    <path
      d="M 80 10 C 35 20, 10 50, 45 75 C 75 92, 70 42, 35 105"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Twin Line 2 */}
    <path
      d="M 77 13 C 32 23, 7 53, 42 78 C 72 95, 67 45, 32 108"
      stroke="currentColor"
      strokeWidth="2.0"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.8"
    />
    {/* Arrowhead pointing down */}
    <path
      d="M 50 90 L 33 107 L 30 88"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M 48 92 L 31 109 L 28 90"
      stroke="currentColor"
      strokeWidth="2.0"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.8"
    />
  </svg>
);

// Arrow 3 (Meals): Clean hand-drawn twin-line spiral pointing from bottom-right of image down to category title
export const ElegantArrowMeals: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    className={`w-20 h-24 sm:w-24 sm:h-28 text-[#D4A017] filter drop-shadow-[0_3px_10px_rgba(212,160,23,0.4)] ${className}`}
    viewBox="0 0 100 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Twin Line 1 */}
    <path
      d="M 15 15 C 75 10, 95 60, 50 80 C 15 95, 45 50, 75 105"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Twin Line 2 */}
    <path
      d="M 18 18 C 78 13, 98 63, 53 83 C 18 98, 48 53, 78 108"
      stroke="currentColor"
      strokeWidth="2.0"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.8"
    />
    {/* Arrowhead pointing down */}
    <path
      d="M 60 92 L 76 107 L 80 88"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M 62 94 L 78 109 L 82 90"
      stroke="currentColor"
      strokeWidth="2.0"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.8"
    />
  </svg>
);
