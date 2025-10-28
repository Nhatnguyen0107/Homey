import { createContext, useContext, useEffect, useState } from "react";
import type { User, AuthContextType } from "../types/auth";
import type { TAny } from "../types/common";
import axiosClient from "../services/axiosClient";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);


    const fetchUser = async () => {
        try {
            const res = await axiosClient.get("/auth/me");
            console.log("🔍 /auth/me response:", res.data);


            setUser(res.data.user || res.data);
        } catch (error) {
            console.warn("❌ Không thể lấy user từ /auth/me:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    //  Kiểm tra token và lấy user khi vừa vào app
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) fetchUser();
        else setLoading(false);
    }, []);


    //  Đăng nhập
    const login: TAny = async (email: string, password: string) => {
        const res = await axiosClient.post<{ token: string; user: User }>(
            "/auth/signin",
            { email, password }
        );
        localStorage.setItem("access_token", res.data.token);
        setUser(res.data.user);
    };

    //  Đăng xuất
    const logout = async () => {
        try {
            await axiosClient.post("/auth/signout");
        } catch { }
        localStorage.removeItem("access_token");
        setUser(null);
    };


    if (loading) {
        return (
            <div className="text-center py-10 text-gray-500">
                Đang xác thực tài khoản...
            </div>
        );
    }

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
