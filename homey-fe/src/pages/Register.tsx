// src/pages/Register.tsx
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

type RegisterForm = {
    full_name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function Register() {
    const { register, handleSubmit } = useForm<RegisterForm>();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data: RegisterForm) => {
        if (data.password !== data.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            await axios.post("http://localhost:5000/auth/register", {
                full_name: data.full_name,
                email: data.email,
                password: data.password,
            });
            navigate("/login");
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded shadow-md w-96"
            >
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                {error && <p className="text-red-500">{error}</p>}
                <input
                    type="text"
                    placeholder="Full Name"
                    {...register("full_name", { required: true })}
                    className="w-full border p-2 mb-3 rounded"
                />
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmPassword", { required: true })}
                    className="w-full border p-2 mb-3 rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                    Register
                </button>
                <p className="text-sm mt-3">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}
