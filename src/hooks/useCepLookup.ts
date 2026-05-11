import { useState } from "react";
import { Address } from "@/types";

export function useCepLookup() {
  const [loading, setLoading] = useState(false);

  async function lookupCep(cep: string): Promise<Partial<Address> | null> {
    const cleaned = cep.replace(/\D/g, "");
    if (cleaned.length !== 8) {
      return null;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleaned}/json/`);
      const data = await res.json();
      if (data.erro) {
        return null;
      }

      return {
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
        cep: data.cep,
      };
    } catch (error) {
      console.error("Error fetching CEP data:", error);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { loading, lookupCep };
}
