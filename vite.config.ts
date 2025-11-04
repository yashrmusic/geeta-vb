import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // Set base path for GitHub Pages deployment
    const base = process.env.NODE_ENV === 'production' ? '/geeta-vb/' : '/';
    
    return {
      base,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      publicDir: 'public',
      define: {
        'process.env.API_KEY': JSON.stringify(env.API_KEY || env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Optimize build for faster loading
        minify: 'esbuild',
        target: 'esnext',
        rollupOptions: {
          output: {
            manualChunks: {
              'react-vendor': ['react', 'react-dom'],
              'gemini-vendor': ['@google/genai'],
            }
          }
        },
        // Optimize chunk size
        chunkSizeWarningLimit: 1000,
      },
      // Preload optimizations
      optimizeDeps: {
        include: ['react', 'react-dom'],
      }
    };
});
