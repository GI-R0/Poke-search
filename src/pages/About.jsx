import React from "react";
import Pikachu from "../assets/pikachu.png";

export default function About() {
  return (
    <div className="relative overflow-hidden rounded-xl min-h-[70vh]">
      
      <img
        src={Pikachu}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-20 select-none pointer-events-none"
      />

      
      <div className="relative z-10 text-center py-12 px-6">
        <h1 className="text-3xl font-bold mb-4">Sobre el Proyecto</h1>
        <p className="max-w-2xl mx-auto mb-4 text-lg">
          Esta aplicación fue creada en React con la PokeAPI. 
          Puedes buscar Pokémon, ver sus detalles y aprender más 
          sobre React Router, Context, Hooks y uso de APIs.
        </p>
      </div>
    </div>
  );
}
