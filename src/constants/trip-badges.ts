import { Flame, Star, Sparkles, LucideIcon } from "lucide-react";
import type { TripBadgeType } from "@/src/types/trip.type";

type BadgeConfig = {
  labelKey: string; // 改名為 labelKey，明確表示這是一個 i18n key
  color: string;
  icon: LucideIcon;
};

export const TRIP_BADGE_CONFIG: Record<TripBadgeType, BadgeConfig> = {
  HOT: {
    labelKey: "common.badge-hot", // 對應到 common.ts 的 key
    color: "bg-red-500 text-white shadow-red-500/20",
    icon: Flame,
  },
  NEW: {
    labelKey: "common.badge-new",
    color: "bg-green-500 text-white shadow-green-500/20",
    icon: Sparkles,
  },
  EDITOR_CHOICE: {
    labelKey: "common.badge-editor-choice",
    color: "bg-amber-500 text-white shadow-amber-500/20",
    icon: Star,
  },
};
