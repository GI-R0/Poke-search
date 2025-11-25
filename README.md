# ⚡ PokeSearch

Una aplicación moderna de búsqueda de Pokémon construida con **React**, **TailwindCSS** y **PokeAPI**. Proyecto educativo que demuestra el uso de hooks personalizados, Context API, gestión de estado y buenas prácticas de desarrollo.

## 🌟 Características

- 🔍 **Búsqueda de Pokémon** por nombre o ID con validación
- 📱 **Completamente responsive** - Diseño adaptable desde mobile hasta desktop
- 🌓 **Modo oscuro/claro** persistente con detección automática de preferencias del sistema
- ♿ **Accesible** con ARIA labels y navegación por teclado
- 🎨 **Interfaz moderna** con animaciones y transiciones suaves
- 📄 **Paginación** carga más Pokémon bajo demanda
- 🚀 **Optimizado** sin re-renderizaciones innecesarias (React.memo + useMemo)
- 🔗 **Navegación** fluida con React Router DOM

## 🛠️ Tecnologías

- **React 19** - Biblioteca de UI
- **React Router DOM 7** - Navegación entre páginas
- **TailwindCSS 4** - Estilos con utility-first CSS
- **React Hook Form 7** - Gestión de formularios
- **Vite 7** - Build tool y dev server
- **PokeAPI** - API pública de Pokémon

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── CharacterCard.jsx
│   ├── Footer.jsx
│   ├── Layout.jsx
│   ├── Loader.jsx
│   ├── Navbar.jsx
│   └── PokemonCard.jsx
├── context/            # Context API
│   └── ThemeContext.jsx
├── hooks/              # Custom hooks
│   ├── usePokemon.js
│   ├── usePokemonList.js
│   └── useTheme.js
├── pages/              # Páginas de la aplicación
│   ├── About.jsx
│   ├── Home.jsx
│   ├── NotFound.jsx
│   └── Search.jsx
├── utils/              # Funciones auxiliares
│   └── formatText.js
├── App.jsx             # Configuración de rutas
├── main.jsx            # Punto de entrada
└── index.css           # Estilos globales
```

## 🎯 Funcionalidades por Página

### 🏠 Home (`/`)

- Lista de Pokémon con paginación
- Grid responsive (2-5 columnas según dispositivo)
- Botón "Cargar más" para paginación infinita
- Loader durante carga de datos

### 🔎 Search (`/search`)

- Formulario de búsqueda con validación
- Búsqueda por nombre o ID
- Visualización detallada del Pokémon encontrado
- Manejo de errores amigable

### ℹ️ About (`/about`)

- Información sobre el proyecto
- Enlaces a PokeAPI

### 🚫 404 NotFound

- Página de error personalizada
- Redirección al inicio

## 🧠 Hooks Personalizados

### `usePokemon(name)`

Busca un Pokémon específico por nombre o ID.

```jsx
const { data, loading, error } = usePokemon("pikachu");
```

**Características:**

- AbortController para cancelar peticiones
- Manejo de estados de carga y error
- Normalización de entrada (trim, lowercase)

### `usePokemonList(initialUrl)`

Obtiene una lista paginada de Pokémon.

```jsx
const { pokemonList, loading, loadingMore, error, nextUrl, loadMore } =
  usePokemonList();
```

**Características:**

- Soporte para paginación
- Distinción entre carga inicial y carga de más resultados
- Obtiene detalles completos de cada Pokémon

### `useTheme()`

Accede al contexto de tema para modo oscuro/claro.

```jsx
const { theme, toggleTheme } = useTheme();
```

## 🎨 Sistema de Temas

El proyecto incluye un sistema completo de temas con:

- 🌓 Toggle entre modo claro y oscuro
- 💾 Persistencia en localStorage
- 🌍 Detección de preferencias del sistema (`prefers-color-scheme`)
- ⚡ Cambios instantáneos sin parpadeo
- 🎯 Context API para acceso global

## 📋 Requisitos Técnicos Cumplidos

- ✅ **Responsive design** - Mobile-first con TailwindCSS
- ✅ **Arquitectura clara** - Separación por carpetas y responsabilidad
- ✅ **4 páginas** con React Router DOM
- ✅ **7+ estados** manejados con sentido
- ✅ **useEffect** para peticiones HTTP con cleanup
- ✅ **API pública** - PokeAPI
- ✅ **Formulario** con React Hook Form y validación
- ✅ **6 componentes reutilizables**
- ✅ **Optimizaciones** - React.memo, useMemo, AbortController
- ✅ **3 custom hooks** personalizados
- ✅ **useContext** - ThemeContext para tema global

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js 18+
- npm o pnpm

### Instalación

```bash
# Clonar el repositorio
git clone <tu-repo-url>

# Entrar al directorio
cd kimetsu-search

# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:5173
```

### Producción

```bash
# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

### Linter

```bash
# Ejecutar ESLint
npm run lint
```

## 🌐 API Utilizada

Este proyecto consume la [PokeAPI](https://pokeapi.co/), una API RESTful pública que proporciona datos sobre Pokémon.

**Endpoints utilizados:**

- `GET /pokemon?limit=20&offset=0` - Lista de Pokémon con paginación
- `GET /pokemon/{name}` - Detalles de un Pokémon específico

## ♿ Accesibilidad

El proyecto sigue las mejores prácticas de accesibilidad:

- Atributos `aria-label` y `aria-describedby` en formularios
- Roles ARIA apropiados (`alert`, `status`, `contentinfo`)
- Navegación por teclado funcional
- Textos alternativos en todas las imágenes
- Contraste de colores accesible en ambos temas

## 🎓 Conceptos Demostrados

Este proyecto demuestra:

- ✨ **Hooks de React** - useState, useEffect, useContext, useMemo, custom hooks
- 🏗️ **Arquitectura de componentes** - Reutilización y composición
- 🌐 **Consumo de APIs REST** - Fetch con manejo de errores
- 🎯 **Context API** - Estado global sin props drilling
- 📝 **Formularios controlados** - React Hook Form
- 🚦 **Enrutamiento** - React Router DOM v7
- 🎨 **CSS moderno** - TailwindCSS utility-first
- ⚡ **Optimización de rendimiento** - Memoización y AbortController
- ♿ **Accesibilidad web** - WCAG y ARIA

## 📝 Licencia

Este es un proyecto educativo. Siéntete libre de usarlo como referencia.

## 🙏 Agradecimientos

- [PokeAPI](https://pokeapi.co/) por proporcionar una API pública gratuita
- Comunidad de React por las excelentes herramientas y documentación

---

**Desarrollado con 💙 usando React + TailwindCSS**
