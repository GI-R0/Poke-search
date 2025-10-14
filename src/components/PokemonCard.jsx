import React, { useEffect, useState, memo } from "react";
import { capitalize } from "../utils/formatText";
;

const PokemonCard = memo(function PokemonCard({ pokemon }) {
  
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
  
    if (pokemon.id && pokemon.sprites) {
      setDetails(pokemon);
      return;
    }

    async function fetchDetails() {
      try {
        const res = await fetch(
          pokemon.url || `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        if (!res.ok) throw new Error("Pokémon no encontrado en la API");
        const data = await res.json();
        setDetails(data);
      } catch (err) {
        console.error("Error al cargar detalles de Pokémon:", err);
        setError(true);
      }
    }

    fetchDetails();
    
  }, [pokemon]);

  if (error) {
    
    return (
      <div className="border border-red-500 p-4 rounded-xl shadow-lg 
                      bg-white dark:bg-red-800 text-red-500 dark:text-white font-medium text-center">
        ❌ Error al cargar Pokémon. Intenta de nuevo.
      </div>
    );
  }

  if (!details) {
    
    return (
      <div className="border border-gray-300 p-4 rounded-xl shadow-lg 
                      bg-gray-50 dark:bg-gray-700 dark:text-white text-center">
        ⏳ Cargando...
      </div>
    );
  }

  
  return (
    
    <div className=" border border-gray-200 p-6 rounded-xl shadow-lg flex flex-col items-center 
                    bg-white dark:bg-gray-800 text-gray-800 dark:text-white 
                    hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]">
      
      <img
        src={details.sprites.front_default}
        alt={`Imagen de ${details.name}`}
        className="w-24 h-24 mb-3 drop-shadow-md"
        loading="lazy"
      />
      
      <h2 className="text-xl font-bold mb-1 text-center dark:text-white">{capitalize(details.name)}</h2>
      
      }
      <p className="text-gray-600 dark:text-gray-400 mb-2 text-center">ID: {details.id}</p>
      
      <div className="flex gap-2 justify-center flex-wrap">
        {details.types.map((t) => (
          <span
            key={t.type.name}
            
            className="px-2 py-1 text-xs rounded-full font-semibold 
                       bg-blue-100 text-blue-600 
                       dark:bg-blue-700 dark:text-blue-100"
          >
            {capitalize(t.type.name)}
          </span>
        ))}
      </div>
    </div>
  );
});

export default PokemonCard;