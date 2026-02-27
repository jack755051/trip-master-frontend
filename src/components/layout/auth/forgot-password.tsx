"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useTranslations } from "@/src/hooks/useTranslations";
import { ArrowLeft, Send } from "lucide-react";

export default function ForgotPassword({ onSwitchLogin }: { onSwitchLogin: () => void }) {
  const { t } = useTranslations();

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Input
          type="email"
          placeholder={t("auth.account-placeholder")}
          className="h-12 rounded-2xl bg-white/60 border-white/50 shadow-sm px-5 focus-visible:ring-brand/40 focus:bg-white transition-all"
        />
      </div>

      <div className="space-y-2">
        <Button className="w-full h-12 bg-brand hover:bg-brand-hover text-white rounded-2xl font-bold group relative overflow-hidden transition-all shadow-lg shadow-brand/20 active:scale-95">
          <span className="relative z-10 flex items-center justify-center gap-2">
            {t("auth.forgetPassword")}
            <Send className="w-4 h-4 transition-all duration-500 ease-in group-hover:translate-x-24 group-hover:opacity-0" />
          </span>
        </Button>

        {/* 統一對齊位置與間距 */}
        <div className="flex justify-end px-1">
          <button
            onClick={onSwitchLogin}
            className="flex items-center gap-1.5 text-[11px] text-text-muted hover:text-brand transition-colors font-medium hover:cursor-pointer py-1"
          >
            <ArrowLeft size={12} />
            {t("auth.back-to-login")}
          </button>
        </div>
      </div>
    </div>
  );
}
