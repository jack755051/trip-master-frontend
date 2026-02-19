"use client";

import { useTranslations } from "@/src/hooks/useTranslations";
import { Map, StickyNote, Users, LucideIcon } from "lucide-react";
import FeatureCard from "./feature-card";
import FeatureHeader from "@/src/components/sections/home/feature/feature-header"; // 引入剛剛拆分出去的元件

// 定義資料結構 (這屬於 FeatureSection 的設定檔，放在這裡沒問題)
interface FeatureConfig {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  color: string;
}

const FEATURES: FeatureConfig[] = [
  {
    icon: Map,
    titleKey: "home.feature-1-title",
    descKey: "home.feature-1-desc",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: StickyNote,
    titleKey: "home.feature-2-title",
    descKey: "home.feature-2-desc",
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  {
    icon: Users,
    titleKey: "home.feature-3-title",
    descKey: "home.feature-3-desc",
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
];

export default function FeatureSection() {
  const { t } = useTranslations();

  return (
    <section id="features" className="py-24 px-4 md:px-8 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        {/* === 標題區塊 === */}
        <FeatureHeader />

        {/* === 特色卡片網格 === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              colorClass={feature.color}
              // 在父層翻譯好，傳純字串給子元件
              title={t(feature.titleKey)}
              description={t(feature.descKey)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
