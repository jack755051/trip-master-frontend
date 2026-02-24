"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import Logo from "@/src/components/common/logo";
import { useTranslations } from "@/src/hooks/useTranslations";
import { Checkbox } from "@/src/components/ui/checkbox"; // 建議 add checkbox

interface RegisterFormProps {
  onSwitchLogin: () => void;
}

export default function RegisterForm({ onSwitchLogin }: RegisterFormProps) {
  const { t } = useTranslations();

  return (
    <div className="space-y-6">
      {/* 頂部標題 */}
      <div className="flex flex-col items-center mb-2">
        <Logo className="h-10 w-auto mb-2" />
        <h2 className="text-xl font-bold text-text-main">{t("auth.register")}</h2>
        <p className="text-[10px] text-text-subtle uppercase tracking-tighter">
          Start your journey today
        </p>
      </div>

      {/* 註冊欄位組 */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-3">
          <Input
            type="text"
            placeholder={t("auth.username-placeholder")}
            className="h-11 rounded-xl bg-background/50"
          />
          <Input
            type="email"
            placeholder={t("auth.email-placeholder")}
            className="h-11 rounded-xl bg-background/50"
          />
        </div>
        <Input
          type="password"
          placeholder={t("auth.password-placeholder")}
          className="h-11 rounded-xl bg-background/50"
        />
        <Input
          type="password"
          placeholder={t("auth.confirm-password-placeholder")}
          className="h-11 rounded-xl bg-background/50"
        />
      </div>

      {/* 條款勾選：增加親切感 */}
      <div className="flex items-start space-x-2 px-1">
        <Checkbox id="terms" className="mt-1 border-brand/50 data-[state=checked]:bg-brand" />
        <label htmlFor="terms" className="text-[11px] text-text-subtle leading-tight">
          {t("auth.terms-prefix")}
          <button className="text-brand hover:underline mx-1">{t("auth.terms-link")}</button>
          {t("auth.terms-suffix")}
        </label>
      </div>

      {/* 註冊按鈕：紙飛機準備起飛 */}
      <div className="pt-2">
        <Button className="w-full h-14 bg-brand hover:bg-brand/90 text-white rounded-xl font-bold text-lg group overflow-hidden relative">
          <span className="relative z-10">{t("auth.register")}</span>

          {/* 註冊專屬動畫：飛機繞一圈後飛出 */}
          <svg
            className="absolute right-4 w-5 h-5 transition-all duration-700 group-hover:-translate-y-16 group-hover:translate-x-16"
            viewBox="0 0 24 24"
          >
            <path d="M22 2L2 10L10 14L22 2Z" fill="currentColor" />
          </svg>
        </Button>
      </div>

      {/* 返回登入 */}
      <div className="text-center">
        <button
          onClick={onSwitchLogin}
          className="text-xs text-text-subtle hover:text-brand transition-colors font-medium "
        >
          {t("auth.already-have-account")}
        </button>
      </div>
    </div>
  );
}
