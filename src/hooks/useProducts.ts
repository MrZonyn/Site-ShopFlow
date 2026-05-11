import { useState, useEffect } from "react";
import { Product } from "@/types";
import { productService, ProductQueryParams } from "@/services/productService";

export interface ProductFilters {
  search: string;
  category: string; // slug da categoria ou '' para todas
  minPrice: number;
  maxPrice: number;
  sortBy: "relevance" | "price-asc" | "price-desc" | "rating";
}

export const defaultFilters: ProductFilters = {
  search: "",
  category: "",
  minPrice: 0,
  maxPrice: 999999,
  sortBy: "relevance",
};

export function useProducts(initialFilters?: Partial<ProductFilters>) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<ProductFilters>({
    ...defaultFilters,
    ...initialFilters,
  });

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const params: ProductQueryParams = {
          search: filters.search || undefined,
          category: filters.category || undefined,
          minPrice: filters.minPrice > 0 ? filters.minPrice : undefined,
          maxPrice: filters.maxPrice < 999999 ? filters.maxPrice : undefined,
          sortBy: filters.sortBy,
        };
        const response = await productService.getAll(params);

        // MongoDB retirna _ID - normalizamos para id
        const normalized = response.data.map((p) => ({
          ...p,
          id: p._id ?? p.id,
        }));
        setProducts(normalized);
        setTotal(response.total);
      } catch {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [filters]);

  function updateFilter<K extends keyof ProductFilters>(
    key: K,
    value: ProductFilters[K],
  ) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function resetFilters() {
    setFilters(defaultFilters);
  }

  return {
    products,
    loading,
    error,
    total,
    filters,
    updateFilter,
    resetFilters,
  };
}
