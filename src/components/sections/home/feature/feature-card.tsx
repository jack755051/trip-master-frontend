import { cn } from "@/src/lib/utils";
import { BaseFeatureCard } from "@/src/types/home.type";

// 定義 Props，這裡直接接收 string 類型的 title 和 description
interface FeatureCardProps extends BaseFeatureCard {
  customClass?: string; // 預留彈性，以防外層需要微調 Layout
}

export default function FeatureCard(props: FeatureCardProps) {
  const { icon: Icon, title, description, colorClass, customClass } = props;

  return (
    <div
      className={cn(
        "group relative bg-background rounded-2xl p-8 border border-border/50 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1",
        customClass,
      )}
    >
      {/* Icon 區塊 */}
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110",
          colorClass,
        )}
      >
        <Icon className="w-6 h-6" strokeWidth={2} />
      </div>

      {/* 文字區塊 */}
      <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>

      {/* 裝飾性背景光暈 */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-muted/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}
