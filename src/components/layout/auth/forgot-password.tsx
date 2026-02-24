"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useTranslations } from "@/src/hooks/useTranslations";
import { ArrowLeft } from "lucide-react";

export default function ForgotPassword({ onSwitchLogin }: { onSwitchLogin: () => void }) {
  const { t } = useTranslations();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-text-main">{t("auth.forgot-title")}</h2>
        <p className="text-xs text-text-subtle mt-2">{t("auth.forgot-desc")}</p>
      </div>

      <Input type="email" placeholder="Enter your email" className="h-12 rounded-xl" />

      <div className="space-y-3">
        <Button className="w-full h-12 bg-brand text-white rounded-xl font-bold">
          {t("auth.send-reset-link")}
        </Button>
        <button
          onClick={onSwitchLogin}
          className="w-full flex items-center justify-center gap-2 text-sm text-text-subtle hover:text-brand transition-colors"
        >
          <ArrowLeft size={16} />
          {t("auth.back-to-login")}
        </button>
      </div>
    </div>
  );
}
