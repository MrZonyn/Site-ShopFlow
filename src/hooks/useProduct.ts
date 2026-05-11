import { useState, useEffect } from "react";
import { Product } from "@/types";
import { productService } from "@/services/productService";

interface UseProductReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

export function useProduct(id: string | undefined): UseProductReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("ID inválido");
      setLoading(false);
      return;
    }

    setLoading(true);
    productService
      .getById(id)
      .then((data) => {
        setProduct({ ...data, id: data._id ?? data.id });
        setLoading(false);
      })
      .catch(() => {
        setError("Produto não encontrado");
        setLoading(false);
      });
  }, [id]);

  return { product, loading, error };
}
