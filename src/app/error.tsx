"use client";

import { useEffect } from "react";
import Link from "next/link"; // 修正：記得引入 Link
import Logo from "@/src/components/common/logo";
import { Button } from "@/src/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useTranslations } from "@/src/hooks/useTranslations";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslations();

  useEffect(() => {
    // 這裡可以整合 Sentry
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-8">
        <Logo className="h-12 w-auto" />
      </div>

      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20">
        <AlertTriangle className="h-12 w-12 text-red-500" />
      </div>

      <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
        {t("status.500-title")}
      </h2>
      <p className="mb-8 max-w-[500px] text-muted-foreground">{t("status.500-description")}</p>

      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="default">
          {t("status.500-retry")}
        </Button>
        <Button asChild variant="outline">
          <Link href="/">{t("status.500-safety")}</Link>
        </Button>
      </div>

      {error.digest && (
        <p className="mt-8 font-mono text-xs text-muted-foreground/50">
          {t("status.500-digest").replace("{digest}", error.digest)}
        </p>
      )}
    </div>
  );
}
