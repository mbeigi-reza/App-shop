import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('ایمیل الزامی است');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('فرمت ایمیل نامعتبر است');
      return;
    }

    setLoading(true);
    try {
      // شبیه‌سازی ارسال ایمیل
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('لینک بازیابی رمز عبور به ایمیل شما ارسال شد');
      navigate('/login');
    } catch (error) {
      toast.error('خطا در ارسال لینک بازیابی');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-amber-900/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link 
            to="/" 
            className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent inline-block mb-4"
          >
            SportLand
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            بازیابی رمز عبور
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            ایمیل خود را وارد کنید تا لینک بازیابی برای شما ارسال شود
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-amber-100 dark:border-gray-700 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ایمیل
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                  error 
                    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                    : 'border-gray-300 dark:border-gray-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-200'
                } focus:outline-none`}
                placeholder="example@gmail.com"
                dir="ltr"
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-400 text-white font-bold rounded-lg transition-all duration-200 shadow-md hover:shadow-amber-300/40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                  در حال ارسال...
                </div>
              ) : (
                'ارسال لینک بازیابی'
              )}
            </button>

            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-amber-600 dark:text-amber-400 font-bold hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
              >
                بازگشت به صفحه ورود
              </button>
            </div>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors text-sm"
          >
            ← بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;