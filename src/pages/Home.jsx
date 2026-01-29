import React, { useEffect } from "react";
import "./Home.css";
import PokemonCard from "../components/PokemonCard";
import Loader from "../components/Loader";
import { usePokemonList } from "../hooks/usePokemonList";

export default function Home() {
  const { pokemonList, loading, loadingMore, error, nextUrl, loadMore } =
    usePokemonList();

  useEffect(() => {
    document.title = "Pokédex | PokeSearch";
  }, []);

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="text-red-600 dark:text-red-400 text-center p-8 text-xl font-medium">
        {error}
      </div>
    );

  if (!Array.isArray(pokemonList) || pokemonList.length === 0)
    return (
      <p className="text-center text-gray-600 dark:text-gray-300">
        No se encontraron resultados.
      </p>
    );

  return (
    <main>
      <section
        className="hero bg-no-repeat bg-right bg-[length:40%] h-[70vh] flex items-end mb-8"
        style={{
          backgroundImage:
            "url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png')",
        }}
      >
        <div className="hero-content relative z-10 p-8 md:p-12 max-w-xl">
          <h1 className="hero-title text-5xl md:text-6xl font-extrabold mb-4 text-white text-shadow">
            Charizard
          </h1>
          <p className="hero-desc text-lg text-text-secondary mb-6 leading-6">
            Escupe fuego lo suficientemente caliente como para derretir rocas.
            Conocido por causar incendios forestales sin intención.
          </p>
          <button className="hero-btn px-6 py-3 bg-white text-black font-bold rounded-md inline-flex items-center gap-2 hover:bg-white/90 transition">
            Ver más
          </button>
        </div>
      </section>

      <div className="px-4 md:px-8 pb-12">
        <h2 className="text-2xl text-center font-bold text-white mb-6">
          Catch 'em all
        </h2>

        <div className="pokemon-grid">
          {pokemonList.map((p) => (
            <PokemonCard key={p.id || p.name} pokemon={p} />
          ))}
        </div>

        <div className="flex justify-center mt-16">
          {nextUrl && (
            <button onClick={loadMore} disabled={loadingMore} className="btn relative z-20">
              {loadingMore ? "Cargando..." : "Cargar más"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
