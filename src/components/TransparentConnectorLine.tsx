import React from "react";

export const TransparentConnectorLine: React.FC = () => {
  return (
    <div className="flex flex-col items-center my-1 pointer-events-none z-30">
      {/* Golden Connector Line bridging Image Card to Menu Card */}
      <svg
        className="w-6 h-7 text-[#D4A017] filter drop-shadow-[0_0_8px_rgba(212,160,23,0.5)]"
        viewBox="0 0 24 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dashed Line from bottom center of image card */}
        <line
          x1="12"
          y1="0"
          x2="12"
          y2="20"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeDasharray="5 4"
        />
        {/* Anchor point at top center of menu card */}
        <circle cx="12" cy="24" r="3.5" fill="currentColor" />
      </svg>
    </div>
  );
};
