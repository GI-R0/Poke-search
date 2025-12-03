import React from "react";

const Loader = React.memo(() => {
  return (
    <div
      className="flex flex-col items-center justify-center p-8 space-y-4 my-8 select-none"
      role="status"
      aria-live="polite"
    >
      <div
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin dark:border-blue-300 dark:border-t-transparent"
        aria-hidden="true"
      />

      <p className="text-gray-700 dark:text-gray-300 text-lg font-medium text-center tracking-wide">
        Buscando Pokémon por ahí...
      </p>
    </div>
  );
});

export default Loader;
