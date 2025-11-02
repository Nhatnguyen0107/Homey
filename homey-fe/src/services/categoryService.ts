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

  async create(data: TAny): Promise<TAny> {
    const formData = new FormData();

    // Thêm các field thông thường
    formData.append("name", data.name);

    // Thêm files nếu có
    if (data.images && Array.isArray(data.images)) {
      data.images.forEach((file: File) => {
        formData.append("images", file);
      });
    }

    const res = await axios.post("/categories", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  async update(id: string, data: Partial<TAny>): Promise<TAny> {
    const formData = new FormData();

    // Thêm các field thông thường
    formData.append("name", data.name);

    // Thêm files nếu có
    if (data.images && Array.isArray(data.images)) {
      data.images.forEach((file: File) => {
        formData.append("images", file);
      });
    }

    const res = await axios.put(`/categories/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await axios.delete(`/categories/${id}`);
  },
};

export default CategoryService;