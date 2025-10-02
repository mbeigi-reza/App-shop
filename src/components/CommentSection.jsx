// src/components/CommentSection.jsx
import React, { useState, useEffect} from "react";
import { FiStar, FiSend, FiEdit3, FiTrash2, FiHeart, FiUser, FiShield } from "react-icons/fi";

// ایجاد Context برای مدیریت کاربر
const AuthContext = React.createContext();

// هوک ساده برای مدیریت کاربر
const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // در حالت واقعی اینجا از localStorage یا API کاربر رو می‌گیری
    const currentUser = {
      id: 3, // ادمین
      username: "admin",
      name: "مدیر سایت",
      role: "admin"
    };
    setUser(currentUser);
  }, []);

  return { user };
};

const CommentSection = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  // API Base URL - اگر JSON Server اجرا نیست از localStorage استفاده می‌کنه
  const API_BASE = "http://localhost:3001";

  // بررسی اینکه کاربر ادمین هست یا نه
  const isAdmin = user?.role === 'admin';

  // دریافت کامنت‌ها از JSON Server یا localStorage
  useEffect(() => {
    const fetchComments = async () => {
      try {
        // اول سعی کن از JSON Server بگیر
        const response = await fetch(`${API_BASE}/comments?productId=${productId}`);
        if (response.ok) {
          const data = await response.json();
          setComments(data);
          // ذخیره در localStorage برای پشتیبان
          localStorage.setItem(`comments_${productId}`, JSON.stringify(data));
        } else {
          throw new Error('سرور در دسترس نیست');
        }
      } catch (error) {
        console.log('استفاده از localStorage به دلیل:', error.message);
        // اگر سرور در دسترس نبود، از localStorage استفاده کن
        const savedComments = localStorage.getItem(`comments_${productId}`);
        if (savedComments) {
          setComments(JSON.parse(savedComments));
        } else {
          // داده‌های اولیه
          setComments([
            {
              id: 1,
              productId: parseInt(productId),
              userId: 1,
              user: "علی محمدی",
              rating: 5,
              text: "محصول فوق‌العاده‌ای هست! کیفیت ساخت عالی و حمل و نقل سریع",
              date: "۱۴۰۲/۱۰/۱۵",
              likes: 12,
              isLiked: false
            },
            {
              id: 2,
              productId: parseInt(productId),
              userId: 2,
              user: "سارا احمدی",
              rating: 4,
              text: "راضی هستم اما رنگ محصول کمی با عکس تفاوت داشت",
              date: "۱۴۰۲/۱۰/۱۰",
              likes: 8,
              isLiked: true
            }
          ]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [productId]);

  // ارسال کامنت جدید
  const handleAddComment = async () => {
    if (!newComment.trim() || rating === 0) return;

    setSubmitting(true);

    const commentData = {
      productId: parseInt(productId),
      userId: user?.id || 0, // اگر کاربر لاگین نکرده، 0
      user: user?.name || "کاربر مهمان",
      rating: rating,
      text: newComment.trim(),
      date: new Date().toLocaleDateString('fa-IR'),
      likes: 0,
      isLiked: false
    };

    try {
      // سعی کن به JSON Server ارسال کنی
      const response = await fetch(`${API_BASE}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      let savedComment;
      
      if (response.ok) {
        savedComment = await response.json();
      } else {
        // اگر سرور جواب نداد، locally بساز
        savedComment = {
          ...commentData,
          id: Date.now()
        };
      }

      const updatedComments = [savedComment, ...comments];
      setComments(updatedComments);
      localStorage.setItem(`comments_${productId}`, JSON.stringify(updatedComments));
      
      setNewComment("");
      setRating(0);
      
    } catch (error) {
      console.error('خطا در ارسال نظر:', error);
      // حالت آفلاین
      const localComment = {
        ...commentData,
        id: Date.now()
      };
      const updatedComments = [localComment, ...comments];
      setComments(updatedComments);
      localStorage.setItem(`comments_${productId}`, JSON.stringify(updatedComments));
      setNewComment("");
      setRating(0);
    } finally {
      setSubmitting(false);
    }
  };

  // لایک کردن کامنت
  const handleLike = async (commentId) => {
    const updatedComments = comments.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked
          }
        : comment
    );
    
    setComments(updatedComments);
    localStorage.setItem(`comments_${productId}`, JSON.stringify(updatedComments));

    // آپدیت در سرور اگر در دسترس باشد
    try {
      const commentToUpdate = updatedComments.find(c => c.id === commentId);
      await fetch(`${API_BASE}/comments/${commentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          likes: commentToUpdate.likes,
          isLiked: commentToUpdate.isLiked 
        }),
      });
    } catch (error) {
      console.log('آپدیت لایک در حالت آفلاین انجام شد');
    }
  };

  // حذف کامنت - فقط برای ادمین
  const handleDeleteComment = async (commentId) => {
    if (!isAdmin) {
      alert('فقط مدیر سایت می‌تواند نظرات را حذف کند');
      return;
    }

    if (!window.confirm('آیا از حذف این نظر مطمئن هستید؟')) return;

    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
    localStorage.setItem(`comments_${productId}`, JSON.stringify(updatedComments));

    // حذف از سرور اگر در دسترس باشد
    try {
      await fetch(`${API_BASE}/comments/${commentId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.log('حذف نظر در حالت آفلاین انجام شد');
    }
  };

  // محاسبه میانگین امتیاز
  const averageRating = comments.length > 0 
    ? (comments.reduce((sum, comment) => sum + comment.rating, 0) / comments.length).toFixed(1)
    : 0;

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-8 shadow-lg border border-amber-100 dark:border-gray-700 mt-8 text-center">
        <div className="animate-pulse">
          <div className="h-6 bg-amber-200 dark:bg-amber-800 rounded w-1/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-4">در حال بارگذاری نظرات...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-6 shadow-lg border border-amber-100 dark:border-gray-700 mt-8">
      {/* هدر با وضعیت کاربر */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400 border-b-4 border-amber-500 dark:border-amber-400 pb-2 inline-block">
          نظرات کاربران
        </h3>
        
        {/* نمایش وضعیت کاربر */}
        <div className="flex items-center gap-2 text-sm">
          {isAdmin ? (
            <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full">
              <FiShield size={14} />
              <span>مدیر سایت</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full">
              <FiUser size={14} />
              <span>کاربر مهمان</span>
            </div>
          )}
        </div>
      </div>

      {/* آمار کلی */}
      <div className="bg-amber-50 dark:bg-gray-700 rounded-xl p-4 mb-6 border border-amber-200 dark:border-gray-600">
        <div className="flex justify-between items-center text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{comments.length}</div>
            <div className="text-gray-600 dark:text-gray-400">تعداد نظرات</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{averageRating}</div>
            <div className="text-gray-600 dark:text-gray-400">میانگین امتیاز</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {comments.reduce((sum, comment) => sum + comment.likes, 0)}
            </div>
            <div className="text-gray-600 dark:text-gray-400">تعداد لایک‌ها</div>
          </div>
        </div>
      </div>

      {/* فرم ارسال نظر */}
      <div className="bg-amber-50 dark:bg-gray-700 rounded-xl p-6 mb-8 border border-amber-200 dark:border-gray-600">
        <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-4 text-right text-lg">
          نظر خود را بنویسید
        </h4>
        
        {/* سیستم امتیازدهی */}
        <div className="flex items-center gap-2 mb-4 justify-end">
          <span className="text-gray-700 dark:text-gray-300 font-medium ml-4">امتیاز:</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="text-2xl transition-transform duration-200 hover:scale-110"
              >
                <FiStar
                  className={`${
                    star <= (hoverRating || rating)
                      ? "fill-amber-500 text-amber-500"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            ({rating > 0 ? `${rating} از 5` : "انتخاب کنید"})
          </span>
        </div>

        {/* فیلد نظر */}
        <div className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="نظر خود را در مورد این محصول بنویسید..."
            maxLength={500}
            className="w-full h-32 px-4 py-3 rounded-lg bg-white dark:bg-gray-600 border border-amber-200 dark:border-gray-500 text-gray-800 dark:text-white focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-500/30 focus:outline-none transition-colors resize-none text-right"
          />
          <div className="text-left text-sm text-gray-500 dark:text-gray-400 mt-1">
            {newComment.length}/500 کاراکتر
          </div>
        </div>

        {/* دکمه ارسال */}
        <div className="flex justify-end">
          <button
            onClick={handleAddComment}
            disabled={!newComment.trim() || rating === 0 || submitting}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-200 ${
              !newComment.trim() || rating === 0 || submitting
                ? "bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed"
                : "bg-amber-500 dark:bg-amber-600 text-white hover:bg-amber-600 dark:hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-300/40 dark:hover:shadow-amber-500/30 hover:scale-105"
            }`}
          >
            {submitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                در حال ارسال...
              </>
            ) : (
              <>
                <FiSend size={18} />
                ارسال نظر
              </>
            )}
          </button>
        </div>
      </div>

      {/* لیست نظرات */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-12">
            <FiEdit3 className="mx-auto text-4xl text-gray-400 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              هنوز نظری برای این محصول ثبت نشده است.
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
              اولین نفری باشید که نظر می‌دهد!
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 border border-amber-100 dark:border-gray-600 hover:shadow-md transition-all duration-200 hover:border-amber-300 dark:hover:border-amber-500 relative"
            >
              {/* بج حذف برای ادمین */}
              {isAdmin && (
                <div className="absolute left-3 top-3">
                  <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <FiShield size={10} />
                    قابل حذف
                  </div>
                </div>
              )}

              {/* هدر کامنت */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  {/* ستاره‌ها */}
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FiStar
                        key={star}
                        className={`text-sm ${
                          star <= comment.rating
                            ? "fill-amber-500 text-amber-500"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      {comment.user}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {comment.rating}/5 امتیاز
                    </span>
                  </div>
                </div>
                
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {comment.date}
                </span>
              </div>

              {/* متن کامنت */}
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-right">
                {comment.text}
              </p>

              {/* فوتر کامنت */}
              <div className="flex items-center justify-between pt-3 border-t border-amber-100 dark:border-gray-600">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className={`flex items-center gap-1 text-sm transition-all duration-200 ${
                      comment.isLiked
                        ? "text-amber-500 dark:text-amber-400 transform scale-110"
                        : "text-gray-500 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400"
                    }`}
                  >
                    <FiHeart 
                      className={comment.isLiked ? "fill-amber-500" : ""} 
                      size={16} 
                    />
                    <span>{comment.likes}</span>
                  </button>
                  
                  {/* دکمه حذف - فقط برای ادمین */}
                  {isAdmin && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                      title="حذف نظر (فقط مدیر)"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>امتیاز:</span>
                  <span className="font-bold">{comment.rating}/5</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* وضعیت اتصال و اطلاعات */}
      <div className="mt-6 pt-6 border-t border-amber-100 dark:border-gray-600">
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <span>
            {comments.length > 0 ? `${comments.length} نظر` : "بدون نظر"}
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${navigator.onLine ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              {navigator.onLine ? 'آنلاین' : 'آفلاین'}
            </span>
            {isAdmin && (
              <span className="text-green-600 dark:text-green-400">
                حالت مدیریت فعال
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;