import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useCepLookup } from "@/hooks/useCepLookup";
import { Address } from "@/types";
import { useToast } from "@/context/ToastContext";
import { formatPrice } from "@/utils/formatters";
import { Button } from "@/components/ui/Button";

type Step = "address" | "summary" | "confirmed";

const STATES = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

export function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { addToast } = useToast();
  const { lookupCep, loading: cepLoading } = useCepLookup();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("address");
  const [loading, setLoading] = useState(false);
  const [finalTotal, setFinalTotal] = useState(0);
  const [address, setAddress] = useState<Address>({
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  function handleAddressChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleCepBlur() {
    const result = await lookupCep(address.cep);
    if (result) {
      setAddress((prev) => ({ ...prev, ...result }));
      addToast("Endereço encontrado!", "success");
    } else if (address.cep.replace(/\D/g, "").length === 8) {
      addToast("Endereço não encontrado!", "error");
    }
  }

  function handleAddressSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("summary");
  }

  async function handleConfirmOrder() {
    setLoading(true);
    setFinalTotal(cart.total);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    setStep("confirmed");
    setLoading(false);
  }

  // Etapa confirmado

  if (step === "confirmed") {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6 px-4">
        <div className="w-20 h-20 bg-green-500/15 rounded-full flex items-center justify-center">
          <span className="text-4xl">✓</span>
        </div>

        <div className="text-center">
          <h1 className="text-3x1 font-extrabold text-white">
            Pedido Confirmado!
          </h1>
          <p className="text-gray-400 mt-2">
            Obrigado pela sua compra. Você receberá um email de confirmação em
            breve.
          </p>
        </div>

        <div className="bg-surface-800 border border-surface-700 rounded-2xl p-6 w-full max-w-sm text-sm text-gray-400 flex flex-col gap-2">
          <div className="flex justify-between">
            <span>Endereço</span>
            <span className="text-white text-right">
              {address.street}, {address.number} - {address.city}/
              {address.state}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Total pago</span>
            <span className="text-white font-bold">
              {formatPrice(finalTotal)}
            </span>
          </div>
        </div>
        <Button onClick={() => navigate("/")}>Voltar para a loja</Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Stepper */}
      <div className="flex items-center gap-4 mb-10">
        {(["address", "summary"] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <div
              className={[
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                step === s
                  ? "bg-brand-500 text-white"
                  : "bg-surface-700 text-gray-400",
              ].join(" ")}
            >
              {i + 1}
            </div>
            <span
              className={
                step === s
                  ? "text-white font-medium text-sm"
                  : "text-gray-500 text-sm"
              }
            >
              {s === "address" ? "Endereço" : "Resumo"}
            </span>
            {i < 1 && <div className="w-12 h-px bg-surface-700" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Conteúdo principal */}
        <div className="lg:col-span-2">
          {/* Etapa 1 - Endereço */}
          {step === "address" && (
            <form
              onSubmit={handleAddressSubmit}
              className="bg-surface-800 border border-surface-700 rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-6">
                Endereço de entrega
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* CEP */}
                <div className="sm:col-span-1">
                  <label className="text-sm text-gray-400 mb-1.5 block">
                    CEP
                  </label>
                  <input
                    type="text"
                    name="cep"
                    value={address.cep}
                    onChange={handleAddressChange}
                    onBlur={handleCepBlur}
                    placeholder="00000-000"
                    maxLength={9}
                    required
                    className="w-full bg-surface-700 border border-surface-600 focus:border-brand-500
                      rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors text-sm"
                  />
                  {cepLoading && (
                    <p className="text-xs text-brand-400 mt-1">
                      Buscando CEP...
                    </p>
                  )}
                </div>

                {/* Rua */}
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-400 mb-1.5 block">
                    Rua
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={handleAddressChange}
                    placeholder="Nome da rua"
                    required
                    className="w-full bg-surface-700 border border-surface-600 focus:border-brand-500
                      rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors text-sm"
                  />
                </div>

                {/* Número */}
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">
                    Número
                  </label>
                  <input
                    type="text"
                    name="number"
                    value={address.number}
                    onChange={handleAddressChange}
                    placeholder="123"
                    required
                    className="w-full bg-surface-700 border border-surface-600 focus:border-brand-500
                      rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors text-sm"
                  />
                </div>

                {/* Complemento */}
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">
                    Complemento
                  </label>
                  <input
                    type="text"
                    name="complement"
                    value={address.complement}
                    onChange={handleAddressChange}
                    placeholder="Apto, bloco... (opcional)"
                    className="w-full bg-surface-700 border border-surface-600 focus:border-brand-500
                      rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors text-sm"
                  />
                </div>

                {/* Bairro */}
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">
                    Bairro
                  </label>
                  <input
                    type="text"
                    name="neighborhood"
                    value={address.neighborhood}
                    onChange={handleAddressChange}
                    placeholder="Bairro"
                    required
                    className="w-full bg-surface-700 border border-surface-600 focus:border-brand-500
                      rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors text-sm"
                  />
                </div>

                {/* Cidade */}
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">
                    Cidade
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    placeholder="Cidade"
                    required
                    className="w-full bg-surface-700 border border-surface-600 focus:border-brand-500
                      rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors text-sm"
                  />
                </div>

                {/* Estado */}
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">
                    Estado
                  </label>
                  <select
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    required
                    className="w-full bg-surface-700 border border-surface-600 focus:border-brand-500
                      rounded-xl px-4 py-3 text-white outline-none transition-colors text-sm cursor-pointer"
                  >
                    <option value="">Selecione</option>
                    {STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Button fullWidth size="lg" type="submit" className="mt-6">
                Continuar
              </Button>
            </form>
          )}

          {/* Etapa 2 - Resumo*/}
          {step === "summary" && (
            <div className="bg-surface-800 border border-surface-700 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">
                Resumo do pedido
              </h2>

              <div className="flex flex-col gap-3 mb-6">
                {cart.items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3 items-center">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-14 h-14 rounded-xl object-cover bg-surface-700 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">
                        {product.name}
                      </p>
                      <p className="text-gray-500 text-xs">Qtd: {quantity}</p>
                    </div>
                    <p className="text-white font-semibold text-sm shrink-0">
                      {formatPrice(product.price * quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-surface-700 pt-4 mb-6">
                <p className="text-sm text-gray-400 font-medium mb-2">
                  Endereço de entrega
                </p>
                <p className="text-white text-sm">
                  {address.street}, {address.number}
                  {address.complement && ` — ${address.complement}`}
                </p>
                <p className="text-gray-400 text-sm">
                  {address.neighborhood} — {address.city}/{address.state} ·{" "}
                  {address.cep}
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setStep("address")}>
                  ← Voltar
                </Button>
                <Button
                  fullWidth
                  size="lg"
                  loading={loading}
                  onClick={handleConfirmOrder}
                >
                  Confirmar pedido
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar com total */}
        <div className="lg:col-span-1">
          <div className="bg-surface-800 border border-surface-700 rounded-2xl p-6 sticky top-24">
            <h3 className="text-white font-bold mb-4">Total do pedido</h3>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>
                  {cart.itemCount} {cart.itemCount === 1 ? "item" : "itens"}
                </span>
                <span>{formatPrice(cart.total)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Frete</span>
                <span className="text-green-400">Grátis</span>
              </div>
              <div className="border-t border-surface-700 pt-2 flex justify-between text-white font-bold">
                <span>Total</span>
                <span>{formatPrice(cart.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
