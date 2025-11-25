import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = React.memo(({ children }) => {
  return (
    <div
      className="min-h-screen flex flex-col bg-blue-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300"
      role="presentation"
    >
      <Navbar />

      <nav
        aria-label="Navegación principal del sitio"
        className="w-full flex justify-center mt-4"
      >
        <ul className="flex items-center gap-6">
          <li>
            <Link
              to="/"
              className="text-lg font-medium text-gray-900 dark:text-gray-100 hover:underline px-4"
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/search"
              className="text-lg font-medium text-gray-900 dark:text-gray-100 hover:underline px-4"
            >
              Buscar
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-lg font-medium text-gray-900 dark:text-gray-100 hover:underline px-4"
            >
              Acerca
            </Link>
          </li>
        </ul>
      </nav>

      <main
        className="flex-1 container mx-auto px-4 py-8 antialiased"
        role="main"
        aria-label="Contenido principal del sitio"
      >
        {children}
      </main>

      <Footer />
    </div>
  );
});

export default Layout;
