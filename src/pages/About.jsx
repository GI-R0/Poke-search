import React, { useEffect } from "react";

export default function About() {
  useEffect(() => {
    document.title = "Acerca de | PokeSearch";
  }, []);

  return (
    <section className="text-center py-10">
      <h1 className="text-3xl font-bold mb-4">Acerca de PokeSearch</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Este proyecto educativo utiliza la API pública de Pokémon (PokeAPI) para
        mostrar información sobre tus Pokémon favoritos.
        <br />
        Desarrollado 🧩 con React + TailwindCSS.
      </p>
    </section>
  );
}
