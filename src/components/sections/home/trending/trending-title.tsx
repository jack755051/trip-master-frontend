"use client";

import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "@/src/hooks/useTranslations";

export default function TrendingTitle() {
  const { t } = useTranslations();

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div className="max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
          {t("home.trending-title")}
        </h2>
        <p className="text-muted-foreground text-lg">{t("home.trending-subtitle")}</p>
      </div>

      {/* 桌面版：顯示在右上角的「查看更多」 */}
      <div className="hidden md:block">
        <Button
          asChild
          variant="ghost"
          className="text-brand hover:text-brand-hover hover:bg-brand/10 group"
        >
          <Link href="/explore">
            {t("home.trending-view-more")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
