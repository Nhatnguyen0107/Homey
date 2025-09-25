import axios from "./axiosClient";
import type { TAny } from "../types/common";

export const TagsService = {
<<<<<<< HEAD
    async getAll(params?: TAny): Promise<TAny> {
        const res = await axios.get<TAny>("/tags", { params });
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

export default TagsService;
=======
  async getAll(params?: TAny): Promise<TAny> {
    const res = await axios.get<TAny>("/tags", { params });
    return res.data;
  },

  async getById(id: string): Promise<TAny> {
    const res = await axios.get<TAny>(`/tags/${id}`);
    return res.data;
  },

  async create(data: Partial<TAny>): Promise<TAny> {
    const res = await axios.post<TAny>("/tags", data);
    return res.data;
  },

  async update(id: string, data: Partial<TAny>): Promise<TAny> {
    const res = await axios.put<TAny>(`/tags/${id}`, data);
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await axios.delete(`/tags/${id}`);
  },
};

export default TagsService;
>>>>>>> main
