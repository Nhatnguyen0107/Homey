import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { LoginForm } from "../../types/auth";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { signin } from "../../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./login.css";

const schema = yup
  .object({
    email: yup.string().required("Please enter email").email("Invalid email!"),
    password: yup
      .string()
      .required("Please enter password")
      .min(6, "Password must be at least 6 characters long"),
    isRemember: yup.boolean(),
  })
  .required();

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
    defaultValues: { isRemember: false },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const onSubmit = (data: LoginForm) => {
    dispatch(signin(data));
  };

  // ✅ Redirect sau khi login thành công
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="title">
          <h2>Welcome Back</h2>
          <p>Please login to your account</p>
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            id="email"
            type="text"
            placeholder="Enter your email"
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            id="password"
            type="password"
            placeholder="Enter your password"
          />
          <p className="error">{errors.password?.message}</p>
        </div>

        <div className="remember">
          <input {...register("isRemember")} id="check" type="checkbox" />
          <label htmlFor="check">Remember me</label>
        </div>

        <button type="submit" className="signIn-btn">Sign In</button>

        <div className="endLogin">
          <p>Or continue with</p>
          <div className="social-icons">
            <span className="facebook"><FaFacebookF /></span>
            <span className="google"><FaGoogle /></span>
          </div>

          <div className="signUp">
            <p>Don't have an account?</p>
            <Link to="/register">Sign up</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
