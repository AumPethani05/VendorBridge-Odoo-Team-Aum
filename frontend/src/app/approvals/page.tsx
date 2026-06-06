"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ApprovalsIndex() {
  const router = useRouter();
  useEffect(() => {
    router.push("/approvals/1");
  }, [router]);
  return null;
}
