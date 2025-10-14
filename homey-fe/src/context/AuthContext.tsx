import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import type { User, AuthContextType } from "../types/auth";
import type { TAny } from "../types/common";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const fetchUser = async () => {
        try {
            const res = await api.get<User>("/auth/me");
            setUser(res.data);
        } catch {
            setUser(null);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            fetchUser();
        } else {
            console.warn("Không có token — bỏ qua auth để hiển thị trang");
        }
    }, []);

<<<<<<< HEAD
    const login: TAny = async (email: string, password: string) => {
=======

    const signin = async (email: string, password: string) => {
>>>>>>> nguyenthien
        const res = await api.post<{ token: string; user: User }>("/auth/signin", {
            email,
            password,
        });

        // Lưu token vào localStorage
        localStorage.setItem("token", res.data.token);

        setUser(res.data.user);
    };

    // const signup = async (
    //     userName: string,
    //     email: string,
    //     password: string,
    //     phone: string
    // ) => {
    //     await api.post("/auth/signup", { userName, email, password, phone });
    // };

    const logout = async () => {
        try {
            await api.post("/auth/signout");
        } catch {
            // ignore nếu backend không trả về gì
        }
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
