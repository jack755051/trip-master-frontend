// src/components/sections/home/hero-section.tsx
"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, Map } from "lucide-react";
import HeroMockUpSection from "@/src/components/sections/home/hero/hero-mock-up-section";
import HeroCopywritingSection from "@/src/components/sections/home/hero/hero-copywriting-section";
import HeroDecorativeBackgroundSection from "@/src/components/sections/home/hero/hero-decorative-background-section"; // 假設你有安裝 lucide-react
// import { useTranslations } from "@/src/hooks/useTranslations";

export default function HeroSection() {
  // 記得之後可以把文字換成 i18n 的寫法
  // const { t } = useTranslations();

  return (
    <section
      id="hero"
      className={cn(
        // min-h-[85vh] 實現微透底，overflow-hidden 確保內部裝飾不會撐破版面
        "relative flex items-center justify-center min-h-[85vh] px-4 md:px-8 overflow-hidden bg-background",
      )}
    >
      {/* 裝飾性背景：極簡的網格線，暗示「地圖」與「規劃」的意象 */}
      <HeroDecorativeBackgroundSection />

      {/* 主要內容容器：採用 Grid 雙欄排版 (左文右圖) */}
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center pt-10">
        {/* ==================== 左側：文案與行動呼籲 ==================== */}
        <HeroCopywritingSection />
        {/* ==================== 右側：視覺 Mockup ==================== */}
        {/* 在手機版隱藏，保留乾淨畫面；在桌機版顯示展示圖 */}
        <HeroMockUpSection />
      </div>
    </section>
  );
}
