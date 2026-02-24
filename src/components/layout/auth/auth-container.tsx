"use client";

import { useState } from "react";
import { useTranslations } from "@/src/hooks/useTranslations";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import ForgotPassword from "./forgot-password";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type AuthMode = "login" | "register" | "forgot";

export default function AuthContainer() {
  const [mode, setMode] = useState<AuthMode>("login");
  const { t } = useTranslations();

  // 定義統一的 Spring 設定，達成「回彈」感
  const springTransition = {
    type: "spring",
    stiffness: 300,
    damping: 25,
    bounce: 0.45, // 增加回彈係數
  };

  return (
    <div className="w-full max-w-md relative">
      {/* 1. 資料夾標籤區域 - 修正對齊與吃色問題 */}
      <div className="flex h-12 relative">
        {mode !== "forgot" && (
          <div className="flex items-end">
            {["login", "register"].map((tab) => {
              const isActive = mode === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setMode(tab as AuthMode)}
                  className={cn(
                    "px-10 py-3 rounded-t-2xl font-bold text-sm transition-colors duration-300 relative",
                    isActive
                      ? "bg-white/90 text-brand z-20" // 活動中：背景與面板一致
                      : "bg-white/10 text-white/50 hover:text-white/80 z-10", // 非活動：更透明，拉開對比
                  )}
                >
                  <span className="relative z-10">{t(`auth.${tab}`)}</span>

                  {/* 切換時的橘色底線回彈效果 */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white/90 rounded-t-2xl -z-10"
                      transition={springTransition}
                    />
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="activeTabLine"
                      className="absolute bottom-0 left-0 w-full h-1 bg-brand z-30"
                      transition={springTransition}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. 主要面板容器 - layout 屬性會自動處理高度動態 */}
      <motion.div
        layout
        transition={springTransition}
        className={cn(
          "bg-white/90 backdrop-blur-xl shadow-2xl border border-white/20 relative",
          mode === "forgot" ? "rounded-3xl" : "rounded-3xl rounded-tl-none",
        )}
      >
        <div className="p-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mode}
              // 欄位切換：單純的淡入淡出與微量縮放，避免過大的位移干擾高度感知
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
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
