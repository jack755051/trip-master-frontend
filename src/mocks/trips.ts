// src/mocks/trips.ts
import { TripResponseDto } from "@/src/api/response";

export const MOCK_TRIPS: TripResponseDto[] = [
  {
    id: "trip-01",
    title: "東京五天四夜極簡行",
    subTitle: "體驗極致的日式簡約",
    type: "NORMAL",
    startTime: "2024-04-01T08:00:00Z",
    endTime: "2024-04-05T20:00:00Z",
    createdBy: "Charlie",
    likeAmount: 600,
    tags: ["東京", "自由行"],
  },
  {
    id: "trip-02",
    title: "京阪神賞櫻深度探索",
    subTitle: "春季限定絕美路線",
    type: "EDITOR_CHOICE",
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
    type: "NEW",
    startTime: "2024-10-01T08:00:00Z",
    endTime: "2024-10-12T20:00:00Z",
    createdBy: "Bob",
    likeAmount: 342,
    tags: ["冰島", "自駕"],
  },
];

// 🎯 新增：專門給 Explore 頁面用的豐富展示資料
export const MOCK_EXPLORE_TRIPS: TripResponseDto[] = [
  ...MOCK_TRIPS, // 把原本的三筆也加進來湊數
  {
    id: "trip-04",
    title: "瑞士鐵道冰河列車之旅",
    subTitle: "阿爾卑斯山的絕美全景",
    type: "EDITOR_CHOICE",
    startTime: "2024-06-10T08:00:00Z",
    endTime: "2024-06-18T20:00:00Z",
    createdBy: "David",
    likeAmount: 420,
    tags: ["瑞士", "鐵道", "風景"],
  },
  {
    id: "trip-05",
    title: "峇里島七天六夜耍廢指南",
    subTitle: "Villa、海灘與無邊際泳池",
    type: "NORMAL",
    startTime: "2024-07-01T08:00:00Z",
    endTime: "2024-07-07T20:00:00Z",
    createdBy: "Emma",
    likeAmount: 780, // > 500 會觸發 HOT Badge
    tags: ["峇里島", "度假", "海島"],
  },
  {
    id: "trip-06",
    title: "曼谷週末吃貨爆走特輯",
    subTitle: "夜市、泰奶與米其林街頭小吃",
    type: "NEW",
    startTime: "2024-05-03T08:00:00Z",
    endTime: "2024-05-06T20:00:00Z",
    createdBy: "Frank",
    likeAmount: 120,
    tags: ["曼谷", "美食", "血拼"],
  },
  {
    id: "trip-07",
    title: "紐西蘭南島露營車自駕",
    subTitle: "走進魔戒的中土世界",
    type: "NORMAL",
    startTime: "2024-11-15T08:00:00Z",
    endTime: "2024-11-28T20:00:00Z",
    createdBy: "Grace",
    likeAmount: 950, // HOT Badge
    tags: ["紐西蘭", "自駕", "大自然"],
  },
  {
    id: "trip-08",
    title: "巴黎左岸浪漫雙人遊",
    subTitle: "咖啡、博物館與塞納河畔",
    type: "EDITOR_CHOICE",
    startTime: "2024-09-10T08:00:00Z",
    endTime: "2024-09-16T20:00:00Z",
    createdBy: "Henry",
    likeAmount: 310,
    tags: ["巴黎", "浪漫", "藝術"],
  },
];
