import React, { useEffect, useState, useCallback } from "react";
import Loader from "../components/Loader";
import PokemonCard from "../components/PokemonCard";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);

  const initialUrl = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

  const fetchPage = useCallback(async (url, append) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const response = await fetch(url);
      if (!response.ok) throw new Error("No se pudieron cargar los Pokémon");
      const data = await response.json();

      setNextUrl(data.next || null);

      const detailed = await Promise.all(
        (data.results || []).map(async (pokemon) => {
          const resDetail = await fetch(pokemon.url);
          if (!resDetail.ok) throw new Error("No se pudieron cargar los detalles");
          return resDetail.json();
        })
      );

      setPokemonList((prev) => (append ? [...prev, ...detailed] : detailed));
    } catch (err) {
      setError(err.message);
      if (!append) {
        setPokemonList([]);
      }
    } finally {
      if (append) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  }, []);

  const handleLoadMore = useCallback(() => {
    if (!nextUrl || loadingMore) return;
    fetchPage(nextUrl, true);
  }, [nextUrl, loadingMore, fetchPage]);

  useEffect(() => {
    document.title = "Pokédex | PokeSearch";
    fetchPage(initialUrl, false);
  }, [fetchPage]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-600 dark:text-red-400 text-center p-8 text-xl font-medium">{error}</div>;

  return (
    <main className="px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 dark:text-white">
        Pokédex
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {pokemonList.map((p) => (
          <PokemonCard key={p.name} pokemon={p} />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        {nextUrl && (
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className={`px-8 py-3 rounded-full text-white font-semibold shadow-md transition-all duration-300
              ${loadingMore 
                ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 dark:bg-yellow-500 dark:hover:bg-yellow-600"
              }`}
          >
            {loadingMore ? "Cargando..." : "¡Trae más Pokémon!"}
          </button>
        )}
      </div>
    </main>
  );
}