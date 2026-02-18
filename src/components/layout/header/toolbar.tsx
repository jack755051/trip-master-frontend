"use client";

import { cn } from "@/lib/utils";
import LocaleSwitcher from "./locale-switcher";
import { useTranslations } from "@/src/hooks/useTranslations";

export default function Toolbar() {
  const { t } = useTranslations();

  return (
    <div className={cn("toolbar__container flex items-center gap-2")}>
      <LocaleSwitcher />
      {/* 之後可以加登入按鈕 */}
      <button className="hidden sm:block text-sm font-semibold text-text-main hover:text-brand px-4 transition-colors">
        {t("common.login")}
      </button>
    </div>
  );
}
