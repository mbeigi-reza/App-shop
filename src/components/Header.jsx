import Navbar from "./Navbar";
import Carousel from "./Carousel";

const Header = () => {
  return (
    <header className="relative w-full bg-white dark:bg-gray-900">
      <Navbar />
      <Carousel />
    </header>
  );
};

export default Header;