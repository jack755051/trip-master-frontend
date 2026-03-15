import { ofetch } from "ofetch";
import type { FetchOptions, FetchContext } from "ofetch";

// 保持你原本的 APIErrorType 與 ApiClientError 不變
export type ApiErrorType =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "API_FAILED"
  | "NETWORK"
  | "TIMEOUT"
  | "UNKNOWN";

export class ApiClientError extends Error {
  type: ApiErrorType;
  status?: number;
  code?: number | string;
  data?: unknown;

  constructor(
    message: string,
    {
      type,
      status,
      code,
      data,
    }: { type: ApiErrorType; status?: number; code?: number | string; data?: unknown },
  ) {
    super(message);
    this.name = "ApiClientError";
    this.type = type;
    this.status = status;
    this.code = code;
    this.data = data;
  }
}

export interface APIResponse<T = unknown> {
  success: boolean;
  code: string | number;
  message: string;
  data: T;
}

function isBinaryResponse(option?: FetchOptions) {
  const responseType = option?.responseType;
  return responseType === "blob" || responseType === "arrayBuffer";
}

// 環境感知
const isServer = typeof window === "undefined";

function getBaseUrl() {
  if (isServer) {
    return process.env.INTERNAL_API_URL || "http://localhost:8080/api/v1";
  }

  return process.env.NEXT_PUBLIC_API_BASE_URL || "/api/v1";
}

// 非同步的 Token 獲取機制
async function getAuthToken() {
  if (isServer) {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      return cookieStore.get("accessToken")?.value || null;
    } catch (error) {
      // 若在無法獲取 header 的上下文中，回傳 null
      return null;
    }
  } else {
    // Client 端：保持你原本的邏輯，但建議未來統一改成讀取 Cookie
    return localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken") || null;
  }
}

// 建立ofetch實例
export const apiClient = ofetch.create({
  timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,

  // 每次請求前動態設定Base URL
  async onRequest({ options, request }: FetchContext) {
    // 設定正確的URL
    options.baseURL = getBaseUrl();

    // 獲取並注入 Token (使用 await 因為 Server 端讀取 cookie 是異步操作)
    const token = await getAuthToken();

    if (token) {
      options.headers = new Headers(options.header || {});
      if (!options.headers.has("Authorization")) {
        options.headers.set("Authorization", `Bearer ${token}`);
      }
    }
  },

  // 響應攔截器：自動提取 APIResponse (維持你原本的優秀邏輯)
  async onResponse({ response, options }: FetchContext) {
    if (isBinaryResponse(options)) return;

    if (response._data && typeof response._data === "object" && "data" in response._data) {
      // 這裡省略了型別轉換以簡化示意
      const apiResponse = response._data as APIResponse;

      if (!apiResponse.success) {
        throw new ApiClientError(apiResponse.message || "API request failed", {
          type: "API_FAILED",
          status: response.status,
          code: apiResponse.code,
          data: apiResponse,
        });
      }
      response._data = apiResponse.data;
    }
  },

  onResponseError({ response, error }: FetchContext) {
    if (error instanceof ApiClientError) throw error;

    if (!response) {
      const isTimeout =
        error?.name === "AbortError" ||
        String(error?.message || "")
          .toLowerCase()
          .includes("timeout");

      throw new ApiClientError(error?.message || "Network error", {
        type: isTimeout ? "TIMEOUT" : "NETWORK",
      });
    }

    const status = response.status;
    const type = status === 401 ? "UNAUTHORIZED" : status === 403 ? "FORBIDDEN" : "UNKNOWN";

    throw new ApiClientError(response.statusText || "Request failed", {
      type,
      status,
      data: response._data,
    });
  },
});
