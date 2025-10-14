import React from "react";
import Pikachu from "../assets/pikachu.png";

export default function About() {
  return (
    
    <div className="relative overflow-hidden rounded-xl min-h-[80vh] shadow-xl 

                    bg-white dark:bg-gray-800 p-6"> 
      
     
      <img
        src={Pikachu}
        alt=""
        aria-hidden="true"
        
        className="absolute inset-0 w-full h-full object-cover opacity-10 dark:opacity-5 select-none pointer-events-none"
      />

      
      <div className="relative z-10 text-center py-16 px-8 bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 rounded-lg shadow-2xl">
        
        
        <h1 className="text-4xl font-extrabold mb-4 text-gray-800 dark:text-white">
            Sobre el Proyecto
        </h1>
        
        <p className="max-w-3xl mx-auto mb-4 text-xl text-gray-700 dark:text-gray-300">
          Esta aplicación fue creada en **React** consumiendo la **PokeAPI**. 
          Su objetivo es ser un proyecto educativo que demuestre el uso de tecnologías 
          modernas como **React Router**, **Context API**, **Custom Hooks** y el estilizado 
          completo con **Tailwind CSS**.
        </p>
        
        <p className="text-sm italic text-gray-500 dark:text-gray-400 mt-6">
            ¡Busca tu Pokémon favorito y explora el código!
        </p>
      </div>
    </div>
  );
}