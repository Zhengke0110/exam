import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        // target: "http://127.0.0.1:8080/api/",
        target: "http://127.0.0.1:8081/api/",
        changeOrigin: true,
        rewrite: (path) => {
          console.log(`Proxying request: ${path}`);
          return path.replace(/^\/api/, "");
        },
      },
    },
  },
});
