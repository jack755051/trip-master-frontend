import AuthContainer from "@/src/components/sections/auth/auth-container";

/**
 * 登入頁面的進入點
 * 由於 Layout 已經處理了背景與容器寬度，Page 只需要負責渲染核心功能元件
 */
export default function LoginPage() {
  return (
    <div className="w-full flex justify-center items-center">
      <AuthContainer />
    </div>
  );
}
