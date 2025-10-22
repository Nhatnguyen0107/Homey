// src/services/room.service.ts
import axiosClient from "./axiosClient";
import type { GetAllRoomParams } from "../types/room";
import type { TAny } from "../types/common";

export const RoomService = {
    async getAll(params?: GetAllRoomParams): Promise<any> {
        const res = await axiosClient.get("/rooms", { params });
        return res; //  bỏ .data
    },


    async getById(id: string): Promise<TAny> {
        const res = await axiosClient.get<TAny>(`/rooms/${id}`);
        return res.data;
    },

    async getRoomDetailById(id: string): Promise<TAny> {
        const res = await axiosClient.get<TAny>(`/rooms/room-detail/${id}`);
        return res.data;
    },

    async create(data: Partial<TAny>): Promise<TAny> {
        const res = await axiosClient.post<TAny>("/rooms", data);
        return res.data;
    },

    async update(id: string, data: Partial<TAny>): Promise<TAny> {
        const res = await axiosClient.put<TAny>(`/rooms/${id}`, data);
        return res.data;
    },

    async delete(id: string): Promise<void> {
        await axiosClient.delete(`/rooms/${id}`);
    },
};

export default RoomService;
