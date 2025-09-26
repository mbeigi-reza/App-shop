// src/pages/ProductsPage.jsx
import ProductCard from "../components/ProductCard";

const products = [
  {
    id: 1,
    title: "مانتو مجلسی",
    price: 450000,
    imgSrc: "https://via.placeholder.com/200x250?text=Manto",
  },
  {
    id: 2,
    title: "شلوار جین",
    price: 320000,
    imgSrc: "https://via.placeholder.com/200x250?text=Shalvar",
  },
  {
    id: 3,
    title: "کت پاییزه",
    price: 670000,
    imgSrc: "https://via.placeholder.com/200x250?text=Jacket",
  },
];

const ProductsPage = () => {
  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          title={p.title}
          price={p.price}
          imgSrc={p.imgSrc}
        />
      ))}
    </div>
  );
};

export default ProductsPage;
