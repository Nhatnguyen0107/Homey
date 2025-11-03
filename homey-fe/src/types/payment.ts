import type { Pagination } from "./common";

export type Payment = {
    id: string;
    booking_id: string;
    userName: string;      // từ users table qua booking
    roomName: string;      // từ rooms table qua booking
    method: "cash" | "credit_card" | "momo" | "zalo_pay";
    amount: number;
    status: "paid" | "unpaid";
    createdAt: string;
    updatedAt: string;
};

export interface PaymentResDto {
    data: Payment[];
    pagination: Pagination;
}

export type GetAllPaymentParams = {
    page?: number;
    pageSize?: number;
    search?: string;
    sortField?: string;
    sortOrder?: string;
};
