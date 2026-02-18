import { NavRoute } from "@/src/types/route.type";

// 1. Header 導航 (中間)：只放內容頁面，不放登入
export const MARKETING_HEADER_ROUTES: NavRoute[] = [
  {
    labelKey: "nav.explore",
    href: "/explore",
  },
  {
    labelKey: "nav.features", // 新增功能介紹頁
    href: "/features",
  },
];

// 2. Footer 導航 (底部)：可以比較豐富，包含 App 入口或關於我們
export const MARKETING_FOOTER_ROUTES: NavRoute[] = [
  {
    labelKey: "nav.dashboard",
    subLabelKey: "common.sub-dashboard",
    href: "/dashboard",
  },
  {
    labelKey: "nav.about", // 假設你有加這條翻譯
    subLabelKey: "common.sub-about",
    href: "/about",
  },
];

// 2. 儀表板導航 (用在 (dashboard) 的 Sidebar/Header)
export const DASHBOARD_ROUTES: NavRoute[] = [
  {
    labelKey: "common.nav-trips", // "我的行程"
    subLabelKey: "common.sub-dashboard",
    href: "/dashboard",
  },
  {
    labelKey: "common.nav-explore", // "探索靈感"
    subLabelKey: "common.sub-discover",
    href: "/explore", // 如果你有公開行程廣場
  },
];

// 3. 使用者選單 (Avatar Dropdown)
export const USER_ROUTES: NavRoute[] = [
  {
    labelKey: "common.nav-profile",
    href: "/profile",
  },
  {
    labelKey: "common.nav-settings",
    href: "/settings",
  },
];
