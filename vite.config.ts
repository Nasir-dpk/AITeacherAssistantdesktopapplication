import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Frontend-to-backend communication in development is proxied so the browser
// never hits cross-origin issues: any request to /api or /health on the Vite
// dev server is forwarded to the FastAPI backend (default http://127.0.0.1:8000).
const backendHost = process.env.BACKEND_HOST || "127.0.0.1";
const backendPort = process.env.BACKEND_PORT || "8000";
const backendOrigin = `http://${backendHost}:${backendPort}`;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/api": { target: backendOrigin, changeOrigin: true },
      "/health": { target: backendOrigin, changeOrigin: true },
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
    environmentOptions: {},
  },
});
