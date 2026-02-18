import { cn } from "@/lib/utils";
import Link from "next/link";

interface FooterNavProps {
  label: string; // 已經翻譯過的文字
  subLabel?: string; // 已經翻譯過的文字
  href: string;
}

export default function FooterNav({ label, subLabel, href }: FooterNavProps) {
  return (
    <Link href={href} className="group flex flex-col items-center px-6">
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
