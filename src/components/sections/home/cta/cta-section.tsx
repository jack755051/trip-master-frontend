"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "@/src/hooks/useTranslations";
import { Button } from "@/src/components/ui/button";

export default function CtaSection() {
  const { t } = useTranslations();

  return (
    <section className="relative py-24 px-4 md:px-8 bg-background overflow-hidden border-t border-border/40">
      {/* === 背景材質：工程點狀網格 (Dot Pattern) === */}
      {/* 這是純 CSS 畫出來的，銳利且乾淨，沒有任何模糊光暈 */}
      <div
        className="absolute inset-0 z-0 opacity-[0.4]"
        style={{
          backgroundImage: "radial-gradient(#a1a1aa 1px, transparent 1px)",
          backgroundSize: "32px 32px", // 控制點的密度
        }}
      />

      {/* 遮罩：讓點狀背景在邊緣漸漸消失，不要切得太死板 (Optional) */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background z-0 pointer-events-none" />

      <div className="container mx-auto max-w-3xl relative z-10 text-center">
        <div className="flex flex-col items-center space-y-10">
          {/* 標題與文字 */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
              {t("home.cta-title")}
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
              {t("home.cta-subtitle")}
            </p>
          </div>

          {/* 按鈕：實心、高對比，成為畫面唯一的「重」點 */}
          <div>
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 h-14 text-base font-medium transition-all hover:scale-105 active:scale-95"
            >
              <Link href="/dashboard">
                {t("home.cta-btn")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
