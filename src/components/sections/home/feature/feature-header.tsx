import { useTranslations } from "@/src/hooks/useTranslations";

export default function FeatureHeader() {
  const { t } = useTranslations();

  return (
    <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        {t("home.feature-title")}
      </h2>
      <p className="text-lg text-muted-foreground leading-relaxed">
        {/* 這裡會顯示修改後的單行文案 */}
        {t("home.feature-subtitle")}
      </p>
    </div>
  );
}
