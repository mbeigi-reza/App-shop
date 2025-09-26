import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CartProvider } from "./context/CartContext"; // ⬅️ اینو اضافه کن

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>   {/* ⬅️ اینجا کل اپ رو پیچیدیم */}
      <App />
    </CartProvider>
  </React.StrictMode>
);
