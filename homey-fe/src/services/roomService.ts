import type { GetAllRoomParams, RoomResDto } from "../types/room";
import type { TAny } from "../types/common";
import axiosClient from "./axiosClient";
import axios from "axios";

const RoomService = {
        async getAll(params?: GetAllRoomParams): Promise<RoomResDto> {
                const res = await axiosClient.get("/rooms", { params });
                return {
                        data: res.data.data.data,
                        pagination: {
                                page: res.data.data.pagination.page,
                                pageSize: res.data.data.pagination.pageSize,
                                totalPages: Math.ceil(
                                        res.data.data.pagination.total / res.data.data.pagination.pageSize
                                ),
                                total: res.data.data.pagination.total,
                        },
                };
        },

        async getRoomDetailById(id: string): Promise<TAny> {
                const res = await axiosClient.get<TAny>(`/rooms/room-detail/${id}`);
                return res.data;
        },

        async getById(id: string): Promise<TAny> {
                const res = await axios.get<TAny>(`/rooms/${id}`);
                return res.data;
        },

        // 🧩 sửa lại create() — gửi FormData thay vì JSON
        async create(data: TAny): Promise<TAny> {
                const formData = new FormData();
                Object.entries(data).forEach(([key, value]) => {
                        if (key === "images" && Array.isArray(value)) {
                                value.forEach((file: File) => formData.append("images", file));
                        } else {
                                formData.append(key, value as any);
                        }
                });

                const res = await axios.post("http://localhost:3000/api/v1/rooms", formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                });
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
