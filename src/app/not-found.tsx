"use client"; // 必須：為了使用翻譯 Hook

import Link from "next/link";
import Logo from "@/src/components/common/logo";
import { Button } from "@/src/components/ui/button";
import { MapPinOff } from "lucide-react";
import { useTranslations } from "@/src/hooks/useTranslations";

export default function NotFound() {
  const { t } = useTranslations();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-8">
        <Logo className="h-12 w-auto" />
      </div>

      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted/30">
        <MapPinOff className="h-12 w-12 text-muted-foreground" />
      </div>

      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
        {t("status.404-title")}
      </h1>
      <p className="mb-8 max-w-[500px] text-muted-foreground">{t("status.404-description")}</p>

      <div className="flex gap-4">
        <Button asChild variant="default">
          <Link href="/">{t("status.404-back")}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/explore">{t("status.404-explore")}</Link>
        </Button>
      </div>

      <div className="absolute bottom-8 text-xs text-muted-foreground/50">404 - Page Not Found</div>
    </div>
  );
}
