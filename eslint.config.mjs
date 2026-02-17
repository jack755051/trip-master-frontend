import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier"; // 1. 引入 Prettier 配置

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // 2. 將 Prettier 配置放在最後，它會覆蓋並關閉前面可能衝突的格式規則
  eslintConfigPrettier,

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
