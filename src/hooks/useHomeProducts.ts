import { useState, useEffect } from "react";
import { Product } from "@/types";
import { productService } from "@/services/productService";

export function useHomeProducts() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [topRated, setTopRated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const [featuresRes, topRatedRes] = await Promise.all([
          productService.getAll({ limit: 3 }),
          productService.getAll({ sortBy: "rating", limit: 4 }),
        ]);

        const normalize = (p: Product) => ({ ...p, id: p._id ?? p.id });

        setFeatured(featuresRes.data.filter((p) => p.featured).map(normalize));
        setTopRated(topRatedRes.data.map(normalize));
      } catch {
        setFeatured([]);
        setTopRated([]);
      } finally {
        setLoading(false);
      }
    }

    fetch();
  }, []);

  return { featured, topRated, loading };
}
