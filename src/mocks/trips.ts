// src/mocks/trips.ts
import { TripResponseDto } from "@/src/api/response"; // 確認路徑

export const MOCK_TRIPS: TripResponseDto[] = [
  {
    id: "trip-01",
    title: "東京五天四夜極簡行",
    subTitle: "體驗極致的日式簡約",
    type: "NORMAL",
    // 🎯 故意寫成 ISO 時間格式，讓你的 Format.tripDuration 去算
    startTime: "2024-04-01T08:00:00Z",
    endTime: "2024-04-05T20:00:00Z",
    createdBy: "Charlie",
    likeAmount: 600, // 🎯 故意大於 500，測試 Mapper 有沒有幫你轉成 HOT Badge
    tags: ["東京", "自由行"],
  },
  {
    id: "trip-02",
    title: "京阪神賞櫻深度探索",
    subTitle: "春季限定絕美路線",
    type: "EDITOR_CHOICE", // 🎯 測試 Mapper 能不能正確處理特殊 Type
    startTime: "2024-03-25T08:00:00Z",
    endTime: "2024-03-31T20:00:00Z",
    createdBy: "Alice",
    likeAmount: 85,
    tags: ["京都", "賞櫻"],
  },
  {
    id: "trip-03",
    title: "冰島環島公路探險",
    subTitle: "極光與冰川的交響曲",
    type: "NEW", // 🎯 測試 NEW Badge
    startTime: "2024-10-01T08:00:00Z",
    endTime: "2024-10-12T20:00:00Z",
    createdBy: "Bob",
    likeAmount: 342,
    tags: ["冰島", "自駕"],
  },
];
