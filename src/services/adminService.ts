import { api } from "./api";
import { Product } from "@/types";

export type ProductFormData = Omit<Product, "_id" | "id">;

export const adminService = {
  async getProducts(): Promise<Product[]> {
    const { data } = await api.get("/admin/products");
    return data.data.map((p: Product) => ({ ...p, id: p._id ?? p.id }));
  },

  async createProduct(form: ProductFormData): Promise<Product> {
    const { data } = await api.post("/admin/products", form);
    return data.data;
  },

  async updateProduct(
    id: string,
    form: Partial<ProductFormData>,
  ): Promise<Product> {
    const { data } = await api.put(`/admin/products/${id}`, form);
    return data.data;
  },

  async deleteProduct(id: string): Promise<void> {
    await api.delete(`/admin/products/${id}`);
  },
};
