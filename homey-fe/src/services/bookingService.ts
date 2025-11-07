import axios from "./axiosClient";
import type { BookingResDto, GetAllBookingParams } from "../types/booking";
import type { TAny } from "../types/common";

export const BookingService = {
    async getAll(params?: GetAllBookingParams): Promise<BookingResDto> {
        const res = await axios.get<BookingResDto>("/bookings", { params });
        return res.data;
    },

    async getById(id: string): Promise<TAny> {
        const res = await axios.get<TAny>(`/bookings/${id}`);
        return res.data;
    },

    async create(data: Partial<TAny>): Promise<TAny> {
        const res = await axios.post<TAny>("/bookings", data);
        return res.data;
    },

    async update(id: string, data: Partial<TAny>): Promise<TAny> {
        const res = await axios.put<TAny>(`/bookings/${id}`, data);
        return res.data;
    },

    async delete(id: string): Promise<void> {
        await axios.delete(`/bookings/${id}`);
    },
};

export default BookingService;
