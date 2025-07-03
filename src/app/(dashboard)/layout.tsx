import { authUser } from "@/lib/auth";
import { redirect, RedirectType } from "next/navigation";
import { cookies } from "next/headers";
import { AuthProvider } from "@/contexts/AuthContext";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const user = await authUser(cookieStore);

  if (!user) {
    return redirect("/login", RedirectType.replace);
  }

  return (
    <AuthProvider user={user}>
      <div className="min-h-screen grid place-items-center p-4">{children}</div>
    </AuthProvider>
  );
}
