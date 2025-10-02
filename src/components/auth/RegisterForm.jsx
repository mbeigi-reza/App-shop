import React, { useState } from 'react';
import AuthInput from './AuthInput';

const RegisterForm = ({ onSwitchToLogin, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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
      newErrors.username = 'نام کاربری الزامی است';
    } else if (formData.username.length < 3) {
      newErrors.username = 'نام کاربری باید حداقل ۳ کاراکتر باشد';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'ایمیل الزامی است';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'ایمیل معتبر نیست';
    }

    if (!formData.password) {
      newErrors.password = 'رمز عبور الزامی است';
    } else if (formData.password.length < 6) {
      newErrors.password = 'رمز عبور باید حداقل ۶ کاراکتر باشد';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'تکرار رمز عبور الزامی است';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'رمز عبور و تکرار آن یکسان نیستند';
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
          ایجاد حساب کاربری
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          اطلاعات خود را برای ثبت‌نام وارد کنید
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          label="نام کاربری"
          type="text"
          value={formData.username}
          onChange={(e) => handleChange('username', e.target.value)}
          error={errors.username}
          placeholder="username"
          required
        />

        <AuthInput
          label="ایمیل"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          placeholder="example@gmail.com"
          required
        />

        <AuthInput
          label="رمز عبور"
          type="password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          error={errors.password}
          placeholder="حداقل ۶ کاراکتر"
          required
        />

        <AuthInput
          label="تکرار رمز عبور"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          error={errors.confirmPassword}
          placeholder="رمز عبور خود را مجدد وارد کنید"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-amber-300/40"
        >
          {loading ? 'در حال ثبت‌نام...' : 'ایجاد حساب کاربری'}
        </button>

        <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-gray-600 dark:text-gray-400">
            قبلا ثبت‌نام کرده‌اید؟{' '}
          </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-amber-600 dark:text-amber-400 font-bold hover:text-amber-700 transition-colors"
          >
            وارد شوید
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;