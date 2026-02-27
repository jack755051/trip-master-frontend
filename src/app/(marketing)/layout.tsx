import React from "react";
import Footer from "@/src/components/layout/footer/footer";
import Header from "@/src/components/layout/header/header";
import Logo from "@/src/components/common/logo";
import Toolbar from "@/src/components/layout/header/toolbar";
import { MarketingHeaderNav, MarketingFooterNav } from "@/src/components/layout/marketing-nav";
import { SITE_CONFIG } from "@/src/constants/footer";

// src/app/(main)/layout.tsx
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="main-container flex min-h-screen flex-col">
      {/* Header 整合:
          - left: Logo
          - center: 導航選單 (MarketingHeaderNav)
          - right: 工具列 (Toolbar)
      */}
      <Header
        left={<Logo className="h-10 w-auto" />}
        center={<MarketingHeaderNav />}
        right={<Toolbar />}
      />

      <main className="flex-1">{children}</main>

      <Footer startFrom={SITE_CONFIG.startFrom}>
        {/* Footer 整合:
            直接放入 MarketingFooterNav，它會自動讀取路由表並渲染 FooterNav 元件
        */}
        <MarketingFooterNav />
      </Footer>
    </div>
  );
}
