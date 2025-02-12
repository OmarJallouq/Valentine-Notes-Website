import { Barriecito } from "next/font/google";
import "./styles/globals.css";
import Navbar from "../components/Navbar"
import { Bounce, ToastContainer } from "react-toastify";
import { AuthProvider } from "@/context/AuthContext";

const barriecito = Barriecito({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-barriecito",
});

export const metadata = {
  title: "Valentine's App",
  description: "Send and receive anonymous messages!",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${barriecito.variable} relative antialiased`}
      >
        <AuthProvider>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
          <Navbar />
          {children}
          <footer className="w-full text-center py-4 fixed bottom-0 text-gray-400 text-sm">
            Made with Love, Omar and Velina
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
