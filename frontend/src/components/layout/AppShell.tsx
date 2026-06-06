"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";

const AUTH_SESSION_KEY = "vendorbridge-authenticated";

function subscribeToAuthChanges(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function getAuthSnapshot() {
  return window.localStorage.getItem(AUTH_SESSION_KEY) === "true";
}

function getServerAuthSnapshot() {
  return false;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = pathname.startsWith("/auth");
  const isAuthenticated = useSyncExternalStore(
    subscribeToAuthChanges,
    getAuthSnapshot,
    getServerAuthSnapshot
  );

  useEffect(() => {
    if (!isAuthPage && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthPage, isAuthenticated, router]);

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
