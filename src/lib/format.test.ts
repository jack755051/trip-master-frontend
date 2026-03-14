import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Format } from "./format";

describe("Format.copyright 診斷測試", () => {
  // 在每個測試開始前，我們把系統時間「凍結」在 2026 年
  beforeEach(() => {
    vi.useFakeTimers();
    const mockDate = new Date("2026-05-20");
    vi.setSystemTime(mockDate);
  });

  // 測試結束後恢復真實時間，避免影響其他測試檔案
  afterEach(() => {
    vi.useRealTimers();
  });

  it("當名稱為空時，應回傳空字串 (防錯機制)", () => {
    const result = Format.copyright({ name: "", startFrom: "2020" });
    expect(result).toBe("");
  });

  it("當 startFrom 與當前年份相同時，應僅顯示單一年份", () => {
    // 傳入 2026，當前也是 2026
    const result = Format.copyright({ name: "Trip Master", startFrom: "2026" });
    expect(result).toContain("© 2026 Trip Master");
    expect(result).not.toContain("-"); // 不應出現區間符號
  });

  it("當 startFrom 早於當前年份時，應顯示年份區間", () => {
    // 傳入 2020，當前是 2026
    const result = Format.copyright({ name: "Trip Master", startFrom: "2020" });
    expect(result).toContain("2020 - 2026");
  });

  it("應正確處理 i18n 模板字串替換", () => {
    const footer = { name: "傑克旅遊", startFrom: "2024" };
    const template = "Copyright {year} by {name}";

    const result = Format.copyright(footer, template);

    // 驗證是否正確替換了標籤
    expect(result).toBe("Copyright 2024 - 2026 by 傑克旅遊");
    // 驗證是否避開了預設的 "All rights reserved"
    expect(result).not.toContain("All rights reserved");
  });
});
