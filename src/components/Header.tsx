import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

// icons inline - sem dep. ainda
function ShoppingCartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
      />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Produtos", href: "/products" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const { cart } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const cartCount = cart.itemCount;

  return (
    <header className="sticky top-0 z-50 bg-surface-900/80 backdrop-blur-md border-b border-surface-700">
      <div className="max-w-7x1 max-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2x1">🛍️</span>
            <span className="text-x1 font-extrabold text-white tracking-tight">
              Shop<span className="text-brand-500">Flow</span>
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={[
                  "px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "text-white bg-surface-700"
                    : "text-gray-400 hover:text-white hover:bg-surface-800",
                ].join(" ")}
              >
                {link.label}
              </Link>
            ))}

            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="text-sm text-amber-400 hover:text-amber-300 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-surface-800"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Ações direita */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm text-gray-300">
                  Olá,{" "}
                  <span className="text-white font-semibold">
                    {user?.name.split(" ")[0]}
                  </span>
                </span>
                <button
                  onClick={logout}
                  className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Sair
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-2"
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="text-sm bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-xl transition-colors font-medium"
                >
                  Cadastrar
                </Link>
              </div>
            )}

            {/* Carrinho */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-400 hover:text-white hover:bg-surface-800 rounded-lg transition-colors"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              {cartCount > 0 && (
                <span
                  key={cartCount}
                  className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white animate-badge-pulse"
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            {/* Menu Mobile */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="text-gray-400 hover:text-white hover:bg-surface-800 rounded-lg transition-colors cursor-pointer md:hidden"
            >
              {mobileOpen ? (
                <XIcon className="w-5 h-5" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile expandido */}
        {mobileOpen && (
          <div className="md:hidden pb-4 flex items-center justify-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={[
                  "px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "text-white bg-surface-700"
                    : "text-gray-400 hover:text-white hover:bg-surface-800",
                ].join(" ")}
              >
                {link.label}
              </Link>
            ))}

            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="text-sm text-amber-400 hover:text-amber-300 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-surface-800"
              >
                Admin
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
