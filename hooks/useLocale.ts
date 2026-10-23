"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  LEGACY_LOCALE_KEY,
  LOCALE_KEY,
  type Locale,
  siteCopy,
} from "@/data/locale";
import { tgaiCopy } from "@/data/tgai";

function detectDefault(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(LOCALE_KEY);
    if (saved === "uz" || saved === "en") return saved;
    const legacy = window.localStorage.getItem(LEGACY_LOCALE_KEY);
    if (legacy === "uz" || legacy === "en") return legacy;
  } catch {
    /* private mode */
  }
  const lang = window.navigator.language?.toLowerCase() ?? "";
  return lang.startsWith("uz") ? "uz" : "en";
}

let locale: Locale = "en";
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Locale {
  return locale;
}

function getServerSnapshot(): Locale {
  return "en";
}

function setLocale(next: Locale) {
  if (locale === next) return;
  locale = next;
  try {
    window.localStorage.setItem(LOCALE_KEY, next);
  } catch {
    /* ignore */
  }
  emit();
}

/** Site-wide UZ/EN locale. Used by the navbar toggle and every translated surface. */
export function useLocale() {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!hydrated) {
      locale = detectDefault();
      hydrated = true;
      emit();
    }
    setReady(true);
  }, []);

  return {
    locale: current,
    t: siteCopy[current],
    tgai: tgaiCopy[current],
    setLocale,
    ready,
  };
}
