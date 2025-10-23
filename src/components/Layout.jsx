import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = React.memo(({ children }) => {
  return (
    <div
      className="min-h-screen flex flex-col bg-blue-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300"
      role="presentation"
    >
      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <main
        className="flex-1 container mx-auto px-4 py-8 antialiased"
        role="main"
        aria-label="Contenido principal"
      >
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
});

export default Layout;
