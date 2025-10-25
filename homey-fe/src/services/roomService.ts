// src/services/roomService.ts
import axiosJson from "./axiosJson";
import type { GetAllRoomParams } from "../types/room";
import type { TAny } from "../types/common";

export const RoomService = {
    async getAll(params?: GetAllRoomParams): Promise<any> {
        const res = await axiosJson.get("/rooms", { params });
        return res; // Giữ nguyên vì bạn bỏ .data
    },

    async getById(id: string): Promise<TAny> {
        const res = await axiosJson.get<TAny>(`/rooms/${id}`);
        return res.data;
    },

    async getRoomDetailById(id: string): Promise<TAny> {
        const res = await axiosJson.get<TAny>(`/rooms/room-detail/${id}`);
        return res.data;
    },

    async create(data: Partial<TAny>): Promise<TAny> {
        const res = await axiosJson.post<TAny>("/rooms", data);
        return res.data;
    },

    async update(id: string, data: Partial<TAny>): Promise<TAny> {
        const res = await axiosJson.put<TAny>(`/rooms/${id}`, data);
        return res.data;
    },

    async delete(id: string): Promise<void> {
        await axiosJson.delete(`/rooms/${id}`);
    },
};

export default RoomService;
