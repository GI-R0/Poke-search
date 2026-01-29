import React, { memo } from "react";
import { capitalize } from "../utils/formatText";
import "./PokemonCard.css";

const PokemonCard = memo(({ pokemon }) => {
  if (!pokemon) return null;

  const { name, sprites, types } = pokemon;
  const image = sprites?.front_default || "/fallback-pokemon.png";

  return (
    <div
      className="pokemon-card relative aspect-[2/3] rounded-md overflow-hidden cursor-pointer transform transition-transform duration-200 bg-[#2f2f2f] hover:scale-[1.03] hover:shadow-2xl"
      role="region"
      aria-label={`Poster de ${capitalize(name)}`}
    >
      <img className="w-full h-full object-contain p-5" src={image} alt={name} loading="lazy" />

      <div className="card-overlay absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
        <h2 className="card-title text-white font-bold text-base capitalize">{name}</h2>
        <div className="card-types flex gap-2 mt-2 text-sm text-gray-300">
          {types?.map((t) => (
            <span key={t.type.name} className="capitalize">{capitalize(t.type.name)}</span>
          ))}
        </div>
      </div>
    </div>
  );
});

export default PokemonCard;
