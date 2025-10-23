import { useState, useEffect } from "react";

export function usePokemonList(initialUrl = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0") {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);

  const fetchPage = async (url, append = false) => {
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
  };

  const loadMore = () => {
    if (nextUrl && !loadingMore) {
      fetchPage(nextUrl, true);
    }
  };

  useEffect(() => {
    fetchPage(initialUrl, false);
  }, [initialUrl]);

  return {
    pokemonList,
    loading,
    loadingMore,
    error,
    nextUrl,
    loadMore
  };
}