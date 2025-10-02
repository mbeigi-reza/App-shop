// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { HashRouter } from "react-router-dom";
import './fonts/Almas.ttf'; // این خط رو اضافه کن

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </CartProvider>
  </React.StrictMode>
);