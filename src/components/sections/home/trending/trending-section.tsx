"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "@/src/hooks/useTranslations";
import { Button } from "@/src/components/ui/button";
import TrendingTitle from "@/src/components/sections/home/trending/trending-title";
import TripCard from "@/src/components/common/trip-card";
import { MOCK_TRIPS } from "@/src/mocks";

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
