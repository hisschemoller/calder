/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '',
  root: './',
  plugins: [
    VitePWA({
      devOptions: {
        enabled: false,
      },
      includeAssets: ['struck-icon.svg', 'struck-icon-180.png'],
      manifest: {
        name: 'Calder',
        short_name: 'Calder',
        start_url: '/calder/index.html',
        scope: '/calder/',
        description: 'Percussive action with 3D physics.',
        theme_color: '#3778AF',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'calder-icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'calder-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      registerType: 'autoUpdate',
    }),
  ],
});
