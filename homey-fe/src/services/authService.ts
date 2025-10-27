
import type { LoginForm, LoginRes, LogoutRes, UserRes } from "../types/auth";
import axiosClient from "./axiosClient";

export const AuthService = {
  async signin(data: LoginForm): Promise<LoginRes> {
    const res = await axiosClient.post<LoginRes>("/auth/signin", data);
    return res.data;
  },

  async signout(): Promise<LogoutRes> {
    const res = await axiosClient.post<LogoutRes>("/auth/signout");
    return res.data;
  },

  async getMe(): Promise<UserRes> {
    const res = await axiosClient.get<UserRes>("/auth/me");
    return res.data;
  },

};


