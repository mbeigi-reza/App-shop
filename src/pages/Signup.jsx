import React from "react";
import Footer from "../components/Footer";

const Signup = () => {
  return (
    <div className="bg-amber-50 min-h-screen flex flex-col justify-between">
      <div className="flex justify-center items-center flex-grow py-8">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-amber-200 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-8 text-amber-600">
            ثبت نام
          </h2>
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="نام"
              className="p-3 rounded-lg bg-amber-50 text-gray-800 border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-colors"
            />
            <input
              type="email"
              placeholder="ایمیل"
              className="p-3 rounded-lg bg-amber-50 text-gray-800 border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-colors"
            />
            <input
              type="password"
              placeholder="رمز عبور"
              className="p-3 rounded-lg bg-amber-50 text-gray-800 border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="p-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-300/40 transition-all duration-200 mt-4"
            >
              ثبت نام
            </button>
          </form>
          
          <p className="mt-6 text-center text-gray-600">
            قبلاً ثبت‌نام کرده‌اید؟{" "}
            <a href="/login" className="text-amber-600 hover:underline font-medium">
              وارد شوید
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
