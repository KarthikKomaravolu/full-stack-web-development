import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The app lives in src/, so Vite uses it as the project root.
export default defineConfig({
  root: "src",
  plugins: [react()],
  build: {
    outDir: "../dist",
    emptyOutDir: true
  }
});
