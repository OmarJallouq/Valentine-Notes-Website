"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function SendMessagePage() {
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [students, setStudents] = useState([]);
  const backendURL = process.env.NEXT_BACKEND_URL || "http://localhost:4000";

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${backendURL}/api/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error(`Invalid response: ${JSON.stringify(data)}`);
        }

        setStudents(data);
      } catch (error) {
        console.log("Failed to fetch students:", error);
        setStudents([]);
      }
    };

    fetchStudents();
  }, []);

  const handleSendMessage = async () => {
    if (!message || !recipient) {
      toast.error("Message and recipient are required!");
      return;
    }
    const body = JSON.stringify({
      receiverId: recipient,
      content: message,
      anonymous,
    });
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendURL}/api/messages/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiverId: recipient,
          content: message,
          anonymous,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send message");

      toast.success("Message sent successfully!");
      setMessage("");
      setAnonymous(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <ProtectedRoute>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-black text-white p-6">
        <div className="bg-black/30 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4">
            Send a Message 💌
          </h1>

          {/* Recipient Selection */}
          <select
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white"
          >
            <option value="">Select a recipient</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>

          {/* Message Input */}
          <Textarea
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="mt-4"
          />

          {/* Anonymous Checkbox */}
          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={() => setAnonymous(!anonymous)}
              className="w-5 h-5"
            />
            <label>Send anonymously</label>
          </div>

          {/* Send Button */}
          <Button onClick={handleSendMessage} className="w-full mt-4">
            Send Message
          </Button>
        </div>
      </main>
    </ProtectedRoute>
  );
}
