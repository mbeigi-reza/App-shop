// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Manto from "./pages/Manto";
import Shalvar from "./pages/Shalvar";
import Header from "./components/Header";
import Footer from "./components/Footer";

import BrandNike from "./pages/BrandNike";
import BrandAdidas from "./pages/BrandAdidas";
import BrandPuma from "./pages/BrandPuma";
import BrandReebok from "./pages/BrandReebok";
import BrandNB from "./pages/BrandNB";
import BrandConverse from "./pages/BrandConverse";

import Register from "./pages/Register";
import ProductsPage from "./pages/ProductsPage"; // ← اضافه شد

function App() {
  return (
    <Router>
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
          path="/manto"
          element={
            <>
              <Header />
              <Manto />
              <Footer />
            </>
          }
        />
        <Route
          path="/shalvar"
          element={
            <>
              <Header />
              <Shalvar />
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

        {/* برندها */}
        <Route
          path="/brand/nike"
          element={
            <>
              <Header />
              <BrandNike />
              <Footer />
            </>
          }
        />
        <Route
          path="/brand/adidas"
          element={
            <>
              <Header />
              <BrandAdidas />
              <Footer />
            </>
          }
        />
        <Route
          path="/brand/puma"
          element={
            <>
              <Header />
              <BrandPuma />
              <Footer />
            </>
          }
        />
        <Route
          path="/brand/reebok"
          element={
            <>
              <Header />
              <BrandReebok />
              <Footer />
            </>
          }
        />
        <Route
          path="/brand/nb"
          element={
            <>
              <Header />
              <BrandNB />
              <Footer />
            </>
          }
        />
        <Route
          path="/brand/converse"
          element={
            <>
              <Header />
              <BrandConverse />
              <Footer />
            </>
          }
        />

        {/* صفحه ثبت نام بدون Header */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
