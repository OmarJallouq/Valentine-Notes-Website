"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="p-4 bg-black/50 backdrop-blur-md text-white flex justify-between items-center fixed w-full top-0 shadow-lg">
      <h1 className="text-xl font-bold tracking-wide">💌 BAI Valentine's</h1>
      <div className="flex gap-6">
        <Link href="/" className="hover:text-pink-400 transition">
          Home
        </Link>
        {isLoggedIn ? (
          <>
            <Link
              href="/send-message"
              className="hover:text-pink-400 transition"
            >
              Send a Message
            </Link>
            <Link href="/inbox" className="hover:text-pink-400 transition">
              Inbox
            </Link>
            <button onClick={logout} className="text-red-400 hover:underline">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="hover:text-pink-400 transition">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
