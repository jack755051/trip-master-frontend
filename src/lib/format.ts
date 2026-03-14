import type { FooterCopyrightData } from "@/src/types/footer.type";

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
}
