import type { Pagination } from "./common";

export type User = {
    id?: string;
    userName?: string;
    password?: string;
    email?: string;
    phone?: number;
};

export interface UserResDto {
    data: User[];
    pagination: Pagination;
}

export type GetAllUserParams = {
    page?: number;
    pageSize?: number;
    search?: string;
    sortField?: string;
    sortOrder?: string;
};
