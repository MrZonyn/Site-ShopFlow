import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/Home";
import { ProductPage } from "@/pages/Product";
import { ProductsPage } from "@/pages/Products";
import { CartPage } from "@/pages/Cart";
import { CheckoutPage } from "@/pages/Checkout";
import { NotFound } from "@/pages/NotFound";
import { Header } from "@/components/Header";
import { LoginPage } from "@/pages/Login";
import { RegisterPage } from "@/pages/Register";
import { PrivateRoute } from "@/components/PrivateRoute";
import { AdminPage } from "./pages/Admin";
import { AdminRoute } from "./components/AdminRoute";
import { Footer } from "@/components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-surface-900 flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
