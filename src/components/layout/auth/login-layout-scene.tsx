"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import LocaleToggle from "@/src/components/common/locale-toggle";
import LoginLayoutBrandSection from "@/src/components/layout/auth/login-layout-brand-section";

export default function LoginLayoutScene({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.img
          src="/images/login-landscape-04.jpg"
          className="h-full w-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        />
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-r from-background/80 via-background/20 to-transparent" />

      <div className="absolute right-4 top-4 z-30 sm:right-6 sm:top-6">
        <LocaleToggle />
      </div>

      <main className="relative z-20 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_450px] items-center gap-12">
        <LoginLayoutBrandSection />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: [0, -15, 0],
            opacity: 1,
          }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.8 },
          }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
