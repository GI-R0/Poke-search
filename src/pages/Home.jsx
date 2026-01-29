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
        className="hero"
        style={{
          backgroundImage:
            "url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png')",
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Charizard</h1>
          <p className="hero-desc">
            Escupe fuego lo suficientemente caliente como para derretir rocas.
            Conocido por causar incendios forestales sin intención.
          </p>
        </div>
      </section>

      <div className="px-8 pb-12">
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
            <button onClick={loadMore} disabled={loadingMore} className="btn">
              {loadingMore ? "Cargando..." : "Cargar más"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
