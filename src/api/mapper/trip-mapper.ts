import { Format } from "@/src/lib";
import { TripResponseDto } from "../response";
// 請確認以下路徑指向你定義 type 的檔案
import { MarketingTripCardData, TripBadgeType, DashboardTripCardData } from "@/src/types/trip.type";

export class TripMapper {
  /**
   * 將後端 DTO 轉換為「前台形象網站」專用的卡片資料
   */
  static toMarketingCard(dto: TripResponseDto): MarketingTripCardData {
    // 1. 商業邏輯轉換：決定 Badge (根據讚數或類型)
    let badge: TripBadgeType | undefined = undefined;
    if (dto.likeAmount > 500) {
      badge = "HOT";
    } else if (dto.type === "NEW") {
      badge = "NEW";
    }

    // 3. UI 視覺填補：後端沒有給的視覺屬性，由前端賦予預設值
    // 為了讓每張卡片顏色不同，可以根據 id 長度或其他規則給不同的漸層，這裡先給固定值
    const defaultGradient = "from-blue-500 to-cyan-400";

    // 4. 正式映射 (Mapping)
    return {
      id: dto.id,
      title: dto.title,
      duration: Format.tripDuration(dto.startTime, dto.endTime), // 轉換後的天數字串
      gradient: defaultGradient, // 補上 UI 專用屬性
      author: dto.createdBy, // 欄位更名：createdBy -> author
      likes: dto.likeAmount, // 欄位更名：likeAmount -> likes
      tags: dto.tags,
      badge: badge, // 轉換後的標籤
    };
  }

  /**
   * (未來擴充) 將後端 DTO 轉換為「管理後台」專用的資料
   */
  static toDashboardCard(dto: TripResponseDto): DashboardTripCardData {
    return {
      id: dto.id,
      title: dto.title,
      // 🎯 修正：替換掉原本的 days，遵守 BaseTrip 的 duration 合約
      duration: Format.tripDuration(dto.startTime, dto.endTime),
      gradient: "none",
      status: "PUBLISHED",
      createdAt: dto.startTime,
      updatedAt: dto.endTime,
      enrollmentCount: dto.likeAmount,
    };
  }
}
