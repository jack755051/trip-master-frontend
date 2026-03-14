# Trip Master - Phase 1: Core Planning Architecture

## 1. 核心設計哲學：沉浸式規劃 (Immersive Planning)
目標是移除傳統網頁的「邊框感」，讓規劃過程像是在地圖上直接書寫筆記。

### 三層視圖架構 (The 3-Layer Concept)
這不是三個不同的頁面，而是**同一個頁面 (`/planner`) 中的三個疊加層 (Z-Index Layers)**：

* **Layer 1 (Bottom) - 底層現實**:
    * **Google Maps Fullscreen**: 滿版地圖，作為整個應用的畫布。
    * 負責顯示地理資訊、POI (興趣點)。
* **Layer 2 (Middle) - 視覺路徑 (Canvas/SVG Overlay)**:
    * **動態路徑層**: 使用 Canvas 或 SVG 繪製的旅遊路徑、自訂標記 (Marker)。
    * 這層負責「連接」點與點，呈現移動的脈絡 (Flow)。
* **Layer 3 (Top) - 規劃筆記 (The Glass Note)**:
    * **透明互動層**: 這是主要的 UI 操作區。
    * 設計為左側或底部的**懸浮面板 (Floating Panel)**，背景帶有高斯模糊 (Backdrop Blur)。
    * 承載詳細資訊：時間軸、景點詳情、拖拉排序功能。

---

## 2. 路由架構 (Route Structure)

在第一階段，我們不需要過多複雜的頁面，專注於「列表」與「詳情」。

### 主要頁面 (Pages)

| 路徑 (Path) | 頁面名稱 | 功能描述 | 核心區塊 (Components) |
| :--- | :--- | :--- | :--- |
| `/` | **Landing / Home** | 產品首頁 (未登入) 或 轉向 Dashboard | Hero Section, 特色介紹 |
| `/dashboard` | **My Trips** | **(核心入口)** 行程列表，保存的旅遊案 | `TripGrid`, `CreateTripButton` |
| `/planner/[tripId]` | **The Workspace** | **(核心功能)** 上述的三層規劃介面 | `MapContainer`, `ItineraryPanel`, `CanvasLayer` |
| `/login` | **Auth** | 登入/註冊 | `AuthForm` |

### 為什麼這樣設計？
* **`/planner/[tripId]` 是獨立的**: 規劃介面通常需要隱藏 Header/Footer，以最大化地圖視野。這與行銷首頁或列表頁的 Layout 不同，建議在 Next.js 中使用 Route Groups `(planner)` 來區隔 Layout。

---

## 3. 規劃器介面佈局 (Planner Layout Details)

進入 `/planner/[tripId]` 後的區塊劃分：

1.  **Global Backdrop (Layer 1)**:
    * `<MapComponent />`: 佔據 `100vw`, `100vh`。
2.  **The "Island" (Layer 3 - UI)**:
    * 不使用傳統 Sidebar，改用「懸浮島」設計。
    * 左側寬卡片：顯示當前天數的行程列表 (Timeline)。
    * 右側小工具列：搜尋、切換圖層、存檔。
3.  **Detail View (Layer 3 - Modal/Drawer)**:
    * 點擊某個景點時，從側邊滑出的詳細資訊卡 (包含筆記、時間設定)。

---

## 4. 路由表配置 (Route Configuration)

根據你的主軸「規劃」，導航列 (Navbar) 應該引導使用者快速回到他們正在進行的工作。

以下是建議的 `routes.ts` 配置：

```typescript
import { NavRoute } from "@/src/types/route.type";

export const MAIN_ROUTES: NavRoute[] = [
  // 1. 探索/首頁: 吸引新用戶或尋找靈感
  {
    labelKey: "common.nav-explore", // "探索"
    subLabelKey: "common.sub-discover", // "Discover"
    href: "/", 
  },
  // 2. 我的行程: 這是第一階段最重要的入口 (保存/讀取)
  {
    labelKey: "common.nav-trips", // "我的行程"
    subLabelKey: "common.sub-dashboard", // "Dashboard"
    href: "/dashboard", 
  },
  // 3. 快速開始: 直接建立新規劃的捷徑 (可選，強調 Call to Action)
  {
    labelKey: "common.nav-new", // "新旅程"
    subLabelKey: "common.sub-create", // "Create"
    href: "/planner/new", 
  },
];

// 針對設定或個人檔案的次要路由 (通常放在 Avatar Dropdown)
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