import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { Cart, CartItem, Product } from "@/types";

// Tipos da Action
type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: string } //id do prod.
  | { type: "UPDATE_QTY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

// Estado Inicial
const initialCart: Cart = {
  items: [],
  total: 0,
  itemCount: 0,
};

// Carrinho do localStorage
function loadCartFromStorage(): Cart {
  try {
    const stored = localStorage.getItem("cart");
    if (stored) {
      const parsed = JSON.parse(stored);
      // Recalcular totais
      const totals = calcTotals(parsed.items);
      return { ...parsed, ...totals };
    }
  } catch (error) {
    console.error("Erro ao carregar carrinho do localStorage:", error);
  }
  return initialCart;
}

// Funções Auxiliares
function calcTotals(items: CartItem[]): Pick<Cart, "total" | "itemCount"> {
  return {
    total: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
  };
}

// Reducer - toda logica de mutação do carrinho
function cartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.product.id === action.payload.id,
      );
      const updatedItems = existing
        ? state.items.map((i) =>
            i.product.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          )
        : [...state.items, { product: action.payload, quantity: 1 }];

      return { ...state, items: updatedItems, ...calcTotals(updatedItems) };
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(
        (i) => i.product.id !== action.payload,
      );
      return { ...state, items: updatedItems, ...calcTotals(updatedItems) };
    }

    case "UPDATE_QTY": {
      const updatedItems =
        action.payload.quantity === 0
          ? state.items.filter((i) => i.product.id !== action.payload.id)
          : state.items.map((i) =>
              i.product.id === action.payload.id
                ? { ...i, quantity: action.payload.quantity }
                : i,
            );
      return { ...state, items: updatedItems, ...calcTotals(updatedItems) };
    }

    case "CLEAR_CART":
      return initialCart;

    default:
      return state;
  }
}

// Context + Hook
interface CartContextValue {
  cart: Cart;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, loadCartFromStorage());

  const addItem = (product: Product) =>
    dispatch({ type: "ADD_ITEM", payload: product });
  const removeItem = (id: string) =>
    dispatch({ type: "REMOVE_ITEM", payload: id });
  const updateQty = (id: string, quantity: number) =>
    dispatch({ type: "UPDATE_QTY", payload: { id, quantity } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  // Persistir carrinho no localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Erro ao salvar carrinho no localStorage:", error);
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook customizado - OBS.: nunca use o context diretamente fora daqui
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de <CartProvider>");
  return ctx;
}
