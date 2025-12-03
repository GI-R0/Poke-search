# PokeSearch

Una aplicación web para buscar y explorar Pokémon, construida con React y la PokeAPI.

## Características

- Búsqueda de Pokémon por nombre o ID
- Navegación por lista completa con carga paginada
- Diseño responsive
- Tema oscuro (por defecto)
- Animaciones suaves en la interfaz

## Tecnologías

- React 19
- React Router DOM 7
- CSS vanilla (sin frameworks)
- Vite 7
- PokeAPI

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/GI-R0/poke-search.git
cd kimetsu-search

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
npm run preview
```

## Estructura del proyecto

El proyecto usa hooks personalizados para manejar la lógica de datos:

- `usePokemon(name)` - Busca un Pokémon específico
- `usePokemonList()` - Obtiene la lista de Pokémon con paginación
- `useTheme()` - Maneja el cambio de tema

## API

Este proyecto consume datos de [PokeAPI](https://pokeapi.co/), una API pública y gratuita con información sobre Pokémon.

---

Desarrollado por GI-R0
