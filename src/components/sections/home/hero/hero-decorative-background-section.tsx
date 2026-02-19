// src/components/sections/home/hero/hero-decorative-background-section.tsx
export default function HeroDecorativeBackgroundSection() {
  return (
    <div
      // 1. 改用非常淡的 Hex Alpha 顏色：#0000000f (約 6% 透明度的黑)
      //    Dark Mode 則使用 #ffffff10 (約 6% 透明度的白)
      // 2. 將網格間距稍微放大到 32px，讓畫面更有呼吸空間
      className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#0000000f_1px,transparent_1px),linear-gradient(to_bottom,#0000000f_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:32px_32px]"
      style={{
        // 3. 調整 Mask 漸層：讓中間完全清晰的範圍縮小到 20%，並在 70% 處就完全消失，邊緣過渡會更柔和
        WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
        maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
      }}
    />
  );
}
