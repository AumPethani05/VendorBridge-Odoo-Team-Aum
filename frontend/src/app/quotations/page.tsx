"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function QuotationsIndex() {
  const router = useRouter();
  useEffect(() => {
    router.push("/quotations/submit");
  }, [router]);
  return null;
}
