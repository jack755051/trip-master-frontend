"use client";

import { useI18nContext } from "@/src/components/providers/i18n-provider";

export function useTranslations() {
  return useI18nContext();
}
