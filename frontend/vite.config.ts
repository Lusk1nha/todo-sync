import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",

    setupFiles: [path.resolve(__dirname, "./src/test/setup.ts")],
    reporters: "dot",
  },
});
