"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import Logo from "@/src/components/common/logo";
import { useTranslations } from "@/src/hooks/useTranslations";

interface LoginFormProps {
  onSwitchRegister: () => void;
  onSwitchForgot: () => void;
}

export default function LoginForm({ onSwitchForgot }: LoginFormProps) {
  const { t } = useTranslations();

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center mb-4">
        <Logo className="h-10 w-auto mb-2" />
        <h2 className="text-xl font-bold text-text-main">{t("auth.login-title")}</h2>
      </div>

      <div className="space-y-4">
        <Input
          type="email"
          placeholder={t("auth.account-placeholder")}
          className="h-12 rounded-xl"
        />
        <div className="space-y-1">
          <Input
            type="password"
            placeholder={t("auth.password-placeholder")}
            className="h-12 rounded-xl"
          />
          <div className="text-right">
            <button
              onClick={onSwitchForgot}
              className="text-[11px] text-text-subtle hover:text-brand transition-colors font-medium hover:cursor-pointer"
            >
              {t("auth.forgot-password")}
            </button>
          </div>
        </div>
      </div>

      <Button className="w-full h-14 bg-brand hover:bg-brand/90 text-white rounded-xl font-bold text-lg group overflow-hidden">
        <span className="relative z-10">{t("auth.login")}</span>
        {/* 紙飛機噴射動畫 */}
        <svg
          className="ml-2 w-5 h-5 transition-transform duration-500 group-hover:translate-x-24 group-hover:-translate-y-24"
          viewBox="0 0 24 24"
        >
          <path d="M22 2L2 10L10 14L22 2Z" fill="currentColor" />
        </svg>
      </Button>
    </div>
  );
}
