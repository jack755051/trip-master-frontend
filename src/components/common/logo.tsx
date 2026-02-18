// src/components/common/logo.tsx
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <svg
      width="240"
      height="80"
      viewBox="0 0 240 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("logo__svg select-none", className)}
      aria-label="TripMaster - Refined Planning Logo"
    >
      {/* 1. 基礎文字層 (維持不變) */}
      <text
        x="10"
        y="60"
        className="font-bold tracking-tight"
        style={{
          fontSize: "32px",
          fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
          fill: "var(--color-text-main)",
        }}
      >
        Tr
        <tspan className="fill-[var(--color-text-main)]">i</tspan>p
        <tspan dx="8" className="fill-[var(--brand)]">
          Mast
          <tspan fill="transparent">e</tspan>r
        </tspan>
      </text>

      {/* 2. 圖形合體層 */}
      <g>
        {/* i 的起點圓心：(44.5, 39), 半徑 5.5 */}
        <circle cx="42.5" cy="38" r="3" fill="var(--brand)" />

        {/* e 的終點 Pin：頂部尖端約在 (152, 42) */}
        <g transform="translate(152, 52)">
          <path
            d="M 0 8 L -5 0 C -7 -3, -7 -10, 0 -10 C 7 -10, 7 -3, 5 0 L 0 8 Z"
            fill="var(--brand)"
          />
          <circle r="2" fill="white" />
        </g>

        {/* 3. 調整後的路徑 (Adjusted Path) */}
        <path
          /* M (起點): 從原本的 44.5 39 修改為 47 32。
                 向右上方移動，離開了 i 的圓點範圍。

                 Q (控制點): 從原本的 98 20 修改為 98 5。
                 Y 值變小，曲線高度顯著提升。

                 終點 (最後兩個數字): 從原本的 152 42 修改為 149 36。
                 向左上方移動，離開了 Pin 的頂部尖端。
              */
          d="M 47 32 Q 98 5, 149 36"
          stroke="var(--auxiliary)"
          strokeWidth="3"
          strokeDasharray="5 5"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}
