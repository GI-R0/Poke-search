import React, { useEffect } from "react";
import CharacterCard from "../components/CharacterCard";
import Loader from "../components/Loader";
import { usePokemonList } from "../hooks/usePokemonList";

export default function Home() {
  const { pokemonList, loading, loadingMore, error, nextUrl, loadMore } =
    usePokemonList();

  useEffect(() => {
    document.title = "Pokédex | PokeSearch";
  }, []);

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="text-red-600 dark:text-red-400 text-center p-8 text-xl font-medium">
        {error}
      </div>
    );

  if (!Array.isArray(pokemonList) || pokemonList.length === 0)
    return (
      <p className="text-center text-gray-600 dark:text-gray-300">
        No se encontraron resultados.
      </p>
    );

  return (
    <main className="px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 dark:text-white">
        Pokédex
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {pokemonList.map((p, i) => (
          <CharacterCard key={p.id ?? p.name ?? i} pokemon={p} />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        {nextUrl && (
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className={`px-8 py-3 rounded-full text-white font-semibold shadow-md transition-all duration-300
              ${
                loadingMore
                  ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 dark:bg-yellow-500 dark:hover:bg-yellow-600"
              }`}
          >
            {loadingMore ? "Cargando..." : "Cargar más"}
          </button>
        )}
      </div>
    </main>
  );
}
