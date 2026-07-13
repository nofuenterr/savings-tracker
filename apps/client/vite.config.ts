import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: 'Savings Tracker App',
        short_name: 'Savings Tracker',
        start_url: '/',
        display: 'standalone',
        background_color: '#0f0f0f',
        theme_color: '#ff5724',

        icons: [
          {
            src: '/pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  base: '/',
  build: {
    sourcemap: true,
  },
  server: {
    proxy: { '/api': 'http://localhost:3000' },
  },
});
