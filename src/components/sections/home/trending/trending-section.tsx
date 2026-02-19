"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "@/src/hooks/useTranslations";
import { Button } from "@/src/components/ui/button";
import TrendingTitle from "@/src/components/sections/home/trending/trending-title";
import TripCard from "@/src/components/common/trip-card";
import { BaseTripCardData } from "@/src/types/common.type";
// 1. 引入剛剛建立的通用元件

// --- 假資料 (Mock Data) ---
// 注意：這裡的資料結構必須符合 TripCardData 介面
const MOCK_TRIPS: BaseTripCardData[] = [
  {
    id: "trip-01",
    title: "東京五天四夜極簡行",
    days: "5 天 4 夜",
    author: "Charlie",
    likes: 128,
    gradient: "from-orange-100 to-rose-100 dark:from-orange-900/40 dark:to-rose-900/40",
    tags: ["東京", "自由行"],
    // 🔥 加入測試數據：熱門
    badge: "HOT",
  },
  {
    id: "trip-02",
    title: "京阪神賞櫻深度探索",
    days: "7 天 6 夜",
    author: "Alice",
    likes: 85,
    gradient: "from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40",
    tags: ["京都", "賞櫻"],
    // 🌟 加入測試數據：精選
    badge: "EDITOR_CHOICE",
  },
  {
    id: "trip-03",
    title: "冰島環島公路探險",
    days: "12 天 11 夜",
    author: "Bob",
    likes: 342,
    gradient: "from-slate-100 to-gray-200 dark:from-slate-800 dark:to-gray-900",
    tags: ["冰島", "自駕"],
    // ✨ 加入測試數據：最新 (或者你可以故意不加，測試沒有標籤的樣子)
    badge: "NEW",
  },
];

export default function TrendingSection() {
  const { t } = useTranslations();

  return (
    <section id="trending-trips" className="py-24 px-4 md:px-8 w-full bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* === 區塊頭部 === */}
        <TrendingTitle />

        {/* === 卡片網格 (Grid) === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_TRIPS.map((trip) => (
            // 2. 直接使用引入的元件
            <TripCard key={trip.id} {...trip} />
          ))}
        </div>

        {/* 手機版：顯示在底部的「查看更多」 */}
        <div className="mt-10 flex justify-center md:hidden">
          <Button asChild variant="outline" className="w-full rounded-full">
            <Link href="/explore">
              {t("home.trending-view-more")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
