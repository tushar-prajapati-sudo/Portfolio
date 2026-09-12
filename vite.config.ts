import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ command }) => {
  // This machine exports NODE_ENV=local from the shell profile. Vite and
  // @vitejs/plugin-react both read NODE_ENV, so without this a production
  // build silently ships the development React — the dev JSX transform plus
  // both copies of react-dom. Pin it here so the build never depends on the
  // ambient environment.
  if (command === "build") process.env.NODE_ENV = "production";

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        input: {
          // The current portfolio.
          main: path.resolve(__dirname, "index.html"),
          // The original 3D/WebGL build, archived at /v1. Its own entry keeps
          // the Spline + shader payload off the main site entirely.
          v1: path.resolve(__dirname, "v1/index.html"),
        },
      },
    },
  };
});
