import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Use '/' for both dev and preview locally; use '/poke-search/' only for the final build deployed to GitHub Pages
  base: command === 'serve' || command === 'preview' ? '/' : '/poke-search/',
}));
