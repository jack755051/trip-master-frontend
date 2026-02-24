"use client";

import { useState } from "react";
import { useTranslations } from "@/src/hooks/useTranslations";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import ForgotPassword from "./forgot-password";
import { cn } from "@/lib/utils";

type AuthMode = "login" | "register" | "forgot";

export default function AuthContainer() {
  const [mode, setMode] = useState<AuthMode>("login");
  const { t } = useTranslations();

  return (
    <div className="w-full max-w-md relative animate-in fade-in zoom-in duration-500">
      {/* 1. 資料夾標籤區域：只有登入與註冊時顯示 */}
      {mode !== "forgot" && (
        <div className="flex ml-4">
          {["login", "register"].map((tab) => (
            <button
              key={tab}
              onClick={() => setMode(tab as AuthMode)}
              className={cn(
                "px-8 py-3 rounded-t-2xl font-bold text-sm transition-all duration-300 relative",
                mode === tab
                  ? "bg-white/90 text-brand backdrop-blur-md"
                  : "bg-white/10 text-white/60 hover:bg-white/20",
              )}
            >
              {t(`auth.${tab}`)}
              {mode === tab && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-brand animate-in slide-in-from-left" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* 2. 主要面板容器 */}
      <div
        className={cn(
          "bg-white/90 backdrop-blur-xl p-10 shadow-2xl border border-white/20 transition-all duration-500",
          mode === "forgot" ? "rounded-3xl" : "rounded-3xl rounded-tl-none",
        )}
      >
        <div className="min-h-[350px] flex flex-col justify-center">
          {mode === "login" && (
            <LoginForm
              onSwitchRegister={() => setMode("register")}
              onSwitchForgot={() => setMode("forgot")}
            />
          )}
          {mode === "register" && <RegisterForm onSwitchLogin={() => setMode("login")} />}
          {mode === "forgot" && <ForgotPassword onSwitchLogin={() => setMode("login")} />}
        </div>
      </div>
    </div>
  );
}
