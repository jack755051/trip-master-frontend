"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BaseFooter } from "@/src/types/header.type";

interface HeaderProps extends BaseFooter {
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
      <div className="header__content container mx-auto flex h-20 items-center justify-between px-4">
        {/* 左側：通常放 Logo */}
        <div className="header__left flex items-center">{left}</div>

        {/* 中間：通常放主要的 Nav (這專案目前 Nav 在 Footer) */}
        <div className="header__center hidden md:flex items-center">{center}</div>

        {/* 右側：放 Toolbar / 語系切換 / 登入 */}
        <div className="header__right flex items-center gap-4">{right}</div>
      </div>
    </header>
  );
}
