import React from "react";
import { capitalize } from "../utils/formatText"; // ✅ asegúrate de tener este archivo en /src/utils/formatText.js
import Loader from "./Loader"; // ✅ usamos tu loader reutilizable

const PokemonCard = React.memo(({ pokemon }) => {
  const [details, setDetails] = React.useState(null);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await fetch(
          pokemon.url || `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        if (!res.ok) throw new Error("Error al cargar");
        const data = await res.json();
        setDetails(data);
      } catch {
        setError(true);
      }
    }

    // si ya tiene detalles, no vuelve a pedirlos
    if (pokemon.id && pokemon.sprites) {
      setDetails(pokemon);
    } else {
      fetchDetails();
    }
  }, [pokemon]);

  // 🔴 error de carga
  if (error) {
    return (
      <div
        className="border border-red-500 p-4 rounded-xl bg-white dark:bg-red-800 text-red-500 dark:text-white font-medium text-center"
        role="alert"
        aria-live="assertive"
      >
        ❌ Este Pokémon no quiere aparecer
      </div>
    );
  }

  // 🟡 cargando datos
  if (!details) {
    return <Loader />; // ✅ usamos tu componente Loader reutilizable
  }

  // 🟢 render del Pokémon
  return (
    <div
      className="border border-gray-200 p-4 rounded-xl shadow-lg flex flex-col items-center bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]"
      role="region"
      aria-label={`Tarjeta de ${capitalize(details.name)}`}
    >
      <img
        src={details.sprites?.front_default || "/fallback-pokemon.png"}
        alt={`Imagen de ${capitalize(details.name) || "Pokémon desconocido"}`}
        className="w-20 h-20 mb-3 drop-shadow-md"
        loading="lazy"
      />

      <h2 className="text-lg font-bold mb-1 text-center">
        {capitalize(details.name)}
      </h2>

      <p className="text-gray-600 dark:text-gray-400 mb-2 text-center">
        ID: {details.id}
      </p>

      <div className="flex gap-2 justify-center flex-wrap">
        {details.types.map((t) => (
          <span
            key={t.type.name}
            className="px-2 py-1 text-xs rounded-full font-semibold bg-blue-100 text-blue-600 dark:bg-blue-700 dark:text-blue-100"
          >
            {capitalize(t.type.name)}
          </span>
        ))}
      </div>
    </div>
  );
});

export default PokemonCard;
