"use client";

import { cn } from "@/lib/utils";
import { localeOptions } from "@/src/config/i18n/locale-options";
import { useTranslations } from "@/src/hooks/useTranslations";

export default function AuthLocaleToggle() {
  const { locale, setLanguage } = useTranslations();

  return (
    <div className="inline-flex items-center rounded-full border border-white/15 bg-background/20 p-1 backdrop-blur-md">
      {localeOptions.map((option) => {
        const isActive = locale === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setLanguage(option.value)}
            aria-pressed={isActive}
            aria-label={option.label}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors sm:px-4",
              isActive
                ? "bg-white text-text-main shadow-sm"
                : "text-white/70 hover:bg-white/10 hover:text-white",
            )}
          >
            {option.shortLabel}
          </button>
        );
      })}
    </div>
  );
}
