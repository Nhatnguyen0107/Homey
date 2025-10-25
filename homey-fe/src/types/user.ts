import type { Pagination } from "./common";

export type User = {
    id?: string;
    userName?: string;
    password?: string;
    email?: string;
    phone?: number;
    role_id?: string;      // 👈 Khóa ngoại liên kết đến bảng roles
    roleName?: string;
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
