import type { FooterCopyrightData } from "@/src/types/footer.type";
import { TIME_MS } from "../constants";
import { TripDuration } from "../types/trip.type";

export class Format {
  /**
   * Footer 版權文字工具
   * **/
  static copyright(footer: FooterCopyrightData, template?: string): string {
    const { name, startFrom } = footer;

    if (!name) return "";

    // 注意：在 Next.js SSR 中使用 new Date() 可能會導致 Hydration Mismatch
    // 但單純獲取年份通常是安全的，除非剛好在跨年那一秒
    const currentYear = new Date().getFullYear().toString();

    const yearDisplay =
      startFrom && startFrom !== currentYear ? `${startFrom} - ${currentYear}` : currentYear;

    // 1. 如果有傳入 i18n 模板，優先使用
    if (template) {
      return template.replace("{year}", yearDisplay).replace("{name}", name);
    }
    // 2. 預設回傳英文格式，使用 Unicode \u00A9 替代直接輸入 ©
    return `\u00A9 ${yearDisplay} ${name}. All rights reserved.`;
  }

  /**
   * 計算行程天數與夜數
   * @param startTime
   * @param endTime
   * @returns
   */
  static tripDuration(startTime: string, endTime: string): TripDuration | null {
    const start = new Date(startTime);
    const end = new Date(endTime);

    // 建立防呆機制
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return null;
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / TIME_MS.DAY);

    return {
      days: diffDays > 0 ? diffDays : 1,
      nights: diffDays > 0 ? diffDays - 1 : 0,
    };
  }
}
