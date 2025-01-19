import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from '@vitejs/plugin-commonjs';  // <-- Aquí

export default defineConfig({
  plugins: [
    react(),
    commonjs()  // <-- Activa el plugin para que maneje módulos CommonJS
  ]
});
