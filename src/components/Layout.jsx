// src/components/Layout.jsx
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main className="pt-16"> {/* فاصله از ناوبار */}
        {children}
      </main>
    </div>
  );
};

export default Layout;