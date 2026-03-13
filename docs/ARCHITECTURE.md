# Trip Master Frontend Architecture

> Last updated: 2026-03-13

## 架構摘要

這個專案目前是一個以 Next.js App Router 為核心的前端應用，主體分成兩條使用者路徑：

- `/(marketing)`：品牌首頁與公開內容頁。
- `/(auth)`：登入相關體驗。

目前已完成的是 UI 骨架、語系切換與表單驗證；尚未完成的是正式資料流、受保護頁面與行程編輯器本體。因此這份架構文件以「現在已存在的實作」為主，並明確標出預留但尚未啟用的部分。

## 技術棧

- Framework: Next.js `16.1.6`（App Router）
- Runtime UI: React `19.2.3`
- Language: TypeScript `5`
- Styling: Tailwind CSS `4`、`tw-animate-css`
- UI primitives: Radix UI、shadcn/ui
- Forms: React Hook Form + Zod
- Animation: Framer Motion
- Utility: `clsx`、`tailwind-merge`
- Reserved but not yet wired in app flow: `@tanstack/react-query`、`zustand`、`dayjs`

## 目錄分層

```text
src
├── app
│   ├── (marketing)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── explore/page.tsx
│   │   └── features/page.tsx
│   ├── (auth)
│   │   └── login
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── error.tsx
│   ├── layout.tsx
│   └── not-found.tsx
├── api
├── components
│   ├── common
│   ├── layout
│   ├── providers
│   ├── sections
│   └── ui
├── config
│   └── i18n
├── constants
├── hooks
├── lib
├── services
└── types
```

## 各層職責

### `src/app`

- 負責 App Router 路由進入點、layout 組合、404 與 500 頁面。
- `src/app/layout.tsx` 是 root layout，會在 server 端讀取 cookie，決定初始語系。
- `(marketing)` 與 `(auth)` 透過 route group 分流版型，不改變 URL 結構。

### `src/components`

- `ui/`：低階可重用元件，主要承接 shadcn/ui 風格。
- `common/`：跨場景共用元件，如 `Logo`、`TripCard`、`LocaleToggle`。
- `layout/`：頁首、頁尾、auth scene 等版面級元件。
- `sections/`：頁面區塊元件，首頁與 auth 頁面的主要組裝都在這層。
- `providers/`：目前主要是 `I18nProvider`。

### `src/config/i18n`

- 管理 `zh-TW` 與 `en` 字典。
- `dictionaries` 是翻譯來源。
- `locale-options.ts` 管理語系切換選單顯示。

### `src/services`

- `i18n-service.ts` 提供語系判斷、fallback 與翻譯函式建立。
- `destination-service.ts` 是目前唯一已出現的 HTTP service 草稿。

### `src/lib`

- 放純工具函式，不應承擔 I/O。
- 目前已有 `Format.copyright()` 與 `getBadgeColor()`。

### `src/constants`

- 管理 route map、footer config、badge config、auth motion constants。
- 屬於「不含邏輯或只含非常薄邏輯」的靜態設定層。

### `src/types`

- 集中共用型別，如 `NavRoute`、`BaseTripCardData`、footer/header props。

## 目前路由實作狀態

| 路由 | 狀態 | 說明 |
| --- | --- | --- |
| `/` | 已實作 | Marketing 首頁，含 Hero / Trending / Feature / CTA |
| `/login` | 已實作 | Auth scene，內含 login / register / forgot 三種前端模式切換 |
| `/explore` | 路由已建立，內容未實作 | page 檔存在，但目前沒有頁面內容 |
| `/features` | 路由已建立，內容未實作 | page 檔存在，但目前沒有頁面內容 |
| `/dashboard` | 未建立 | 但首頁 CTA 與部分導航已經指向此路由 |
| `/about` | 未建立 | Footer route 常數已存在 |
| `/profile` | 未建立 | User routes 常數已存在 |
| `/settings` | 未建立 | User routes 常數已存在 |

這代表目前的資訊架構已經先行規劃，但實際內容頁與受保護區域仍未落地。

## 語系與渲染流程

目前的 i18n 流程如下：

1. `src/app/layout.tsx` 透過 `cookies()` 讀取 `tm_locale`。
2. `resolveLocale()` 只接受已註冊的 locale，未知值一律 fallback 到 `zh-TW`。
3. `I18nProvider` 把 `locale`、`t()`、`setLanguage()` 提供給 client components。
4. `LocaleToggle` 切換語系時，同步更新 cookie 與 React state。
5. 需要語系文字的元件透過 `useTranslations()` 取用。

這種做法的優點是：

- 首次 SSR 就能決定語系。
- client side 切換語系時不需要整頁重整。
- 後續若要串接多語 API，可以直接沿用同一個 locale 值。

## 資料流與狀態管理

目前專案的狀態管理相對輕量：

- 全域狀態：只有 `I18nProvider` 管理語系。
- 區域狀態：例如 `AuthContainer` 管理 mode，`TripCard` 管理 like UI state。
- 表單狀態：由 React Hook Form 管理，驗證交給 Zod schema。
- 遠端資料：尚未形成正式 query flow；`destination-service.ts` 僅是單點 fetch 草稿。

目前沒有真正啟用的全域業務 state store，也還沒有 React Query provider。因此在串接真實 API 前，資料層架構仍保有調整空間。

## UI 組裝模式

目前頁面採取「route page 只負責組裝 sections」的風格：

- `src/app/(marketing)/page.tsx` 只負責組合首頁四個 sections。
- `src/app/(auth)/login/page.tsx` 只負責渲染 `AuthContainer`。
- 複雜畫面拆到 `components/sections/...` 與 `components/layout/...`。

這種模式適合後續：

- 讓 page 檔維持乾淨。
- 降低大型 JSX 聚集在單一檔案。
- 讓 section 可以獨立測試或獨立重構。

## 樣式系統

`src/app/globals.css` 已建立一套偏暖色系的 design tokens：

- 品牌主色為 terracotta 橘。
- 輔助色為藍綠色系。
- light / dark mode 都有對應 token。
- shadcn 常用語義色已映射到自訂 CSS variables。

此外：

- `cn()` 由 `clsx` + `tailwind-merge` 提供 class 合併。
- `TRIP_BADGE_CONFIG` 控制卡片 badge 顏色與 icon。
- `getBadgeColor()` 依 tag 文字做 hash，映射到固定 badge 色組。

## 目前測試與品質現況

現況必須和文件說清楚：

- 已有 ESLint 與 Prettier 設定。
- 專案中有 `destination-service.test.ts` 檔案，但目前內容為空。
- `package.json` 目前沒有 `test` script。
- `devDependencies` 目前沒有 Vitest / React Testing Library。

因此現階段不能把此專案描述成「已建立完整測試策略」，比較準確的說法是：測試檔位置已有預留，但測試基礎設施尚未真正建起來。

## 建議維持的開發規範

- 新頁面優先放在對應 route group，保持版型責任清楚。
- 文案進 `config/i18n`，不要直接硬寫在業務元件中。
- `services/` 只負責 I/O 與外部資料交換。
- `lib/` 只放純函式。
- 若某個畫面區塊已超過單一頁面可讀性，應拆成 `sections/`。
- 新增 API 串接時，應先補型別與錯誤處理，再考慮導入 React Query。

## 目前已知落差

- 多個導航連結已曝光，但對應頁面尚未建立，資訊架構與實作不同步。
- `useHome.ts` 目前為空實作。
- `destination-service.ts` 沒有 response schema、沒有錯誤處理，也尚未被頁面真正使用。
- `TrendingSection` 仍是 mock data 驅動，尚未進入正式資料層。
