import { describe, expect, it } from "vitest";
import { getBadgeColor } from "./style-helper";
import { BADGE_STYLES } from "../constants/tag";

describe("style-helper 診斷測試", () => {
  it("當輸入為空字串或未定義時，應回傳預設的第一個樣式 (防護邏輯)", () => {
    // @ts-ignore: 測試非法輸入的情況
    expect(getBadgeColor(null)).toBe(BADGE_STYLES[0]);
    expect(getBadgeColor("")).toBe(BADGE_STYLES[0]);
  });

  it("相同的字串應始終回傳相同的顏色 (冪等性/穩定性)", () => {
    const input = "Tokyo";
    const firstCall = getBadgeColor(input);
    const secondCall = getBadgeColor(input);

    expect(firstCall).toBe(secondCall);
    expect(BADGE_STYLES).toContain(firstCall); // 確保回傳值確實在定義的清單中
  });

  it("不同的字串應儘量回傳不同的索引 (雜湊分布性)", () => {
    const colorA = getBadgeColor("Tokyo");
    const colorB = getBadgeColor("Osaka");

    // 雖然雜湊有機率碰撞，但在小規模測試中，這兩個應該不同
    expect(colorA).not.toBe(colorB);
  });

  it("應能正確處理極長或包含特殊字元的字串", () => {
    const longString = "A".repeat(1000);
    const specialChars = "旅!行@#$";

    expect(() => getBadgeColor(longString)).not.toThrow();
    expect(typeof getBadgeColor(specialChars)).toBe("string");
  });
});
