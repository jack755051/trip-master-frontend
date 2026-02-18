import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <svg
      className={cn("h-10 w-auto", className)} // 高度微調，更精緻
      viewBox="0 0 320 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Trip-Master"
    >
      {/* 整合式標誌：Pin + 飛向未來的路徑 */}
      <g transform="translate(5, 15)">
        {/* 背景太陽 / Pin 核心：使用漸層或純色 */}
        <circle cx="25" cy="25" r="22" fill="var(--brand)" fillOpacity="0.1" />
        <circle cx="25" cy="25" r="10" fill="var(--brand)" />

        {/* 極簡流線：從地點出發的路徑 */}
        <path
          d="M25 25C45 25 60 10 75 10"
          stroke="var(--auxiliary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="0.1 8" // 點狀路徑，增加呼吸感
        />

        {/* 紙飛機：簡化為三個點構成的幾何形 */}
        <path d="M72 5L85 10L72 15L75 10Z" fill="var(--auxiliary)" />
      </g>

      {/* WORDMARK：拿掉底線，依靠字體排版勝出 */}
      <g transform="translate(100, 48)">
        <text
          fontSize="28"
          fontWeight="700"
          fill="var(--color-text-main)"
          fontFamily="ui-sans-serif, system-ui, -apple-system"
          letterSpacing="-0.03em"
        >
          Trip
          <tspan fill="var(--brand)" fontWeight="400">
            Master
          </tspan>
        </text>
        {/* 只保留一個極小、具有畫龍點睛效果的點 */}
        <circle cx="156" cy="-8" r="3" fill="var(--auxiliary)" />
      </g>
    </svg>
  );
}
