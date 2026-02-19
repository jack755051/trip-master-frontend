// src/components/sections/home/hero/hero-mock-up-section.tsx
"use client";

import { MapPin, Navigation, StickyNote } from "lucide-react";

export default function HeroMockUpSection() {
  return (
    <div className="relative hidden lg:flex items-center justify-center w-full h-full min-h-[500px] perspective-1000">
      {/* 主視窗容器 (App Window Mockup)
        加入旋轉效果 (rotate-y, rotate-x) 讓它看起來更有立體空間感 
      */}
      <div className="relative w-[95%] h-[480px] bg-background border border-border/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col transform transition-transform duration-700 hover:scale-105 hover:rotate-0 rotate-y-[-5deg] rotate-x-[2deg] shadow-brand/10">
        {/* 1. 頂部視窗控制列 (macOS style dots) */}
        <div className="h-10 border-b border-border/40 bg-muted/30 flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
          <div className="ml-4 h-4 w-1/3 bg-muted rounded-full"></div>
        </div>

        {/* 2. 核心工作區 (30/70 分割佈局) */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* --- 左側：行程列表 (30%) --- */}
          <div className="w-[30%] border-r border-border/40 bg-background/95 p-4 flex flex-col gap-4 z-20 shadow-xl">
            {/* 標題與天數 */}
            <div>
              <div className="h-5 w-3/4 bg-foreground/20 rounded mb-2"></div>
              <div className="h-3 w-1/2 bg-foreground/10 rounded"></div>
            </div>

            {/* 行程節點清單 (模擬可拖拉的卡片) */}
            <div className="flex flex-col gap-3 mt-4 relative">
              {/* 連結節點的垂直線 */}
              <div className="absolute left-[11px] top-6 bottom-6 w-0.5 bg-border/50"></div>

              {/* Item 1 */}
              <div className="flex gap-3 items-start z-10">
                <div className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center text-[10px] font-bold ring-4 ring-background">
                  1
                </div>
                <div className="flex-1 p-3 rounded-lg border border-border/50 bg-muted/20 shadow-sm">
                  <div className="h-3 w-2/3 bg-foreground/20 rounded mb-2"></div>
                  <div className="h-2 w-1/2 bg-foreground/10 rounded"></div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-3 items-start z-10">
                <div className="w-6 h-6 rounded-full bg-background border-2 border-brand flex items-center justify-center text-[10px] font-bold ring-4 ring-background text-foreground">
                  2
                </div>
                <div className="flex-1 p-3 rounded-lg border border-border/50 bg-muted/20 shadow-sm">
                  <div className="h-3 w-full bg-foreground/20 rounded mb-2"></div>
                  <div className="h-2 w-1/3 bg-foreground/10 rounded"></div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex gap-3 items-start z-10 opacity-60">
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold ring-4 ring-background text-muted-foreground">
                  3
                </div>
                <div className="flex-1 p-3 rounded-lg border border-border/50 bg-transparent border-dashed">
                  <div className="h-3 w-1/2 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* --- 右側：沉浸式地圖與透明層 (70%) --- */}
          <div className="flex-1 relative bg-[#e5e7eb] dark:bg-[#1a1d24] overflow-hidden flex items-center justify-center">
            {/* 模擬地圖背景的紋理 */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-foreground to-transparent bg-[length:20px_20px]"></div>

            {/* A. 規劃路徑 (SVG Path) */}
            <svg
              className="absolute inset-0 w-full h-full"
              style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))" }}
            >
              <path
                d="M 100 150 Q 200 50, 300 200 T 500 100"
                fill="none"
                stroke="var(--brand)"
                strokeWidth="3"
                strokeDasharray="6 6"
                className="opacity-70"
              />
            </svg>

            {/* 地圖上的標記點 (Pins) */}
            <div className="absolute top-[135px] left-[85px] w-6 h-6 rounded-full bg-brand border-2 border-white shadow-lg flex items-center justify-center animate-pulse"></div>
            <div className="absolute top-[185px] left-[285px] w-5 h-5 rounded-full bg-white border-2 border-brand shadow-md"></div>
            <div className="absolute top-[85px] left-[485px] w-5 h-5 rounded-full bg-white border-2 border-muted-foreground shadow-sm"></div>

            {/* B. 透明懸浮頁籤 (Glass Tab - Layer 3) */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 flex p-1 space-x-1 bg-white/70 dark:bg-black/60 backdrop-blur-md rounded-full shadow-lg border border-white/40 dark:border-white/10 z-30">
              <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-foreground text-background text-xs font-semibold shadow-sm">
                <MapPin className="w-3 h-3" />
                探索
              </div>
              <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-foreground/60 text-xs font-medium">
                <Navigation className="w-3 h-3" />
                路徑
              </div>
              <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-foreground/60 text-xs font-medium">
                <StickyNote className="w-3 h-3" />
                筆記
              </div>
            </div>

            {/* C. 透明筆記卡片 (Glass Note Detail) */}
            <div className="absolute bottom-6 right-6 w-64 p-4 bg-white/80 dark:bg-black/70 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-xl shadow-2xl z-30 transform translate-y-4 hover:translate-y-0 transition-transform duration-300">
              <div className="flex items-start justify-between mb-3">
                <div className="h-4 w-1/2 bg-foreground/80 rounded"></div>
                <div className="h-4 w-8 bg-brand/20 rounded text-[8px] flex items-center justify-center font-bold text-brand">
                  14:00
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-foreground/20 rounded"></div>
                <div className="h-2 w-5/6 bg-foreground/20 rounded"></div>
                <div className="h-2 w-2/3 bg-foreground/20 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
