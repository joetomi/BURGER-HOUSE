import { useEffect, useRef, useState } from "react";

export const readSessionValue = <T,>(key: string, fallback: T): T => {
  try {
    const value = sessionStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const writeSessionValue = (key: string, value: unknown) => {
  try { sessionStorage.setItem(key, JSON.stringify(value)); } catch { /* Storage may be disabled. */ }
};

export const useSessionState = <T,>(key: string, fallback: T, valid: (value: T) => boolean) => {
  const [value, setValue] = useState<T>(() => {
    const stored = readSessionValue(key, fallback);
    return valid(stored) ? stored : fallback;
  });
  useEffect(() => { writeSessionValue(key, value); }, [key, value]);
  return [value, setValue] as const;
};

export const useSessionScroll = (key: string, ready: boolean) => {
  const restored = useRef(false);
  const savedTop = useRef(readSessionValue<number>(key, 0));
  useEffect(() => {
    if (!ready || restored.current) return;
    restored.current = true;
    const target = Number.isFinite(savedTop.current) ? Math.max(0, savedTop.current) : 0;
    const previous = history.scrollRestoration;
    history.scrollRestoration = "manual";
    let restoring = target > 0;
    let frame = 0;
    const restore = () => {
      if (restoring) window.scrollTo({ top: target, behavior: "instant" as ScrollBehavior });
    };
    const save = () => {
      if (!restoring) writeSessionValue(key, window.scrollY);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(save);
    };
    const stopRestoring = () => { restoring = false; };
    const observer = new ResizeObserver(restore);
    observer.observe(document.body);
    restore();
    const restoreFrame = requestAnimationFrame(restore);
    const timer = window.setTimeout(() => { restoring = false; observer.disconnect(); save(); }, 3000);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", save);
    const interactions = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    interactions.forEach((event) => window.addEventListener(event, stopRestoring, { passive: true }));
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(restoreFrame);
      clearTimeout(timer);
      observer.disconnect();
      save();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", save);
      interactions.forEach((event) => window.removeEventListener(event, stopRestoring));
      history.scrollRestoration = previous;
      restored.current = false;
    };
  }, [key, ready]);
};
