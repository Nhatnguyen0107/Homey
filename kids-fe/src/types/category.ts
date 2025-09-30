import type { Pagination } from "./common";

export type Category = {
  id?: string;
  name?: string;
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
