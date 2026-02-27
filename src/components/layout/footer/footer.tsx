"use client";

import { cn } from "@/lib/utils";
import { Format } from "@/src/lib/format";
import { ReactNode } from "react";
import Logo from "@/src/components/common/logo";
import { useTranslations } from "@/src/hooks/useTranslations";

interface FooterProps {
  startFrom?: string;
  name?: string;
  slogan?: string;
  children?: ReactNode;
  customClass?: string;
}

export default function Footer(props: FooterProps) {
  const { t } = useTranslations();
  const { name, startFrom, children, slogan, customClass } = props;
  const resolvedName = name ?? t("common.site-name");
  const resolvedSlogan = slogan ?? t("common.footer-slogan");

  const copyrightText = Format.copyright(
    { name: resolvedName, startFrom },
    t("common.copyright"),
  );

  return (
    <footer
      className={cn(
        "footer__container",
        "w-full border-t border-border bg-background pt-16 pb-8",
        customClass,
      )}
    >
      <div className="container mx-auto px-6">
        {/* 上半部：品牌與導覽的平衡 */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          {/* 左側：品牌區塊 (活潑與專業的起點) */}
          <div className="footer__brand flex flex-col gap-4 max-w-sm">
            <Logo className="h-10 w-auto -ml-2" />
            {resolvedSlogan && (
              <p
                className={cn(
                  "text-sm text-text-muted leading-relaxed",
                  "min-h-[4.5rem] md:min-h-[5rem]", // 👈 設定最小高度，確保 2-3 行字都不會抖動
                )}
              >
                {resolvedSlogan}
              </p>
            )}
          </div>

          {/* 右側：導覽區域 (Slot) */}
          {children && (
            <div className="footer__nav-area flex flex-wrap gap-4 md:gap-2">{children}</div>
          )}
        </div>

        {/* 下半部：版權區塊 */}
        <div className="footer__copyright pt-8 border-t border-border/40">
          <p className="text-xs tracking-widest text-text-subtle/60 text-center md:text-left font-medium">
            {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
}
