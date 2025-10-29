import type { Pagination } from "./common";

export type Booking = {
    id?: string;
    room_id?: string;
    user_id?: string;
    start_date?: string;
    end_date?: string;
    quantity?: string;
    total_price?: number;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
    userName?: string;
    roomName?: string;
};

export interface BookingResDto {
    data: Booking[];
    pagination: Pagination;
}

export type GetAllBookingParams = {
    page?: number;
    pageSize?: number;
    search?: string;
    sortField?: string;
    sortOrder?: string;
};
