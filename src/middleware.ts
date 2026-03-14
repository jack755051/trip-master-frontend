import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // TODO先假設存在cookies
  const token = request.cookies.get("auth-token")?.value;
  const { pathname } = request.nextUrl;

  // 1. 定義需要權限的群組路徑 (與你的目錄結構對應)
  const isDashboardPage = pathname.startsWith("/planning") || pathname.startsWith("/dashboard");
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");

  // 2. 權限攔截邏輯
  if (isDashboardPage && !token) {
    // 未登入，想進規劃頁 -> 踢回登入頁
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthPage && token) {
    // 已登入，想進登入頁 -> 直接進規劃頁
    return NextResponse.redirect(new URL("/planning", request.url));
  }

  return NextResponse.next();
}

// 設定 Middleware 執行的範圍，避免過載
export const config = {
  matcher: ["/planning/:path*", "/login", "/register"],
};
