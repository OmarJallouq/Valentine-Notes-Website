"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const { login } = useAuth();

  const router = useRouter();

  const backendURL =
    process.env.NODE_ENV == "production"
      ? process.env.NEXT_BACKEND_URL
      : "http://localhost:4000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send request to backend, to /signup if signing up, to /login if logging in
    try {
      const endpoint = isSignup ? "signup" : "login";
      const res = await fetch(`${backendURL}/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.hasAccount === false) {
          setIsSignup(true);
          setEmailValid(false);
          setPassword("");
          toast.warn("No account created. Sign up first!");
          return;
        }
        throw new Error(data.message || "Something went wrong!");
      }
      toast.success(isSignup ? "Account created!" : "Logged in!");

      login(data.token);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const checkEmail = async () => {
    if (!email) {
      alert("You must enter an email");
      return;
    }

    try {
      const res = await fetch(`${backendURL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid Email!");

      if (data.hasAccount) {
        setIsSignup(false);
        alert("This email already has an account!");
        return;
      }

      setEmailValid(true);
      alert("Email is valid! You can now enter your password.");
    } catch (err) {
      alert(err.message);
      setEmailValid(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailValid(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      <div className="bg-black 30 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          {isSignup ? "Sign Up" : "Login"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="School Email"
            value={email}
            onChange={handleEmailChange}
            required
          />

          {(!isSignup || (isSignup && emailValid)) && (
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}

          <Button
            type={!isSignup ? "submit" : !emailValid ? "button" : "submit"}
            onClick={isSignup && !emailValid ? checkEmail : undefined}
            className="w-full"
          >
            {isSignup ? (emailValid ? "Sign Up" : "Check Email") : "Login"}
          </Button>
        </form>

        <p className="text-center mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="text-pink-400 hover:underline"
            onClick={() => {
              setIsSignup(!isSignup);
              setEmailValid(false);
              setPassword("");
            }}
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </main>
  );
}
