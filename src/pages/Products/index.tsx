import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { useCategories } from "@/hooks/useCategories";
import { useSearchParams } from "react-router-dom";
import { Spinner } from "@/components/ui/Spinner";
import { useMemo } from "react";

const sortOptions = [
  { value: "relevance", label: "Relevância" },
  { value: "price-asc", label: "Menor preço" },
  { value: "price-desc", label: "Maior preço" },
  { value: "rating", label: "Melhor avaliados" },
];

export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const { categories } = useCategories();

  const initialFilters = useMemo(
    () => ({
      category: searchParams.get("category") ?? "",
      sortBy: (searchParams.get("sortBy") as never) ?? "relevance",
    }),
    [searchParams],
  );

  const { products, loading, error, filters, updateFilter, resetFilters } =
    useProducts(initialFilters);

  const hasActiveFilters =
    filters.search || filters.category || filters.sortBy !== "relevance";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">Produtos</h1>
        <p className="text-gray-400 mt-1">
          {products.length}{" "}
          {products.length === 1
            ? "produto encontrado"
            : "produtos encontrados"}
        </p>
      </div>

      {/* Barra de busca */}
      <div className="relative mb-6">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="text"
          placeholder="Buscar produto..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="w-full bg-surface-800 border border-surface-700 focus:border-brand-500
            rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 outline-none
            transition-colors text-sm"
        />
        {filters.search && (
          <button
            onClick={() => updateFilter("search", "")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500
              hover:text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 mb-8">
        {/* Categorias */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => updateFilter("category", "")}
            className={[
              "px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer",
              !filters.category
                ? "bg-brand-500 text-white"
                : "bg-surface-800 text-gray-400 hover:text-white border border-surface-700",
            ].join(" ")}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => updateFilter("category", cat.slug)}
              className={[
                "px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer",
                filters.category === cat.slug
                  ? "bg-brand-500 text-white"
                  : "bg-surface-800 text-gray-400 hover:text-white border border-surface-700",
              ].join(" ")}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Ordenação */}
        <select
          value={filters.sortBy}
          onChange={(e) => updateFilter("sortBy", e.target.value as never)}
          className="ml-auto bg-surface-800 border border-surface-700 text-gray-300
            rounded-xl px-4 py-2 text-sm outline-none cursor-pointer
            hover:border-surface-500 transition-colors"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Limpar filtros */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-gray-500">Filtros ativos</span>
          <button
            onClick={resetFilters}
            className="text-sm text-brand-400 hover:text-brand-300 transition-colors cursor-pointer"
          >
            Limpar tudo
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-24">
          <Spinner />
        </div>
      ) : error ? (
        <div className="text-center py-24 text-red-400">{error}</div>
      ) : products.length === 0 ? (
        // Estado vazio
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <span className="text-6xl">🔍</span>
          <h3 className="text-xl font-bold text-white">
            Nenhum produto encontrado
          </h3>
          <p className="text-gray-400 text-sm">
            Tente outros termos ou remova os filtros.
          </p>
          <button
            onClick={resetFilters}
            className="text-brand-400 hover:text-brand-300 text-sm transition-colors cursor-pointer"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        // Grid de produtos
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
