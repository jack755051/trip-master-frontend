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
    <div className="w-full max-w-md">
      {/* 1. 核心導航：路徑切換器 (Path Switcher) */}
      {mode !== "forgot" && (
        <div className="mb-8 flex justify-center">
          {/* 增加 min-w 防止切換語系時容器過度縮放，並使用 flex w-full 讓內部均分 */}
          <div className="relative flex min-w-[240px] items-center rounded-full border border-border/60 bg-background/70 p-1 shadow-sm backdrop-blur-md">
            {["login", "register"].map((tab) => {
              const isActive = mode === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setMode(tab as AuthMode)}
                  className={cn(
                    // 關鍵點：使用 flex-1 均分空間，whitespace-nowrap 防止換行
                    "relative flex-1 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-500",
                    isActive ? "text-brand-foreground" : "text-text-main/70 hover:text-text-main",
                  )}
                >
                  {/* 使用 layout 確保文字在寬度變化時平滑移動 */}
                  <motion.span layout className="relative z-10 block text-center">
                    {t(`auth.${tab}`)}
                  </motion.span>

                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-brand shadow-[0_0_20px_rgba(var(--brand),0.25)]"
                      transition={relaxedBouncy}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. 容器設計：層疊的規劃感 */}
      <div className="relative group">
        {/* 背景裝飾：模擬規劃圖的經緯線 */}

        <motion.div
          layout
          transition={relaxedBouncy}
          className={cn(
            "relative bg-background/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl",
          )}
        >
          <div className="p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* 標題區域：強化「規劃」與「分享」的轉場 */}
                <div className="mb-8">
                  <motion.span
                    layoutId="subtitle"
                    className="text-xs tracking-[0.2em] uppercase text-brand font-bold"
                  >
                    {/* 動態渲染對應模式的副標題 */}
                    {t(`auth.${mode}-subtitle`)}
                  </motion.span>

                  <h2 className="text-3xl font-light text-text-main mt-1 tracking-tight">
                    {/* 動態渲染對應模式的主標題 */}
                    {t(`auth.${mode}-title`)}
                  </h2>
                </div>

                {/* 表單內容 */}
                <div className="relative z-10">
                  {mode === "login" && (
                    <LoginForm
                      onSwitchForgot={() => setMode("forgot")}
                      onSwitchRegister={() => setMode("register")}
                    />
                  )}
                  {mode === "register" && <RegisterForm onSwitchLogin={() => setMode("login")} />}
                  {mode === "forgot" && <ForgotPassword onSwitchLogin={() => setMode("login")} />}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
