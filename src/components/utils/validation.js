export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // حداقل 8 کاراکتر، شامل حروف بزرگ، کوچک، عدد و کاراکتر خاص
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validateUsername = (username) => {
  return username.length >= 3 && username.length <= 20;
};

export const validatePhone = (phone) => {
  const phoneRegex = /^09[0-9]{9}$/;
  return phoneRegex.test(phone);
};