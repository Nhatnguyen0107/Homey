import type { Image, Pagination } from "./common";

export type Product = {
  id?: string;
  name?: string;
  productName: string;
  description?: string;
  price: number; // có thể đổi thành number nếu parse
  stock?: number;
  imageUrls?: Image[];
  categoryName?: string;
  categoryId?: string;
};

export interface ProductResDto {
  data: Product[];
  pagination: Pagination;
}

export type GetAllProductParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  sortField?: string;
  sortOrder?: string;
};
