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

  // ⚠️ Modified fetchPage to accept the isMounted flag as an argument
  const fetchPage = useCallback(async (url, append, isMountedRef) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const response = await fetch(url);
      if (!response.ok) throw new Error("Error al obtener los Pokémon");
      const data = await response.json();

      // Check the flag reference before setting state
      if (!isMountedRef.current) return; 

      setNextUrl(data.next || null);

      const detailed = await Promise.all(
        (data.results || []).map(async (pokemon) => {
          const resDetail = await fetch(pokemon.url);
          if (!resDetail.ok) throw new Error("Error al obtener detalles");
          return resDetail.json();
        })
      );

      // Final check before setting state
      if (isMountedRef.current) {
        setPokemonList((prev) => (append ? [...prev, ...detailed] : detailed));
      }

    } catch (err) {
      if (isMountedRef.current) {
        setError(err.message);
        if (!append) {
          setPokemonList([]);
        }
      }
    } finally {
      if (isMountedRef.current) {
        if (append) {
          setLoadingMore(false);
        } else {
          setLoading(false);
        }
      }
    }
  }, []);

  const handleLoadMore = useCallback(() => {
    if (!nextUrl || loadingMore) return;
    // Note: We cannot easily pass the isMountedRef here, but typically loadMore is less urgent
    // than initial mount/unmount safety. We rely on the checks inside fetchPage if needed.
    fetchPage(nextUrl, true, { current: true }); 
  }, [nextUrl, loadingMore, fetchPage]);

  useEffect(() => {
    document.title = "Pokédex | PokeSearch"; 
    
    // 1. Initialize the flag reference (the standard way in modern React)
    const isMounted = { current: true };

    // 2. Pass the reference to fetchPage
    fetchPage(initialUrl, false, isMounted);
    
    // 3. Cleanup Function: Executes when component unmounts
    return () => {
      isMounted.current = false;
    };
  }, [fetchPage]);

  if (loading) return <Loader />;
  
  if (error) return <div className="text-red-600 dark:text-red-400 text-center p-8 text-xl font-medium">{error}</div>;

  return (
    <main className="px-4 py-8">
      
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 dark:text-white">
          Pokédex
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8 justify-items-center max-w-7xl mx-auto">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
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
            {loadingMore ? "Cargando..." : "Cargar más Pokémon"}
          </button>
        )}
      </div>
    </main>
  );
}