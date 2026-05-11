import { ProductCard } from "@/components/ProductCard";
import { CategoryGrid } from "@/components/CategoryGrid";
import { useNavigate } from "react-router-dom";
import { HeroBanner } from "@/components/HeroBanner";
import { Button } from "@/components/ui/Button";
import { useProducts } from "@/hooks/useProducts";

export function HomePage() {
  const navigate = useNavigate();
  const { products } = useProducts();
  const featured = products.filter((p) => p.featured);
  const topRated = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      <HeroBanner />

      <CategoryGrid />

      {/* Produtos em destaque */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Em Destaque</h2>
            <p className="text-gray-500 text-sm mt-0.5">
              Selecionados pela nossa equipe
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/products")}
          >
            Ver todos →
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Melhores Avaliados */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-surface-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Melhor Avaliados</h2>
            <p className="text-gray-500 text-sm mt-0.5">
              O que nossos clientes mais amam
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/products?sortBy=rating")}
          >
            Ver todos →
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topRated.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-linear-to-r from-brand-600 to-brand-700 rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-brand-400/20 to-transparent pointer-events-none" />
          <h2 className="relative text-3xl font-extrabold text-white mb-3">
            Frete grátis em todos os pedidos
          </h2>
          <p className="relative text-brand-100 mb-6">
            Aproveite entrega expressa sem custo adicional para qualquer região
            do Brasil.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/products")}
          >
            Aproveitar agora
          </Button>
        </div>
      </section>
    </div>
  );
}
