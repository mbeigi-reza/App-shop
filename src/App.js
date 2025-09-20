// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Manto from "./pages/Manto";
import Shalvar from "./pages/Shalvar";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      {/* کل صفحه به flex-col و حداقل ارتفاع صفحه */}
      <div className="flex flex-col min-h-screen">
        <Header /> {/* هدر و Navbar */}
        
        {/* محتوا */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/manto" element={<Manto />} />
            <Route path="/shalvar" element={<Shalvar />} />
          </Routes>
        </main>

        <Footer /> {/* فوتر همیشه پایین */}
      </div>
    </Router>
  );
}

export default App;
