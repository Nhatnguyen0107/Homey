import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../../services/axiosClient";
import { useState } from "react";
import "./register.css";

// định nghĩa kiểu dữ liệu
type RegisterForm = {
    full_name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
};

// Yup schema validate
const schema = yup.object({
    full_name: yup.string().required("Full name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup
        .string()
        .required("Phone number is required")
        .matches(/^[0-9]{9,11}$/, "Invalid phone number"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords do not match")
        .required("Confirm password is required"),
});

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>({
        resolver: yupResolver(schema),
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data: RegisterForm) => {
        try {
            await axiosClient.post("auth/signup", {
                userName: data.full_name,
                email: data.email,
                password: data.password,
                phone: data.phone,
                roleName: "customer", // mặc định là customer
            });

            alert("Register success! Please login.");
            navigate("/login");
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                <h2>Register</h2>
                {error && <p className="error">{error}</p>}

                <input type="text" placeholder="Full Name" {...register("full_name")} />
                <p className="error">{errors.full_name?.message}</p>

                <input type="email" placeholder="Email" {...register("email")} />
                <p className="error">{errors.email?.message}</p>

                <input type="text" placeholder="Phone Number" {...register("phone")} />
                <p className="error">{errors.phone?.message}</p>

                <input type="password" placeholder="Password" {...register("password")} />
                <p className="error">{errors.password?.message}</p>

                <input
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmPassword")}
                />
                <p className="error">{errors.confirmPassword?.message}</p>

                <button type="submit">Register</button>

                <p className="redirect">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}
