"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RFQsIndex() {
  const router = useRouter();
  useEffect(() => {
    router.push("/rfqs/create");
  }, [router]);
  return null;
}
