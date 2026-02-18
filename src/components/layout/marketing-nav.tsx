"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import FooterNav from "@/src/components/layout/footer/footer-nav";
// 引入拆分後的路由
import { MARKETING_HEADER_ROUTES, MARKETING_FOOTER_ROUTES } from "@/src/constants/routes";
import { useTranslations } from "@/src/hooks/useTranslations";
import { usePathname } from "next/navigation";

// 1. Header 用：使用 MARKETING_HEADER_ROUTES
export function MarketingHeaderNav() {
  const { t } = useTranslations();
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-8">
      {MARKETING_HEADER_ROUTES.map((route) => {
        const isActive =
          pathname === route.href ||
          (route.href !== "/" && pathname.startsWith(`${route.href}/`));

        return (
          <Link
            key={route.href}
            href={route.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "text-sm font-medium transition-colors",
              isActive
                ? "text-primary underline underline-offset-8 decoration-2"
                : "text-muted-foreground hover:text-primary",
            )}
          >
            {t(route.labelKey)}
          </Link>
        );
      })}
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
