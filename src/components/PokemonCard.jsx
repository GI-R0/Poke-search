import React, { useEffect, useState, memo } from "react";
import { capitalize } from "../utils/formatText";
import { useTheme } from "../hooks/useTheme";

const PokemonCard = memo(function PokemonCard({ pokemon }) {
  const { theme } = useTheme();
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
        if (!res.ok) throw new Error("Error en la petición");
        const data = await res.json();
        setDetails(data);
      } catch (err) {
        console.error("Error al cargar Pokémon:", err);
        setError(true);
      }
    }

    fetchDetails();
  }, [pokemon]);


  if (error) {
    return (
      <div className="border p-4 rounded shadow text-red-500 bg-white text-center">
        ❌ Error al cargar Pokémon
      </div>
    );
  }

  if (!details) {
    return (
      <div className="border p-4 rounded shadow bg-gray-50 text-center">
        ⏳ Cargando...
      </div>
    );
  }


  return (
    <div className={`border p-4 rounded-xl shadow-lg flex flex-col items-center ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} hover:shadow-2xl transition`}>
      <img
        src={details.sprites.front_default}
        alt={`Imagen de ${details.name}`}
        className="w-24 h-24 mb-3 drop-shadow-md"
      />
      <h2 className="text-xl font-bold mb-1 text-center">{capitalize(details.name)}</h2>
      <p className="text-gray-600 mb-1 text-center">ID: {details.id}</p>
      <div className="flex gap-2 justify-center flex-wrap">
        {details.types.map((t) => (
          <span
            key={t.type.name}
            className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-semibold"
          >
            {capitalize(t.type.name)}
          </span>
        ))}
      </div>
    </div>
  );
});

export default PokemonCard;
