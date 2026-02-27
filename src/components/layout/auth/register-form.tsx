"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Checkbox } from "@/src/components/ui/checkbox";
import { useTranslations } from "@/src/hooks/useTranslations";
import { ArrowLeft, Compass } from "lucide-react";

export default function RegisterForm({ onSwitchLogin }: { onSwitchLogin: () => void }) {
  const { t } = useTranslations();

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <Input
          placeholder={t("auth.username-placeholder")}
          className="h-12 rounded-2xl bg-white/60 border-white/50 shadow-sm px-5 focus-visible:ring-brand/40 focus:bg-white transition-all"
        />
        <Input
          type="email"
          placeholder={t("auth.email-placeholder")}
          className="h-12 rounded-2xl bg-white/60 border-white/50 shadow-sm px-5 focus-visible:ring-brand/40 focus:bg-white transition-all"
        />
        <Input
          type="password"
          placeholder={t("auth.password-placeholder")}
          className="h-12 rounded-2xl bg-white/60 border-white/50 shadow-sm px-5 focus-visible:ring-brand/40 focus:bg-white transition-all"
        />
      </div>

      <div className="flex items-center space-x-2 px-1">
        <Checkbox id="terms" className="rounded-md border-white/40 data-[state=checked]:bg-brand" />
        <label htmlFor="terms" className="text-[11px] text-text-muted leading-none">
          {t("auth.terms-prefix")}
          <button className="text-brand hover:underline mx-1 font-medium">
            {t("auth.terms-link")}
          </button>
          {t("auth.terms-suffix")}
        </label>
      </div>

      <div className="space-y-2">
        <Button className="w-full h-12 bg-brand hover:bg-brand-hover text-white rounded-2xl font-bold group relative overflow-hidden transition-all shadow-lg shadow-brand/20 active:scale-95">
          <span className="relative z-10 flex items-center justify-center gap-2">
            {t("auth.register")}
            <Compass className="w-5 h-5 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
          </span>
        </Button>
        {/* 統一對齊位置與間距 */}
        <div className="flex justify-end px-1">
          <button
            onClick={onSwitchLogin}
            className="flex items-center gap-1.5 text-[11px] text-text-muted hover:text-brand transition-colors font-medium hover:cursor-pointer py-1"
          >
            <ArrowLeft size={12} />
            {t("auth.already-have-account")}
          </button>
        </div>
      </div>
    </div>
  );
}
