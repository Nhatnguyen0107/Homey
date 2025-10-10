import type { Pagination } from "./common";

export type Room = {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    image_url?: string;
};

export interface RoomResDto {
    data: Room[];
    pagination: Pagination;
}

export type GetAllRoomParams = {
    page?: number;
    pageSize?: number;
    search?: string;
    sortField?: string;
    sortOrder?: string;
};
