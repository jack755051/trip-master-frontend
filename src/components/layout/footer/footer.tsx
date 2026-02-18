import { BaseFooter } from "@/src/types/footer.type";
import { cn } from "@/lib/utils";
import { Format } from "@/src/lib/format";
import LinkLayout from "@/src/components/layout/links";

interface FooterProps extends BaseFooter {
  customClass?: string;
}

const links = [
  { label: "目的地", subLabel: "Discover", href: "/explore" },
  { label: "行程規劃", subLabel: "Planning", href: "/planner" },
  { label: "支援中心", subLabel: "Support", href: "/help" },
];

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
        "w-full border-t border-border bg-background py-4",
        props.customClass,
      )}
    >
      <div className="footer__links">
        {/* 1. 連結區域：排列鬆散，減少壓力 */}
        <div className="flex justify-center gap-12 mb-16">
          {links.map((link) => (
            <LinkLayout key={link.label} {...link} />
          ))}
        </div>
      </div>
      <div className="footer__copyright container mx-auto px-4 text-center">
        {/* 2. 版權區域：回歸極簡中心化 */}
        <p className="text-sm text-text-muted">{footerText}</p>
      </div>
    </footer>
  );
}
