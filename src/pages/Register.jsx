import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const checkPasswordStrength = (password) => {
    setPasswordStrength({
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'نام کاربری الزامی است';
    } else if (formData.username.length < 3) {
      newErrors.username = 'نام کاربری باید حداقل ۳ کاراکتر باشد';
    } else if (/[آ-ی]/.test(formData.username)) {
      newErrors.username = 'نام کاربری باید انگلیسی باشد';
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
      newErrors.username = 'نام کاربری فقط می‌تواند شامل حروف انگلیسی، عدد، - و _ باشد';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'ایمیل الزامی است';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'فرمت ایمیل نامعتبر است';
    }

    if (!formData.password) {
      newErrors.password = 'رمز عبور الزامی است';
    } else if (formData.password.length < 8) {
      newErrors.password = 'رمز عبور باید حداقل ۸ کاراکتر باشد';
    } else if (!passwordStrength.lowercase || !passwordStrength.uppercase || 
               !passwordStrength.number || !passwordStrength.special) {
      newErrors.password = 'رمز عبور باید شامل حروف کوچک، بزرگ، عدد و کاراکتر خاص باشد';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'تکرار رمز عبور الزامی است';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'رمز عبور و تکرار آن یکسان نیستند';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      try {
        await register(formData);
        toast.success('ثبت‌نام موفقیت‌آمیز بود!');
        navigate('/');
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'password') {
      checkPasswordStrength(value);
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getPasswordStrengthColor = (condition) => {
    return condition ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500';
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
            ایجاد حساب کاربری
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            اطلاعات خود را برای ثبت‌نام وارد کنید
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-amber-100 dark:border-gray-700 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                نام کاربری
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                  errors.username 
                    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                    : 'border-gray-300 dark:border-gray-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-200'
                } focus:outline-none`}
                placeholder="username"
                dir="ltr"
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.username}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ایمیل
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                  errors.email 
                    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                    : 'border-gray-300 dark:border-gray-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-200'
                } focus:outline-none`}
                placeholder="example@gmail.com"
                dir="ltr"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                رمز عبور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className={`w-full px-4 py-3 pl-10 rounded-lg border transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                    errors.password 
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                      : 'border-gray-300 dark:border-gray-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-200'
                  } focus:outline-none`}
                  placeholder="حداقل ۸ کاراکتر"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amber-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              
              <div className="mt-2 space-y-1">
                <div className={`text-xs ${getPasswordStrengthColor(passwordStrength.length)}`}>
                  ✓ حداقل ۸ کاراکتر
                </div>
                <div className={`text-xs ${getPasswordStrengthColor(passwordStrength.lowercase)}`}>
                  ✓ حروف کوچک انگلیسی (a-z)
                </div>
                <div className={`text-xs ${getPasswordStrengthColor(passwordStrength.uppercase)}`}>
                  ✓ حروف بزرگ انگلیسی (A-Z)
                </div>
                <div className={`text-xs ${getPasswordStrengthColor(passwordStrength.number)}`}>
                  ✓ عدد (0-9)
                </div>
                <div className={`text-xs ${getPasswordStrengthColor(passwordStrength.special)}`}>
                  ✓ کاراکتر خاص (!@#$%^&*)
                </div>
              </div>

              {errors.password && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                تکرار رمز عبور
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  className={`w-full px-4 py-3 pl-10 rounded-lg border transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                    errors.confirmPassword 
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                      : 'border-gray-300 dark:border-gray-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-200'
                  } focus:outline-none`}
                  placeholder="رمز عبور خود را مجدد وارد کنید"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amber-600 transition-colors"
                >
                  {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.confirmPassword}
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
                  در حال ثبت‌نام...
                </div>
              ) : (
                'ایجاد حساب کاربری'
              )}
            </button>

            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                قبلا ثبت‌نام کرده‌اید؟{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-amber-600 dark:text-amber-400 font-bold hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                >
                  وارد شوید
                </button>
              </p>
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

export default Register;