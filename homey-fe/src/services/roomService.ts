
import axios from "./axiosClient";
import type { GetAllRoomParams, RoomResDto } from "../types/room";
import type { TAny } from "../types/common";
import axiosClient from "./axiosClient";

export const RoomService = {
    async getAll(params?: GetAllRoomParams): Promise<RoomResDto> {
        const res = await axios.get<RoomResDto>("/users", { params });
        return res.data;
    },


    // async getById(id: string): Promise<TAny> {
    //     const res = await axiosClient.get<TAny>(`/rooms/${id}`);
    //     return res.data;
    // },

    async getRoomDetailById(id: string): Promise<TAny> {
        const res = await axiosClient.get<TAny>(`/rooms/room-detail/${id}`);
        return res.data;
    },

    // async create(data: Partial<TAny>): Promise<TAny> {
    //     const res = await axiosClient.post<TAny>("/rooms", data);
    //     return res.data;
    // },

    // async update(id: string, data: Partial<TAny>): Promise<TAny> {
    //     const res = await axiosClient.put<TAny>(`/rooms/${id}`, data);
    //     return res.data;
    // },

    // async delete(id: string): Promise<void> {
    //     await axiosClient.delete(`/rooms/${id}`);
    // },
};

export default RoomService;
