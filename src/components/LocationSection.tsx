"use client";

import React from "react";
import { Clock, MapPin, Navigation } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const MAP_URL = "https://maps.app.goo.gl/HjW6x8W1vRjhgRm18";
const MAP_EMBED_URL =
  "https://www.google.com/maps?q=32.3687626,15.0824737&z=16&output=embed";

const OPENING_HOURS = [
  { ar: "الأربعاء", en: "Wednesday", arTime: "12 ظهراً – 12 منتصف الليل", enTime: "12 PM – 12 AM" },
  { ar: "الخميس", en: "Thursday", arTime: "12 ظهراً – 12 منتصف الليل", enTime: "12 PM – 12 AM" },
  { ar: "الجمعة", en: "Friday", arTime: "4 مساءً – 12 منتصف الليل", enTime: "4 PM – 12 AM", special: true },
  { ar: "السبت", en: "Saturday", arTime: "12 ظهراً – 12 منتصف الليل", enTime: "12 PM – 12 AM" },
  { ar: "الأحد", en: "Sunday", arTime: "12 ظهراً – 12 منتصف الليل", enTime: "12 PM – 12 AM" },
  { ar: "الإثنين", en: "Monday", arTime: "12 ظهراً – 12 منتصف الليل", enTime: "12 PM – 12 AM" },
  { ar: "الثلاثاء", en: "Tuesday", arTime: "12 ظهراً – 12 منتصف الليل", enTime: "12 PM – 12 AM" },
];

export const LocationSection: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <section
      id="location"
      className="relative px-4 py-12 sm:px-6 sm:py-16"
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <span
            className={`mb-3 block text-xs font-semibold uppercase text-[#D4A017] ${
              isArabic ? "font-cairo" : "font-poppins tracking-[0.3em]"
            }`}
          >
            {isArabic ? "زورونا" : "Visit Us"}
          </span>
          <h2
            className={`mb-4 text-3xl font-bold text-white md:text-5xl ${
              isArabic ? "font-cairo" : "font-poppins uppercase tracking-wider"
            }`}
          >
            {isArabic ? "موقعنا" : "Our Location"}
          </h2>
          <div className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-[#D4A017] to-transparent" />
        </div>

        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#111111]/85 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-sm">
          <div className="aspect-[4/3] w-full overflow-hidden bg-[#171717] sm:aspect-[16/7]">
            <iframe
              title={isArabic ? "موقع برجر هاوس مصراتة على الخريطة" : "Burger House Misrata location map"}
              src={MAP_EMBED_URL}
              className="h-full w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex flex-col gap-5 border-t border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="flex items-start gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D4A017]/[0.12] text-[#D4A017]">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className={`mb-1 text-lg font-bold text-white ${isArabic ? "font-cairo" : "font-poppins"}`}>
                  {isArabic ? "برجر هاوس مصراتة" : "Burger House Misrata"}
                </h3>
                <p className={`max-w-2xl text-sm leading-7 text-white/60 sm:text-base ${isArabic ? "font-cairo" : "font-poppins"}`}>
                  {isArabic
                    ? "نستقبلكم في برجر هاوس مصراتة. افتحوا الموقع على الخريطة للوصول إلينا بسهولة."
                    : "Visit Burger House in Misrata. Open the location in Google Maps for easy directions."}
                </p>
              </div>
            </div>

            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#D4A017] px-5 py-3 text-sm font-bold text-[#0F0F0F] transition-colors hover:bg-[#F2B94B] ${
                isArabic ? "font-cairo" : "font-poppins"
              }`}
              aria-label={isArabic ? "فتح موقع برجر هاوس في خرائط جوجل" : "Open Burger House in Google Maps"}
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              <span>{isArabic ? "الاتجاهات إلى المطعم" : "Get Directions"}</span>
            </a>
          </div>
        </div>

        <div className="mt-5 rounded-[28px] border border-white/10 bg-[#111111]/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:p-7">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4A017]/[0.12] text-[#D4A017]">
              <Clock className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className={`text-xl font-bold text-white sm:text-2xl ${isArabic ? "font-cairo" : "font-poppins"}`}>
              {isArabic ? "مواعيد العمل" : "Opening Hours"}
            </h3>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {OPENING_HOURS.map((day) => (
              <div
                key={day.en}
                className={`flex min-h-14 items-center justify-between gap-4 rounded-2xl border px-4 py-3 ${
                  day.special
                    ? "border-[#D4A017]/30 bg-[#D4A017]/[0.08]"
                    : "border-white/[0.07] bg-white/[0.025]"
                }`}
              >
                <span className={`text-sm font-bold text-white/90 ${isArabic ? "font-cairo" : "font-poppins"}`}>
                  {isArabic ? day.ar : day.en}
                </span>
                <span
                  dir={isArabic ? "rtl" : "ltr"}
                  className={`text-xs font-semibold sm:text-sm ${
                    day.special ? "text-[#D4A017]" : "text-white/55"
                  } ${isArabic ? "font-cairo" : "font-poppins"}`}
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
