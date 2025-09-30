// chặn router không cho truy cập nếu chưa login
import { Navigate } from "react-router-dom";
import { getAuth } from "../utils/auth";

type Props = {
  children: JSX.Element;
  role?: "user" | "admin";
};

export default function PrivateRoute({ children, role }: Props) {
  const auth = getAuth();
  if (!auth) return <Navigate to="/login" />;
  if (role && auth.user.role !== role) return <Navigate to="/" />;
  return children;
}
