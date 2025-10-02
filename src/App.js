import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import FeaturedProducts from "./pages/FeaturedProducts";
import RecommendedProducts from "./pages/RecommendedProducts";
import Skateboard from "./pages/Skateboard";
import InlineSkates from "./pages/InlineSkates";
import Surfboard from "./pages/Surfboard";
import Heelys from "./pages/Heelys";
import IceSkates from "./pages/IceSkates";
import Accessories from "./pages/Accessories";
import About from "./pages/About";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-amber-50 dark:bg-gray-900 transition-colors duration-300">
          <Routes>
            {/* صفحاتی که Header می‌خواهند */}
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Home />
                  <Footer />
                </>
              }
            />
            <Route
              path="/products"
              element={
                <>
                  <Header />
                  <ProductsPage />
                  <Footer />
                </>
              }
            />
            
            <Route
              path="/featured-products"
              element={
                <>
                  <Header />
                  <FeaturedProducts />
                  <Footer />
                </>
              }
            />
            <Route
              path="/recommended-products"
              element={
                <>
                  <Header />
                  <RecommendedProducts />
                  <Footer />
                </>
              }
            />

            <Route
              path="/skateboard"
              element={
                <>
                  <Header />
                  <Skateboard />
                  <Footer />
                </>
              }
            />
            <Route
              path="/inline-skates"
              element={
                <>
                  <Header />
                  <InlineSkates />
                  <Footer />
                </>
              }
            />
            <Route
              path="/surfboard"
              element={
                <>
                  <Header />
                  <Surfboard />
                  <Footer />
                </>
              }
            />
            <Route
              path="/heelys"
              element={
                <>
                  <Header />
                  <Heelys />
                  <Footer />
                </>
              }
            />
            <Route
              path="/ice-skates"
              element={
                <>
                  <Header />
                  <IceSkates />
                  <Footer />
                </>
              }
            />
            <Route
              path="/accessories"
              element={
                <>
                  <Header />
                  <Accessories />
                  <Footer />
                </>
              }
            />

            <Route
              path="/about"
              element={
                <>
                  <Header />
                  <About />
                  <Footer />
                </>
              }
            />

            {/* صفحات احراز هویت - بدون Header و Footer */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* صفحه محصول - فقط Footer */}
            <Route
              path="/product/:id"
              element={
                <>
                  <ProductDetail />
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;