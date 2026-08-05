"use client";

import React from "react";
import { ArrowDown, Navigation } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const MAP_URL = "https://maps.app.goo.gl/HjW6x8W1vRjhgRm18";
const MAP_EMBED_URL =
  "https://www.google.com/maps?q=32.3687626,15.0824737&z=16&output=embed";

const OPENING_HOURS = [
  { ar: "السبت – الخميس", en: "Saturday – Thursday", arTime: "12 ظهراً – 12 منتصف الليل", enTime: "12 PM – 12 AM" },
  { ar: "الجمعة", en: "Friday", arTime: "4 مساءً – 12 منتصف الليل", enTime: "4 PM – 12 AM" },
];

export const LocationSection: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <section
      id="location"
      className="relative mx-auto max-w-6xl px-4 pb-12 sm:px-6"
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
    >
      <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#121212]/55 via-[#121212]/35 to-[#121212]/55 p-6 shadow-[0_15px_40px_rgba(0,0,0,0.3)] backdrop-blur-sm sm:p-8 md:p-10">
        <div className="mb-6 flex flex-col justify-between gap-2 border-b border-white/[0.06] pb-4 sm:mb-8 sm:flex-row sm:items-baseline">
          <h2
            className={`text-2xl font-bold uppercase text-white md:text-3xl ${
              isArabic
                ? "font-cairo text-right tracking-wider max-md:tracking-normal"
                : "font-poppins text-left tracking-wider"
            }`}
          >
            {isArabic ? "موقعنا" : "Our Location"}
          </h2>
          <span
            className={`inline-flex items-center gap-2 text-sm font-semibold text-white/85 sm:text-base ${
              isArabic ? "font-cairo" : "font-poppins"
            }`}
          >
            <span>{isArabic ? "مصراتة، شارع طرابلس" : "Misrata, Tripoli Street"}</span>
            <ArrowDown className="h-4 w-4 shrink-0 text-[#D4A017]" aria-hidden="true" />
          </span>
        </div>

        <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121212]/70 sm:aspect-[16/7]">
          <iframe
            title={isArabic ? "موقع برجر هاوس مصراتة على الخريطة" : "Burger House Misrata location map"}
            src={MAP_EMBED_URL}
            className="h-full w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-5 flex justify-start">
          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-bold text-white transition-all hover:border-[#D4A017] hover:bg-[#D4A017]/10 sm:w-auto ${
              isArabic ? "font-cairo" : "font-poppins"
            }`}
            aria-label={isArabic ? "فتح موقع برجر هاوس في خرائط جوجل" : "Open Burger House in Google Maps"}
          >
            <Navigation className="h-4 w-4 text-[#D4A017]" aria-hidden="true" />
            <span>{isArabic ? "الاتجاهات إلى المطعم" : "Get Directions"}</span>
          </a>
        </div>

        <div className="mt-8 border-t border-white/[0.06] pt-7">
          <div className="mb-3 border-b border-white/[0.06] pb-4">
            <h3
              className={`text-xl font-bold uppercase text-white md:text-2xl ${
                isArabic
                  ? "font-cairo text-right tracking-wider max-md:tracking-normal"
                  : "font-poppins text-left tracking-wider"
              }`}
            >
              {isArabic ? "مواعيد العمل" : "Opening Hours"}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-2 lg:gap-x-16">
            {OPENING_HOURS.map((day) => (
              <div key={day.en} className="flex items-baseline gap-3 py-4">
                <span className={`shrink-0 text-sm font-bold text-white sm:text-base ${isArabic ? "font-cairo" : "font-poppins"}`}>
                  {isArabic ? day.ar : day.en}
                </span>
                <span className="menu-dots h-3 min-w-4 flex-1" aria-hidden="true" />
                <span
                  dir={isArabic ? "rtl" : "ltr"}
                  className={`shrink-0 whitespace-nowrap text-sm font-bold text-[#D4A017] sm:text-base ${
                    isArabic ? "font-cairo" : "font-poppins"
                  }`}
                >
                  {isArabic ? day.arTime : day.enTime}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
