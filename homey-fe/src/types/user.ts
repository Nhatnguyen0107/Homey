import type { Pagination } from "./common";

export type User = {
    id?: string;
    userName?: string;
    password?: string;
    email?: string;
    phone?: string;
    role_id?: string;   // 👈 khóa ngoại
    roleName?: string;  // 👈 tên role (phải có dòng này)
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
