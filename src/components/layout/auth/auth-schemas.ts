import { z } from "zod";

type TranslateFn = (path: string, variables?: Record<string, string | number>) => string;

export const createLoginSchema = (t: TranslateFn) =>
  z.object({
    account: z.string().trim().min(1, t("auth.error-account-required")),
    password: z
      .string()
      .min(1, t("auth.error-password-required"))
      .min(8, t("auth.error-password-min")),
  });

export const createRegisterSchema = (t: TranslateFn) =>
  z.object({
    username: z.string().trim().min(1, t("auth.error-username-required")),
    email: z
      .string()
      .trim()
      .min(1, t("auth.error-email-required"))
      .email(t("auth.error-email-invalid")),
    password: z
      .string()
      .min(1, t("auth.error-password-required"))
      .min(8, t("auth.error-password-min")),
    terms: z.boolean().refine((value) => value, t("auth.error-terms-required")),
  });

export const createForgotPasswordSchema = (t: TranslateFn) =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, t("auth.error-email-required"))
      .email(t("auth.error-email-invalid")),
  });
