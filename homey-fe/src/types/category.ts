import type { Pagination } from "./common";

export type Category = {
  id?: string;
  name?: string;
  image_url?: string[];
};

export interface CategoryResDto {
  data: Category[];
  pagination: Pagination;
}

export type GetAllCategoryParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  sortField?: string;
  sortOrder?: string;
};
