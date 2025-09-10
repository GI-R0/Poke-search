import { useState, useEffect } from "react";

export default function useFetchPokemon(url) {
  const [data, setData] = useState({ results: [] }); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Error al obtener los Pokémon");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
        setData({ results: [] }); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
