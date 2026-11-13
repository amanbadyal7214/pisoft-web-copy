// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   assetsInclude: ['**/*.glb', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.mp4'],

//   build: {
//     minify: 'esbuild',
//     sourcemap: false,
//     assetsInlineLimit: 0,

//     rollupOptions: {
//       output: {
//         entryFileNames: 'assets/[name]-[hash].js',

//         manifest: false,

//         manualChunks (id) {
//           if (id.includes('node_modules')) {
//             return 'vendor'
//           }
//         }
//       }
//     },

//     target: 'esnext',
//     chunkSizeWarningLimit: 500
//   },
//   optimizeDeps: {
//     include: ['react', 'react-dom']
//   }
// })

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
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks (id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-vendor'
            }
            if (id.includes('rapier') || id.includes('@dimforge')) {
              return 'rapier-vendor'
            }
            if (id.includes('framer-motion') || id.includes('gsap')) {
              return 'animation-vendor'
            }
            return 'vendor'
          }
        }
      }
    },

    target: 'esnext',
    chunkSizeWarningLimit: 500
  },

  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})
