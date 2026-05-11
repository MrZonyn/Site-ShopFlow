import { useNavigate } from "react-router-dom";
import { useCategories } from "@/hooks/useCategories";

export function CategoryGrid() {
  const navigate = useNavigate();
  const { categories } = useCategories();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-white mb-6">Categorias</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => {
              navigate(`/products?category=${cat.slug}`);
            }}
            className="group flex flex-col items-center justify-center gap-3
              bg-surface-800 hover:bg-surface-700 border border-surface-700
              hover:border-brand-500/50 rounded-2xl p-6
              transition-all duration-200 hover:-translate-y-1 cursor-pointer"
          >
            <span className="text-4xl group-hover:scale-110 transition-transform duration-200">
              {cat.icon}
            </span>
            <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">
              {cat.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
