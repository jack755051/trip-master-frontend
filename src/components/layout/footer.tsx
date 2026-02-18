import { BaseFooter } from "@/src/types/footer.type";
import { cn } from "@/lib/utils";
import { Format } from "@/src/lib/format";

interface FooterProps extends BaseFooter {
  customClass?: string;
}

export default function Footer(props: FooterProps) {
  // 1. 防呆邏輯：如果沒有名稱，整個元件不出現
  if (!props.name) {
    return null;
  }

  // 2. 使用你的 Format class 產生處理過 Unicode 的文字
  // 不需要 new，直接呼叫 static 方法
  const footerText = Format.copyright(props);

  return (
    <footer
      className={cn(
        "footer__container",
        "w-full border-t border-border bg-background py-6",
        props.customClass,
      )}
    >
      <div className="footer__content container mx-auto px-4 text-center">
        {/* 使用文字系統顏色，確保親切且專業 */}
        <p className="text-sm text-text-muted">{footerText}</p>
      </div>
    </footer>
  );
}
