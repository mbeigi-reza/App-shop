import React, { useEffect } from 'react';
import { FiCheckCircle, FiXCircle, FiX } from 'react-icons/fi';

const AuthAlert = ({ message, type = 'error', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-200 dark:border-green-800',
          text: 'text-green-800 dark:text-green-300',
          icon: <FiCheckCircle className="text-green-500" size={20} />
        };
      case 'error':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
          text: 'text-red-800 dark:text-red-300',
          icon: <FiXCircle className="text-red-500" size={20} />
        };
      default:
        return {
          bg: 'bg-amber-50 dark:bg-amber-900/20',
          border: 'border-amber-200 dark:border-amber-800',
          text: 'text-amber-800 dark:text-amber-300',
          icon: <FiXCircle className="text-amber-500" size={20} />
        };
    }
  };

  const styles = getAlertStyles();

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md ${styles.bg} ${styles.border} border rounded-lg shadow-lg animate-slideDown`}>
      <div className="flex items-start p-4">
        <div className="flex-shrink-0 ml-3">
          {styles.icon}
        </div>
        <div className={`flex-1 ${styles.text} text-sm font-medium`}>
          {message}
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 mr-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FiX size={18} />
        </button>
      </div>
    </div>
  );
};

export default AuthAlert;