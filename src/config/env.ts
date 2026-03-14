export const ENV = {
  API_BASE_URL:
    (typeof window !== "undefined"
      ? (window as any).__RUNTIME_CONFIG__?.API_BASE_URL
      : process.env.API_BASE_URL) || "http://localhost:8080/api/v1",

  TIMEOUT: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,

  IS_SERVER: typeof window === "undefined",
};
