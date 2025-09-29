import { useState } from "react";
import { X, Plus, Minus } from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "مانتو مشکی", price: 300000, quantity: 1, image: "/images/manto.jpg" },
    { id: 2, name: "شلوار جین", price: 200000, quantity: 2, image: "/images/jeans.jpg" },
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl shadow-lg border border-amber-100 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-amber-600 dark:text-amber-400 border-b-4 border-amber-500 dark:border-amber-400 pb-2">
        🛒 سبد خرید
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">سبد خرید شما خالی است</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-amber-50 dark:bg-gray-700 border border-amber-200 dark:border-gray-600 rounded-lg p-4 shadow-sm relative hover:shadow-md dark:hover:shadow-gray-600/30 transition-all duration-200"
            >
              {/* دکمه حذف */}
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-3 left-3 text-red-500 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30"
              >
                <X size={18} />
              </button>

              {/* جزئیات محصول */}
              <div className="flex items-center space-x-4 mr-8">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover border border-amber-200 dark:border-gray-600"
                />
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">{item.name}</h3>
                  <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                    {item.price.toLocaleString()} تومان
                  </p>
                </div>
              </div>

              {/* تعداد */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="bg-amber-500 dark:bg-amber-600 text-white p-1 rounded-lg hover:bg-amber-600 dark:hover:bg-amber-700 transition-colors shadow-sm"
                >
                  <Minus size={16} />
                </button>
                <span className="px-3 font-bold min-w-8 text-center text-gray-800 dark:text-white">
                  {item.quantity}
                </span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="bg-amber-500 dark:bg-amber-600 text-white p-1 rounded-lg hover:bg-amber-600 dark:hover:bg-amber-700 transition-colors shadow-sm"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* جمع کل */}
          <div className="flex justify-between items-center border-t border-amber-200 dark:border-gray-600 pt-4 mt-4">
            <span className="text-lg font-bold text-gray-800 dark:text-white">جمع کل:</span>
            <span className="text-amber-600 dark:text-amber-400 font-extrabold text-xl">
              {totalPrice.toLocaleString()} تومان
            </span>
          </div>

          {/* دکمه پرداخت */}
          <button className="w-full bg-amber-500 dark:bg-amber-600 text-white py-3 rounded-lg font-bold hover:bg-amber-600 dark:hover:bg-amber-700 transition-all duration-200 shadow-md hover:shadow-amber-300/40 dark:hover:shadow-amber-500/30 mt-4">
            ادامه فرآیند خرید
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;