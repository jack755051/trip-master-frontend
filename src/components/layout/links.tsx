import { cn } from "@/lib/utils";
import { BaseLink } from "@/src/types/common.type";
import Link from "next/link";

interface LinkProps extends BaseLink {
  customClass?: string;
}

export default function LinkLayout(props: LinkProps) {
  const { customClass, href, label, subLabel } = props;

  return (
    <div className={cn("group flex flex-col", customClass)}>
      <Link href={href} className="flex flex-col items-center md:items-start">
        {/* 主標籤：增加字重與間距，提升專業感 */}
        <span
          className={cn(
            "text-sm font-medium text-text-main transition-all duration-300",
            "group-hover:text-brand", // 懸停時變色
          )}
        >
          {label}
        </span>

        {/* 副標籤：極小且柔和，提供更多親切的解釋內容 */}
        {subLabel && (
          <span
            className={cn(
              "text-[10px] mt-0.5 tracking-wider text-text-subtle/70 uppercase",
              "opacity-0 transition-opacity duration-300 group-hover:opacity-100", // 懸停時才顯現（可選，增加趣味性）
            )}
          >
            {subLabel}
          </span>
        )}

        {/* Apple 式底線：不是文字底線，而是獨立的動畫裝飾線 */}
        <span className="mt-1 h-[1px] w-0 bg-brand transition-all duration-300 group-hover:w-full" />
      </Link>
    </div>
  );
}
