import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
    // Plugin para redirecionar /blog/ para /blog/index.html
    {
      name: 'blog-redirect',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/blog/' || req.url === '/blog') {
            req.url = '/blog/index.html'
          }
          next()
        })
      }
    }
  ],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    fs: {
      allow: ['.']
    }
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
        // BLOG - CRÍTICO: Adicionar entradas para blog
        'blog/index': resolve(__dirname, 'public/blog/index.html'),
        'blog/posts/alfabetizacao-aos-6-anos': resolve(__dirname, 'public/blog/posts/alfabetizacao-aos-6-anos.html'),
        'blog/posts/devocional-em-familia': resolve(__dirname, 'public/blog/posts/devocional-em-familia.html'),
        'blog/posts/inteligencia-emocional': resolve(__dirname, 'public/blog/posts/inteligencia-emocional.html'),
        'blog/posts/limites-com-amor': resolve(__dirname, 'public/blog/posts/limites-com-amor.html'),
        'blog/posts/por-que-educacao-crista': resolve(__dirname, 'public/blog/posts/por-que-educacao-crista.html'),
        'blog/posts/rotina-saudavel-criancas': resolve(__dirname, 'public/blog/posts/rotina-saudavel-criancas.html'),
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
