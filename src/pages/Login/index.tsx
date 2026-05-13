import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { useState } from "react";

export function LoginPage() {
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      addToast("Login bem-sucedido!", "success");
      navigate("/");
    } catch (error: any) {
      if (error.code === "ENCONNABORTED") {
        addToast("Servidor demorando para responder, Tente novamente", "error");
      } else if (error.response?.data?.message) {
        addToast(error.response.data.message, "error");
      } else {
        addToast("Error ao criar conta, Tente novamente.", "error");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 mt-7">
      <div className="w-full max-w-md bg-surface-800 border border-surface-700 rounded-2xl p-8">
        <div className="text-center mb-8">
          <span className="text-4x1">🛍️</span>
          <h1 className="text-2xl font-bold text-white mt-3">Login</h1>
          <p className="text-gray-400 text-sm mt-1">Bem-vindo de volta!</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">E-mail</label>
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
              placeholder="••••••••"
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
            Entrar
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6 mb-4">
          Não tem conta?{" "}
          <Link
            to="/register"
            className="text-brand-400 hover:text-brand-300 font-medium"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
