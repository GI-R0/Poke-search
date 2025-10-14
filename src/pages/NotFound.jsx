import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[70vh] text-center bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
      <h1 className="text-9xl font-extrabold text-blue-600 dark:text-yellow-500 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Página no encontrada</h2>
      <p className="text-lg mb-8 max-w-md">
        Parece que el Pokémon que buscaste no está en esta ruta. Vuelve a la Pokédex.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Ir a la Home
      </Link>
    </div>
  );
}