import React, { useState, useEffect, useCallback, useMemo } from "react";
import Loader from "../components/Loader";
import PokemonCard from "../components/PokemonCard";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);

  const fetchPage = useCallback(async (url, append) => {
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

      setNextUrl(data.next || null);

      const detailed = await Promise.all(
        (data.results || []).map(async (pokemon) => {
          const resDetail = await fetch(pokemon.url);
          if (!resDetail.ok) throw new Error("Error al obtener detalles");
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

  const fetchInitial = useCallback(() => {
    const initialUrl = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
    fetchPage(initialUrl, false);
  }, [fetchPage]);

  const handleLoadMore = useCallback(() => {
    if (!nextUrl || loadingMore) return;
    fetchPage(nextUrl, true);
  }, [nextUrl, loadingMore, fetchPage]);

  useEffect(() => {
    document.title = "Pokédex | PokeSearch"; 
    fetchInitial();
  }, [fetchInitial]);

  const renderedList = useMemo(() => 
    pokemonList.map((pokemon) => (
      <PokemonCard key={pokemon.id} pokemon={pokemon} />
    )), [pokemonList]
  );

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <main className="px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Pokédex</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
        {renderedList}
      </div>

      <div className="flex justify-center mt-6">
        {nextUrl && (
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className={`px-4 py-2 rounded text-white ${loadingMore ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loadingMore ? "Cargando..." : "Cargar más"}
          </button>
        )}
      </div>
    </main>
  );
}
