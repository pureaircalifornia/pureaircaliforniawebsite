import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imagetools } from "vite-imagetools";
import prerender from "vite-plugin-prerender";

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
    // prerender({
    //   staticDir: path.join(__dirname, 'build'),
    //   routes: [
    //     '/',
    //     '/about',
    //     '/contact',
    //     '/quote',
    //     '/services',
    //     '/locations',
    //     '/blog',
    //     '/health-benefits',
    //     '/privacy-policy',
    //     '/terms-of-service',
    //     '/services/commercial-air-duct-cleaning',
    //     '/services/residential-air-duct-cleaning',
    //     '/services/residential-dryer-vent-cleaning',
    //     '/services/commercial-dryer-vent-cleaning',
    //     '/services/hvac-system-cleaning',
    //     '/services/dryer-vent-maintenance-program',
    //     '/services/residential-electrostatic-filter',
    //     '/services/commercial-electrostatic-filter',
    //     '/industries/healthcare',
    //     '/industries/hospitality',
    //     '/industries/restaurants',
    //     '/industries/education',
    //     '/industries/retail',
    //     '/industries/manufacturing',
    //     '/industries/commercial-real-estate',
    //     '/dryer-safety',
    //     '/compare',
    //     '/commercial-services',
    //     // Common locations
    //     '/locations/los-angeles',
    //     '/locations/beverly-hills',
    //     '/locations/santa-monica',
    //     '/locations/pasadena',
    //     '/locations/long-beach',
    //     '/locations/burbank',
    //     '/locations/glendale',
    //     '/locations/culver-city',
    //     '/locations/malibu',
    //     '/locations/hollywood',
    //     '/locations/downtown-la',
    //     '/locations/sherman-oaks',
    //     '/locations/encino',
    //     '/locations/studio-city',
    //     '/locations/van-nuys',
    //     '/locations/woodland-hills'
    //   ],
    //   renderer: '@prerenderer/renderer-puppeteer',
    //   rendererOptions: {
    //     maxConcurrentRoutes: 1,
    //     renderAfterTime: 500,
    //   },
    //   postProcess(renderedRoute) {
    //     renderedRoute.html = renderedRoute.html
    //       .replace(/http:/i, 'https:')
    //       .replace(/(https:\/\/)?(localhost|127\.0\.0\.1):\d*/i, 'https://www.pureaircalifornia.com');
    //   },
    // }),
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
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-slot', '@radix-ui/react-accordion', '@radix-ui/react-select'],
          motion: ['framer-motion'],
          icons: ['lucide-react'],
          vendor: ['@tanstack/react-query', 'react-hook-form', 'zod', 'date-fns']
        },
      },
    },
  },
}));
