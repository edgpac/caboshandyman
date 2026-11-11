import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import path from 'path'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    react(),
    // The SSR build (src/entry-server.tsx) only feeds build-time pre-rendering
    // (scripts/prerender.mjs) — nothing from it is served, so skip compression.
    ...(isSsrBuild
      ? []
      : [
          viteCompression({ algorithm: 'gzip' }),
          viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
        ]),
  ],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    copyPublicDir: !isSsrBuild,
  },
  // react-helmet-async ships CommonJS that Node's ESM loader can't import by
  // name — bundle it into the SSR build instead of importing it at runtime.
  ssr: {
    noExternal: ['react-helmet-async'],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))
