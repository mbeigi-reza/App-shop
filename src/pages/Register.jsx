import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthForm = () => {
  const [step, setStep] = useState(1); 
  const [registerStep, setRegisterStep] = useState(1); 
  const [usernameList] = useState(["ali", "reza", "test"]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const showError = (message) =>
    toast.error(message, { position: "top-right", autoClose: 3000 });
  const showSuccess = (message) =>
    toast.success(message, { position: "top-right", autoClose: 3000 });

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
      if (data.otp !== "1234") {
        showError("کد تأیید اشتباه است.");
        return;
      }
      showSuccess("ایمیل تأیید شد.");
      setRegisterStep(3);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-amber-50 to-amber-100 p-4">
      <ToastContainer />
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg border border-amber-200">
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold text-amber-600 mb-6 text-center">
              ثبت‌نام
            </h2>
            <form
              onSubmit={handleSubmit(onRegisterSubmit)}
              className="space-y-4"
            >
              {registerStep === 1 && (
                <>
                  <input
                    type="text"
                    placeholder="نام کاربری"
                    {...register("username", {
                      required: "نام کاربری الزامی است",
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-amber-50 border border-amber-200 text-gray-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-colors"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm">
                      {errors.username.message}
                    </p>
                  )}

                  <input
                    type="email"
                    placeholder="ایمیل"
                    {...register("email", {
                      required: "ایمیل الزامی است",
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-amber-50 border border-amber-200 text-gray-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-colors"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </>
              )}

              {registerStep >= 2 && (
                <input
                  type="text"
                  placeholder="کد تأیید (1234)"
                  {...register("otp", { required: "کد الزامی است" })}
                  className="w-full px-4 py-3 rounded-lg bg-amber-50 border border-amber-200 text-gray-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-colors"
                  disabled={registerStep > 2}
                />
              )}

              {registerStep >= 3 && (
                <>
                  <input
                    type="password"
                    placeholder="رمز عبور"
                    {...register("password", {
                      required: "رمز عبور الزامی است",
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-amber-50 border border-amber-200 text-gray-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-colors"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}

                  <input
                    type="password"
                    placeholder="تکرار رمز عبور"
                    {...register("confirmPassword", {
                      required: "تکرار رمز عبور الزامی است",
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-amber-50 border border-amber-200 text-gray-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-colors"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </>
              )}

              <button
                type="submit"
                className="w-full bg-amber-500 text-white py-3 rounded-lg font-bold hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-300/40 transition-all duration-200"
              >
                {registerStep === 1
                  ? "ادامه"
                  : registerStep === 2
                  ? "تأیید ایمیل"
                  : "ثبت‌نام نهایی"}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              ثبت‌نام کردید؟{" "}
              <span
                onClick={() => setStep(2)}
                className="text-amber-600 cursor-pointer hover:underline font-medium"
              >
                ورود
              </span>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-amber-600 mb-6 text-center">
              ورود
            </h2>
            <form
              onSubmit={handleSubmit(onLoginSubmit)}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="ایمیل یا نام کاربری"
                {...register("login", { required: "این فیلد الزامی است" })}
                className="w-full px-4 py-3 rounded-lg bg-amber-50 border border-amber-200 text-gray-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-colors"
              />
              {errors.login && (
                <p className="text-red-500 text-sm">{errors.login.message}</p>
              )}

              <input
                type="password"
                placeholder="رمز عبور"
                {...register("password", { required: "رمز عبور الزامی است" })}
                className="w-full px-4 py-3 rounded-lg bg-amber-50 border border-amber-200 text-gray-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-colors"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}

              <button
                type="submit"
                className="w-full bg-amber-500 text-white py-3 rounded-lg font-bold hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-300/40 transition-all duration-200"
              >
                ورود
              </button>
            </form>

            <p className="mt-4 text-center text-gray-600">
              فراموشی رمز عبور؟{" "}
              <span className="text-amber-600 cursor-pointer hover:underline font-medium">
                کلیک کنید
              </span>
            </p>

            <p className="mt-2 text-center text-gray-600">
              ثبت‌نام نکردید؟{" "}
              <span
                onClick={() => setStep(1)}
                className="text-amber-600 cursor-pointer hover:underline font-medium"
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
