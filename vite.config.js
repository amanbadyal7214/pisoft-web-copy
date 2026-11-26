import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    host: '0.0.0.0',
    port: 5175,
    strictPort: true,
  },
  assetsInclude: ['**/*.glb', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.mp4'],

  build: {
    minify: 'esbuild',
    sourcemap: false,
    assetsInlineLimit: 0,

    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },

    target: 'esnext',
    chunkSizeWarningLimit: 3000
  },

  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})
