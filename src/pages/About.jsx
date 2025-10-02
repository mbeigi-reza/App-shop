import React from "react";
import { FiUsers, FiAward, FiTruck, FiHeart, FiStar, FiShield } from "react-icons/fi";

const About = () => {
  const features = [
    {
      icon: <FiAward className="w-8 h-8" />,
      title: "کیفیت برتر",
      description: "تمامی محصولات ما با بالاترین استانداردهای کیفیت تولید شده‌اند"
    },
    {
      icon: <FiTruck className="w-8 h-8" />,
      title: "ارسال سریع",
      description: "تحویل در کمترین زمان ممکن در سراسر کشور"
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "ضمانت بازگشت",
      description: "گارانتی 7 روزه بازگشت وجه برای تمامی محصولات"
    },
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: "پشتیبانی 24/7",
      description: "پشتیبانی تمام وقت برای پاسخگویی به سوالات شما"
    }
  ];

  const team = [
    {
      name: "علی محمدی",
      role: "مدیر عامل",
      image: "👨‍💼",
      description: "بنیانگذار اسپرت‌لند با 10 سال تجربه در صنعت ورزشی"
    },
    {
      name: "سارا احمدی",
      role: "مدیر فروش",
      image: "👩‍💼",
      description: "متخصص در زمینه بازاریابی و مدیریت فروش آنلاین"
    },
    {
      name: "رضا کریمی",
      role: "متخصص محصول",
      image: "👨‍🔧",
      description: "کارشناس ارشد بررسی کیفیت و انتخاب محصولات"
    }
  ];

  const stats = [
    { number: "۵۰۰۰+", label: "مشتری راضی" },
    { number: "۳ سال", label: "تجربه موفق" },
    { number: "۱۰۰+", label: "محصول متنوع" },
    { number: "۹۸%", label: "رضایت مشتری" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 pt-20" dir="rtl">
      {/* هیرو سکشن */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
            درباره <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">اسپرت‌لند</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
            فروشگاه تخصصی تجهیزات ورزشی و اسکیت با هدف ارائه بهترین محصولات و خدمات به علاقه‌مندان ورزش
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* داستان ما */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-right">داستان ما</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg leading-relaxed text-right">
                اسپرت‌لند در سال ۱۴۰۰ با یک ماموریت ساده آغاز به کار کرد: 
                <span className="text-amber-600 dark:text-amber-400 font-semibold"> ایجاد دسترسی آسان به تجهیزات ورزشی با کیفیت برای همه ایرانیان</span>.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg leading-relaxed text-right">
                ما معتقدیم ورزش باید در دسترس همه باشد و تجهیزات مناسب می‌تواند تفاوت بزرگی در تجربه ورزشی ایجاد کند.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed text-right">
                امروز با افتخار به یکی از معتبرترین فروشگاه‌های آنلاین تجهیزات ورزشی تبدیل شده‌ایم و به هزاران مشتری در سراسر کشور خدمات ارائه می‌دهیم.
              </p>
            </div>
            <div className="relative order-1 md:order-2">
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-8 text-white text-center shadow-2xl">
                <FiStar className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">چرا ما را انتخاب کنید؟</h3>
                <ul className="space-y-3 text-lg text-right">
                  <li className="flex items-center gap-2">
                    <FiShield className="w-5 h-5 flex-shrink-0" />
                    <span>محصولات اورجینال و با کیفیت</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiAward className="w-5 h-5 flex-shrink-0" />
                    <span>قیمت‌های منصفانه و رقابتی</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiHeart className="w-5 h-5 flex-shrink-0" />
                    <span>پشتیبانی حرفه‌ای و دلسوز</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiTruck className="w-5 h-5 flex-shrink-0" />
                    <span>تحویل سریع در سراسر کشور</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* آمار و ارقام */}
      <section className="py-16 px-4 bg-amber-50 dark:bg-gray-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            در یک نگاه
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ویژگی‌ها */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            چرا اسپرت‌لند؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-amber-50 dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-amber-500 dark:text-amber-400 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* تیم ما */}
      <section className="py-16 px-4 bg-amber-50 dark:bg-gray-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            تیم ما
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {member.name}
                </h3>
                <div className="text-amber-500 dark:text-amber-400 font-medium mb-3">
                  {member.role}
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            به خانواده اسپرت‌لند بپیوندید
          </h2>
          <p className="text-xl mb-8 opacity-90">
            همین حالا تجربه خرید آسان و مطمئن را با ما آغاز کنید
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-amber-600 rounded-lg font-bold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl">
              مشاهده محصولات
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-amber-600 transition-all duration-200">
              تماس با ما
            </button>
          </div>
        </div>
      </section>

      {/* فوتر */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © ۱۴۰۳ - تمامی حقوق برای اسپرت‌لند محفوظ است
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;