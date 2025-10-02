import React, { useState } from 'react';
import AuthInput from './AuthInput';

const LoginForm = ({ onSwitchToRegister, onSwitchToForgotPassword, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'نام کاربری یا ایمیل الزامی است';
    }

    if (!formData.password) {
      newErrors.password = 'رمز عبور الزامی است';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          ورود به حساب کاربری
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          خوش آمدید! لطفا اطلاعات خود را وارد کنید
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          label="نام کاربری یا ایمیل"
          type="text"
          value={formData.username}
          onChange={(e) => handleChange('username', e.target.value)}
          error={errors.username}
          placeholder="username یا example@gmail.com"
          required
        />

        <AuthInput
          label="رمز عبور"
          type="password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          error={errors.password}
          placeholder="••••••••"
          required
        />

        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={onSwitchToForgotPassword}
            className="text-amber-600 dark:text-amber-400 hover:text-amber-700 transition-colors font-medium"
          >
            رمز عبور را فراموش کرده‌اید؟
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-amber-300/40"
        >
          {loading ? 'در حال ورود...' : 'ورود به حساب'}
        </button>

        <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-gray-600 dark:text-gray-400">
            حساب کاربری ندارید؟{' '}
          </span>
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-amber-600 dark:text-amber-400 font-bold hover:text-amber-700 transition-colors"
          >
            ثبت‌نام کنید
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;