"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Landing() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  });

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-white text-center px-4">
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="preload"
            initial={{ position: 3, scale: 1, opacity: 1 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black"
          >
            <img
              src="/LoadingImg.png"
              alt="Loading Image"
              className="w-60 h-60 object-contain"
            />
          </motion.div>
        ) : (
          <>
            <section className="h-screen flex flex-col items-center justify-center text-center p-6">
              <div className="top-0 left-0 w-full flex items-center justify-center">
                <img
                  src="/CupidInTheAir.png"
                  alt="Cupid Text Image"
                  className="w-80 h-80 object-contain"
                />
              </div>
              <a href="#next-section">
                <Button className="mt-3 px-6 py-3 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-600">
                  Scroll Down 👇
                </Button>
              </a>
            </section>

            <section
              id="next-section"
              className="h-screen flex flex-col items-center justify-center text-center p-6"
            >
              <h1 className="text-5xl font-extrabold tracking-tight">
                SEND ANNONYMOUS VALENTINES!
              </h1>
              <p className="mt-4 text-lg max-w-lg">
                Write heartfelt (or hilarious) messages to your classmates.
                They'll be delivered on Valentine's Day!
              </p>
              <div className="mt-6 flex gap-4">
                <Link
                  href="/send-message"
                  className="px-6 py-3 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-600 transition"
                >
                  Send a Message
                </Link>
              </div>
            </section>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
