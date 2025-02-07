"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname(); // ✅ Get current page path
    const router = useRouter(); // ✅ For redirects

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!!token) {
            login(token);
        }
        setIsLoggedIn(!!token);
        setLoading(false);
    }, [])

    useEffect(() => {
        // ✅ Check token on mount & route change
        setIsLoggedIn(!!localStorage.getItem("token"));
    }, [pathname]); // ✅ Runs every time the route changes

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);

        if (pathname === '/inbox') router.push('/inbox');
        else if (pathname === '/') router.push('/');
        else router.push("/send-message");
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/login");
    };

    // if (loading) {
    //     return <div className="text-white text-center">Loading...</div>;
    // }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
