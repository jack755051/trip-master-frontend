// src/components/cards/marketing-trip-card.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 🎯 引入 useRouter 處理跳轉
import { Heart, Map, User, Copy } from "lucide-react";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { getBadgeColor } from "@/src/lib/style-helper";
import { useTranslations } from "@/src/hooks/useTranslations";
import { TRIP_BADGE_CONFIG } from "@/src/constants/trip-badges";
import type { MarketingTripCardData } from "@/src/types/trip.type";

interface MarketingTripCardProps extends MarketingTripCardData {
  customClass?: string;
  isFeatured?: boolean;
  // 🎯 新增：控制是否顯示複製按鈕的開關
  showCopyAction?: boolean;
}

export default function MarketingTripCard(props: MarketingTripCardProps) {
  const {
    id,
    title,
    duration,
    author,
    likes,
    gradient,
    tags,
    badge,
    customClass,
    isFeatured = false,
    showCopyAction = true, // 🎯 預設為 true，Explore 頁面就不用改
  } = props;

  const [isLiked, setIsLiked] = useState(false);
  const { t } = useTranslations();
  const router = useRouter(); // 🎯 初始化 router

  // 🎯 模擬登入狀態 (未來接上真實 Auth Context)
  const isLoggedIn = false;

  const badgeConfig = badge ? TRIP_BADGE_CONFIG[badge] : null;
  const BadgeIcon = badgeConfig?.icon;

  const renderDuration = () => {
    if (!duration) return t("trip.duration.unknown");
    if (duration.nights === 0) return t("trip.duration.single_day");
    return t("trip.duration.days_and_nights", {
      days: duration.days,
      nights: duration.nights,
    });
  };

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // 🎯 實作未登入跳轉邏輯
    if (!isLoggedIn) {
      // 記住現在的網址，登入完可以跳回來
      const currentUrl = encodeURIComponent(window.location.pathname);
      router.push(`/login?callbackUrl=${currentUrl}&action=copy&tripId=${id}`);
      return;
    }

    console.log(`複製行程 ID: ${id}`);
    // TODO: 呼叫 API 複製行程
  };

  return (
    <Link
      href={`/explore/${id}`}
      className={cn(
        "group flex flex-col bg-card rounded-3xl border border-border/40 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-brand/10",
        isFeatured ? "min-h-[420px]" : "min-h-[360px]",
        customClass,
      )}
    >
      <div
        className={cn(
          "relative w-full flex flex-col justify-between overflow-hidden",
          isFeatured ? "aspect-[16/10] md:flex-1" : "aspect-[4/3]",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br transition-transform duration-700 ease-out group-hover:scale-105",
            gradient,
          )}
        />

        {/* 🎯 用 showCopyAction 包覆 Hover 效果與複製按鈕 */}
        {showCopyAction && (
          <>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 z-10" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out z-20 pointer-events-none">
              <Button
                onClick={handleCopy}
                size={isFeatured ? "lg" : "default"}
                className="rounded-full shadow-lg bg-brand text-brand-foreground hover:bg-brand-hover pointer-events-auto"
              >
                <Copy className="w-4 h-4 mr-2" />
                複製此行程
              </Button>
            </div>
          </>
        )}

        <div className="flex justify-between p-4 relative z-30 pointer-events-none">
          <Badge
            variant="secondary"
            className="bg-white/90 dark:bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-foreground shadow-sm"
          >
            <Map className="mr-1 h-3 w-3" />
            {renderDuration()}
          </Badge>

          {badgeConfig && BadgeIcon && (
            <span
              className={cn(
                "flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-md backdrop-blur-sm border border-white/20",
                badgeConfig.color,
              )}
            >
              <BadgeIcon className="w-3 h-3 fill-current" />
              {t(badgeConfig.labelKey)}
            </span>
          )}
        </div>

        <div className="p-4 flex justify-end relative z-30 pointer-events-none">
          <button
            onClick={handleLike}
            className={cn(
              "rounded-full p-2.5 shadow-md backdrop-blur-md transition-all duration-300 relative pointer-events-auto border border-white/20",
              isLiked
                ? "bg-red-50 dark:bg-red-900/40 text-red-500 scale-110"
                : "bg-white/80 dark:bg-black/60 hover:scale-110 hover:bg-white dark:hover:bg-black/80",
            )}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                isLiked ? "fill-current text-red-500" : "text-foreground/70 hover:text-red-500",
              )}
            />
          </button>
        </div>
      </div>

      <div className="p-5 md:p-6 flex flex-col flex-1 bg-card relative z-30">
        <div className="flex gap-2 mb-3 flex-wrap">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className={cn(
                "text-[10px] font-medium border-0 rounded-md px-2 py-0.5 transition-colors bg-muted/50 text-muted-foreground",
              )}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <h3
          className={cn(
            "font-bold text-foreground mb-4 line-clamp-2 group-hover:text-brand transition-colors",
            isFeatured ? "text-xl md:text-2xl" : "text-lg",
          )}
        >
          {title}
        </h3>

        <div className="mt-auto flex items-center justify-between border-t border-border/40 pt-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center">
              <User className="h-3.5 w-3.5 text-brand" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">{author}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Heart className="h-3.5 w-3.5 fill-current opacity-70" />
            {isLiked ? likes + 1 : likes}
          </div>
        </div>
      </div>
    </Link>
  );
}
