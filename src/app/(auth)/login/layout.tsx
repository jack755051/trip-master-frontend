import type { ReactNode } from "react";
import LoginLayoutScene from "@/src/components/layout/auth/login-layout-scene";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <LoginLayoutScene>{children}</LoginLayoutScene>;
}
