import { useState, useEffect } from "react";

export function usePokemon(name) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!name) {
      setData([]);
      setError(null);
      return;
    }

    const normalizedName = name.toLowerCase().trim();
    
    setLoading(true);
    setError(null);

    fetch(`https://pokeapi.co/api/v2/pokemon/${normalizedName}`)
      .then((res) => {
        if (!res.ok) throw new Error("Ese Pokémon no existe o se escondió");
        return res.json();
      })
      .then((pokemon) => {
        setData([pokemon]);
      })
      .catch((err) => {
        setError(err.message);
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  return { data, loading, error };
}
