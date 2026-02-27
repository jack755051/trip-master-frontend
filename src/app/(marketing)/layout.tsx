import React from "react";
import Footer from "@/src/components/layout/footer/footer";
import Header from "@/src/components/layout/header/header";
import Logo from "@/src/components/common/logo";
import { getFooterData } from "@/src/services/footer-service";
import Toolbar from "@/src/components/layout/header/toolbar";
import { I18nProvider } from "@/src/components/providers/i18n-provider";
import { LOCALE_COOKIE_KEY, resolveLocale } from "@/src/services/i18n-service";
import { MarketingHeaderNav, MarketingFooterNav } from "@/src/components/layout/marketing-nav";
import { cookies } from "next/headers";

// src/app/(main)/layout.tsx
export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get(LOCALE_COOKIE_KEY)?.value);
  const { siteConfig } = getFooterData(locale);

  return (
    <I18nProvider initialLocale={locale}>
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

        <Footer name={siteConfig.name} startFrom={siteConfig.startFrom} slogan={siteConfig.slogan}>
          {/* Footer 整合:
              直接放入 MarketingFooterNav，它會自動讀取路由表並渲染 FooterNav 元件
          */}
          <MarketingFooterNav />
        </Footer>
      </div>
    </I18nProvider>
  );
}
