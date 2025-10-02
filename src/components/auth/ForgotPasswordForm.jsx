import React, { useState } from 'react';
import AuthInput from './AuthInput';

const ForgotPasswordForm = ({ onSwitchToLogin, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    email: ''
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

    if (!formData.email.trim()) {
      newErrors.email = 'ایمیل الزامی است';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'ایمیل معتبر نیست';
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
          بازیابی رمز عبور
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          ایمیل خود را وارد کنید تا لینک بازیابی برای شما ارسال شود
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          label="ایمیل"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          placeholder="example@gmail.com"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-amber-300/40"
        >
          {loading ? 'در حال ارسال...' : 'ارسال لینک بازیابی'}
        </button>

        <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-amber-600 dark:text-amber-400 font-bold hover:text-amber-700 transition-colors"
          >
            بازگشت به صفحه ورود
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;