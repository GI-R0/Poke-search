import React, { memo } from "react";

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-3 my-8">
      <div 
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent 
                   rounded-full animate-spin dark:border-blue-300 dark:border-t-transparent"
        aria-label="Cargando contenido" 
      >
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">Cargando Pokémon...</p>
    </div>
  );
}

export default memo(Loader);