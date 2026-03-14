"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useTranslations } from "@/src/hooks/useTranslations";
import { ArrowLeft, Plane } from "lucide-react";
import { createLoginSchema } from "./auth-schemas";
import FieldError from "./field-error";
import FieldLabel from "./field-label";
import FormError from "./form-error";

type LoginFormProps = {
  onSwitchForgot: () => void;
  onSwitchRegister: () => void;
};

type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;

const inputClassName =
  "h-12 rounded-2xl bg-white/60 border-white/50 shadow-sm px-5 focus-visible:ring-brand/40 focus:bg-white transition-all";

export default function LoginForm({ onSwitchForgot, onSwitchRegister }: LoginFormProps) {
  const { t } = useTranslations();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(createLoginSchema(t)),
    defaultValues: {
      account: "",
      password: "",
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
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="space-y-3">
        <div>
          <FieldLabel htmlFor="login-account" required>
            {t("auth.account-label")}
          </FieldLabel>
          <Input
            id="login-account"
            type="text"
            placeholder={t("auth.account-placeholder")}
            aria-invalid={!!errors.account}
            className={cn(
              inputClassName,
              errors.account && "border-red-500 focus-visible:ring-red-400",
            )}
            {...register("account")}
          />
          <FieldError message={errors.account?.message} />
        </div>

        <div className="space-y-2">
          <div>
            <FieldLabel htmlFor="login-password" required>
              {t("auth.password-label")}
            </FieldLabel>
            <Input
              id="login-password"
              type="password"
              placeholder={t("auth.password-placeholder")}
              aria-invalid={!!errors.password}
              className={cn(
                inputClassName,
                errors.password && "border-red-500 focus-visible:ring-red-400",
              )}
              {...register("password")}
            />
            <FieldError message={errors.password?.message} />
          </div>

          {/* 統一對齊位置與間距 */}
          <div className="flex justify-end px-1">
            <button
              type="button"
              onClick={onSwitchForgot}
              className="flex items-center gap-1.5 text-[11px] text-text-muted hover:text-brand transition-colors font-medium hover:cursor-pointer py-1"
            >
              <ArrowLeft size={12} />
              {t("auth.forgot-password")}
            </button>
          </div>
        </div>
      </div>

      <FormError message={rootErrorMessage} />

      <Button
        type="submit"
        className="group/submit relative h-12 w-full overflow-hidden rounded-2xl bg-brand font-bold text-white shadow-lg shadow-brand/20 transition-all active:scale-95 hover:bg-brand-hover"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {t("auth.login")}
          <Plane className="h-5 w-5 rotate-45 transition-all duration-500 ease-in group-hover/submit:translate-x-24 group-hover/submit:opacity-0" />
        </span>
      </Button>
    </form>
  );
}
