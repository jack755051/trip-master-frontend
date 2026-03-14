# 階段1:安裝依賴
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --verbose

# 階段 2: 應用建置 (Build Time)
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# 禁用 Next.js 的遙測，加快建置速度
ENV NEXT_TELEMETRY_DISABLED=1
# 這裡不需要傳入 API URL，因為我們依賴 src/config/env.ts 進行 Runtime 讀取
RUN npm run build

# 階段 3: 運行環境 (Runtime)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 建立非 root 用戶以提升安全性
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 複製 public 靜態檔案
COPY --from=builder /app/public ./public

# 複製 standalone 產物 (需在 next.config.ts 中開啟 output: 'standalone')
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# 暴露端口
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 啟動 node 伺服器 (而非 next start)
CMD ["node", "server.js"]