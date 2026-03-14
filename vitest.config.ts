import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts",
    // --- 覆蓋率配置開始 ---
    coverage: {
      provider: "v8",
      include: ["src/**/*"],
      exclude: [
        "src/**/*.type.ts",
        "src/types/**/*",
        "src/constants/**/*", // 排除靜態常數
        "src/config/i18n/**/*", // 排除語系定義檔
        "src/api/url.ts",
        "src/**/index.ts", // 排除單純做 export 用的 index 檔案
        "src/app/layout.tsx",
        "src/app/favicon.ico",
        "src/components/ui/**/*", // 排除 shadcn/ui 基礎組件 (通常是第三方代碼)
        "src/lib/style-helper.ts", // 排除單純封裝 tailwind-merge 的工具
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80,
      },
    },
    // --- 覆蓋率配置結束 ---
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
