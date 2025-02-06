"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InboxPage() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("You must be logged in to access this page!");
      router.push("/login");
    }
  }, []);

  return <h1 className="text-white">Inbox Page</h1>;
}
