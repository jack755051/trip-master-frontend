"use client";

import { useTranslations } from "@/src/hooks/useTranslations";

export default function LoginLayoutBrandSection() {
  const { t } = useTranslations();

  return (
    <section className="hidden space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000 lg:block">
      {/* 主標題：強調規劃與分享的連結 */}
      <h1 className="text-5xl font-extrabold leading-[1.2] tracking-tight text-white whitespace-pre-line">
        {/* 使用 i18n 注入，t("auth.hero-title") */}
        {t("auth.hero-title").split("\n")[0]}
        <br />
        <span className="text-brand">{t("auth.hero-title").split("\n")[1]}</span>
      </h1>

      {/* 副標題：定位為專屬管家 */}
      <div className="flex items-center gap-4">
        <div className="h-px w-12 bg-brand/50" />
        <p className="text-sm font-bold tracking-[0.2em] text-white/70 uppercase">
          {t("auth.hero-subtitle")}
        </p>
      </div>
    </section>
  );
}
