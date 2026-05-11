import { Product } from "@/types";
import { formatPrice, calcDiscount } from "@/utils/formatters";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/context/ToastContext";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const discount = product.originalPrice
    ? calcDiscount(product.originalPrice, product.price)
    : null;

  const isOutOfStock = product.stock === 0;

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addItem(product);
      addToast("Produto adicionado ao carrinho!");
    }
  }

  return (
    <>
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className="
        group relative bg-surface-800 rounded-2xl overflow-hidden
        border border-surface-700 hover:border-brand-500/50
        transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/10
        hover:-translate-y-1
        cursor-pointer
      "
      >
        {/* Badges sobrepostos na img */}
        <div className="relative aspect-square bg-surface-700">
          <div className="overflow-hidden rounded-t-2xl w-full h-full">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {discount && <Badge variant="danger">-{discount}%</Badge>}
            {product.featured && <Badge variant="brand">Destaque</Badge>}
            {isOutOfStock && <Badge variant="default">Esgotado</Badge>}
          </div>
        </div>

        {/* Info do prod. */}
        <div className="p-4 flex flex-col gap-3">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
              {product.brand}
            </p>
            <h3 className="text-white font-semibold mt-0.5 leading-snug line-clamp-2">
              {product.name}
            </h3>
          </div>

          {/* Avaliação */}
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={
                    i < Math.round(product.rating)
                      ? "text-amber-400"
                      : "text-surface-600"
                  }
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviewCount.toLocaleString("pt-BR")})
            </span>
          </div>

          {/* Preço */}
          <div>
            {product.originalPrice && (
              <p className="text-xs text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
            <p className="text-xl font-bold text-white">
              {formatPrice(product.price)}
            </p>
          </div>

          <Button
            fullWidth
            disabled={isOutOfStock}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(e);
              addToast("Produto adicionado ao carrinho!");
            }}
          >
            {isOutOfStock ? "Esgotado" : "Adicionar ao carrinho"}
          </Button>
        </div>
      </div>
    </>
  );
}
