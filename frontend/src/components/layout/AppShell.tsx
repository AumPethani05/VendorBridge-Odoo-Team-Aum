"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";

const AUTH_SESSION_KEY = "vendorbridge-authenticated";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = pathname.startsWith("/auth");
  const isAuthenticated =
    typeof window !== "undefined" &&
    window.localStorage.getItem(AUTH_SESSION_KEY) === "true";

  useEffect(() => {
    if (!isAuthPage && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthPage, isAuthenticated, pathname, router]);

  if (isAuthPage) {
    return <main className="min-h-screen">{children}</main>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Sidebar />
      <main className="pl-64 min-h-screen">{children}</main>
    </>
  );
}
