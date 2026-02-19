"use client";

export default function HeroMockUpSection() {
  return (
    <div className="relative hidden lg:flex items-center justify-center w-full h-full min-h-[500px]">
      {/* 1. 底層地圖示意 (Layer 1) */}
      <div className="absolute w-[90%] h-[450px] bg-slate-100 dark:bg-slate-800/50 rounded-3xl shadow-inner border border-border/50 flex items-center justify-center overflow-hidden">
        <span className="text-muted-foreground/30 font-medium tracking-widest uppercase text-sm">
          Interactive Map Layer
        </span>
      </div>

      {/* 2. 懸浮透明卡片示意 (Layer 3 - Glass Note) */}
      {/* 這裡運用 backdrop-blur 做出蘋果風格的毛玻璃質感 */}
      <div className="relative z-10 w-[75%] h-[280px] bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl shadow-2xl p-6 flex flex-col gap-4 transform translate-x-12 translate-y-12 transition-transform hover:-translate-y-2 duration-500">
        {/* 骨架屏 (Skeleton) 假裝是行程內容 */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand/20"></div>
          <div className="w-1/3 h-4 bg-foreground/10 rounded-full"></div>
        </div>
        <div className="w-full h-24 bg-foreground/5 rounded-xl border border-border/50 mt-2"></div>
        <div className="w-2/3 h-4 bg-foreground/10 rounded-full mt-auto"></div>
      </div>

      {/* 裝飾性的小圓點 (路徑節點示意) */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-brand shadow-[0_0_15px_rgba(var(--brand),0.5)] z-20"></div>
      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-auxiliary shadow-[0_0_10px_rgba(var(--auxiliary),0.5)] z-20"></div>
    </div>
  );
}
