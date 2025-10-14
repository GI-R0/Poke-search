import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    // 1. Contenedor principal
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      
      {/* 2. Área principal de contenido que crecerá (flex-1) */}
      <main className="flex-1 container mx-auto px-4 py-8 antialiased">
        {children} {/* ⬅️ Aquí se renderiza el contenido de la página */}
      </main> 
      
      {/* 3. Footer al final */}
      <Footer />
    </div> 
  );
}