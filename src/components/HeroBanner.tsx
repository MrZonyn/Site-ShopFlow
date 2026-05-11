import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-surface-900 via-surface-800 to-brand-700/20 border-b border-surface-700">
      {/* Elementos decorativos de fundo */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
            <span className="text-brand-400 text-sm font-medium">
              Novidades da semana disponíveis
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
            Tecnologia que
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-brand-400 to-brand-600">
              transforma
            </span>
            sua vida.
          </h1>

          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            Os melhores eletrônicos com preços imbatíveis e entrega expressa
            para todo o Brasil.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/products">
              <Button size="lg">Ver todos os Produtos</Button>
            </Link>
            <Link to="/products?category=ofertas">
              <Button variant="secondary" size="lg">
                Ver Ofertas
              </Button>
            </Link>
          </div>

          {/*Stats */}
          <div className="mt-12 flex gap-8">
            {[
              { value: "10k+", label: "Produtos" },
              { value: "50k+", label: "Clientes" },
              { value: "4.9★", label: "Avaliação" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2x1 font font-extrabold text-white">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
