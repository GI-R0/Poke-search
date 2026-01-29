import React, { memo } from "react";
import { capitalize } from "../utils/formatText";
import "./PokemonCard.css";

const PokemonCard = memo(({ pokemon }) => {
  if (!pokemon) return null;

  const { name, sprites, types } = pokemon;
  const image = sprites?.front_default || "/fallback-pokemon.png";

  return (
    <div
      className="pokemon-card"
      role="region"
      aria-label={`Poster de ${capitalize(name)}`}
    >
      <img src={image} alt={name} loading="lazy" />

      <div className="card-overlay">
        <h2 className="card-title">{name}</h2>
        <div className="card-types">
          {types?.map((t) => (
            <span key={t.type.name}>{capitalize(t.type.name)}</span>
          ))}
        </div>
      </div>
    </div>
  );
});

export default PokemonCard;
