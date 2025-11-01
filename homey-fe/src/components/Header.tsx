import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBed, FaHotel, FaUmbrellaBeach } from "react-icons/fa";
import Logo from "../assets/img/lg.svg";
import { useAppDispatch } from "../hooks";
import { useAuth } from "../hooks/useAuth";
import { signout } from "../redux/authSlice";

const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { user, isAuthenticated } = useAuth();

    const handleLogout = async () => {
        await dispatch(signout());
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const role = user?.role || user?.roleName || "customer";

    const navItems = [
        { path: "/", label: "Lưu trú", icon: <FaBed /> },
        { path: "/hotels", label: "Phòng gợi ý", icon: <FaHotel /> },
        { path: "/activity", label: "Hoạt động", icon: <FaUmbrellaBeach /> },
    ];

    return (
        <header className="bg-blue-800 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-start">
                {/* --- Logo + Nav dưới logo --- */}
                <div>
                    {/* Logo */}
                    <img
                        src={Logo}
                        alt="logo"
                        className="h-10 w-auto cursor-pointer mb-2"
                        onClick={() => navigate("/")}
                    />

                    {/* Nav dưới logo */}
                    <div className="flex items-center space-x-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium
                                    ${pathname === item.path
                                        ? "border border-white bg-blue-700"
                                        : "hover:bg-blue-700 hover:border hover:border-white/50"
                                    }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* --- Phần user / logout / links --- */}
                <div className="flex flex-col items-end space-y-2">
                    {isAuthenticated && user ? (
                        <>
                            <div className="flex items-center space-x-2">
                                <span>
                                    Xin chào,{" "}
                                    <strong>
                                        {user.userName || user.full_name || user.email?.split("@")[0]}
                                    </strong>
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
                                >
                                    Logout
                                </button>
                            </div>

                            <div className="flex space-x-3 text-sm font-medium">
                                {(role === "admin" || role === "room_owner") && (
                                    <Link
                                        to="/admin"
                                        className="hover:text-yellow-300 transition"
                                    >
                                        Admin
                                    </Link>
                                )}

                                <Link
                                    to="/user"
                                    className="hover:text-yellow-300 transition"
                                >
                                    Trang Chủ
                                </Link>

                                <Link
                                    to="/booking-history"
                                    className="hover:text-yellow-300 transition"
                                >
                                    Lịch sử đặt phòng
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="flex space-x-3">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-lg transition"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded-lg transition"
                                onClick={() => navigate("/register")}
                            >
                                Register
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
