import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff, FiCheck, FiX } from "react-icons/fi";

const AuthForm = () => {
  const [step, setStep] = useState(1); 
  const [registerStep, setRegisterStep] = useState(1); 
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [usernameList] = useState(["ali", "reza", "test"]);
  const [userData, setUserData] = useState(null);
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const otpInputs = useRef([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const watchPassword = watch("password", "");
  const watchNewPassword = watch("newPassword", "");

  // مدیریت OTP - کاملاً بهینه شده
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // حرکت به اینپوت بعدی - با تاخیر برای جلوگیری از re-render
    if (value !== "" && index < 3) {
      setTimeout(() => {
        if (otpInputs.current[index + 1]) {
          otpInputs.current[index + 1].focus();
        }
      }, 10);
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otpValues[index] === "" && index > 0) {
        // برگشت به اینپوت قبلی
        setTimeout(() => {
          if (otpInputs.current[index - 1]) {
            otpInputs.current[index - 1].focus();
          }
        }, 10);
      } else if (otpValues[index] !== "") {
        // پاک کردن مقدار فعلی
        const newOtpValues = [...otpValues];
        newOtpValues[index] = "";
        setOtpValues(newOtpValues);
      }
    }
  };

  const getOtpString = () => otpValues.join("");

  // اعتبارسنجی‌ها
  const emailValidation = {
    required: "ایمیل الزامی است",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "فرمت ایمیل نامعتبر است"
    }
  };

  const passwordValidation = {
    required: "رمز عبور الزامی است",
    minLength: {
      value: 8,
      message: "رمز عبور باید حداقل ۸ کاراکتر باشد"
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: "رمز عبور باید شامل حروف کوچک، بزرگ و اعداد باشد"
    }
  };

  const usernameValidation = {
    required: "نام کاربری الزامی است",
    minLength: {
      value: 3,
      message: "نام کاربری باید حداقل ۳ کاراکتر باشد"
    },
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: "نام کاربری فقط می‌تواند شامل حروف انگلیسی، اعداد و زیرخط باشد"
    }
  };

  const showError = (message) =>
    toast.error(message, { position: "top-right", autoClose: 4000 });
  const showSuccess = (message) =>
    toast.success(message, { position: "top-right", autoClose: 4000 });

  // بررسی قدرت رمز عبور
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: "ضعیف", color: "bg-red-500" };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    if (strength <= 2) return { strength, text: "ضعیف", color: "bg-red-500" };
    if (strength <= 3) return { strength, text: "متوسط", color: "bg-yellow-500" };
    return { strength, text: "قوی", color: "bg-green-500" };
  };

  // بررسی شرایط رمز عبور
  const getPasswordConditions = (password) => [
    {
      met: password.length >= 8,
      text: "حداقل ۸ کاراکتر"
    },
    {
      met: /[a-z]/.test(password),
      text: "حرف کوچک انگلیسی"
    },
    {
      met: /[A-Z]/.test(password),
      text: "حرف بزرگ انگلیسی"
    },
    {
      met: /\d/.test(password),
      text: "حداقل یک عدد"
    }
  ];

  const onRegisterSubmit = (data) => {
    if (registerStep === 1) {
      if (usernameList.includes(data.username)) {
        showError("این نام کاربری قبلاً انتخاب شده است.");
        return;
      }
      showSuccess("کد تأیید به ایمیل شما ارسال شد.");
      setRegisterStep(2);
      return;
    }

    if (registerStep === 2) {
      const otp = getOtpString();
      if (otp !== "1234") {
        showError("کد تأیید اشتباه است.");
        return;
      }
      showSuccess("ایمیل تأیید شد.");
      setRegisterStep(3);
      setOtpValues(["", "", "", ""]);
      return;
    }

    if (registerStep === 3) {
      if (data.password !== data.confirmPassword) {
        showError("رمز عبور و تکرار آن یکسان نیست.");
        return;
      }
      showSuccess("ثبت‌نام با موفقیت انجام شد!");
      navigate("/"); 
    }
  };

  const onLoginSubmit = (data) => {
    if (!data.login || !data.password) {
      showError("تمام فیلدها الزامی است.");
      return;
    }
    showSuccess(`ورود با ${data.login} موفقیت‌آمیز بود!`);
    navigate("/"); 
  };

  const onForgotPasswordSubmit = (data) => {
    if (forgotPasswordStep === 1) {
      if (!data.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        showError("لطفاً یک ایمیل معتبر وارد کنید.");
        return;
      }
      showSuccess("کد بازیابی به ایمیل شما ارسال شد.");
      setForgotPasswordStep(2);
      return;
    }

    if (forgotPasswordStep === 2) {
      const otp = getOtpString();
      if (otp !== "1234") {
        showError("کد بازیابی اشتباه است.");
        return;
      }
      showSuccess("کد تأیید شد.");
      setUserData({ username: "کاربر تست", email: data.email });
      setForgotPasswordStep(3);
      setOtpValues(["", "", "", ""]);
      return;
    }

    if (forgotPasswordStep === 3) {
      if (data.newPassword !== data.confirmNewPassword) {
        showError("رمز عبور و تکرار آن یکسان نیست.");
        return;
      }
      showSuccess("رمز عبور با موفقیت تغییر کرد!");
      setStep(2);
      setForgotPasswordStep(1);
    }
  };

  const resetForgotPassword = () => {
    setForgotPasswordStep(1);
    setUserData(null);
    setOtpValues(["", "", "", ""]);
  };

  // کامپوننت OTP جداگانه برای جلوگیری از re-render
  const OtpInput = () => {
    // focus روی اولین اینپوت وقتی کامپوننت mount شد
    useEffect(() => {
      if (otpInputs.current[0]) {
        otpInputs.current[0].focus();
      }
    }, []);

    return (
      <div className="space-y-4">
        <div className="text-center mb-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            کد ۴ رقمی ارسال شده به ایمیل را وارد کنید
          </p>
        </div>
        
        <div className="flex justify-center gap-3">
          {otpValues.map((value, index) => (
            <input
              key={index}
              ref={(el) => (otpInputs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={value}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(index, e)}
              onFocus={(e) => e.target.select()}
              className="w-16 h-16 text-center text-2xl font-bold rounded-lg bg-amber-50 dark:bg-gray-700 border border-amber-200 dark:border-gray-600 text-gray-800 dark:text-white focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-500/30 focus:outline-none transition-colors"
            />
          ))}
        </div>
        
        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              setOtpValues(["", "", "", ""]);
              if (otpInputs.current[0]) {
                otpInputs.current[0].focus();
              }
            }}
            className="text-amber-600 dark:text-amber-400 hover:underline text-sm"
          >
            پاک کردن کد
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-amber-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <ToastContainer />
      <div className="bg-white dark:bg-gray-800 w-full max-w-md p-6 rounded-xl shadow-lg border border-amber-200 dark:border-gray-700">
        
        {step === 3 ? (
          <>
            <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-6 text-center">
              بازیابی رمز عبور
            </h2>
            <form onSubmit={handleSubmit(onForgotPasswordSubmit)} className="space-y-4">
              {forgotPasswordStep === 1 && (
                <div>
                  <input
                    type="email"
                    placeholder="ایمیل خود را وارد کنید"
                    {...register("email", emailValidation)}
                    className="w-full px-4 py-3 rounded-lg bg-amber-50 dark:bg-gray-700 border border-amber-200 dark:border-gray-600 text-gray-800 dark:text-white focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-500/30 focus:outline-none transition-colors"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              )}

              {forgotPasswordStep === 2 && (
                <OtpInput />
              )}

              {forgotPasswordStep === 3 && userData && (
                <>
                  <div className="bg-amber-50 dark:bg-gray-700 border border-amber-200 dark:border-gray-600 rounded-lg p-4 mb-4">
                    <p className="text-amber-700 dark:text-amber-400 font-semibold">
                      نام کاربری: {userData.username}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                      لطفاً رمز عبور جدید خود را وارد کنید
                    </p>
                  </div>

                  {/* فیلد رمز عبور جدید */}
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="رمز عبور جدید"
                        {...register("newPassword", passwordValidation)}
                        className="w-full px-4 py-3 pl-12 rounded-lg bg-amber-50 dark:bg-gray-700 border border-amber-200 dark:border-gray-600 text-gray-800 dark:text-white focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-500/30 focus:outline-none transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                      >
                        {showNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                      </button>
                    </div>

                    {/* نمایش قدرت رمز عبور */}
                    {watchNewPassword && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">قدرت رمز:</span>
                          <span className={`font-medium ${
                            getPasswordStrength(watchNewPassword).strength <= 2 ? "text-red-500" : 
                            getPasswordStrength(watchNewPassword).strength <= 3 ? "text-yellow-500" : "text-green-500"
                          }`}>
                            {getPasswordStrength(watchNewPassword).text}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              getPasswordStrength(watchNewPassword).strength <= 2 ? "bg-red-500 w-1/3" : 
                              getPasswordStrength(watchNewPassword).strength <= 3 ? "bg-yellow-500 w-2/3" : "bg-green-500 w-full"
                            }`}
                          />
                        </div>

                        <div className="space-y-1">
                          {getPasswordConditions(watchNewPassword).map((condition, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs">
                              {condition.met ? (
                                <FiCheck className="text-green-500 flex-shrink-0" size={14} />
                              ) : (
                                <FiX className="text-red-500 flex-shrink-0" size={14} />
                              )}
                              <span className={condition.met ? "text-green-600 dark:text-green-400" : "text-gray-500"}>
                                {condition.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {errors.newPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
                    )}
                  </div>
                  
                  <div className="relative">
                    <input
                      type={showConfirmNewPassword ? "text" : "password"}
                      placeholder="تکرار رمز عبور جدید"
                      {...register("confirmNewPassword", { 
                        required: "تکرار رمز عبور الزامی است",
                        validate: value => 
                          value === getValues("newPassword") || "رمز عبور و تکرار آن یکسان نیست"
                      })}
                      className="w-full px-4 py-3 pl-12 rounded-lg bg-amber-50 dark:bg-gray-700 border border-amber-200 dark:border-gray-600 text-gray-800 dark:text-white focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-500/30 focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                    >
                      {showConfirmNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                  </div>
                  {errors.confirmNewPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword.message}</p>
                  )}
                </>
              )}

              <button
                type="submit"
                className="w-full bg-amber-500 dark:bg-amber-600 text-white py-3 rounded-lg font-bold hover:bg-amber-600 dark:hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-300/40 dark:hover:shadow-amber-500/30 transition-all duration-200"
              >
                {forgotPasswordStep === 1
                  ? "ارسال کد بازیابی"
                  : forgotPasswordStep === 2
                  ? "تأیید کد"
                  : "تغییر رمز عبور"}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
              <span
                onClick={resetForgotPassword}
                className="text-amber-600 dark:text-amber-400 cursor-pointer hover:underline font-medium"
              >
                بازگشت به ورود
              </span>
            </p>
          </>
        ) : step === 1 ? (
          <>
            <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-6 text-center">
              ثبت‌نام
            </h2>
            <form onSubmit={handleSubmit(onRegisterSubmit)} className="space-y-4">
              {registerStep === 1 && (
                <>
                  <div>
                    <input
                      type="text"
                      placeholder="نام کاربری"
                      {...register("username", usernameValidation)}
                      className="w-full px-4 py-3 rounded-lg bg-amber-50 dark:bg-gray-700 border border-amber-200 dark:border-gray-600 text-gray-800 dark:text-white focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-500/30 focus:outline-none transition-colors"
                    />
                    {errors.username && (
                      <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="ایمیل"
                      {...register("email", emailValidation)}
                      className="w-full px-4 py-3 rounded-lg bg-amber-50 dark:bg-gray-700 border border-amber-200 dark:border-gray-600 text-gray-800 dark:text-white focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-500/30 focus:outline-none transition-colors"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </>
              )}

              {registerStep === 2 && (
                <OtpInput />
              )}

              {registerStep === 3 && (
                <>
                  {/* فیلد رمز عبور اصلی */}
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="رمز عبور"
                        {...register("password", passwordValidation)}
                        className="w-full px-4 py-3 pl-12 rounded-lg bg-amber-50 dark:bg-gray-700 border border-amber-200 dark:border-gray-600 text-gray-800 dark:text-white focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-500/30 focus:outline-none transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                      >
                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                      </button>
                    </div>

                    {/* نمایش قدرت رمز عبور */}
                    {watchPassword && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">قدرت رمز:</span>
                          <span className={`font-medium ${
                            getPasswordStrength(watchPassword).strength <= 2 ? "text-red-500" : 
                            getPasswordStrength(watchPassword).strength <= 3 ? "text-yellow-500" : "text-green-500"
                          }`}>
                            {getPasswordStrength(watchPassword).text}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              getPasswordStrength(watchPassword).strength <= 2 ? "bg-red-500 w-1/3" : 
                              getPasswordStrength(watchPassword).strength <= 3 ? "bg-yellow-500 w-2/3" : "bg-green-500 w-full"
                            }`}
                          />
                        </div>

                        <div className="space-y-1">
                          {getPasswordConditions(watchPassword).map((condition, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs">
                              {condition.met ? (
                                <FiCheck className="text-green-500 flex-shrink-0" size={14} />
                              ) : (
                                <FiX className="text-red-500 flex-shrink-0" size={14} />
                              )}
                              <span className={condition.met ? "text-green-600 dark:text-green-400" : "text-gray-500"}>
                                {condition.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                  </div>
                  
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="تکرار رمز عبور"
                      {...register("confirmPassword", { 
                        required: "تکرار رمز عبور الزامی است",
                        validate: value => 
                          value === getValues("password") || "رمز عبور و تکرار آن یکسان نیست"
                      })}
                      className="w-full px-4 py-3 pl-12 rounded-lg bg-amber-50 dark:bg-gray-700 border border-amber-200 dark:border-gray-600 text-gray-800 dark:text-white focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-500/30 focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                    >
                      {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                  )}
                </>
              )}

              <button
                type="submit"
                className="w-full bg-amber-500 dark:bg-amber-600 text-white py-3 rounded-lg font-bold hover:bg-amber-600 dark:hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-300/40 dark:hover:shadow-amber-500/30 transition-all duration-200"
              >
                {registerStep === 1
                  ? "ادامه"
                  : registerStep === 2
                  ? "تأیید ایمیل"
                  : "ثبت‌نام نهایی"}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
              ثبت‌نام کردید؟{" "}
              <span
                onClick={() => setStep(2)}
                className="text-amber-600 dark:text-amber-400 cursor-pointer hover:underline font-medium"
              >
                ورود
              </span>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-6 text-center">
              ورود
            </h2>
            <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="ایمیل یا نام کاربری"
                  {...register("login", { required: "این فیلد الزامی است" })}
                  className="w-full px-4 py-3 rounded-lg bg-amber-50 dark:bg-gray-700 border border-amber-200 dark:border-gray-600 text-gray-800 dark:text-white focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-500/30 focus:outline-none transition-colors"
                />
                {errors.login && (
                  <p className="text-red-500 text-sm mt-1">{errors.login.message}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="رمز عبور"
                  {...register("password", { required: "رمز عبور الزامی است" })}
                  className="w-full px-4 py-3 pl-12 rounded-lg bg-amber-50 dark:bg-gray-700 border border-amber-200 dark:border-gray-600 text-gray-800 dark:text-white focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-500/30 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}

              <button
                type="submit"
                className="w-full bg-amber-500 dark:bg-amber-600 text-white py-3 rounded-lg font-bold hover:bg-amber-600 dark:hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-300/40 dark:hover:shadow-amber-500/30 transition-all duration-200"
              >
                ورود
              </button>
            </form>

            <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
              فراموشی رمز عبور؟{" "}
              <span 
                onClick={() => setStep(3)}
                className="text-amber-600 dark:text-amber-400 cursor-pointer hover:underline font-medium"
              >
                کلیک کنید
              </span>
            </p>

            <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
              ثبت‌نام نکردید؟{" "}
              <span
                onClick={() => setStep(1)}
                className="text-amber-600 dark:text-amber-400 cursor-pointer hover:underline font-medium"
              >
                ثبت‌نام
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;