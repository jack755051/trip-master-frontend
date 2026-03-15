"use client"; // 🎯 兒子必須是 Client Component，因為要用 Hook

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "@/src/hooks/useTranslations";
import { Button } from "@/src/components/ui/button";
import TrendingTitle from "@/src/components/sections/home/trending/trending-title";
import { MarketingTripCardData } from "@/src/types/trip.type";
import MarketingTripCard from "@/src/components/cards/marketing-trip-card";

// 🎯 接收老爸傳來的 trips 資料
export default function TrendingSectionClient({ trips }: { trips: MarketingTripCardData[] }) {
  const { t } = useTranslations(); // 在 Client 元件裡，想怎麼用 Hook 就怎麼用！

  return (
    <section id="trending-trips" className="py-24 px-4 md:px-8 w-full bg-background">
      <div className="container mx-auto max-w-7xl">
        <TrendingTitle />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip) => (
            <MarketingTripCard key={trip.id} {...trip} />
          ))}
        </div>

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
