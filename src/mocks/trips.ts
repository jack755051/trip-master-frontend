import { MarketingTripCardData } from "../types/trip.type";

export const MOCK_TRIPS: MarketingTripCardData[] = [
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
