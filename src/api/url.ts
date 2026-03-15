export const replaceUrlParams = (url: string, params: Record<string, string | number>) => {
  let result = url;

  Object.entries(params).forEach(([key, value]) => {
    // 使用正則表達式，確保只替換 :key，並處理邊界
    // 這裡的 :${key} 會動態匹配傳入的 key
    result = result.replace(new RegExp(`:${key}\\b`, "g"), String(value));
  });

  return result;
};

export enum CommonUrl {
  //登入相關
  LOGIN = "/login",
  REGISTER = "/login?mode=register",
  FORGOT = "/login?mode=forgot",
  // 首頁相關
  TRENDING_TRIPS = "trips",
  TRIP_DETAIL = "trips-detail",
}
