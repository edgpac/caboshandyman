import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  envPrefix: 'NEXT_PUBLIC_', // Add this to expose NEXT_PUBLIC_* variables
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
