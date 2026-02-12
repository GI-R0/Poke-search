import React, { useState, useEffect, useCallback } from "react";
import "./Search.css";
import { useForm } from "react-hook-form";
import { usePokemon } from "../hooks/usePokemon";
import { useDebounce } from "../hooks/useDebounce";
import { useMetaTags } from "../hooks/useMetaTags";
import Loader from "../components/Loader";
import PokemonCard from "../components/PokemonCard";

export default function Search() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      searchType: "name",
      minId: "",
      maxId: "",
    },
  });

  const [pokemonName, setPokemonName] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const debouncedPokemonName = useDebounce(pokemonName, 500);
  const isDebouncing = pokemonName !== debouncedPokemonName;
  const { data: results, loading, error } = usePokemon(debouncedPokemonName);

  useMetaTags(
    "Buscar Pokémon | PokeSearch",
    "Busca tus Pokémon favoritos por nombre o ID en PokeSearch. Encuentra información rápida y detallada."
  );

  useEffect(() => {
    const savedHistory = localStorage.getItem("pokemonSearchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveToHistory = useCallback((searchTerm) => {
    if (!searchTerm?.trim()) return;

    setSearchHistory((prev) => {
      const newHistory = [
        searchTerm,
        ...prev.filter((item) => item !== searchTerm),
      ].slice(0, 5);
      localStorage.setItem("pokemonSearchHistory", JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  const onSubmit = (formData) => {
    const searchTerm = formData.name.trim().toLowerCase();
    setPokemonName(searchTerm);
    saveToHistory(searchTerm);
  };

  const handleHistoryClick = (term) => {
    setValue("name", term);
    setPokemonName(term);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("pokemonSearchHistory");
  };

  const handleReset = () => {
    reset();
    setPokemonName("");
  };

  return (
    <section className="w-full min-h-screen flex flex-col">
      <div className="w-full max-w-5xl mx-auto p-4 md:p-8 flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 mt-4 text-gray-900 dark:text-white">Buscar Pokémon</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="search-form">
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              {...register("name", {
                required: "Por favor, ingresa un nombre o ID",
                minLength: {
                  value: 1,
                  message: "Debe tener al menos 1 carácter",
                },
                maxLength: {
                  value: 50,
                  message: "Máximo 50 caracteres",
                },
                pattern: {
                  value: /^[a-zA-Z0-9\s-]+$/,
                  message: "Solo letras, números, espacios y guiones",
                },
                validate: {
                  notOnlySpaces: (value) =>
                    value.trim().length > 0 || "No puede estar vacío",
                },
              })}
              placeholder="Nombre o ID del Pokémon (ej: pikachu, 25)"
              className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
              aria-label="Buscar Pokémon"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
            />

            {isDebouncing && (
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <span>Esperando...</span>
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="btn bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? "Buscando..." : "Buscar"}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="btn bg-gray-500 text-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Limpiar
              </button>
            </div>
          </div>

          {errors.name && (
            <p id="name-error" className="text-red-500 text-sm" role="alert">
              ⚠️ {errors.name.message}
            </p>
          )}
        </div>
      </form>

      {searchHistory.length > 0 && (
        <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold">Búsquedas recientes:</h3>
            <button
              onClick={handleClearHistory}
              className="text-xs text-red-500 hover:text-red-700 transition-colors"
            >
              Limpiar historial
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((term, index) => (
              <button
                key={index}
                onClick={() => handleHistoryClick(term)}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && <Loader />}

      {error && (
        <div className="text-center p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg mb-4">
          <p className="font-semibold">❌ Error al buscar</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && results && results.length === 0 && pokemonName && (
        <div className="text-center p-8 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg">
          <p className="text-lg font-semibold">
            🔍 No se encontraron resultados
          </p>
          <p className="text-sm mt-2">Intenta con otro nombre o ID</p>
        </div>
      )}

      <div className="pokemon-grid mt-8">
        {results?.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      </div>
    </section>
  );
}
