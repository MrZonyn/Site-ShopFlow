import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useProduct } from "@/hooks/useProduct";
import { useCart } from "@/context/CartContext";
import { formatPrice, calcDiscount } from "@/utils/formatters";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { Spinner } from "@/components/ui/Spinner";

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);
  const { addItem, cart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [addedFeedback, setAddedFeedback] = useState(false);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <span className="text-6xl">😕</span>
        <h2 className="text-xl font-bold text-white">Produto não encontrado</h2>
        <Button onClick={() => navigate("/")}>Voltar à Home</Button>
      </div>
    );
  }

  const discount = product.originalPrice
    ? calcDiscount(product.originalPrice, product.price)
    : null;

  const itemInCart = cart.items.find((i) => i.product.id === product.id);
  const isOutOfStock = product.stock === 0;

  function handleAddToCart() {
    for (let i = 0; i < quantity; i++) addItem(product);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="hover:text-white transition-colors cursor-pointer">
          {product.category.name}
        </span>
        <span>/</span>
        <span className="text-gray-300 truncate max-w-50">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Galeria de imagens */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-surface-800 border border-surface-700">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails — só mostra se tiver mais de 1 imagem */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={[
                    "w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer",
                    activeImage === i
                      ? "border-brand-500"
                      : "border-surface-700 hover:border-surface-500",
                  ].join(" ")}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detalhes */}
        <div className="flex flex-col gap-6">
          {/* Badges + marca */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-brand-400 uppercase tracking-wider">
              {product.brand}
            </span>
            {discount && <Badge variant="danger">-{discount}%</Badge>}
            {product.featured && <Badge variant="brand">Destaque</Badge>}
            {product.stock <= 5 && product.stock > 0 && (
              <Badge variant="warning">Últimas {product.stock} unidades</Badge>
            )}
          </div>

          {/* Nome */}
          <h1 className="text-3xl font-extrabold text-white leading-tight">
            {product.name}
          </h1>

          {/* Avaliação */}
          <div className="flex items-center gap-3">
            <StarRating rating={product.rating} showValue size="lg" />
            <span className="text-gray-500 text-sm">
              {product.reviewCount.toLocaleString("pt-BR")} avaliações
            </span>
          </div>

          {/* Preço */}
          <div className="bg-surface-800 rounded-2xl p-5 border border-surface-700">
            {product.originalPrice && (
              <p className="text-gray-500 line-through text-sm">
                {formatPrice(product.originalPrice)}
              </p>
            )}
            <p className="text-4xl font-extrabold text-white">
              {formatPrice(product.price)}
            </p>
            {discount && (
              <p className="text-success text-sm font-medium mt-1">
                Você economiza{" "}
                {formatPrice(product.originalPrice! - product.price)}
              </p>
            )}
            <p className="text-gray-500 text-xs mt-2">
              Em até 12x de {formatPrice(product.price / 12)} sem juros
            </p>
          </div>

          {/* Descrição */}
          <p className="text-gray-400 leading-relaxed">{product.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-surface-800 border border-surface-700 rounded-full text-xs text-gray-400"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Seletor de quantidade + botão */}
          {product.stock > 0 ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">Quantidade:</span>
                <div className="flex items-center gap-3 bg-surface-800 border border-surface-700 rounded-xl px-4 py-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer text-lg font-bold"
                  >
                    −
                  </button>
                  <span className="text-white font-semibold w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    disabled={isOutOfStock}
                    onClick={() =>
                      setQuantity((q) => Math.min(product.stock, q + 1))
                    }
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer text-lg font-bold"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-gray-600">
                  {product.stock} disponíveis
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  fullWidth
                  size="lg"
                  onClick={handleAddToCart}
                  variant={addedFeedback ? "secondary" : "primary"}
                >
                  {addedFeedback
                    ? "✓ Adicionado!"
                    : itemInCart
                      ? `Adicionar mais (${itemInCart.quantity} no carrinho)`
                      : "Adicionar ao Carrinho"}
                </Button>
                <Link to="/cart">
                  <Button size="lg" variant="secondary">
                    Ver Carrinho
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <Button fullWidth size="lg" disabled>
              Produto Esgotado
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
