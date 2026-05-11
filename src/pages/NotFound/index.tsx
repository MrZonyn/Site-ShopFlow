import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface-900 text-white">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <p className="text-xl mb-8">Página não encontrada</p>
      <Button onClick={() => navigate("/")}>Voltar para Home</Button>
    </div>
  );
}
