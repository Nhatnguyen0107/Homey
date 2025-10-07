import { useAppSelector } from "../hooks";

export function useAuth() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  // Nếu chưa có user trong Redux, lấy từ localStorage
  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  return {
    isAuthenticated: isAuthenticated || !!parsedUser,
    user: user || parsedUser,
  };
}
