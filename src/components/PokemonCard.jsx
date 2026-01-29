import React, { memo } from "react";
import { capitalize } from "../utils/formatText";

const PokemonCard = memo(({ pokemon }) => {
  if (!pokemon) return null;

  const { name, sprites, types, id } = pokemon;
  const image = sprites?.other?.["official-artwork"]?.front_default || sprites?.front_default || "/fallback-pokemon.png";

  return (
    <article
      className="group relative flex flex-col bg-white dark:bg-zinc-800 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-zinc-700"
    >
      <span className="absolute top-4 right-4 text-xs font-bold text-gray-400 dark:text-zinc-500">
        #{id.toString().padStart(3, '0')}
      </span>

      <div className="flex justify-center items-center h-40 mb-4 transform group-hover:-translate-y-2 transition-transform duration-300">
        <img 
          className="h-full object-contain drop-shadow-md" 
          src={image} 
          alt={name} 
          loading="lazy" 
        />
      </div>

      <div className="text-center">
        <h3 className="text-lg font-black text-gray-800 dark:text-white capitalize truncate">
          {capitalize(name)}
        </h3>
        
        <div className="flex justify-center gap-2 mt-3">
          {types?.map((t) => (
            <span 
              key={t.type.name} 
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white
                ${TYPE_COLORS[t.type.name] || 'bg-gray-400'}`}
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
});

const TYPE_COLORS = {
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-400',
  psychic: 'bg-pink-500',
  ice: 'bg-cyan-300',
  dragon: 'bg-indigo-600',
  ghost: 'bg-purple-700',
  poison: 'bg-purple-500',
  ground: 'bg-amber-600',
  rock: 'bg-stone-600',
  bug: 'bg-lime-500',
  fighting: 'bg-red-700',
  normal: 'bg-slate-400',
  flying: 'bg-sky-400',
};

export default PokemonCard;