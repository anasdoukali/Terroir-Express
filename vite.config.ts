import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  // Use relative paths so the generated file works when opened directly
  // from the filesystem or moved to another folder.
  base: "./",
  plugins: [react(), tailwindcss(), viteSingleFile()],
  build: {
    // The single-file build must inline the logo and other imported assets too.
    // Without this, Vite keeps the logo as a separate dist/logo-*.png file,
    // which can make the built HTML look broken or outdated when copied alone.
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
    sourcemap: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
