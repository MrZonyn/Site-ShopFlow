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
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { PageTransition } from "./components/PageTransition";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-surface-900 flex flex-col">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <HomePage />
                </PageTransition>
              }
            />
            <Route
              path="/product/:id"
              element={
                <PageTransition>
                  <ProductPage />
                </PageTransition>
              }
            />
            <Route
              path="/products"
              element={
                <PageTransition>
                  <ProductsPage />
                </PageTransition>
              }
            />
            <Route
              path="/cart"
              element={
                <PageTransition>
                  <CartPage />
                </PageTransition>
              }
            />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <PageTransition>
                    <CheckoutPage />
                  </PageTransition>
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PageTransition>
                  <LoginPage />
                </PageTransition>
              }
            />
            <Route
              path="/register"
              element={
                <PageTransition>
                  <RegisterPage />
                </PageTransition>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <PageTransition>
                    <AdminPage />
                  </PageTransition>
                </AdminRoute>
              }
            />
            <Route
              path="*"
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
