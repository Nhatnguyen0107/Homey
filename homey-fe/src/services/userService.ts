import axios from "./axiosClient";
import type { UserResDto, GetAllUserParams } from "../types/user";
import type { TAny } from "../types/common";

export const UserService = {
    async getAll(params?: GetAllUserParams): Promise<UserResDto> {
        const res = await axios.get<UserResDto>("/users", { params });
        return res.data;
    },

    // async getById(id: string): Promise<TAny> {
    //     const res = await axios.get<TAny>(`/categories/${id}`);
    //     return res.data;
    // },

    // async create(data: Partial<TAny>): Promise<TAny> {
    //     const res = await axios.post<TAny>("/categories", data);
    //     return res.data;
    // },

    // async update(id: string, data: Partial<TAny>): Promise<TAny> {
    //     const res = await axios.put<TAny>(`/categories/${id}`, data);
    //     return res.data;
    // },

    // async delete(id: string): Promise<void> {
    //     await axios.delete(`/categories/${id}`);
    // },
};

export default UserService;
