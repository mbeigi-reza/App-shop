import { Link } from "react-router-dom";
import img1 from "../images/category1.png";
import img2 from "../images/category2.png";
import img3 from "../images/category3.png";
import img4 from "../images/category4.png";
import img5 from "../images/category5.png";
import img6 from "../images/category6.png";

const categories = [
  { img: img1, link: "/manto" },
  { img: img2, link: "/shalvar" },
  { img: img3, link: "/accessory" },
  { img: img4, link: "/shoes" },
  { img: img5, link: "/hats" },
  { img: img6, link: "/bags" },
];

const Categories = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat, index) => (
          <Link key={index} to={cat.link} className="group block">
            <img
              src={cat.img}
              alt={`category-${index}`}
              className="w-full h-32 sm:h-40 lg:h-48 object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
