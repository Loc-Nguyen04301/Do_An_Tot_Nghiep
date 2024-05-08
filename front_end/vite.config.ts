import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      assets: `${path.resolve(__dirname, "./src/assets/")}`,
      componenets: `${path.resolve(__dirname, "./src/componenets/")}`,
      contexts: `${path.resolve(__dirname, "./src/contexts/")}`,
      guards: `${path.resolve(__dirname, "./src/guards/")}`,
      hooks: `${path.resolve(__dirname, "./src/hooks/")}`,
      layouts: `${path.resolve(__dirname, "./src/layouts/")}`,
      pages: `${path.resolve(__dirname, "./src/pages/")}`,
      reducers: `${path.resolve(__dirname, "./src/reducers/")}`,
      'redux-toolkit': `${path.resolve(__dirname, "./src/redux-toolkit/")}`,
      routes: `${path.resolve(__dirname, "./src/routes/")}`,
      services: `${path.resolve(__dirname, "./src/services/")}`,
      styles: `${path.resolve(__dirname, "./src/styles/")}`,
      types: `${path.resolve(__dirname, "./src/types/")}`,
      utils: `${path.resolve(__dirname, "./src/utils/")}`,
    }
  },
  server: {
    port: 3000
  }

});
