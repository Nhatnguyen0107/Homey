import { useAppSelector } from "../hooks";

export function useAuth() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const storedUser = localStorage.getItem("me");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  return {
    isAuthenticated: isAuthenticated || !!parsedUser,
    user: user || parsedUser,
  };
}
