import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imagetools } from "vite-imagetools";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  server: {
    port: 3000,
    host: '0.0.0.0', // Explicitly bind to all interfaces
    allowedHosts: true,
    proxy: {
      // Handle API requests if needed
      '/api': {
        target: 'http://localhost:3000', // Update this if you have a backend
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    imagetools({
      defaultDirectives: (url) => {
        return new URLSearchParams({
          format: 'webp;jpg',
          quality: '80',
        });
      },
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Add this to handle client-side routing
  build: {
    outDir: 'build',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
}));
