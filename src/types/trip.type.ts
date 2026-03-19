/** * 行程天數與夜數*/
export type TripDuration = {
  days: number;
  nights: number;
};

/**
 * 1. 最純粹的基底 (Single Source of Truth)
 * 不論是前台行銷還是後台管理，行程皆必須具備的屬性。
 * 符合「疊層透明板」的視覺基因，確保任何圖層皆有基礎背景。
 */
export type BaseTrip = {
  id: string;
  title: string;
  duration: TripDuration | null;
  // 未來建議統一用 thumbnailUrl，開發期可先保留 gradient
  gradient: string;
};

/**
 * 2. 形象網站專屬型別 (Marketing / Explore)
 * 對標 image_647098.jpg，側重於「收藏」與「社群影響力」。
 */
export type TripBadgeType = "HOT" | "NEW" | "EDITOR_CHOICE";

export type MarketingTripCardData = BaseTrip & {
  author: string;
  likes: number;
  tags: string[];
  badge?: TripBadgeType;
};

/**
 * 3. 管理後台專屬型別 (Insight / History)
 * 專注於個人的數據回顧與行程管理，體現「個人紀錄可視化」的宗旨。
 */
export type TripStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type DashboardTripCardData = BaseTrip & {
  status: TripStatus;
  createdAt: string;
  updatedAt: string;
  // 後台通常不需要看幾個人按讚，但可能需要看報名人數或瀏覽量
  enrollmentCount?: number;
};

/**
 * 4. 規劃大廳專屬型別 (Collaborative Planning)
 * 最具備 Trip Master 魂的型別。
 * 體現「底圖疊層」與「協作分享」的即時狀態。
 */
export interface PlannerTripCardData extends BaseTrip {
  status: TripStatus;
  collaborators: number; // 分享宗旨：多少人在這張透明板上
  progress: number; // 規劃宗旨：完成了多少步驟
  updatedAt: string; // 誰剛剛動了我的圖層
}
