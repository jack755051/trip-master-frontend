"use client";

import { Locale } from "@/src/config/i18n";
import {
  createTranslator,
  DEFAULT_LOCALE,
  LOCALE_COOKIE_KEY,
  resolveLocale,
} from "@/src/services/i18n-service";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type TranslateVariables = Record<string, string | number>;

interface I18nContextValue {
  locale: Locale;
  t: (path: string, variables?: TranslateVariables) => string;
  setLanguage: (newLocale: string) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  initialLocale = DEFAULT_LOCALE,
  children,
}: {
  initialLocale?: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>(resolveLocale(initialLocale));

  const t = useMemo(() => createTranslator(locale), [locale]);

  const setLanguage = useCallback(
    (newLocale: string) => {
      const nextLocale = resolveLocale(newLocale);

      document.cookie = `${LOCALE_COOKIE_KEY}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
      setLocale(nextLocale);
      router.refresh();
    },
    [router],
  );

  const value = useMemo(
    () => ({
      locale,
      t,
      setLanguage,
    }),
    [locale, t, setLanguage],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18nContext() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18nContext must be used within I18nProvider");
  }
  return context;
}
