import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { env } from "process";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: "globalThis",
    "process.env": env,
  },
});
