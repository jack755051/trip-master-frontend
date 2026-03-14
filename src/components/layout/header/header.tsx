"use client";

import { cn } from "@/src/lib/utils";
import type { HeaderSlots } from "@/src/types/header.type";

interface HeaderProps extends HeaderSlots {
  customClass?: string;
}

export default function Header(props: HeaderProps) {
  const { left, center, right, customClass } = props;

  return (
    <header
      className={cn(
        "header__container sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md",
        customClass,
      )}
    >
      {/* 修改重點：
         1. 移除 `justify-between`，改用預設的 `justify-start` (flex 預設值)。
         2. 加入 `gap-8` (或是 gap-12)，設定 Logo 與 Nav 之間的間距。
      */}
      <div className="header__content container mx-auto flex h-20 items-center px-4 gap-8">
        {/* 左側：Logo */}
        <div className="header__left flex items-center flex-shrink-0">{left}</div>

        {/* 中間：Nav (現在會緊跟在 Logo 右側，間距由外層 gap-8 控制) */}
        <div className="header__center hidden md:flex items-center">{center}</div>

        {/* 右側：Toolbar */}
        {/* 關鍵修改：加入 `ml-auto`
           這會佔據左側所有剩餘空間，將此區塊推到最右邊
        */}
        <div className="header__right ml-auto flex items-center gap-4">{right}</div>
      </div>
    </header>
  );
}
