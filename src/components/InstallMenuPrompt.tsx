import React, { useEffect, useState } from "react";
import { Download, Share, Smartphone, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const REMINDER_KEY = "bh-install-reminder-after";
const isInstalled = () => window.matchMedia("(display-mode: standalone)").matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

export const InstallMenuPrompt: React.FC = () => {
  const { language } = useLanguage();
  const ar = language === "ar";
  const [visible, setVisible] = useState(false);
  const [instructions, setInstructions] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [platform, setPlatform] = useState<"ios" | "android">("android");
  const [promptEvent, setPromptEvent] = useState<InstallPromptEvent | null>(null);

  useEffect(() => {
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const android = /Android/i.test(navigator.userAgent);
    if ((!ios && !android) || isInstalled()) return;
    setPlatform(ios ? "ios" : "android");
    let suppressed = false;
    try { suppressed = Number(localStorage.getItem(REMINDER_KEY)) > Date.now(); } catch { /* Optional preference. */ }
    if (suppressed) return;
    const onScroll = () => {
      if (window.scrollY >= Math.max(500, window.innerHeight * 0.7)) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    const onInstallPrompt = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as InstallPromptEvent);
    };
    const onInstalled = () => {
      setVisible(false);
      setPromptEvent(null);
    };
    const displayMode = window.matchMedia("(display-mode: standalone)");
    const onDisplayMode = () => { if (isInstalled()) onInstalled(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("beforeinstallprompt", onInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);
    displayMode.addEventListener("change", onDisplayMode);
    // Also supports returning to an already-scrolled page after refreshing.
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("beforeinstallprompt", onInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
      displayMode.removeEventListener("change", onDisplayMode);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    try { localStorage.setItem(REMINDER_KEY, String(Date.now() + 7 * 24 * 60 * 60 * 1000)); } catch { /* Optional preference. */ }
  };

  const install = async () => {
    if (!promptEvent) {
      setInstructions(true);
      return;
    }
    setInstalling(true);
    try {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;
      if (choice.outcome === "accepted") setVisible(false);
      else dismiss();
    } catch {
      setInstructions(true);
    } finally {
      setPromptEvent(null);
      setInstalling(false);
    }
  };

  if (!visible) return null;
  return (
    <aside className={`install-menu-card fixed z-[80] mx-auto w-auto max-w-md rounded-3xl border border-[#D4A017]/30 bg-[#151515]/95 p-5 text-white shadow-[0_16px_50px_rgba(0,0,0,0.55)] ${ar ? "font-cairo" : "font-poppins"}`}
      dir={ar ? "rtl" : "ltr"} aria-label={ar ? "أضف المنيو إلى شاشتك" : "Add the menu to your home screen"}>
      <button type="button" onClick={dismiss} aria-label={ar ? "إغلاق" : "Close"}
        className="absolute end-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white">
        <X className="h-4 w-4" />
      </button>
      <div className="flex items-start gap-3 pe-7" role="status" aria-live="polite">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#D4A017]/20 bg-[#D4A017]/10 text-[#D4A017]">
          <Smartphone className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-base font-bold">{ar ? "منيو برجر هاوس… أقرب لك بلمسة" : "Burger House, just a tap away"}</h2>
          <p className="mt-2 text-sm leading-6 text-white/60">
            {ar ? "أضف المنيو إلى شاشتك الرئيسية، وافتح اختياراتك المفضلة مباشرة في كل زيارة." : "Add our menu to your home screen and open your favorites in one tap, every visit."}
          </p>
        </div>
      </div>
      {instructions ? (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-white/80">
          <p className="mb-2 flex items-center gap-2 font-bold text-[#D4A017]">
            {platform === "ios" ? <Share className="h-4 w-4" /> : <Download className="h-4 w-4" />}
            {ar ? "خطوتان والمنيو على شاشتك" : "Your menu, in two quick steps"}
          </p>
          <ol className="list-inside list-decimal space-y-2">
            <li>{platform === "ios"
              ? ar ? "افتح زر المشاركة في المتصفح؛ قد تجده داخل قائمة المزيد (…)." : "Open Share in your browser; it may be inside the More (…) menu."
              : ar ? "افتح قائمة المتصفح (⋮)." : "Open your browser menu (⋮)."}</li>
            <li>{platform === "ios"
              ? ar ? "اختر «إضافة إلى الشاشة الرئيسية»، ثم «إضافة»." : "Choose Add to Home Screen, then Add."
              : ar ? "اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية»، ثم أكّد الإضافة." : "Choose Install app or Add to Home screen, then confirm."}</li>
          </ol>
          <button type="button" onClick={dismiss} className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#D4A017] px-4 py-2.5 font-bold text-black transition hover:bg-[#E2B22D]">
            {ar ? "تمام" : "Got it"}
          </button>
        </div>
      ) : (
        <div className="mt-4 flex items-center gap-2">
          <button type="button" disabled={installing} onClick={() => void install()}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#D4A017] px-4 py-2.5 text-sm font-bold text-black transition hover:bg-[#E2B22D] disabled:opacity-50">
            <Download className="h-4 w-4" />
            {installing ? ar ? "جارٍ الفتح…" : "Opening…" : ar ? "أضفه لشاشتك" : "Add to home screen"}
          </button>
          <button type="button" onClick={dismiss} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/65 transition hover:bg-white/10">
            {ar ? "لاحقاً" : "Later"}
          </button>
        </div>
      )}
    </aside>
  );
};
