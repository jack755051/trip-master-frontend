import Link from "next/link";
import { ArrowRight, Map } from "lucide-react";

export default function HeroCopywritingSection() {
  return (
    <div className="flex flex-col items-start text-left space-y-8 z-10">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight">
        讓每一段規劃
        <br />
        {/* 將後半段文字加上品牌色漸層，增加視覺焦點 */}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand/70">
          成為旅行中最期待的序曲
        </span>
      </h1>

      <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
        Trip Master 結合沈浸式地圖與直覺的透明筆記，以減法設計為核心，重新定義你的旅遊規劃體驗。
      </p>

      <div className="flex flex-wrap items-center gap-4 pt-4">
        {/* Primary CTA：開始規劃 (導向 Dashboard 或 登入) */}
        <Link
          href="/dashboard"
          className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm font-medium text-background shadow transition-transform hover:scale-105 active:scale-95"
        >
          開始規劃
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>

        {/* Secondary CTA：探索靈感 (導向 Explore 頁面) */}
        <Link
          href="/explore"
          className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background/50 backdrop-blur-sm px-8 text-sm font-medium shadow-sm transition-colors hover:bg-muted"
        >
          <Map className="mr-2 h-4 w-4 text-muted-foreground" />
          探索靈感
        </Link>
      </div>
    </div>
  );
}
