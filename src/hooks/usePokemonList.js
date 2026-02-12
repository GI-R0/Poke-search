import { useState, useEffect } from "react";

export function usePokemonList(initialUrl = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0") {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);

  const getDetailedData = async (results) => {
    const promises = results.map((p) => fetch(p.url).then((res) => res.json()));
    return Promise.all(promises);
  };

  const fetchData = async (url, isMore = false) => {
    try {
      isMore ? setLoadingMore(true) : setLoading(true);
      setError(null);

      const res = await fetch(url);
      if (!res.ok) throw new Error("Error de conexión con la PokeAPI");
      
      const data = await res.json();
      const details = await getDetailedData(data.results || []);

      setNextUrl(data.next);
      setPokemonList(prev => isMore ? [...prev, ...details] : details);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(initialUrl);
  }, [initialUrl]);

  const loadMore = () => {
    if (nextUrl && !loadingMore && !loading) {
      fetchData(nextUrl, true);
    }
  };

  return { pokemonList, loading, loadingMore, error, nextUrl, loadMore };
}