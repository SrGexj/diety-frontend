import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-quilljs', 'quill'],
    esbuildOptions: {
      define: {
        'require': 'undefined', // Esto evita que el navegador intente buscar "require"
      },
    },
  },
});
