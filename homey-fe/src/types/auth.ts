// src/types/auth.ts

export type LoginForm = {
  email: string;
  password: string;
  isRemember: boolean;
};

export type LoginRes = {
  accessToken: string;
  refreshToken: string;
};

export type LogoutRes = {
  message: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface UserRes {
  id: number;
  username: string;
  email: string;
  // ...các field khác của user
}

export type AuthContextType = {
  user?: User | null;                // user hiện tại
  isAuthenticated?: boolean;         // đã đăng nhập hay chưa
  login: (data: LoginForm) => Promise<void>;
  logout: () => void;
};
