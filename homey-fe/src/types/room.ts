import type { Pagination } from "./common";

export type Room = {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    image_url?: string[]; // backend trả về mảng
    category_id?: string;
    city_id?: string;
    user_id?: string;
    created_at?: string;
    updated_at?: string;
    category?: {
        id: string;
        name: string;
    };
    city?: {
        id: string;
        name: string;
    };
    user?: {
        id: string;
        userName: string;
    };
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
