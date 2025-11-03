import axios from "./axiosClient";
import type { PaymentResDto, GetAllPaymentParams } from "../types/payment";
import type { TAny } from "../types/common";

export const PaymentService = {
    async getAll(params?: GetAllPaymentParams): Promise<PaymentResDto> {
        const res = await axios.get<PaymentResDto>("/payments", { params });
        return res.data;
    },

    async getById(id: string): Promise<TAny> {
        const res = await axios.get<TAny>(`/payments/${id}`);
        return res.data;
    },

    async create(data: Partial<TAny>): Promise<TAny> {
        const res = await axios.post<TAny>("/payments", data);
        return res.data;
    },

    async update(id: string, data: Partial<TAny>): Promise<TAny> {
        const res = await axios.put<TAny>(`/payments/${id}`, data);
        return res.data;
    },

    async delete(id: string): Promise<void> {
        await axios.delete(`/payments/${id}`);
    },
};

export default PaymentService;
