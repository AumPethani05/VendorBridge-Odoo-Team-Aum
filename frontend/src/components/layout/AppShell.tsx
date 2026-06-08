"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";

const AUTH_SESSION_KEY = "vendorbridge-authenticated";

function getAuthSnapshot() {
  if (typeof window === "undefined") {
    return false;
  }
  return window.localStorage.getItem(AUTH_SESSION_KEY) === "true";
}

function getServerAuthSnapshot() {
  return false;
}

function subscribeToAuthChanges(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === AUTH_SESSION_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorageChange);
  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = pathname.startsWith("/auth");
  
  // Use state for hydration check to avoid SSR mismatch
  const [isHydrated, setIsHydrated] = useState(false);
  
  const isAuthenticated = useSyncExternalStore(
    subscribeToAuthChanges,
    getAuthSnapshot,
    getServerAuthSnapshot
  );

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && !isAuthPage && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthPage, isAuthenticated, router, isHydrated]);

  // Don't render anything until hydrated to prevent flash/mismatch
  if (!isHydrated) {
    return <div className="min-h-screen bg-slate-50" />;
  }

  // Handle Auth Pages (Login/Register)
  if (isAuthPage) {
    return <main className="min-h-screen">{children}</main>;
  }

  // Handle Authenticated Layout
  if (isAuthenticated) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar aria-label="Main Navigation" />
        <main className="flex-1 pl-64 h-full overflow-y-auto">
          {children}
        </main>
      </div>
    );
  }

  // Fallback while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );
}
