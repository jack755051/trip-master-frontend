# Trip Master Frontend

一個面向旅遊行程規劃的前端專案，目標是幫使用者快速建立、調整與管理多天行程。

## 專案定位

`trip-master-frontend` 專注於「行程規劃安排」體驗，強調：
- 快速建立旅程與每日行程
- 彈性調整景點與時間安排
- 清楚的資訊結構與操作流程

## 目前開發狀態

目前已完成：
- Next.js 16 + React 19 前端基礎架構
- Tailwind CSS v4 樣式系統
- 常用 UI 與狀態管理相關套件整備

目前主功能頁面仍在開發中（`app/(main)`、`app/(auth)/login` 目前為空檔）。

## 技術棧

- Framework: Next.js 16 (App Router)
- Language: TypeScript
- UI: Tailwind CSS v4 + shadcn/ui（配置完成）
- State: Zustand
- Data Fetching: TanStack React Query
- Form & Validation: React Hook Form + Zod
- Animation: Framer Motion
- Date Utility: Day.js

## 專案結構

```bash
app/
  layout.tsx
  page.tsx
  (main)/                # 主功能區（開發中）
  (auth)/login/          # 登入區（開發中）
lib/
  utils.ts
public/
```

## 本機啟動

```bash
npm install
npm run dev
```

啟動後開啟：`http://localhost:3000`

## 可用指令

```bash
npm run dev      # 開發模式
npm run build    # 建置
npm run start    # 啟動正式環境
npm run lint     # 程式碼檢查
```

## 開發路線圖（建議）

- 行程建立與編輯流程（Trip / Day / Activity）
- 拖曳排序與時間衝突提示
- 地圖與交通資訊整合
- 收藏景點與行程模板
- 使用者登入與雲端同步

## 專案願景

打造一個「好看、好排、好改」的旅遊行程規劃前端，讓使用者從靈感到落地安排，都能在同一個介面快速完成。
