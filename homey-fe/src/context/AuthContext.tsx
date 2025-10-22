import { createContext, useContext, useEffect, useState } from "react";
import type { User, AuthContextType } from "../types/auth";
import type { TAny } from "../types/common";
import axiosClient from "../services/axiosClient";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // Lấy thông tin người dùng hiện tại
    const fetchUser = async () => {
        try {
            const res = await axiosClient.get<User>("/auth/me");
            setUser(res.data);
        } catch (err) {
            console.warn(" Không thể lấy user:", err);
            setUser(null);
        }
    };

    // ✅ Chạy khi load trang hoặc có token
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            fetchUser();
        } else {
            console.log(" Không có token trong localStorage");
        }
    }, []);

    // ✅ Hàm đăng nhập
    const login: TAny = async (email: string, password: string) => {
        const res = await axiosClient.post<{ token: string; user: User }>("/auth/signin", {
            email,
            password,
        });
        localStorage.setItem("access_token", res.data.token);
        setUser(res.data.user);
    };

    // ✅ Hàm đăng xuất
    const logout = async () => {
        try {
            await axiosClient.post("/auth/signout");
        } catch {
            // ignore nếu backend không trả gì
        }
        localStorage.removeItem("access_token");
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
