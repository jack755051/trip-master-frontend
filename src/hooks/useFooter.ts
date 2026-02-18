"use client";

import { SITE_CONFIG } from "@/src/constants/footer";
import { useTranslations } from "@/src/hooks/useTranslations";

export const useFooter = () => {
  // 注意：useTranslations 回傳的是物件，要解構出 t
  const { t } = useTranslations();

  return {
    siteConfig: {
      ...SITE_CONFIG,
      // 透過 t 函式，傳入定義好的路徑 Key
      name: t(SITE_CONFIG.nameKey),
      slogan: t(SITE_CONFIG.sloganKey),
    },
    t, // 把 t 丟出去，讓 Footer 組件處理 Format.copyright(props, t('common.copyright'))
  };
};
