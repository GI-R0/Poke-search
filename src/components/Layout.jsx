
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen"> 
      <header className="header" role="banner" aria-label="Barra superior"> 
        <Navbar />
      </header>
      
      <main className="flex-grow container mx-auto px-4" style={{ paddingTop: "calc(var(--header-height) + 0.5rem)" }}>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout; 
