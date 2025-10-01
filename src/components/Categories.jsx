import { Link } from "react-router-dom";

import skateboardImg from "../images/categories/skateboard.jpg";
import inlineSkateImg from "../images/categories/inline-skates.jpg";
import surfboardImg from "../images/categories/surfboard.jpg";
import heelysImg from "../images/categories/heelys.jpg";
import iceSkateImg from "../images/categories/ice-skate.jpg";
import accessoriesImg from "../images/categories/accessories.jpg";

const categories = [
  { img: skateboardImg, link: "/skateboard", },
  { img: inlineSkateImg, link: "/inline-skates",},
  { img: surfboardImg, link: "/surfboard",},
  { img: heelysImg, link: "/heelys",},
  { img: iceSkateImg, link: "/ice-skates",},
  { img: accessoriesImg, link: "/accessories",},
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
                alt={cat.name}
                className="w-full aspect-square object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              {/* Overlay طلایی */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 dark:from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <p className="text-center mt-2 text-gray-700 dark:text-gray-300 font-medium">{cat.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;