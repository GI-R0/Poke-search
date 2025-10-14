import React, { useState, useCallback } from "react";
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

  // Simplificamos onSubmit para confiar en la validación de useForm
  const onSubmit = useCallback(async (data) => {
    const name = data.name.trim().toLowerCase();
    
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        
        `https://pokeapi.co/api/v2/pokemon/${name}` 
      );
      if (!res.ok) throw new Error("Pokémon no encontrado. Intenta con otro nombre.");
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
    
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 bg-white dark:bg-gray-800 shadow-xl rounded-lg"> 
      
      {}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center"
      >
        <div className="flex flex-col w-full sm:flex-1 sm:max-w-sm">
          <input
            {...register("name", { 
              required: "El nombre es requerido", 
              minLength: { value: 2, message: "Mínimo 2 caracteres" }
            })}
            placeholder="Buscar Pokémon por nombre o ID..."
           
            className="border p-3 w-full rounded-lg focus:ring-blue-500 focus:border-blue-500 
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
          )}
        </div>
        
        {}
        <button 
          className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold 
                     hover:bg-blue-700 transition-colors disabled:opacity-50 h-full w-full sm:w-auto" 
          disabled={loading}
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {loading && <Loader />}
      {error && <p className="text-red-500 text-center font-medium text-lg my-4">{error}</p>}

      {}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {results.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}