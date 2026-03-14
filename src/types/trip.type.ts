// 1. 最純粹的基底：不管是前台還是後台，行程一定會有的屬性
export type BaseTrip = {
  id: string;
  title: string;
  days: string;
  // 未來建議統一用 thumbnailUrl，開發期可先保留 gradient
  gradient: string;
};

// 2. 形象網站專屬型別 (繼承 BaseTrip)
export type TripBadgeType = "HOT" | "NEW" | "EDITOR_CHOICE";

export type MarketingTripCardData = BaseTrip & {
  author: string;
  likes: number;
  tags: string[];
  badge?: TripBadgeType;
};

// 3. 管理後台專屬型別 (繼承 BaseTrip)
export type TripStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type DashboardTripCardData = BaseTrip & {
  status: TripStatus;
  createdAt: string;
  updatedAt: string;
  // 後台通常不需要看幾個人按讚，但可能需要看報名人數或瀏覽量
  enrollmentCount?: number;
};
