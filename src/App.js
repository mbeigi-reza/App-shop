// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./pages/AuthForm";
import AuthForm from "./pages/AuthForm"; // این خط رو اضافه کن
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
    <>
      <Routes>
        {/* صفحات معمولی با Header و Footer */}
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
        
        {/* صفحات جدید محصولات ویژه و پیشنهادی */}
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

        {/* صفحات جدید اسکیت */}
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

        {/* صفحه درباره ما */}
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

        {/* صفحه ثبت نام ساده */}
        <Route path="/register" element={<Register />} />

        {/* صفحه لاگین/ثبت‌نام پیشرفته */}
        <Route path="/login" element={<AuthForm />} />

        {/* صفحه جزئیات محصول با Footer ولی بدون Header */}
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
    </>
  );
}

export default App;