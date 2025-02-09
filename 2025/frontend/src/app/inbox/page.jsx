"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InboxPage() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [countdown, setCountdown] = useState("");
  const backendURL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BACKEND_URL
      : "http://localhost:4000";

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${backendURL}/api/messages/inbox`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  const updateCountdown = () => {
    const now = new Date();
    const valentinesDay = new Date(now.getFullYear(), 0, 14, 0, 0, 0);

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
      <div className="min-h-screen flex flex-col items-center justify-center text-white p-6">
        <div className="w-full max-w-4xl text-center">
          <h1 className="text-3xl font-bold mb-2">💌 Your Inbox</h1>

          {countdown && (
            <div className="text-xl mb-4">
              Messages will be revealed in: {countdown}⏳
            </div>
          )}
        </div>
        {!countdown && (
          <>
            <Button onClick={fetchMessages} className="mb-4">
              Refresh Messages
            </Button>

            <div className="w-full max-w-4xl h-[70vh] min-h-[400px] overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {messages.length > 0 ? (
                  messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 1,
                        delay: index * 0.1,
                      }}
                      className="p-4 rounded-lg bg-gray-900 border border-gray-700 shadow-md transform transition duration-300 hover:scale-105 hover:shadow-purple-500/50"
                    >
                      {" "}
                      <p className="text-lg">{msg.content}</p>
                      <p className="text-sm text-gray-400 mt-2">
                        From: {msg.anonymous ? "Anonymous" : msg.senderName}
                      </p>
                    </motion.div>
                  ))
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-center col-span-full"
                  >
                    No messages yet!
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}
