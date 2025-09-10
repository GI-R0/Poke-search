PokeSearch — Pokédex sencilla con React + PokeAPI

PokeSearch es una demo educativa construida con React que permite explorar Pokémon usando la PokeAPI. Incluye búsqueda por nombre, paginación incremental ("Cargar más"), tema claro/oscuro y una UI simple con Tailwind.

Características
- Paginación incremental: carga 20 Pokémon y botón "Cargar más" para evitar pedir 151 detalles de golpe.
- Búsqueda por nombre con manejo de errores (404) y limpieza opcional del input tras éxito.
- Tema claro/oscuro persistente con `localStorage` y preferencia del SO.
- Navegación SPA con React Router (sin recargar la página).
- Componentes desacoplados y hooks reutilizables.

Stack
- React 18
- Vite
- React Router
- Tailwind CSS
- PokeAPI (`https://pokeapi.co/`)

Requisitos
- Node.js 18+
- npm 9+ (o pnpm/yarn si prefieres)

Inicio rápido
```bash

npm install


npm run dev


npm run build


npm run preview
```
- Abre el enlace que te muestre Vite (por defecto http://localhost:5173


Arquitectura

src/
  components/     # UI: Navbar, Footer, Loader, PokemonCard
  pages/          # Rutas: Home, Search, About
  hooks/          # Hooks: useFetchPokemon, useTheme, useDebounce
  context/        # ThemeContext (tema claro/oscuro)
  utils/          # utilidades varias (formatText)
  index.css       # estilos globales + Tailwind
  main.jsx        # montaje de la app + providers
  App.jsx         # rutas (Router + Layout)
```

Rutas
- `/` Home: lista de Pokémon con "Cargar más".
- `/search` Search: búsqueda por nombre con feedback de carga/errores.
- `/about` About: información del proyecto con fondo decorativo.

Tema (Theme)
- `ThemeProvider` guarda el tema en `localStorage` y lo aplica con clases (`bg-*`, `text-*`) y sincroniza `body` para un cambio visible inmediato.
- `Navbar` incluye un botón que alterna entre claro/oscuro.

Home (paginación)
- Carga inicial: `limit=20`.
- Botón "Cargar más" usa la `next` de PokeAPI y agrega resultados, evitando saturar la API con 151 solicitudes de detalle.

Search (usabilidad)
- Recorta el input (`trim`) y maneja 404 con mensaje claro.
- Limpia el input tras éxito y deshabilita el botón mientras carga.

Accesibilidad y rendimiento
- Imágenes con `width/height` explícitos para reducir CLS y `loading` apropiado (`eager` para el logo principal, `lazy` para otras).
- Alt text significativo y elementos no interactivos marcados como decorativos (`aria-hidden`).

Cómo contribuir
1. Crea una rama: `git checkout -b feat/mi-cambio`.
2. Haz tus cambios y pruebas locales.
3. Abre un PR describiendo el cambio y el motivo.

Problemas conocidos
- Si ves warnings de linter por `@tailwind`, es normal si tu linter no reconoce directivas Tailwind. No afecta el build.

Licencia
Uso educativo. Ajusta la licencia según tus necesidades.
