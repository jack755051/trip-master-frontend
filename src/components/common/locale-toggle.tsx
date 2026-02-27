"use client";

import { cn } from "@/lib/utils";
import { relaxedBouncy } from "@/src/constants/auth-constants";
import { localeOptions } from "@/src/config/i18n/locale-options";
import { useTranslations } from "@/src/hooks/useTranslations";
import { motion } from "framer-motion";

type LocaleToggleProps = {
  className?: string;
};

export default function LocaleToggle({ className }: LocaleToggleProps) {
  const { locale, setLanguage } = useTranslations();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border/60 bg-background/70 p-1 shadow-sm backdrop-blur-md",
        className,
      )}
    >
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
              "relative rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-500 sm:px-4",
              isActive ? "text-brand-foreground" : "text-text-main/70 hover:text-text-main",
            )}
          >
            <span className="relative z-10">{option.shortLabel}</span>
            {isActive && (
              <motion.span
                layoutId="locale-pill"
                className="absolute inset-0 rounded-full bg-brand shadow-[0_0_20px_rgba(var(--brand),0.25)]"
                transition={relaxedBouncy}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
