import { useState, useEffect } from "react";

export default function useFetchPokemon(url) {
  const [data, setData] = useState({ results: [] }); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 💡 BANDERA DE CANCELACIÓN: Usamos esta bandera para saber si la petición
    // debe ser ignorada porque el componente se ha desmontado o ha habido un cambio de URL.
    let isMounted = true; 

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Error al obtener los Pokémon");
        const json = await res.json();
        
        
        if (isMounted) {
          setData(json);
        }
      } catch (err) {
        if (isMounted) {
          
          setError(err.message);
          setData({ results: [] }); 
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    
    
    return () => {
      isMounted = false; 
    };

  }, [url]);

  return { data, loading, error };
}
