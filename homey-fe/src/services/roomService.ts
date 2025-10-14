import axios from "./axiosClient";
import type { RoomResDto, GetAllRoomParams } from "../types/room";
import type { TAny } from "../types/common";

export const RoomService = {
    async getAll(params?: GetAllRoomParams): Promise<RoomResDto> {
        const res = await axios.get<RoomResDto>("/rooms", { params });
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

export default RoomService;
