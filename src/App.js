import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Manto from "./pages/Manto";
import Shalvar from "./pages/Shalvar";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header /> {/* هدر و Navbar همیشه بالای صفحات هست */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manto" element={<Manto />} />
        <Route path="/shalvar" element={<Shalvar />} />
        {/* بقیه صفحات هم اضافه میشن */}
      </Routes>
    </Router>
  );
}

export default App;
