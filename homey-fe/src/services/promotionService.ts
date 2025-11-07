import axios from "./axiosClient";
import type { PromotionResDto, GetAllPromotionParams } from "../types/promotion";
import type { TAny } from "../types/common";

export const PromotionService = {
    async getAll(params?: GetAllPromotionParams): Promise<PromotionResDto> {
        const res = await axios.get<PromotionResDto>("/promotions", { params });
        return res.data;
    },

    async getById(id: string): Promise<TAny> {
        const res = await axios.get<TAny>(`/promotions/${id}`);
        return res.data;
    },

    async create(data: Partial<TAny>): Promise<TAny> {
        const res = await axios.post<TAny>("/promotions", data);
        return res.data;
    },

    async update(id: string, data: Partial<TAny>): Promise<TAny> {
        const res = await axios.put<TAny>(`/promotions/${id}`, data);
        return res.data;
    },

    async delete(id: string): Promise<void> {
        await axios.delete(`/promotions/${id}`);
    },
};

export default PromotionService;
