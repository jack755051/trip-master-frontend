// src/components/common/logo.tsx
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <svg
      width="240"
      height="64"
      viewBox="0 0 240 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("logo__svg", className)}
    >
      {/* 核心意圖：模組化規劃 (The Bento Logic)
        規劃就是將零散的碎片（時間、機票、景點）放入完美的容器中。
      */}
      <g transform="translate(8, 12)">
        {/* 區塊 1：基礎框架 - 代表時間軸或大項規劃 */}
        <rect x="0" y="0" width="16" height="40" rx="4" fill="var(--brand)" />

        {/* 區塊 2：動態內容 - 代表具體的行程項目，位置略高，產生視覺節奏 */}
        <rect x="22" y="8" width="16" height="32" rx="4" fill="var(--auxiliary)" />

        {/* 區塊 3：目的地/亮點 - 點睛之筆，代表規劃的結果 */}
        <rect x="44" y="0" width="16" height="20" rx="4" fill="var(--brand)" fillOpacity="0.6" />
        <rect x="44" y="26" width="16" height="14" rx="4" fill="var(--brand)" />
      </g>

      {/* 品牌文字：強大的排版是 Apple 風格的靈魂 */}
      <text
        x="80"
        y="42"
        className="font-bold tracking-tighter"
        style={{
          fontSize: "28px",
          fontFamily: "Inter, -apple-system, system-ui, sans-serif",
          fill: "var(--color-text-main)",
        }}
      >
        Trip
        <tspan className="font-light tracking-normal" style={{ fill: "var(--color-text-muted)" }}>
          Master
        </tspan>
      </text>

      {/* 點綴：一個極小的斜向箭頭，代表「前往目的地」的動能，隱含在文字末尾 */}
      <path
        d="M210 24 L216 18 M216 18 L210 18 M216 18 L216 24"
        stroke="var(--brand)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
