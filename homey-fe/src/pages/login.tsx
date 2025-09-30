import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { LoginForm } from "../types/auth";
import { useAppDispatch } from "../hooks";
import { signin } from "../redux/authSlice";

const schema = yup
  .object({
    email: yup.string().required().email("Email không hợp lệ!"),
    password: yup.string().required().min(6, "Mật khẩu tối thiểu 6 ký tự"),
    isRemember: yup.boolean().required(),
  })
  .required();

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      isRemember: false,
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: LoginForm) => {
    dispatch(signin(data));
  };

  return (
    <div className="login">


      <form>
        <div className="title">
          <h2 id="formTitle">Welcome Back</h2>
          <p id="formP">Please login to your account</p>
        </div>

        <div className="input">
          <label>Email</label>
          <input id="email" type="text" placeholder="Enter you email" />

          <label>Password</label>
          <input id="password" type="text" placeholder="Enter you password" />

          <input id="check" type="checkbox" />

          <button id="signIn">Sign In</button>



        </div>

        <div className="endLogin">

          <div id="note">
            <p>Or continue with</p>
          </div>

          <div id="icon">
            <span><FaFacebookF /></span>
            <span><FaGoogle /></span>

          </div>

          <div className="signUp">
            <p>Don't have an account? </p>
            <a href="#">Sign up</a>
          </div>

        </div>




      </form>


    </div>

  );
};

export default Login;
