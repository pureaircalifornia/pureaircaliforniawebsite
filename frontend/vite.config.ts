import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { assertProductionReleaseConfig } from "./scripts/release-config.mjs";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Vite replaces import.meta.env at build time. Fail before bundling when the
  // effective production values (including shell overrides) are incomplete.
  assertProductionReleaseConfig({ command, mode }, loadEnv(mode, __dirname, 'VITE_'));

  return {
    base: '/',
    server: {
      port: 3000,
      host: '127.0.0.1',
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
        },
      },
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: 'build',
      assetsDir: 'assets',
      target: 'es2020',
      cssCodeSplit: true,
      minify: 'esbuild',
      modulePreload: {
        polyfill: false,
      },
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            const normalized = id.replace(/\\/g, '/');
            if (!normalized.includes('/node_modules/')) return;

            // Core React runtime (include scheduler to prevent circular chunking with router)
            if (
              normalized.includes('/node_modules/react/') ||
              normalized.includes('/node_modules/react-dom/') ||
              normalized.includes('/node_modules/scheduler/')
            ) {
              return 'react';
            }

            // Client-side router
            if (
              normalized.includes('/node_modules/react-router') ||
              normalized.includes('/node_modules/@remix-run/')
            ) {
              return 'router';
            }

            // Isolate framer-motion so routes that don't import it never download ~108KB
            if (
              normalized.includes('/node_modules/framer-motion/') ||
              normalized.includes('/node_modules/motion-dom/') ||
              normalized.includes('/node_modules/motion-utils/')
            ) {
              return 'motion';
            }

            // Isolate recharts + d3 strictly into an admin-only lazy chunk
            if (
              normalized.includes('/node_modules/recharts/') ||
              normalized.includes('/node_modules/d3-') ||
              normalized.includes('/node_modules/victory-vendor/')
            ) {
              return 'charts';
            }

            // Radix UI primitives
            if (normalized.includes('/node_modules/@radix-ui/')) {
              return 'ui';
            }

            // Lucide icon set
            if (normalized.includes('/node_modules/lucide-react/')) {
              return 'icons';
            }

            // HTML sanitizer (only needed by BlogPost)
            if (normalized.includes('/node_modules/dompurify/')) {
              return 'sanitize';
            }

            // Data / form utilities
            if (
              normalized.includes('/node_modules/@tanstack/') ||
              normalized.includes('/node_modules/react-hook-form/') ||
              normalized.includes('/node_modules/@hookform/') ||
              normalized.includes('/node_modules/zod/') ||
              normalized.includes('/node_modules/date-fns/')
            ) {
              return 'vendor';
            }
          },
        },
      },
    },
  };
});
