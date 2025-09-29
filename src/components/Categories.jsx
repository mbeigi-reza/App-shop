import { Link } from "react-router-dom";
import img1 from "../images/category1.png";
import img2 from "../images/category2.png";
import img3 from "../images/category3.png";
import img4 from "../images/category4.png";
import img5 from "../images/category5.png";
import img6 from "../images/category6.png";

const categories = [
  { img: img1, link: "/brand/nike" },
  { img: img2, link: "/brand/adidas" },
  { img: img3, link: "/brand/puma" },
  { img: img4, link: "/brand/reebok" },
  { img: img5, link: "/brand/nb" },
  { img: img6, link: "/brand/converse" },
];

const Categories = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold mb-8 border-b-4 border-amber-500 dark:border-amber-400 pb-2 inline-block text-gray-800 dark:text-white">
        دسته‌بندی‌ها
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((cat, index) => (
          <Link 
            key={index} 
            to={cat.link} 
            className="group block"
          >
            <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-amber-100 dark:border-gray-700 shadow-sm hover:shadow-xl dark:hover:shadow-gray-700/30 transition-all duration-300 group-hover:border-amber-300 dark:group-hover:border-amber-500">
              <img
                src={cat.img}
                alt={`category-${index}`}
                className="w-full aspect-square object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              {/* Overlay طلایی */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 dark:from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;