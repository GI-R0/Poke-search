import React from "react";
import { useMetaTags } from "../hooks/useMetaTags";

export default function About() {
  useMetaTags(
    "Acerca de PokeSearch",
    "Descubre más sobre PokeSearch, una aplicación moderna para explorar el mundo de Pokémon usando la PokeAPI."
  );

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white text-center mb-6">
        Acerca de PokeSearch
      </h1>

      <div className="bg-white/70 dark:bg-zinc-900/40 backdrop-blur rounded-2xl border border-gray-200/60 dark:border-zinc-800 p-6 md:p-8 space-y-5">
        <p className="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-200">
          PokeSearch es una aplicación web moderna que te permite explorar el
          fascinante mundo de Pokémon. Navega por una colección de criaturas,
          busca tus favoritos por nombre o ID, y descubre información detallada
          sobre cada uno.
        </p>
        <p className="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-200">
          Este proyecto utiliza la API pública de PokeAPI para obtener datos en
          tiempo real, ofreciendo una experiencia fluida y actualizada.
        </p>
        <p className="text-sm md:text-base font-semibold text-red-600 dark:text-red-400">
          Desarrollado con React.
        </p>
      </div>
    </section>
  );
}
