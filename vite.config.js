import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sobre: resolve(__dirname, 'sobre.html'),
        metodologia: resolve(__dirname, 'metodologia.html'),
        modalidades: resolve(__dirname, 'modalidades.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
        contato: resolve(__dirname, 'contato.html'),
        galeria: resolve(__dirname, 'galeria.html'),
        showcase: resolve(__dirname, 'showcase.html'),
        'politica-privacidade': resolve(__dirname, 'politica-privacidade.html'),
        'termos-de-uso': resolve(__dirname, 'termos-de-uso.html'),
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    copyPublicDir: true, // CRÍTICO: Copiar pasta public/
  },
  publicDir: 'public', // CRÍTICO: Definir pasta public
  optimizeDeps: {
    force: true
  }
})
