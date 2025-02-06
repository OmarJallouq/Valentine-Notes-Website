"use client";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function InboxPage() {
  return (
    <ProtectedRoute>
      <h1 className="text-black top-30">Inbox Page</h1>
    </ProtectedRoute>
  );
}
