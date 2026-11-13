import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { en, type Dictionary } from "./en";

export type Locale = "en" | "si" | "ta";

export const LOCALES: { code: Locale; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "si", label: "සිංහල", short: "සි" },
  { code: "ta", label: "தமிழ்", short: "த" },
];

/**
 * Only English ships in the initial bundle. Sinhala and Tamil dictionaries are
 * fetched on demand, which keeps the first load small for most visitors.
 */
async function loadDictionary(locale: Locale): Promise<Dictionary> {
  if (locale === "si") {
    const { si } = await import("./si");
    return si as Dictionary;
  }
  if (locale === "ta") {
    const { ta } = await import("./ta");
    return ta as Dictionary;
  }
  return en;
}

const STORAGE_KEY = "ironpeak.locale";

type I18nValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
  /** Interpolate {{token}} placeholders in a dictionary string. */
  fill: (template: string, vars: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [dictionary, setDictionary] = useState<Dictionary>(en);

  // Restore the saved locale once on mount. The dictionary effect below takes
  // care of fetching it, so there is a single source of loading truth.
  useEffect(() => {
    let stored: Locale | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    } catch {
      /* storage unavailable */
    }
    if (stored === "si" || stored === "ta") setLocaleState(stored);
  }, []);

  /**
   * Load the dictionary for the active locale. The cancelled flag drops stale
   * responses, so rapid EN → SI → TA switching can never show the wrong copy.
   */
  useEffect(() => {
    document.documentElement.lang = locale;

    if (locale === "en") {
      setDictionary(en);
      return;
    }

    let cancelled = false;
    void loadDictionary(locale).then((next) => {
      if (!cancelled) setDictionary(next);
    });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const fill = useCallback((template: string, vars: Record<string, string | number>) => {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) =>
      key in vars ? String(vars[key]) : `{{${key}}}`,
    );
  }, []);

  const value = useMemo<I18nValue>(
    () => ({ locale, setLocale, t: dictionary, fill }),
    [locale, setLocale, dictionary, fill],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
