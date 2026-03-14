import { cn } from "@/src/lib/utils";
import type { FooterNavItem } from "@/src/types/footer.type";
import Link from "next/link";

interface FooterNavProps extends FooterNavItem {
  customClass?: string;
}

export default function FooterNav({ label, subLabel, href, customClass }: FooterNavProps) {
  return (
    <Link href={href} className={cn("group flex flex-col items-center px-6", customClass)}>
      <span className="text-sm font-semibold text-text-main group-hover:text-brand transition-colors">
        {label}
      </span>
      {subLabel && (
        <span className="text-[9px] mt-0.5 font-medium tracking-widest text-text-subtle uppercase opacity-60 group-hover:opacity-100 transition-opacity">
          {subLabel}
        </span>
      )}
      {/* 裝飾底線 */}
      <span className="mt-1.5 h-[2px] w-0 bg-brand/40 transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
