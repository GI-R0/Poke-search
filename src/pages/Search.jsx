import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { usePokemon } from "../hooks/usePokemon";
import Loader from "../components/Loader";
import PokemonCard from "../components/PokemonCard";

export default function Search() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [pokemonName, setPokemonName] = useState("");
  const { data: results, loading, error } = usePokemon(pokemonName);

  useEffect(() => {
    document.title = "Buscar Pokémon | PokeSearch";
  }, []);

  const onSubmit = (formData) => {
    setPokemonName(formData.name);
    reset();
  };

  return (
    <main className="w-full max-w-5xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Buscar Pokémon</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row gap-4 mb-8"
      >
        <input
          {...register("name", {
            required: "Por favor, ingresa un nombre o ID",
          })}
          placeholder="Nombre o ID del Pokémon"
          className="border p-3 rounded-lg flex-1"
          aria-label="Buscar Pokémon por nombre o ID"
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Buscar
        </button>
      </form>

      {errors.name && (
        <p
          id="name-error"
          className="text-red-500 text-center mb-4"
          role="alert"
        >
          {errors.name.message}
        </p>
      )}

      {loading && <Loader />}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {results?.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </main>
  );
}
