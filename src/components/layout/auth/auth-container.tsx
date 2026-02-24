"use client";

import { useState } from "react";
import { useTranslations } from "@/src/hooks/useTranslations";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import ForgotPassword from "./forgot-password";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type AuthMode = "login" | "register" | "forgot";

export default function AuthContainer() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [prevMode, setPrevMode] = useState<AuthMode>("login");
  const { t } = useTranslations();
  const shouldReduceMotion = useReducedMotion();

  const switchMode = (nextMode: AuthMode) => {
    if (nextMode === mode) return;
    setPrevMode(mode);
    setMode(nextMode);
  };

  const isTabSwitch = prevMode !== "forgot" && mode !== "forgot";
  const tabDirection =
    prevMode === "login" && mode === "register"
      ? 1
      : prevMode === "register" && mode === "login"
        ? -1
        : 0;
  const forgotDirection = mode === "forgot" ? 1 : prevMode === "forgot" ? -1 : 0;
  const xOffset = shouldReduceMotion ? 0 : isTabSwitch ? tabDirection * 28 : 0;
  const yOffset = shouldReduceMotion ? 0 : !isTabSwitch ? forgotDirection * 20 : 0;

  return (
    <div className="w-full max-w-md relative">
      {/* 1. 資料夾標籤區域 */}
      <div className="flex items-end h-12">
        {mode !== "forgot" && (
          <div className="flex">
            {["login", "register"].map((tab) => {
              const isActive = mode === tab;
              return (
                <button
                  key={tab}
                  onClick={() => switchMode(tab as AuthMode)}
                  className={cn(
                    "px-10 py-3 rounded-t-2xl font-bold text-sm transition-all duration-300 relative group",
                    isActive
                      ? "bg-white/90 text-brand backdrop-blur-md z-20"
                      : "bg-white/10 text-white/70 hover:bg-white/20 backdrop-blur-sm border border-white/10 border-b-0 z-10",
                  )}
                >
                  <span className="relative z-10">{t(`auth.${tab}`)}</span>

                  {/* 使用 layoutId 實現滑動底線 */}
                  {isActive && (
                    <motion.span
                      layoutId="activeTabLine"
                      className="absolute bottom-0 left-0 w-full h-1 bg-brand z-30"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
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
        transition={{ layout: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
        className={cn(
          "bg-white/90 backdrop-blur-xl shadow-2xl border border-white/20 overflow-hidden relative",
          mode === "forgot" ? "rounded-3xl" : "rounded-3xl rounded-tl-none",
        )}
      >
        <div className="p-10 min-h-[420px] flex flex-col justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mode}
              initial={{
                opacity: 0,
                x: xOffset,
                y: yOffset,
                scale: shouldReduceMotion ? 1 : 0.985,
                filter: shouldReduceMotion ? "blur(0px)" : "blur(6px)",
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                x: xOffset * -0.7,
                y: yOffset * -0.7,
                scale: shouldReduceMotion ? 1 : 0.992,
                filter: shouldReduceMotion ? "blur(0px)" : "blur(4px)",
              }}
              transition={{
                duration: shouldReduceMotion ? 0.12 : 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {mode === "login" && (
                <LoginForm
                  onSwitchRegister={() => switchMode("register")}
                  onSwitchForgot={() => switchMode("forgot")}
                />
              )}
              {mode === "register" && <RegisterForm onSwitchLogin={() => switchMode("login")} />}
              {mode === "forgot" && <ForgotPassword onSwitchLogin={() => switchMode("login")} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
