const Navbar = () => {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav aria-label="Navegación principal" className="relative z-50 bg-white dark:bg-gray-800 shadow-md h-20" ref={navRef}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-full">
          
          <Link to="/" className="flex items-center no-underline group" onClick={() => setOpen(false)}>
            <span className="text-blue-600 dark:text-blue-400 text-xl font-black tracking-tighter uppercase transition-transform group-hover:scale-105">
              POKESEARCH
            </span>
          </Link>

          <button
            ref={toggleBtnRef}
            className="ml-auto inline-flex md:hidden items-center p-2 text-gray-600 dark:text-gray-200"
            onClick={toggleMenu}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-current transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-current transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-current transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-blue-500 font-medium transition-colors">Inicio</Link>
            <Link to="/search" className="hover:text-blue-500 font-medium transition-colors">Buscar</Link>
            <Link to="/about" className="hover:text-blue-500 font-medium transition-colors">Acerca</Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:ring-2 ring-blue-400 transition-all"
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>
          </div>

          <div
            className={`fixed top-20 right-0 h-screen bg-white dark:bg-gray-800 p-8 flex flex-col gap-6 w-72 z-50 shadow-2xl md:hidden transition-all duration-300 ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <Link ref={firstMobileLinkRef} to="/" className="text-lg font-bold border-b pb-2" onClick={() => setOpen(false)}>Inicio</Link>
            <Link to="/search" className="text-lg font-bold border-b pb-2" onClick={() => setOpen(false)}>Buscar</Link>
            <Link to="/about" className="text-lg font-bold border-b pb-2" onClick={() => setOpen(false)}>Acerca</Link>
            <button
              onClick={() => { toggleTheme(); setOpen(false); }}
              className="mt-4 w-full py-3 bg-gray-100 dark:bg-gray-700 rounded-xl"
            >
              Cambiar Modo {theme === "dark" ? "Claro ☀️" : "Oscuro 🌙"}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};