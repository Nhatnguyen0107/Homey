import axios from "./axiosClient";
import type { CategoryResDto, GetAllCategoryParams } from "../types/category";
import type { TAny } from "../types/common";

export const CategoryService = {
  async getAll(params?: GetAllCategoryParams): Promise<CategoryResDto> {
    const res = await axios.get<CategoryResDto>("/categories", { params });
    return res.data;
  },

  async getById(id: string): Promise<TAny> {
    const res = await axios.get<TAny>(`/categories/${id}`);
    return res.data;
  },

  async create(data: Partial<TAny>): Promise<TAny> {
    const res = await axios.post<TAny>("/categories", data);
    return res.data;
  },

  async update(id: string, data: Partial<TAny>): Promise<TAny> {
    const res = await axios.put<TAny>(`/categories/${id}`, data);
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await axios.delete(`/categories/${id}`);
  },
};

export default CategoryService;
