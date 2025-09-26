import { useState } from "react";
import { X, Plus, Minus } from "lucide-react"; // آیکون‌ها

const Cart = () => {
  // ✅ داده نمونه (می‌تونی بعداً از Context یا API پرش کنی)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "مانتو مشکی", price: 300000, quantity: 1, image: "/images/manto.jpg" },
    { id: 2, name: "شلوار جین", price: 200000, quantity: 2, image: "/images/jeans.jpg" },
  ]);

  // ✅ حذف محصول
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // ✅ افزایش تعداد
  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // ✅ کاهش تعداد
  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // ✅ جمع کل
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-lg mx-auto p-6 bg-[#1F1F1F] text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">سبد خرید</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-400 text-center">سبد خرید شما خالی است</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-gray-900 rounded-lg p-3 shadow relative"
            >
              {/* دکمه حذف */}
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-2 left-2 text-red-500 hover:text-red-700"
              >
                <X size={18} />
              </button>

              {/* جزئیات محصول */}
              <div className="flex items-center space-x-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded object-cover"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-400">
                    قیمت: {item.price.toLocaleString()} تومان
                  </p>
                </div>
              </div>

              {/* تعداد */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="bg-gray-700 p-1 rounded hover:bg-gray-600"
                >
                  <Minus size={16} />
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="bg-gray-700 p-1 rounded hover:bg-gray-600"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* جمع کل */}
          <div className="flex justify-between items-center border-t border-gray-700 pt-4">
            <span className="text-lg font-bold">جمع کل:</span>
            <span className="text-yellow-400 font-extrabold">
              {totalPrice.toLocaleString()} تومان
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
