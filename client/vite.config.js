import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/graphql": {
        target: "https://bloom-and-petal-floristry.onrender.com",
        secure: true,
        changeOrigin: true,
      },
    },
  },
});
