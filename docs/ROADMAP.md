# Trip Master Roadmap

> Last updated: 2026-03-13

## 專案目標

Trip Master Frontend 目前的目標，是先把「旅遊規劃產品的前台體驗」建立完整雛形，再逐步把真實資料、登入流程與行程編輯能力接上。以目前程式碼來看，首頁品牌體驗、登入介面與 i18n 基礎已經成形，但資料層與核心編輯器仍未落地。

## 目前狀態總覽

### 已完成

- Next.js 16 App Router、TypeScript、Tailwind CSS 4、ESLint/Prettier 基礎設置完成。
- `/(marketing)` 首頁已完成主要展示區塊：Hero、Trending、Feature、CTA。
- `/(auth)/login` 已完成登入、註冊、忘記密碼三種前端表單 UI 與 Zod 驗證。
- `zh-TW` / `en` 語系字典、語系切換器與 `tm_locale` cookie 流程已接通。
- 全域 `Header`、`Footer`、404 / 500 狀態頁已建立。

### 進行中

- `GET /destinations` API 草稿已存在，但尚未進入正式資料流。
- `/explore`、`/features` 頁面路由已建立，但內容尚未實作。
- 多個導向連結已先行出現在 UI 中，但對應頁面仍未建立。

### 尚未開始

- 真正的行程 CRUD 與多天行程編輯器。
- 拖曳排序、時間衝突提示、地圖整合。
- 登入後 session / protected routes / dashboard 架構。
- 自動化測試與 CI 驗證流程。

## 里程碑規劃

### Phase 0 - 前端基礎建設

- [x] 建立 Next.js 16 + App Router 專案骨架
- [x] 建立 Tailwind CSS 4 與 shadcn/ui 基礎元件
- [x] 建立 i18n dictionary、語系切換與 cookie 持久化
- [x] 建立 marketing layout、auth layout、共用 header/footer
- [x] 建立 404 / 500 錯誤頁

### Phase 1 - 內容頁與假資料整合

- [ ] 完成 `/explore` 頁面內容，串上卡片列表或 placeholder data source
- [ ] 完成 `/features` 頁面內容，補足導覽對應頁
- [ ] 清理目前已曝光但尚未存在的 `/dashboard`、`/about`、`/profile`、`/settings` 連結策略
- [ ] 把首頁 `Trending` mock data 改成可由 service 層輸入的資料來源
- [ ] 補齊空白或未使用的 hook / test placeholder

### Phase 2 - 帳號與資料契約接線

- [ ] 定稿 `NEXT_PUBLIC_API_URL` 與後端 base URL 規範
- [ ] 串接登入、註冊、忘記密碼 API
- [ ] 定義 form-level 與 field-level 錯誤映射方式
- [ ] 為 `destinations` 建立 TypeScript 型別與錯誤處理
- [ ] 規劃 React Query 導入點，處理快取、loading、retry

### Phase 3 - 行程編輯器 MVP

- [ ] 建立 dashboard 首頁與受保護路由框架
- [ ] 建立 trip / itinerary / day item 的資料模型
- [ ] 完成行程新增、編輯、刪除流程
- [ ] 支援天次排序、景點排序與時間欄位輸入
- [ ] 加入時間衝突提示與基本表單驗證

### Phase 4 - 協作與品質強化

- [ ] 評估多人協作、分享、共同編輯能力
- [ ] 導入測試框架並覆蓋 service / lib / schema
- [ ] 建立 CI：lint、build、test
- [ ] 規劃錯誤追蹤與監控方案

## 當前優先順序

1. 先補齊目前導覽中已出現但尚未落地的頁面，避免使用者點擊後直接 404。
2. 把 auth 與 destinations 的資料契約定下來，讓前端假資料能逐步退場。
3. 建立 dashboard shell，為後續行程編輯器預留入口。
4. 補上測試基礎設施，避免後面接 API 時回歸成本快速升高。

## 風險與依賴

- 目前專案已安裝 `@tanstack/react-query` 與 `zustand`，但尚未形成實際使用模式，狀態管理策略仍可能調整。
- `src/services/destination-service.ts` 目前沒有型別與錯誤處理，後端 contract 一旦變動，首頁資料接線會受影響。
- `src/components/sections/home/trending/trending-section.tsx` 仍使用 mock cards，展示內容與真實資料模型尚未對齊。
- 專案中存在 `destination-service.test.ts`，但目前 `package.json` 尚未提供 `test` script，也沒有測試框架依賴，文件不能再假設測試已完備。
