"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname(); // ✅ Get current page path
    const router = useRouter(); // ✅ For redirects

    useEffect(() => {
        // ✅ Check token on mount & route change
        setIsLoggedIn(!!localStorage.getItem("token"));
    }, [pathname]); // ✅ Runs every time the route changes

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        router.push("/send-message");
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
