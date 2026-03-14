import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  //   const cookieStore = await cookies();
  //   const token = cookieStore.get("auth-token");
  //   // 雖然 Middleware 擋過了，但 Layout 這裡可以進一步從後端獲取 UserProfile
  //   // 如果 Token 失效（被後端拒絕），一樣 redirect
  //   const user = await fetchUserProfile(token?.value).catch(() => null);
  //   if (!user) {
  //     redirect("/login");
  //   }
  //   return (
  //     <div className="workspace-grid">
  //       <DashboardSidebar user={user} />
  //       <main>{children}</main>
  //     </div>
  //   );
}
