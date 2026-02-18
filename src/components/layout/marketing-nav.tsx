"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import FooterNav from "@/src/components/layout/footer/footer-nav";
// 引入拆分後的路由
import { MARKETING_HEADER_ROUTES, MARKETING_FOOTER_ROUTES } from "@/src/constants/routes";
import { useTranslations } from "@/src/hooks/useTranslations";

// 1. Header 用：使用 MARKETING_HEADER_ROUTES
export function MarketingHeaderNav() {
  const { t } = useTranslations();

  return (
    <nav className="flex items-center gap-8">
      {MARKETING_HEADER_ROUTES.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
          )}
        >
          {t(route.labelKey)}
        </Link>
      ))}
    </nav>
  );
}

// 2. Footer 用：使用 MARKETING_FOOTER_ROUTES
export function MarketingFooterNav() {
  const { t } = useTranslations();

  return (
    <>
      {MARKETING_FOOTER_ROUTES.map((route) => (
        <FooterNav
          key={route.href}
          href={route.href}
          label={t(route.labelKey)}
          subLabel={route.subLabelKey ? t(route.subLabelKey) : undefined}
        />
      ))}
    </>
  );
}
