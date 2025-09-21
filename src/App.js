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

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/manto" element={<Manto />} />
            <Route path="/shalvar" element={<Shalvar />} />

            <Route path="/brand/nike" element={<BrandNike />} />
            <Route path="/brand/adidas" element={<BrandAdidas />} />
            <Route path="/brand/puma" element={<BrandPuma />} />
            <Route path="/brand/reebok" element={<BrandReebok />} />
            <Route path="/brand/nb" element={<BrandNB />} />
            <Route path="/brand/converse" element={<BrandConverse />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
