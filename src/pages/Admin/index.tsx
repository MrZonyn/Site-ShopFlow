import { useState, useEffect } from "react";
import { adminService, ProductFormData } from "@/services/adminService";
import { Product } from "@/types";
import { formatPrice } from "@/utils/formatters";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";
import { Spinner } from "@/components/ui/Spinner";

const emptyForm: ProductFormData = {
  name: "",
  description: "",
  price: 0,
  originalPrice: undefined,
  images: [""],
  brand: "",
  rating: 0,
  reviewCount: 0,
  stock: 0,
  tags: [],
  featured: false,
  category: { id: "", name: "", slug: "", icon: "" },
};

export function AdminPage() {
  const { addToast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductFormData>(emptyForm);
  const [tagInput, setTagInput] = useState<string>("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    try {
      const data = await adminService.getProducts();
      setProducts(data);
    } catch {
      addToast("Erro ao carregar produtos", "error");
    } finally {
      setLoading(false);
    }
  }

  function parseTags(value: string) {
    return value
      .split(/[\s,]+/)
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  function openCreate() {
    setForm(emptyForm);
    setTagInput("");
    setEditingId(null);
    setShowForm(true);
  }

  function openEdit(product: Product) {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      images: product.images,
      brand: product.brand,
      rating: product.rating,
      reviewCount: product.reviewCount,
      stock: product.stock,
      tags: product.tags,
      featured: product.featured ?? false,
      category: product.category,
    });
    setTagInput(product.tags.join(", "));
    setEditingId(product.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const parsedTags = parseTags(tagInput);
    const payload = {
      ...form,
      tags: parsedTags,
    };

    try {
      if (editingId) {
        await adminService.updateProduct(editingId, payload);
        addToast("Produto atualizado!");
      } else {
        await adminService.createProduct(payload);
        addToast("Produto criado!");
      }
      setShowForm(false);
      loadProducts();
    } catch {
      addToast("Erro ao salvar produto", "error");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await adminService.deleteProduct(id);
      addToast("Produto deletado!");
      setDeleteConfirm(null);
      loadProducts();
    } catch {
      addToast("Erro ao deletar", "error");
    }
  }

  function handleFormChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header da página */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Painel Admin</h1>
          <p className="text-gray-400 mt-1">
            {products.length} produtos cadastrados
          </p>
        </div>
        <Button onClick={openCreate}>+ Novo Produto</Button>
      </div>

      {/* Modal de formulário */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-800 border border-surface-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-surface-700">
              <h2 className="text-xl font-bold text-white">
                {editingId ? "Editar Produto" : "Novo Produto"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              {/* Nome */}
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">
                  Nome *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                  className="w-full bg-surface-700 border border-surface-600 focus:border-brand-500 rounded-xl px-4 py-3 text-white outline-none text-sm transition-colors"
                />
              </div>

              {/* Descrição */}
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">
                  Descrição *
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  required
                  rows={3}
                  className="w-full bg-surface-700 border border-surface-600 focus:border-brand-500 rounded-xl px-4 py-3 text-white outline-none text-sm transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Preço */}
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">
                    Preço *
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={form.price ?? ""}
                    onChange={handleFormChange}
                    required
                    min={0}
                    className="w-full bg-surface-700 border border-surface-600 focus:border-brand-500 rounded-xl px-4 py-3 text-white outline-none text-sm transition-colors"
                  />
                </div>
                {/* Preço Original */}
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">
                    Preço Original
                  </label>
                  <input
                    type="text"
                    name="originalPrice"
                    value={form.originalPrice ?? ""}
                    onChange={handleFormChange}
                    min={0}
                    className="w-full bg-surface-700 border border-surface-600 focus:border-brand-500 rounded-xl px-4 py-3 text-white outline-none text-sm transition-colors"
                  />
                </div>
                {/* Marca */}
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">
                    Marca *
                  </label>
                  <input
                    name="brand"
                    value={form.brand}
                    onChange={handleFormChange}
                    required
                    className="w-full bg-surface-700 border border-surface-600 focus:border-brand-500 rounded-xl px-4 py-3 text-white outline-none text-sm transition-colors"
                  />
                </div>
                {/* Estoque */}
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">
                    Estoque *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleFormChange}
                    required
                    min={0}
                    className="w-full bg-surface-700 border border-surface-600 focus:border-brand-500 rounded-xl px-4 py-3 text-white outline-none text-sm transition-colors"
                  />
                </div>
                {/* Categoria slug */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1.5 block">
                      Categoria (nome) *
                    </label>
                    <input
                      value={form.category.name}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          category: { ...prev.category, name: e.target.value },
                        }))
                      }
                      placeholder="ex: Smartphones"
                      className="w-full bg-surface-700 border border-surface-600 focus:border-brand-500 rounded-xl px-4 py-3 text-white outline-none text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-1.5 block">
                      Categoria (slug) *
                    </label>
                    <input
                      value={form.category.slug}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          category: {
                            ...prev.category,
                            slug: e.target.value,
                            id: e.target.value, // usa slug como id por simplicidade
                          },
                        }))
                      }
                      placeholder="ex: smartphones"
                      className="w-full bg-surface-700 border border-surface-600 focus:border-brand-500 rounded-xl px-4 py-3 text-white outline-none text-sm transition-colors"
                    />
                  </div>
                </div>
                {/* Rating */}
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">
                    Rating (0-5)
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={form.rating}
                    onChange={handleFormChange}
                    min={0}
                    max={5}
                    step={0.1}
                    className="w-full bg-surface-700 border border-surface-600 focus:border-brand-500 rounded-xl px-4 py-3 text-white outline-none text-sm transition-colors"
                  />
                </div>
              </div>

              {/* URL da imagem */}
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">
                  URL da Imagem
                </label>
                <input
                  value={form.images[0]}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, images: [e.target.value] }))
                  }
                  placeholder="https://..."
                  className="w-full bg-surface-700 border border-surface-600 focus:border-brand-500 rounded-xl px-4 py-3 text-white outline-none text-sm transition-colors"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">
                  Tags (separadas por vírgula ou espaço)
                </label>
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onBlur={() =>
                    setForm((prev) => ({
                      ...prev,
                      tags: parseTags(tagInput),
                    }))
                  }
                  placeholder="ex: 5g, premium, android"
                  className="w-full bg-surface-700 border border-surface-600 focus:border-brand-500 rounded-xl px-4 py-3 text-white outline-none text-sm transition-colors"
                />
              </div>

              {/* Featured */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, featured: e.target.checked }))
                  }
                  className="w-4 h-4 accent-blue-500"
                />
                <span className="text-sm text-gray-300">
                  Produto em destaque
                </span>
              </label>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" fullWidth loading={submitting}>
                  {editingId ? "Salvar alterações" : "Criar produto"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabela de produtos */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : (
        <div className="bg-surface-800 border border-surface-700 rounded-2xl overflow-hidden">
          <div className="hidden md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-700 text-left">
                  <th className="px-6 py-4 text-gray-400 font-medium">
                    Produto
                  </th>
                  <th className="px-6 py-4 text-gray-400 font-medium">
                    Categoria
                  </th>
                  <th className="px-6 py-4 text-gray-400 font-medium">Preço</th>
                  <th className="px-6 py-4 text-gray-400 font-medium">
                    Estoque
                  </th>
                  <th className="px-6 py-4 text-gray-400 font-medium">
                    Destaque
                  </th>
                  <th className="px-6 py-4 text-gray-400 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-surface-700/50 hover:bg-surface-700/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover bg-surface-700 shrink-0"
                        />
                        <div>
                          <p className="text-white font-medium">
                            {product.name}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {product.brand}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {product.category.name}
                    </td>
                    <td className="px-6 py-4 text-white font-medium">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={
                          product.stock === 0
                            ? "text-red-400"
                            : product.stock <= 5
                              ? "text-amber-400"
                              : "text-green-400"
                        }
                      >
                        {product.stock === 0
                          ? "Esgotado"
                          : `${product.stock} un.`}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {product.featured ? "⭐" : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(product)}
                          className="text-brand-400 hover:text-brand-300 transition-colors cursor-pointer text-xs font-medium"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(product.id)}
                          className="text-red-400 hover:text-red-300 transition-colors cursor-pointer text-xs font-medium"
                        >
                          Deletar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards — só no mobile */}
          <div className="md:hidden divide-y divide-surface-700">
            {products.map((product) => (
              <div key={product.id} className="p-4 flex gap-3">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-14 h-14 rounded-xl object-cover bg-surface-700 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">
                    {product.name}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {product.brand} · {product.category.name}
                  </p>
                  <p className="text-white font-bold text-sm mt-1">
                    {formatPrice(product.price)}
                  </p>
                  <p
                    className={`text-xs mt-0.5 ${product.stock === 0 ? "text-red-400" : product.stock <= 5 ? "text-amber-400" : "text-green-400"}`}
                  >
                    {product.stock === 0
                      ? "Esgotado"
                      : `${product.stock} em estoque`}
                  </p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => openEdit(product)}
                    className="text-brand-400 text-xs font-medium cursor-pointer"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(product.id)}
                    className="text-red-400 text-xs font-medium cursor-pointer"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Modal de confirmação de delete */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-800 border border-surface-700 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-white mb-2">
              Confirmar exclusão
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Tem certeza que deseja deletar este produto? Esta ação não pode
              ser desfeita.
            </p>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                fullWidth
                onClick={() => setDeleteConfirm(null)}
              >
                Cancelar
              </Button>
              <Button
                variant="danger"
                fullWidth
                onClick={() => handleDelete(deleteConfirm)}
              >
                Deletar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
