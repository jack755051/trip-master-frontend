export type BaseLink = {
  // 連結
  href: string;
  // 顯示文字
  label: string;
  // 顯示副標題
  subLabel: string;
};

export type TripBadgeType = "HOT" | "NEW" | "EDITOR_CHOICE";

export type BaseTripCardData = {
  id: string;
  title: string;
  days: string;
  author: string;
  likes: number;
  gradient: string; // 暫時用 CSS class string，未來可能是 thumbnailUrl
  tags: string[];
  badge?: TripBadgeType;
};
