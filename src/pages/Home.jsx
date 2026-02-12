import React, { useCallback, useEffect, useMemo, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import Loader from "../components/Loader";
import { usePokemonList } from "../hooks/usePokemonList";
import { useMetaTags } from "../hooks/useMetaTags";

const FEATURED_POKEMON = [
  {
    id: 6,
    name: "Charizard",
    description:
      "Escupe fuego lo suficientemente caliente como para derretir rocas. Ideal para entrenadores que buscan poder puro.",
  },
  {
    id: 25,
    name: "Pikachu",
    description:
      "Almacena electricidad en sus mejillas. Cuando se emociona, libera chispas que iluminan cualquier combate.",
  },
  {
    id: 94,
    name: "Gengar",
    description:
      "Se oculta en las sombras y aparece cuando menos lo esperas. Un clásico para amantes del misterio.",
  },
  {
    id: 143,
    name: "Snorlax",
    description:
      "Dormilón pero imparable. Si se pone serio, su resistencia convierte cualquier pelea en una maratón.",
  },
  {
    id: 448,
    name: "Lucario",
    description:
      "Percibe el aura de sus rivales y ataca con precisión. Perfecto para quienes valoran disciplina y técnica.",
  },
  {
    id: 658,
    name: "Greninja",
    description:
      "Silencioso y veloz. Con su agilidad y sigilo, convierte el campo de batalla en su territorio.",
  },
];

export default function Home() {
  const { pokemonList, loading, loadingMore, error, nextUrl, loadMore } = usePokemonList();
  const [featuredIndex, setFeaturedIndex] = useState(() =>
    Math.floor(Math.random() * FEATURED_POKEMON.length)
  );
  const featured = useMemo(() => FEATURED_POKEMON[featuredIndex], [featuredIndex]);

  const changeFeatured = useCallback(() => {
    setFeaturedIndex((prev) => {
      if (FEATURED_POKEMON.length <= 1) return prev;
      let next = prev;
      while (next === prev) {
        next = Math.floor(Math.random() * FEATURED_POKEMON.length);
      }
      return next;
    });
  }, []);

  useMetaTags(
    "Pokédex | PokeSearch",
    "Explora la Pokédex completa con PokeSearch. Descubre información detallada sobre todos los Pokémon de la serie."
  );

  if (loading) return <Loader />;
  
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <p className="text-red-500 font-bold text-xl">⚠️ {error}</p>
      <button onClick={() => window.location.reload()} className="underline text-gray-400">Reintentar</button>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <section
        className="relative overflow-hidden bg-zinc-900 rounded-3xl mb-12 min-h-[500px] flex items-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.82) 30%, rgba(0,0,0,0.25) 65%, transparent 85%), url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${featured.id}.png')`,
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      >
        <div key={featured.id} className="relative z-10 p-8 md:p-16 max-w-2xl">
          <span className="text-red-500 font-bold tracking-widest uppercase text-sm mb-2 block">Pokémon Destacado</span>
          <h1 className="text-5xl md:text-7xl font-black mb-4 text-white drop-shadow-2xl">
            {featured.name}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            {featured.description}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={changeFeatured}
              className="px-8 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 hover:scale-105 transition-all shadow-xl shadow-red-900/20"
            >
              Cambiar destacado
            </button>
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              #{String(featured.id).padStart(3, "0")}
            </span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white text-center">
            Catch 'em all
          </h2>
          <div className="h-1 w-20 bg-red-600 mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {pokemonList.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>

        {nextUrl && (
          <div className="flex flex-col items-center mt-16 md:mt-20 gap-6">
            <button 
              onClick={loadMore} 
              disabled={loadingMore}
              className="px-8 md:px-12 py-3 md:py-4 bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white font-black rounded-xl hover:shadow-2xl disabled:opacity-50 transition-all relative z-0"
            >
              {loadingMore ? "Buscando más..." : "CARGAR MÁS POKÉMON"}
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-tighter">
              Mostrando {pokemonList.length} especímenes
            </p>
          </div>
        )}
      </div>
    </div>
  );
}