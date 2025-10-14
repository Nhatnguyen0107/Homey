import type { Pagination } from "./common";

export type Promotion = {
    id?: string;
    code?: string;
    discount_type?: string;
    discount_value?: number;
    start_date?: string;
    end_date?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
};

export interface PromotionResDto {
    data: Promotion[];
    pagination: Pagination;
}

export type GetAllPromotionParams = {
    page?: number;
    pageSize?: number;
    search?: string;
    sortField?: string;
    sortOrder?: string;
};
