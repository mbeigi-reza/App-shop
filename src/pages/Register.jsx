import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/RegisterForm.css";


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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-black p-4">
      <ToastContainer />
      <div className="bg-[#1F1F1F] w-full max-w-md p-8 rounded-lg shadow-lg">
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
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
                    className="w-full px-4 py-2 rounded bg-gray-900 text-white focus:outline-none"
                  />
                  {errors.username && (
                    <p className="text-red-400 text-sm">
                      {errors.username.message}
                    </p>
                  )}

                  <input
                    type="email"
                    placeholder="ایمیل"
                    {...register("email", {
                      required: "ایمیل الزامی است",
                    })}
                    className="w-full px-4 py-2 rounded bg-gray-900 text-white focus:outline-none"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm">
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
                  className="w-full px-4 py-2 rounded bg-gray-900 text-white focus:outline-none"
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
                    className="w-full px-4 py-2 rounded bg-gray-900 text-white focus:outline-none"
                  />
                  {errors.password && (
                    <p className="text-red-400 text-sm">
                      {errors.password.message}
                    </p>
                  )}

                  <input
                    type="password"
                    placeholder="تکرار رمز عبور"
                    {...register("confirmPassword", {
                      required: "تکرار رمز عبور الزامی است",
                    })}
                    className="w-full px-4 py-2 rounded bg-gray-900 text-white focus:outline-none"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </>
              )}

              <button
                type="submit"
                className="w-full bg-yellow-400 text-black py-2 rounded font-bold hover:opacity-90 transition"
              >
                {registerStep === 1
                  ? "ادامه"
                  : registerStep === 2
                  ? "تأیید ایمیل"
                  : "ثبت‌نام نهایی"}
              </button>
            </form>

            <p className="mt-4 text-center text-gray-400">
              ثبت‌نام کردید؟{" "}
              <span
                onClick={() => setStep(2)}
                className="text-yellow-400 cursor-pointer hover:underline"
              >
                ورود
              </span>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
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
                className="w-full px-4 py-2 rounded bg-gray-900 text-white focus:outline-none"
              />
              {errors.login && (
                <p className="text-red-400 text-sm">{errors.login.message}</p>
              )}

              <input
                type="password"
                placeholder="رمز عبور"
                {...register("password", { required: "رمز عبور الزامی است" })}
                className="w-full px-4 py-2 rounded bg-gray-900 text-white focus:outline-none"
              />
              {errors.password && (
                <p className="text-red-400 text-sm">{errors.password.message}</p>
              )}

              <button
                type="submit"
                className="w-full bg-yellow-400 text-black py-2 rounded font-bold hover:opacity-90 transition"
              >
                ورود
              </button>
            </form>

            <p className="mt-4 text-center text-gray-400">
              فراموشی رمز عبور؟{" "}
              <span className="text-yellow-400 cursor-pointer hover:underline">
                کلیک کنید
              </span>
            </p>

            <p className="mt-2 text-center text-gray-400">
              ثبت‌نام نکردید؟{" "}
              <span
                onClick={() => setStep(1)}
                className="text-yellow-400 cursor-pointer hover:underline"
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
