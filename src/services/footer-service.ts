import { Locale } from "@/src/config/i18n";
import { SITE_CONFIG } from "@/src/constants/footer";
import { createTranslator, DEFAULT_LOCALE } from "@/src/services/i18n-service";

export function getFooterData(locale: Locale = DEFAULT_LOCALE) {
  const t = createTranslator(locale);

  return {
    siteConfig: {
      ...SITE_CONFIG,
      name: t(SITE_CONFIG.nameKey),
      slogan: t(SITE_CONFIG.sloganKey),
    },
  };
}
