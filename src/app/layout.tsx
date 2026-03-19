import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { LOCALE_COOKIE_KEY, resolveLocale } from "@/src/services/i18n-service";
import { I18nProvider } from "@/src/components/providers/i18n-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trip Master",
  description: "Plan your next journey with ease.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 1. 在這裡讀取語系
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get(LOCALE_COOKIE_KEY)?.value);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        {/* 2. 在這裡包裹全域 Provider */}
        <I18nProvider initialLocale={locale}>{children}</I18nProvider>
      </body>
    </html>
  );
}
