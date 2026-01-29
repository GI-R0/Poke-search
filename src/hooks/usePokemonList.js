import { useState, useEffect } from "react";

export function usePokemonList(
  initialUrl = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);

  const fetchPokemonDetails = async (results) => {
    return Promise.all(
      results.map(async (p) => {
        const res = await fetch(p.url);
        if (!res.ok) throw new Error(`Error loading ${p.name}`);
        return res.json();
      })
    );
  };

  const fetchPage = async (url, isLoadMore = false) => {
    try {
      isLoadMore ? setLoadingMore(true) : setLoading(true);
      setError(null);

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch pokemon list");

      const data = await response.json();
      setNextUrl(data.next);

      const detailedData = await fetchPokemonDetails(data.results || []);

      setPokemonList((prev) =>
        isLoadMore ? [...prev, ...detailedData] : detailedData
      );
    } catch (err) {
      setError(err.message);
    } finally {
      isLoadMore ? setLoadingMore(false) : setLoading(false);
    }
  };

  useEffect(() => {
    // initial load
    fetchPage(initialUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialUrl]);

  const loadMore = () => {
    if (nextUrl && !loadingMore) fetchPage(nextUrl, true);
  };

  return { pokemonList, loading, loadingMore, error, nextUrl, loadMore };
}
