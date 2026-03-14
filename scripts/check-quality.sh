#!/bin/bash

# 定義顏色輸出 (UX 體驗)
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}===> 開始執行全項品質檢查...${NC}"

# 1. 執行 Lint 檢查
echo -e "\n${GREEN}[1/3] 正在執行 ESLint...${NC}"
npm run lint -- --fix
if [ $? -ne 0 ]; then
    echo -e "${RED}✘ Lint 檢查失敗，請修正代碼風格。${NC}"
    exit 1
fi

# 2. 執行所有單元測試
echo -e "\n${GREEN}[2/3] 正在執行全量單元測試...${NC}"
npm run test:run
if [ $? -ne 0 ]; then
    echo -e "${RED}✘ 單元測試未通過。${NC}"
    exit 1
fi

# 3. 產出測試覆蓋率報表
echo -e "\n${GREEN}[3/3] 正在產出覆蓋率報表...${NC}"
npm run test:coverage
if [ $? -ne 0 ]; then
    echo -e "${RED}✘ 覆蓋率檢查出錯。${NC}"
    exit 1
fi

echo -e "\n${GREEN}✔ 所有檢查已通過！專案狀態健康。${NC}"