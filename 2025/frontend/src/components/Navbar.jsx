import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 bg-black/50 backdrop-blur-md text-white flex justify-between items-center fixed w-full top-0 shadow-lg">
      <h1 className="text-xl font-bold tracking-wide">💌 Valentine's App</h1>
      <div className="flex gap-6">
        <Link href="/" className="hover:text-pink-400 transition">
          Home
        </Link>
        <Link href="/login" className="hover:text-pink-400 transition">
          Login
        </Link>
        <Link href="/send-message" className="hover:text-pink-400 transition">
          Send a Message
        </Link>
        <Link href="/inbox" className="hover:text-pink-400 transition">
          Inbox
        </Link>
      </div>
    </nav>
  );
}
