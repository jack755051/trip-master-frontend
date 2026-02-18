import { dictionaries, Locale } from "@/src/config/i18n";

export const DEFAULT_LOCALE: Locale = "zh-TW";
export const LOCALE_COOKIE_KEY = "tm_locale";

export function isLocale(value: string): value is Locale {
  return value in dictionaries;
}

export function resolveLocale(value?: string): Locale {
  if (!value) return DEFAULT_LOCALE;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function translate(
  locale: Locale,
  path: string,
  variables?: Record<string, string | number>,
): string {
  const keys = path.split(".");
  let value: unknown = dictionaries[locale];

  for (const key of keys) {
    if (typeof value === "object" && value !== null && key in value) {
      value = (value as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }

  if (typeof value !== "string") return path;

  if (!variables) return value;

  let result = value;
  Object.entries(variables).forEach(([vKey, vValue]) => {
    result = result.replace(new RegExp(`{${vKey}}`, "g"), String(vValue));
  });

  return result;
}

export function createTranslator(locale: Locale) {
  return (path: string, variables?: Record<string, string | number>) =>
    translate(locale, path, variables);
}
