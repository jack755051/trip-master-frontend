"use client";

import Link from "next/link";
import { Heart, Map, User } from "lucide-react";
import { BaseTripCardData } from "@/src/types/common.type";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { getBadgeColor } from "@/src/lib/style-helper";
import { useState } from "react";
import { useTranslations } from "@/src/hooks/useTranslations";
import { TRIP_BADGE_CONFIG } from "@/src/constants/trip-badges";

interface TripCardProps extends BaseTripCardData {
  customClass?: string;
}

export default function TripCard(props: TripCardProps) {
  // 解構 badge
  const { id, title, days, author, likes, gradient, tags, badge, customClass } = props;

  const [isLiked, setIsLiked] = useState(false);
  const { t } = useTranslations();

  // 1. 取得 Config (如果有 badge 的話)
  const badgeConfig = badge ? TRIP_BADGE_CONFIG[badge] : null;
  const BadgeIcon = badgeConfig?.icon;

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    console.log("收藏功能觸發，目前狀態:", !isLiked);
  };

  return (
    <Link
      href={`/explore/${id}`}
      className={cn(
        "group flex flex-col bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1",
        customClass,
      )}
    >
      {/* 1. 封面圖區塊 */}
      <div
        className={`relative aspect-[4/3] w-full bg-gradient-to-br ${gradient} p-4 flex flex-col justify-between`}
      >
        {/* 左上角：天數 Badge */}
        <div className="flex gap-2">
          <Badge
            variant="secondary"
            className="bg-white/70 dark:bg-black/50 backdrop-blur-md border-0 text-[10px] font-semibold text-foreground shadow-sm hover:bg-white/80 dark:hover:bg-black/60"
          >
            <Map className="mr-1 h-3 w-3" />
            {days}
          </Badge>
        </div>

        {/* ========== 2. 新增：右上角特殊 Badge (絕對定位) ========== */}
        {badgeConfig && BadgeIcon && (
          <div className="absolute top-4 right-4 z-10">
            <span
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold shadow-lg backdrop-blur-sm",
                // 這裡會動態注入 constants 裡設定的顏色 (例如 bg-red-500)
                badgeConfig.color,
              )}
            >
              <BadgeIcon className="w-3 h-3 fill-current" />
              {/* 使用 t() 翻譯 Key */}
              {t(badgeConfig.labelKey)}
            </span>
          </div>
        )}

        {/* 右下角：愛心按鈕 */}
        <button
          onClick={handleLike}
          className={cn(
            "self-end rounded-full p-2 shadow-sm transition-all duration-200 group/heart",
            isLiked
              ? "bg-red-50 dark:bg-red-900/30 text-red-500 scale-110"
              : "bg-white/70 dark:bg-black/50 backdrop-blur-md hover:scale-110 hover:bg-white dark:hover:bg-black/70",
          )}
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              isLiked
                ? "fill-current text-red-500"
                : "text-muted-foreground group-hover/heart:text-red-500",
            )}
          />
        </button>
      </div>

      {/* 2. 內容資訊區塊 */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex gap-2 mb-3 flex-wrap">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className={cn(
                "text-[10px] font-medium border-0 rounded-md px-2 py-0.5 transition-colors",
                getBadgeColor(tag),
              )}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <h3 className="text-lg font-bold text-foreground mb-4 line-clamp-2 group-hover:text-brand transition-colors">
          {title}
        </h3>

        <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
              <User className="h-3 w-3 text-muted-foreground" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">{author}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Heart className="h-3 w-3 fill-current opacity-70" />
            {isLiked ? likes + 1 : likes}
          </div>
        </div>
      </div>
    </Link>
  );
}
