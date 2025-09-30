// quản lí dữ liệu đăng ký đăng nhập
export type AuthData = {
    token: string;
    user: { id: number; email: string; role: string };
};

export const setAuth = (data: AuthData) => {
    localStorage.setItem("auth", JSON.stringify(data));
};

export const getAuth = (): AuthData | null => {
    const auth = localStorage.getItem("auth");
    return auth ? JSON.parse(auth) : null;
};

export const logout = () => {
    localStorage.removeItem("auth");
};

