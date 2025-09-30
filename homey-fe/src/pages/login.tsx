// đăng nhập
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { setAuth } from "../utils/auth";
import { useState } from "react";

type LoginForm = {
    email: string;
    password: string;
};

export default function Login() {
    const { register, handleSubmit } = useForm<LoginForm>();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data: LoginForm) => {
        try {
            const res = await axios.post("http://localhost:5000/auth/login", data);
            setAuth(res.data);

            if (res.data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/user");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded shadow-md w-96"
            >
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                    className="w-full border p-2 mb-3 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                    className="w-full border p-2 mb-3 rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Login
                </button>
                <p className="text-sm mt-3">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-blue-600 underline">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}
