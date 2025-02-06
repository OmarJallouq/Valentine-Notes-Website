"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (isLoggedIn === null) return; // ✅ Wait for auth state to be determined

    if (!isLoggedIn) {
      router.push("/login");
    }

    setCheckingAuth(false);
  }, [isLoggedIn, router]);

  if (isLoggedIn === null || checkingAuth) {
    return <div className="text-white text-center">Loading...</div>; // ✅ Prevents incorrect redirects
  }

  return children;
}
