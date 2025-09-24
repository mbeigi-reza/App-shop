import React from "react";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* بخش فرم */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">ورود</h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">نام کاربری</label>
              <input
                type="text"
                placeholder="نام کاربری خود را وارد کنید"
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">رمز عبور</label>
              <input
                type="password"
                placeholder="رمز عبور خود را وارد کنید"
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
            >
              ورود
            </button>
          </form>

          {/* لینک ثبت نام */}
          <p className="text-sm text-gray-500 mt-4 text-center">
            ثبت نام نکردید؟{" "}
            <a href="/register" className="text-yellow-400 hover:underline">
              ثبت نام
            </a>
          </p>
        </div>
      </div>

      {/* فوتر */}
      <footer className="bg-gray-900 text-white p-4 text-center">
        © 2025 فروشگاه من | طراحی شده با ❤️
      </footer>
    </div>
  );
};

export default Register;
