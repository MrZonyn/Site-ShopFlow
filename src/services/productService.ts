import { api } from "./api";
import { Product, PaginatedResponse } from "@/types";

export interface ProductQueryParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export const productService = {
  async getAll(
    params: ProductQueryParams,
  ): Promise<PaginatedResponse<Product>> {
    const { data } = await api.get("/products", { params });
    return data;
  },

  async getById(id: string): Promise<Product> {
    const { data } = await api.get(`/products/${id}`);
    return data.data;
  },
};
