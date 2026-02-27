"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Checkbox } from "@/src/components/ui/checkbox";
import { useTranslations } from "@/src/hooks/useTranslations";
import { ArrowLeft, Compass } from "lucide-react";
import { createRegisterSchema } from "./auth-schemas";
import FieldError from "./field-error";
import FieldLabel from "./field-label";
import FormError from "./form-error";

type RegisterFormValues = z.infer<ReturnType<typeof createRegisterSchema>>;

const inputClassName =
  "h-12 rounded-2xl bg-white/60 border-white/50 shadow-sm px-5 focus-visible:ring-brand/40 focus:bg-white transition-all";

export default function RegisterForm({ onSwitchLogin }: { onSwitchLogin: () => void }) {
  const { t } = useTranslations();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(createRegisterSchema(t)),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      terms: false,
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const {
    clearErrors,
    control,
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
          <FieldLabel htmlFor="register-username" required>
            {t("auth.username-label")}
          </FieldLabel>
          <Input
            id="register-username"
            placeholder={t("auth.username-placeholder")}
            aria-invalid={!!errors.username}
            className={cn(
              inputClassName,
              errors.username && "border-red-500 focus-visible:ring-red-400",
            )}
            {...register("username")}
          />
          <FieldError message={errors.username?.message} />
        </div>

        <div>
          <FieldLabel htmlFor="register-email" required>
            {t("auth.email-label")}
          </FieldLabel>
          <Input
            id="register-email"
            type="email"
            placeholder={t("auth.email-placeholder")}
            aria-invalid={!!errors.email}
            className={cn(inputClassName, errors.email && "border-red-500 focus-visible:ring-red-400")}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>

        <div>
          <FieldLabel htmlFor="register-password" required>
            {t("auth.password-label")}
          </FieldLabel>
          <Input
            id="register-password"
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
      </div>

      <div>
        <FieldLabel htmlFor="terms" required>
          {t("auth.terms-label")}
        </FieldLabel>
        <div className="flex items-center space-x-2 px-1">
          <Controller
            control={control}
            name="terms"
            render={({ field }) => (
              <Checkbox
                id="terms"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
                onBlur={field.onBlur}
                aria-invalid={!!errors.terms}
                className={cn(
                  "rounded-md border-white/40 data-[state=checked]:bg-brand",
                  errors.terms && "border-red-500",
                )}
              />
            )}
          />
          <label htmlFor="terms" className="text-[11px] text-text-muted leading-none">
            {t("auth.terms-prefix")}
            <button type="button" className="text-brand hover:underline mx-1 font-medium">
              {t("auth.terms-link")}
            </button>
            {t("auth.terms-suffix")}
          </label>
        </div>
        <FieldError message={errors.terms?.message} />
      </div>

      <div className="space-y-2">
        <FormError message={rootErrorMessage} />

        <Button
          type="submit"
          className="group/submit relative h-12 w-full overflow-hidden rounded-2xl bg-brand font-bold text-white shadow-lg shadow-brand/20 transition-all active:scale-95 hover:bg-brand-hover"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {t("auth.register")}
            <Compass className="h-5 w-5 transition-transform duration-700 ease-in-out group-hover/submit:rotate-[360deg]" />
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
            {t("auth.already-have-account")}
          </button>
        </div>
      </div>
    </form>
  );
}
