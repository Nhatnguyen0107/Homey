import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/img/lg.png";
import { useAppDispatch } from "../hooks";
import { useAuth } from "../hooks/useAuth";
import { signout } from "../redux/authSlice";

const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();

    const handleLogout = async () => {
        await dispatch(signout());
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <header className="bg-blue-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <img src={Logo} alt="logo" className="h-20 w-50 object-contain" />

                <div className="space-x-4 flex items-center">
                    {isAuthenticated && user ? (
                        <>
                            <span>
                                Xin chào,{" "}
                                <strong>
                                    {user.userName || user.full_name || user.email?.split("@")[0]}
                                </strong>
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                            >
                                Logout
                            </button>
                            <Link
                                to="/admin"
                                className="underline hover:text-yellow-300 ml-2"
                            >
                                Admin
                            </Link>
                        </>
                    ) : (
                        <>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
                                onClick={() => navigate("/register")}
                            >
                                Register
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
