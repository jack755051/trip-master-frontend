import Link from "next/link";
import { ArrowRight, Map } from "lucide-react";
import { useTranslations } from "@/src/hooks/useTranslations";
import { Button } from "@/src/components/ui/button"; // 引入 Shadcn Button

export default function HeroCopywriting() {
  const { t } = useTranslations();

  return (
    <div className="flex flex-col items-start text-left space-y-8 z-10">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight">
        {t("home.hero-title-1")}
        <br />
        {/* 加入 whitespace-pre-line */}
        <span className="whitespace-pre-line text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand/70">
          {t("home.hero-title-2")}
        </span>
      </h1>

      <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
        {t("home.hero-description")}
      </p>

      <div className="flex flex-wrap items-center gap-4 pt-4">
        {/* ==================== Primary CTA ==================== */}
        {/* 使用預設 variant="default"，這會自動套用你的落日磚橘品牌色 (--primary) */}
        <Button
          asChild
          size="lg" // 加大按鈕
          className="rounded-full px-8 shadow-md transition-transform hover:scale-105 active:scale-95"
        >
          <Link href="/dashboard">
            {t("home.hero-cta-primary")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>

        {/* ==================== Secondary CTA ==================== */}
        {/* 使用 variant="outline"，並保留原本的透明毛玻璃背景 */}
        <Button
          asChild
          variant="outline"
          size="lg"
          className="rounded-full px-8 bg-background/50 backdrop-blur-sm transition-colors hover:bg-muted"
        >
          <Link href="/explore">
            <Map className="mr-2 h-4 w-4 text-muted-foreground" />
            {t("home.hero-cta-secondary")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
