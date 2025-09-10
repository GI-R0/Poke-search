import React, { useState, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import PokemonCard from "../components/PokemonCard";

export default function Search() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: ""
    }
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = useCallback(async (data) => {
    const rawName = data.name || "";
    const name = rawName.trim();
    if (!name) {
      setError("El nombre es requerido");
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );
      if (!res.ok) throw new Error("Pokémon no encontrado");
      const pokemon = await res.json();
      setResults([pokemon]);
      reset({ name: "" });
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [reset]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-2 mb-6 justify-center"
      >
        <input
          {...register("name", { 
            required: "El nombre es requerido", 
            minLength: { value: 2, message: "Mínimo 2 caracteres" }
          })}
          placeholder="Buscar Pokémon..."
          className="border p-2 flex-1 rounded max-w-sm"
        />
        {errors.name && (
          <span className="text-red-500 text-sm self-center">{errors.name.message}</span>
        )}
        <button className="bg-blue-500 text-white px-4 rounded disabled:opacity-60" disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {loading && <Loader />}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
        {useMemo(() => 
          results.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          )), [results]
        )}
      </div>
    </div>
  );
}
