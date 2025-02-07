"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function InboxPage() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [countdown, setCountdown] = useState("");
  const backendURL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_BACKEND_URL
      : "http://localhost:4000";

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${backendURL}/api/messages/inbox`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Invalid response");

      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  const updateCountdown = () => {
    const now = new Date();
    const valentinesDay = new Date(now.getFullYear(), 1, 14, 0, 0, 0);

    if (now > valentinesDay) {
      setCountdown(null);
    } else {
      const diff = valentinesDay - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown(`${hours}h ${minutes}m ${seconds}s`);
    }
  };

  useEffect(() => {
    fetchMessages();
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-black text-white p-6">
        <h1 className="text-3xl font-bold mb-6">💌 Your Inbox</h1>

        {countdown ? (
          <div className="text-xl mb-4">
            Messages will be revealed in: {countdown}⏳
          </div>
        ) : (
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-gray-900 border border-gray-700 shadow-md transform transition duration-300 hover:scale-105 hover:shadow-purple-500/50"
                >
                  {" "}
                  <p className="text-lg">{msg.content}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    From: {msg.anonymous ? "Anonymous" : msg.senderName}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">No messages yet!</p>
            )}
          </div>
        )}
        <Button onClick={fetchMessages} className="mt-6">
          Refresh Messages
        </Button>
      </div>
    </ProtectedRoute>
  );
}
