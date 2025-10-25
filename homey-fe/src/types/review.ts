import type { Pagination } from "./common";

export type Review = {
    id?: string;
    room_id?: string;
    user_id?: string;
    rating?: string;
    comment?: string;
    user_name: string; // thêm
    room_name: string; // thêm
    createdAt?: string;
    updatedAt?: string;
};

export interface ReviewResDto {
    data: Review[];
    pagination: Pagination;
}

export type GetAllReviewParams = {
    page?: number;
    pageSize?: number;
    search?: string;
    sortField?: string;
    sortOrder?: string;
};
