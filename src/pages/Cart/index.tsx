import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/formatters";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";

function QuantityControl({
  value,
  onDecrease,
  onIncrease,
}: {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  const { addToast } = useToast();

  return (
    <div className="flex items-center gap-2 bg-surface-700 rounded-lg px-2 py-1">
      <button
        onClick={() => {
          onDecrease();
          addToast("Quantidade atualizada!", "info");
        }}
        className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
      >
        -
      </button>
      <span className="text-white font-semibold text-sm w-4 text-center">
        {value}
      </span>
      <button
        onClick={() => {
          onIncrease();
          addToast("Quantidade atualizada!", "info");
        }}
        className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
      >
        +
      </button>
    </div>
  );
}

export function CartPage() {
  const { cart, removeItem, updateQty, clearCart } = useCart();
  const { addToast } = useToast();

  if (cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-6x1 mb-4">🛒</p>
        <h2 className="text=2x1 font-bold text-white m-2">
          Seu carrinho está vazio
        </h2>
        <p className="text-gray-400 mb-8">Adicione produtos para continuar</p>
        <Link to="/products">
          <Button>Ver Produtos</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3x1 font-bold text-white">Meu Carrinho</h1>
        <button
          onClick={() => {
            clearCart();
            addToast("Carrinho limpo com sucesso!", "info");
          }}
          className="text=sm text-gray-500 hover:text-danger transition-colors cursor-pointer"
        >
          Limpar Carrinho
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de itens*/}
        <div className="çg:col-span-2 flex flex-col gap-4">
          {cart.items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex gap-4 bg-surface-800 rounded-2x1 p-4 border border-surface-700"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-x1 shrink-0 bg-surface-700"
              />

              <div className="flex-1 min-w-0">
                <p className="text-xs yexy-gray-500 uppercase">
                  {product.brand}
                </p>
                <p className="text-white font-semibold truncate">
                  {product.name}
                </p>
                <p className="text-brand-400 font-bold mt-1">
                  {formatPrice(product.price)}
                </p>
              </div>

              <div className="flex flex-col items-end justify-between gap-2 shrink-0">
                <button
                  onClick={() => {
                    removeItem(product.id);
                    addToast("Item removido do carrinho!", "info");
                  }}
                  className="text-gray-600 hover:text-danger transition-colors text-sm cursor-pointer"
                >
                  ✕
                </button>
                <QuantityControl
                  value={quantity}
                  onDecrease={() =>
                    quantity === 1
                      ? removeItem(product.id)
                      : updateQty(product.id, quantity - 1)
                  }
                  onIncrease={() => updateQty(product.id, quantity + 1)}
                />
                <p className="text-xs text-gray-500">
                  {formatPrice(product.price * quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Resumo do Pedido*/}
        <div className="lg:col-span-1">
          <div className="bg-surface-800 rounded-2x1 p-6 border border-surface-700 sticky top-24">
            <h2 className="text-lg font-bold text-white mb-4">
              Resumo de Pedido
            </h2>

            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal ({cart.itemCount} itens)</span>
                <span>{formatPrice(cart.total)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Frete</span>
                <span className="text-success">Grátis</span>
              </div>
              <div className="border-t border-surface-700 pt-3 flex justify-between text-white font-bold text-base">
                <span>Total</span>
                <span>{formatPrice(cart.total)}</span>
              </div>
            </div>

            <Link to="/checkout" className="mt-6 block">
              <Button fullWidth size="lg">
                Finalizar Pedido
              </Button>
            </Link>

            <Link to="/" className="mt-3 block">
              <Button fullWidth variant="ghost" size="sm">
                Continuar Comprando
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
