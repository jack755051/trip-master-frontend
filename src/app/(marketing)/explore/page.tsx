// src/app/(marketing)/explore/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, MapPin, Clock } from "lucide-react"; // 新增 MapPin 與 Clock 圖示
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import MarketingTripCard from "@/src/components/cards/marketing-trip-card";
import { MOCK_EXPLORE_TRIPS } from "@/src/mocks/trips";
import { TripMapper } from "@/src/api/mapper";

export default function ExplorePage() {
  // 1. 新增搜尋狀態管理
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="explore__container flex flex-col w-full min-w-screen">
      {/* 1. 現代化靈感頭部：靠左對齊、大留白、無邊界感 */}
      <section className="relative w-full pt-32 pb-12 px-6 md:px-12 lg:px-24">
        {/* 極簡的光暈點綴，取代原本死板的背景色塊 */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="relative z-10 max-w-4xl flex flex-col items-start gap-8">
          {/* 雜誌級大標題，使用 tracking-tighter 增加現代感 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-foreground leading-[1.1]">
              尋找靈感，
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand/60">
                開啟下一趟旅程。
              </span>
            </h1>
          </motion.div>

          {/* 現代化指令膠囊 (Command Pill)：整合搜尋與篩選，兼顧功能與極簡 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            // 關鍵修改：將 z-20 提升至 z-50，確保下拉選單能蓋過下方的卡片
            className="w-full max-w-3xl mt-6 relative z-50"
          >
            {/* 膠囊本體：加入 focus-within 狀態讓輸入時有更強的視覺回饋 */}
            <div className="relative z-10 flex items-center bg-background/80 backdrop-blur-xl border border-border/60 rounded-full shadow-lg p-1.5 transition-shadow focus-within:shadow-xl focus-within:border-brand/40">
              {/* 1. 自由文字搜尋區 (Flex-grow 佔據主要空間) */}
              <div className="flex-1 flex items-center pl-4 pr-2">
                <Search className="w-5 h-5 text-muted-foreground mr-2 shrink-0" />
                <Input
                  type="text"
                  placeholder="你想去哪裡找靈感？"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  // 延遲失去焦點，確保點擊下拉選單的事件能被觸發
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  className="w-full border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-1 text-base md:text-lg placeholder:text-muted-foreground/50 h-12"
                />
              </div>

              {/* 分隔線 */}
              <div className="w-px h-8 bg-border/80 hidden md:block" />

              {/* 2. 結構化篩選：天數 (隱藏於手機版，保持整潔) */}
              <button className="hidden md:flex items-center gap-2 px-4 h-12 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors whitespace-nowrap">
                任何天數
              </button>

              {/* 分隔線 */}
              <div className="w-px h-8 bg-border/80 hidden sm:block" />

              {/* 3. 結構化篩選：風格 */}
              <button className="hidden sm:flex items-center gap-2 px-4 h-12 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors whitespace-nowrap">
                旅行風格
              </button>

              {/* 4. 主要行動按鈕 / AI 推薦 */}
              <Button className="rounded-full px-6 h-12 bg-brand text-brand-foreground hover:bg-brand-hover shadow-md ml-2 shrink-0 group">
                <Sparkles className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                <span className="hidden sm:inline">AI 探索</span>
                <span className="sm:hidden">探索</span>
              </Button>
            </div>

            {/* 關鍵新增：即時搜尋建議的懸浮選單 (Popover) */}
            <AnimatePresence>
              {isSearchFocused && searchQuery.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  // absolute 定位：緊貼父容器底部 (100%) 再往下推 12px
                  className="absolute top-[calc(100%+12px)] left-0 w-full bg-background/85 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden py-2"
                >
                  <div className="px-4 py-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    相似的目的地
                  </div>

                  <button className="w-full flex items-center px-4 py-3 hover:bg-muted/50 transition-colors text-left group">
                    <div className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center mr-3 group-hover:bg-brand group-hover:text-brand-foreground transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-foreground font-medium">京都 (Kyoto)</div>
                      <div className="text-muted-foreground text-sm">日本，關西地區</div>
                    </div>
                  </button>

                  <button className="w-full flex items-center px-4 py-3 hover:bg-muted/50 transition-colors text-left group">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3 group-hover:bg-brand group-hover:text-brand-foreground transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-foreground font-medium">京都市役所周邊</div>
                      <div className="text-muted-foreground text-sm">景點</div>
                    </div>
                  </button>

                  <div className="px-4 py-2 mt-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase border-t border-border/40 pt-4">
                    熱門相關行程
                  </div>

                  <button className="w-full flex items-center px-4 py-3 hover:bg-muted/50 transition-colors text-left group">
                    <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center mr-3">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="text-foreground font-medium">
                        關西五天四夜：京都與大阪的完美結合
                      </div>
                      <div className="text-brand text-sm">由 @traveler_john 建立</div>
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* 標籤改為更低調的純文字連結風格，減少視覺干擾 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center gap-6 text-sm font-medium text-muted-foreground mt-2"
          >
            <span className="text-foreground/40 uppercase tracking-widest text-xs font-bold">
              熱門搜尋
            </span>
            {["關西賞櫻", "峇里島度假", "曼谷美食", "瑞士鐵道"].map((tag) => (
              <button
                key={tag}
                className="hover:text-brand transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-brand after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. 靈感網格區：統一全站的 3 欄網格系統 */}
      <section className="px-6 md:px-12 lg:px-24 pt-8 pb-24 relative z-0">
        {/* 加入 max-w-7xl mx-auto 確保在大螢幕上不會無限拉伸 */}
        <div className="max-w-7xl mx-auto">
          <motion.div
            // 關鍵修正：最高只到 lg:grid-cols-3，並稍微加大 gap 讓畫面更有呼吸感
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08 },
              },
            }}
          >
            {/* 剛剛討論的打破網格設計，可以把 index 放進去處理 isFeatured */}
            {MOCK_EXPLORE_TRIPS.map(TripMapper.toMarketingCard).map((trip, index) => (
              <motion.div
                key={trip.id}
                className={index === 0 ? "md:col-span-2 lg:col-span-2 row-span-2" : "col-span-1"}
                variants={{
                  hidden: { y: 30, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 100, damping: 15 },
                  },
                }}
              >
                {/* 記得把 isFeatured 傳入元件中 */}
                <MarketingTripCard {...trip} isFeatured={index === 0} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
