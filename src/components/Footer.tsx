import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-800 border-t border-surface-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Marca */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🛍️</span>
              <span className="text-xl font-extrabold text-white">
                Shop<span className="text-brand-500">Flow</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Os melhores eletrônicos com preços imbatíveis e entrega expressa
              para todo o Brasil.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Navegação
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Início", to: "/" },
                { label: "Produtos", to: "/products" },
                { label: "Carrinho", to: "/cart" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Categorias
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Smartphones", slug: "smartphones" },
                { label: "Notebooks", slug: "notebooks" },
                { label: "Headphones", slug: "headphones" },
                { label: "Câmeras", slug: "cameras" },
              ].map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/products?category=${cat.slug}`}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contato
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-gray-400">
              <li>contato@shopflow.com</li>
              <li>0800 123 4567</li>
              <li>Seg–Sex, 9h–18h</li>
            </ul>

            {/* Redes sociais */}
            <div className="flex gap-3 mt-4">
              {["GitHub", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-xs text-gray-500 hover:text-white transition-colors border border-surface-600 hover:border-surface-500 px-3 py-1.5 rounded-lg"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-surface-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} ShopFlow. Todos os direitos reservados.
          </p>
          <div className="flex gap-4 text-xs text-gray-600">
            <span>Feito com React + TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
