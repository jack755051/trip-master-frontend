import { BaseFooter } from "@/src/types/footer.type";
import { cn } from "@/lib/utils";
import { Format } from "@/src/lib/format";
import { ReactNode } from "react";
import Logo from "@/src/components/common/logo";

interface FooterProps extends BaseFooter {
  children?: ReactNode;
  customClass?: string;
}

export default function Footer(props: FooterProps) {
  const { name, startFrom, children, slogan, customClass } = props;

  if (!name) return null;

  const copyrightText = Format.copyright({ name, startFrom });

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
            <Logo className="h-10 w-auto -ml-2" /> {/* 稍微向左負偏移，對齊視覺邊界 */}
            {slogan && <p className="text-sm text-text-muted leading-relaxed">{slogan}</p>}
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
