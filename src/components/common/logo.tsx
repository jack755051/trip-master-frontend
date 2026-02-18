// src/components/common/logo.tsx
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <svg
      width="240"
      height="60"
      viewBox="0 0 240 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("logo__svg", className)}
    >
      {/* 核心概念：規劃的連點成線 (The Planning Sequence) */}
      <g transform="translate(10, 20)">
        {/* 1. 已確定的路徑：使用品牌色，表達「已經規劃好」的踏實感 */}
        <path d="M10 10 L45 10" stroke="var(--brand)" strokeWidth="4" strokeLinecap="round" />

        {/* 2. 規劃中的下一個節點：使用虛線與輔助色，表達「探索與預定」 */}
        <path
          d="M45 10 L75 10"
          stroke="var(--auxiliary)"
          strokeWidth="4"
          strokeDasharray="1 6"
          strokeLinecap="round"
        />

        {/* 3. 節點元素 */}
        {/* 節點 A (起點)：空心圓，像一個勾選框 */}
        <circle
          cx="10"
          cy="10"
          r="8"
          stroke="var(--brand)"
          strokeWidth="3"
          fill="var(--background)"
        />

        {/* 節點 B (進行中)：實心點，並帶有「規劃細節」的標籤感 */}
        <circle cx="45" cy="10" r="6" fill="var(--brand)" />

        {/* 裝飾性的小方塊 (規劃細節)：象徵機票或酒店的資訊塊 */}
        <rect x="40" y="22" width="10" height="4" rx="2" fill="var(--brand)" fillOpacity="0.4" />
        <rect
          x="54"
          y="22"
          width="18"
          height="4"
          rx="2"
          fill="var(--auxiliary)"
          fillOpacity="0.4"
        />
      </g>

      {/* 品牌文字：將「規劃」與「大師」在視覺上平衡 */}
      <text
        x="95"
        y="35"
        className="font-bold tracking-tight"
        style={{
          fontSize: "26px",
          fontFamily: "Inter, -apple-system, system-ui, sans-serif",
          fill: "var(--color-text-main)",
        }}
      >
        Trip
        <tspan style={{ fill: "var(--brand)", fontWeight: 800 }} className="ml-1">
          Master
        </tspan>
      </text>

      {/* Apple 式的細節：一個小小的、代表「定位/當前規劃點」的閃爍點效果 (用靜態表達) */}
      <circle cx="215" cy="20" r="2" fill="var(--brand)" className="animate-pulse" />
    </svg>
  );
}
