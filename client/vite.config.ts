import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  let apiUrl = env.VITE_API_URL;

  if (!apiUrl) {
    apiUrl = "http://localhost:3000";
  }

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": apiUrl,
      },
    },
  };
});
