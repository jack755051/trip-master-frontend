import React from "react";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 1. 風景底圖層 - 增加主觀鏡頭的縮放動態 */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[10000ms] ease-out scale-110 hover:scale-100"
        style={{ backgroundImage: "url('/images/login-landscape.jpg')" }} // 建議放一張開闊的公路或雲海照
      />

      {/* 2. 品牌色遮罩 - 專業的落日磚橘漸層 */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-brand/20 via-background/40 to-background/90 backdrop-blur-[2px]" />

      {/* 3. 內容層 */}
      <main className="relative z-20 w-full max-w-[1200px] h-[700px] flex items-center justify-center px-4">
        {children}
      </main>
    </div>
  );
}
