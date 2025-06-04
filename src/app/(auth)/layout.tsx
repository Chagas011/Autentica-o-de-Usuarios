import Link from "next/link";
import { IconArrowBarLeft } from "@tabler/icons-react";
import { redirect, RedirectType } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  if (isAuthenticated(cookieStore)) {
    return redirect("/", RedirectType.replace);
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex gap-2">
          <Link href="/" className="flex flex-row gap-1 p-3">
            <IconArrowBarLeft />
            Home
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
