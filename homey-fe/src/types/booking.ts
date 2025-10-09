import type { Pagination } from "./common";

export type Booking = {
    id?: string;
    room_id?: string;
    user_id?: string;
    rating?: number;
    comment?: string;
    createdAt?: string;
    updatedAt?: string;
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
