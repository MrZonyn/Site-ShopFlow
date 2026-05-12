import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { useState } from "react";

export function RegisterPage() {
  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    if (form.password !== form.confirm) {
      addToast("As senhas não coincidem.", "error");
      return;
    }

    if (form.password.length < 6) {
      addToast("A senha deve ter pelo menos 6 caracteres.", "error");
      return;
    }

    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      addToast("Conta criada com sucesso!", "success");
      navigate("/");
    } catch {
      addToast("Falha no registro. Tente novamente.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 mt-7">
      <div className="w-full max-w-md bg-surface-800 border border-surface-700 rounded-2xl p-8 mb-8">
        <div className="text-center mb-8">
          <span className="text-4xl">🛍️</span>
          <h1 className="text-2xl font-bold text-white mt-3">Criar conta</h1>
          <p className="text-gray-400 text-sm mt-1">Junte-se ao ShopFlow</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">
              Nome completo
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Seu nome"
              required
              className="w-full bg-surface-700 border border-surface-600 focus:border-brand-500
                rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
              className="w-full bg-surface-700 border border-surface-600 focus:border-brand-500
                rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Senha</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              required
              className="w-full bg-surface-700 border border-surface-600 focus:border-brand-500
                rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">
              Confirmar senha
            </label>
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              placeholder="Repita a senha"
              required
              className="w-full bg-surface-700 border border-surface-600 focus:border-brand-500
                rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors text-sm"
            />
          </div>

          <Button
            fullWidth
            size="lg"
            loading={loading}
            type="submit"
            className="mt-2"
          >
            Criar conta
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Já tem conta?{" "}
          <Link
            to="/login"
            className="text-brand-400 hover:text-brand-300 font-medium"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
