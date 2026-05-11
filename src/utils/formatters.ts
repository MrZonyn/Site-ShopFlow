// Conversor Real
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

// Calcula desconto
export function calcDiscount(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100);
}

// Trunca texto longo
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}
