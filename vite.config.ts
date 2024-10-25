import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig, loadEnv } from 'vite';
import process from 'node:process';

// https://vitejs.dev/config/
export default defineConfig(({ mode, command}) => {
  console.log(`vite run:${command}\tmode:${mode}`);
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    define: {
      APP_ENV: JSON.stringify(env),
      'import.meta.env.VITE_VARA': JSON.stringify(env.VITE_VARA ?? 'xxx'),
      'import.meta.env.VITE_VARB': JSON.stringify(env.VITE_VARB ?? 'yyy'),
    },
    plugins: [VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src/service-worker',
      filename: 'sw.ts',
      registerType: 'autoUpdate',
      injectRegister: false,

      manifest: {
        name: 'vite-pwa-custom-env-sw-plugin',
        short_name: 'vite-pwa-custom-env-sw-plugin',
        description: 'vite-pwa-custom-env-sw-plugin',
        theme_color: '#ffffff',

        icons: [{
          src: 'pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png',
        }, {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        }, {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        }, {
          src: 'maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        }],
      },

      injectManifest: {
        minify: false,
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      },

      devOptions: {
        enabled: true,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    })],
  }
})
