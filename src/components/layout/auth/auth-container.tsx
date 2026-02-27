"use client";

import { useState } from "react";
import { useTranslations } from "@/src/hooks/useTranslations";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import ForgotPassword from "./forgot-password";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { relaxedBouncy } from "@/src/constants/auth-constants";

type AuthMode = "login" | "register" | "forgot";

export default function AuthContainer() {
  const [mode, setMode] = useState<AuthMode>("login");
  const { t } = useTranslations();

  return (
    <div className="w-full max-w-md relative">
      {/* 1. 資料夾標籤區域 */}
      <div className="flex h-12 relative items-end">
        {mode !== "forgot" && (
          <div className="flex">
            {["login", "register"].map((tab) => {
              const isActive = mode === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setMode(tab as AuthMode)}
                  className={cn(
                    "px-10 py-3 rounded-t-2xl font-bold text-sm transition-colors duration-500 relative",
                    isActive
                      ? "bg-white/90 text-brand z-20"
                      : "bg-white/10 text-white/50 hover:text-white/80 z-10",
                  )}
                >
                  <span className="relative z-10">{t(`auth.${tab}`)}</span>

                  {/* 標籤切換時的優雅滑動 */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-white/90 rounded-t-2xl -z-10"
                      transition={relaxedBouncy}
                    />
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="activeTabLine"
                      className="absolute bottom-0 left-0 w-full h-1 bg-brand z-30"
                      transition={relaxedBouncy}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. 主要面板容器 */}
      <motion.div
        layout
        transition={relaxedBouncy}
        className={cn(
          "bg-white/40 backdrop-blur-2xl shadow-2xl border border-white/30 relative overflow-hidden", // 降低背景 A 值，提高模糊
          mode === "forgot" ? "rounded-3xl" : "rounded-3xl rounded-tl-none",
        )}
      >
        <div className="p-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mode}
              // 內容切換：配合外層放慢的速度，淡入淡出也要稍作延展
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              {mode === "login" && (
                <LoginForm
                  onSwitchRegister={() => setMode("register")}
                  onSwitchForgot={() => setMode("forgot")}
                />
              )}
              {mode === "register" && <RegisterForm onSwitchLogin={() => setMode("login")} />}
              {mode === "forgot" && <ForgotPassword onSwitchLogin={() => setMode("login")} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
