import React from "react";
import Footer from "../components/Footer";

const Signup = () => {
  return (
    <div className="bg-[#1F1F1F] min-h-screen flex flex-col justify-between">
      <div className="flex justify-center items-center flex-grow">
        <div className="bg-[#2a2a2a] p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            ثبت نام
          </h2>
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="نام"
              className="p-3 rounded bg-[#1F1F1F] text-white border border-gray-600"
            />
            <input
              type="email"
              placeholder="ایمیل"
              className="p-3 rounded bg-[#1F1F1F] text-white border border-gray-600"
            />
            <input
              type="password"
              placeholder="رمز عبور"
              className="p-3 rounded bg-[#1F1F1F] text-white border border-gray-600"
            />
            <button
              type="submit"
              className="p-3 bg-[#FFD700] text-[#2a2a2a] font-bold rounded"
            >
              ثبت نام
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
