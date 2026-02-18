import { BaseFooter } from "@/src/types/footer.type";
import { cn } from "@/lib/utils";
import { Format } from "@/src/lib/format";
import { ReactNode } from "react";

interface FooterProps extends BaseFooter {
  children?: ReactNode; // 這裡放導覽連結，實現組合式架構
  customClass?: string;
}

export default function Footer({ name, startFrom, children, customClass }: FooterProps) {
  if (!name) return null;

  const copyrightText = Format.copyright({ name, startFrom });

  return (
    <footer
      className={cn(
        "footer__container",
        "w-full border-t border-border bg-background pt-12 pb-6", // 增加頂部 Padding，減少下方 mb
        customClass,
      )}
    >
      {/* 1. 內容區域 (Slot) */}
      {children && <div className="footer__nav-area mb-10 flex justify-center">{children}</div>}

      {/* 2. 版權區域 */}
      <div className="footer__copyright container mx-auto px-4">
        <div className="h-[1px] w-full bg-border/50 mb-6" /> {/* 加入一條細微的線增加專業感 */}
        <p className="text-xs tracking-wide text-text-subtle/80 text-center">{copyrightText}</p>
      </div>
    </footer>
  );
}
