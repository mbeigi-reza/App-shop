import React from "react";
import Footer from "../components/Footer";

const Signup = () => {
  return (
    <div className="bg-amber-50 dark:bg-gray-900 min-h-screen flex flex-col justify-between">
      <div className="flex justify-center items-center flex-grow py-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-amber-200 dark:border-gray-700 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-8 text-amber-600 dark:text-amber-400">
            ثبت نام
          </h2>
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="نام"
              className="p-3 rounded-lg bg-amber-50 dark:bg-gray-700 text-gray-800 dark:text-white border border-amber-200 dark:border-gray-600 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-500/30 focus:outline-none transition-colors"
            />
            <input
              type="email"
              placeholder="ایمیل"
              className="p-3 rounded-lg bg-amber-50 dark:bg-gray-700 text-gray-800 dark:text-white border border-amber-200 dark:border-gray-600 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-500/30 focus:outline-none transition-colors"
            />
            <input
              type="password"
              placeholder="رمز عبور"
              className="p-3 rounded-lg bg-amber-50 dark:bg-gray-700 text-gray-800 dark:text-white border border-amber-200 dark:border-gray-600 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-500/30 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="p-3 bg-amber-500 dark:bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-600 dark:hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-300/40 dark:hover:shadow-amber-500/30 transition-all duration-200 mt-4"
            >
              ثبت نام
            </button>
          </form>
          
          <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
            قبلاً ثبت‌نام کرده‌اید؟{" "}
            <a href="/login" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">
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