import { useState, useEffect } from "react";

export function usePokemon(name) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!name?.trim()) {
      setData(null);
      return;
    }

    const controller = new AbortController();

    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase().trim()}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Pokemon not found");

        const pokemon = await res.json();
        setData([pokemon]);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setData(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchPokemon();

    return () => controller.abort();
  }, [name]);

  return { data, loading, error };
}
