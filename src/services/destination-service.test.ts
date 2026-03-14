import { describe, it, expect, vi, beforeEach } from "vitest";
import { getDestinations } from "./destination-service";

describe("DestinationService Test", () => {
  const MOCK_API_URL = "https://api.tripmaster.com";

  beforeEach(() => {
    // 模擬環境變數
    vi.stubEnv("NEXT_PUBLIC_API_URL", MOCK_API_URL);
    // 每次測試前清除 fetch 的紀錄
    vi.stubGlobal("fetch", vi.fn());
  });

  it("應該發送正確的語系 Header 並回傳資料", async () => {
    const mockResponse = [{ id: 1, name: "東京" }];

    // 模擬 fetch 回傳成功
    (fetch as any).mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
      ok: true,
    });

    const result = await getDestinations("zh-TW");

    // 1. 驗證 URL 與 Header 是否符合預期
    expect(fetch).toHaveBeenCalledWith(
      `${MOCK_API_URL}/destinations`,
      expect.objectContaining({ headers: { "Accept-Language": "zh-TW" } }),
    );

    // 2. 驗證回傳資料結構
    expect(result).toEqual(mockResponse);
  });

  it("當API報錯時應該拋出異常(Error Handling)", async () => {
    (fetch as any).mockResolvedValue({
      ok: false,
      status: 500,
    });

    // 驗證服務是否能正確傳遞或處理錯誤
    // 注意：目前的實作沒寫 try/catch，這裡測試它是否會報錯
    await expect(getDestinations("en")).rejects.toThrow();
  });
});
