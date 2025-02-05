import Link from "next/link";

export default function Landing() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-700 to-black text-white text-center px-4">
      <h1 className="text-5xl font-extrabold tracking-tight">
        SEND ANNONYMOUS VALENTINES!
      </h1>
      <p className="mt-4 text-lg max-w-lg">
        Write heartfelt (or hilarious) messages to your classmates. They'll be
        delivered on Valentine's Day!
      </p>
      <div className="mt-6 flex gap-4">
        <Link
          href="/send-message"
          className="px-6 py-3 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-600 transition"
        >
          Send a Message
        </Link>
        <Link
          href="/login"
          className="px-6 py-3 border border-white rounded-lg shadow-lg hover:bg-white hover:text-black transition"
        >
          Sign In
        </Link>
      </div>
    </main>
  );
}
