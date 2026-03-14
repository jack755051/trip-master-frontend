"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useTranslations } from "@/src/hooks/useTranslations";
import { ArrowLeft, Send } from "lucide-react";
import { createForgotPasswordSchema } from "./auth-schemas";
import FieldError from "./field-error";
import FieldLabel from "./field-label";
import FormError from "./form-error";

type ForgotPasswordValues = z.infer<ReturnType<typeof createForgotPasswordSchema>>;

const inputClassName =
  "h-12 rounded-2xl bg-white/60 border-white/50 shadow-sm px-5 focus-visible:ring-brand/40 focus:bg-white transition-all";

export default function ForgotPassword({ onSwitchLogin }: { onSwitchLogin: () => void }) {
  const { t } = useTranslations();
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(createForgotPasswordSchema(t)),
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const {
    clearErrors,
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = handleSubmit(async () => {
    clearErrors("root");
  });
  const rootErrorMessage = errors.root?.server?.message;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="space-y-3">
        <div>
          <FieldLabel htmlFor="forgot-email" required>
            {t("auth.email-label")}
          </FieldLabel>
          <Input
            id="forgot-email"
            type="email"
            placeholder={t("auth.email-placeholder")}
            aria-invalid={!!errors.email}
            className={cn(
              inputClassName,
              errors.email && "border-red-500 focus-visible:ring-red-400",
            )}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div className="space-y-2">
        <FormError message={rootErrorMessage} />

        <Button
          type="submit"
          className="group/submit relative h-12 w-full overflow-hidden rounded-2xl bg-brand font-bold text-white shadow-lg shadow-brand/20 transition-all active:scale-95 hover:bg-brand-hover"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {t("auth.forgetPassword")}
            <Send className="h-4 w-4 transition-all duration-500 ease-in group-hover/submit:translate-x-24 group-hover/submit:opacity-0" />
          </span>
        </Button>

        {/* 統一對齊位置與間距 */}
        <div className="flex justify-end px-1">
          <button
            type="button"
            onClick={onSwitchLogin}
            className="flex items-center gap-1.5 text-[11px] text-text-muted hover:text-brand transition-colors font-medium hover:cursor-pointer py-1"
          >
            <ArrowLeft size={12} />
            {t("auth.back-to-login")}
          </button>
        </div>
      </div>
    </form>
  );
}
