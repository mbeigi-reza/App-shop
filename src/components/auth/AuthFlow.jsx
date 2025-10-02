import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import AuthAlert from './AuthAlert';

const AuthFlow = ({ isOpen, onClose }) => {
  const [currentView, setCurrentView] = useState('login');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const { login, register } = useAuth();

  const showAlert = (message, type = 'error') => {
    setAlert({ show: true, message, type });
  };

  const handleLogin = async (formData) => {
    setLoading(true);
    try {
      await login(formData.username, formData.password);
      showAlert('ورود موفقیت‌آمیز بود!', 'success');
      setTimeout(() => {
        onClose();
        setCurrentView('login');
      }, 1500);
    } catch (error) {
      showAlert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    setLoading(true);
    try {
      await register(formData);
      showAlert('ثبت‌نام موفقیت‌آمیز بود!', 'success');
      setTimeout(() => {
        onClose();
        setCurrentView('login');
      }, 1500);
    } catch (error) {
      showAlert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (formData) => {
    setLoading(true);
    try {
      // شبیه‌سازی ارسال ایمیل
      await new Promise(resolve => setTimeout(resolve, 1500));
      showAlert('لینک بازیابی رمز عبور به ایمیل شما ارسال شد.', 'success');
      setTimeout(() => {
        setCurrentView('login');
      }, 2000);
    } catch (error) {
      showAlert('خطا در ارسال لینک بازیابی. لطفا مجدد تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setCurrentView('login');
      setAlert({ show: false, message: '', type: '' });
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <>
      {alert.show && (
        <AuthAlert 
          message={alert.message} 
          type={alert.type} 
          onClose={() => setAlert({ show: false, message: '', type: '' })}
        />
      )}

      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden border border-amber-100 dark:border-gray-700 animate-slideUp">
          <div className="flex items-center justify-between p-6 border-b border-amber-100 dark:border-gray-700 bg-amber-50 dark:bg-gray-900/50">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              {currentView === 'login' && 'ورود به حساب کاربری'}
              {currentView === 'register' && 'ایجاد حساب کاربری'}
              {currentView === 'forgotPassword' && 'بازیابی رمز عبور'}
            </h2>
            <button 
              onClick={handleClose}
              className="p-1 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-amber-100 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="p-6 overflow-y-auto">
            {currentView === 'login' && (
              <LoginForm
                onSwitchToRegister={() => setCurrentView('register')}
                onSwitchToForgotPassword={() => setCurrentView('forgotPassword')}
                onSubmit={handleLogin}
                loading={loading}
              />
            )}

            {currentView === 'register' && (
              <RegisterForm
                onSwitchToLogin={() => setCurrentView('login')}
                onSubmit={handleRegister}
                loading={loading}
              />
            )}

            {currentView === 'forgotPassword' && (
              <ForgotPasswordForm
                onSwitchToLogin={() => setCurrentView('login')}
                onSubmit={handleForgotPassword}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthFlow;