import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { generateIcons } from './scripts/generate-icons';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'bento:generate-icons',
      // Regenerate the icon imports on server start and on every build.
      configResolved() {
        generateIcons();
      },
      // In dev, regenerate when config.ts changes.
      configureServer(server) {
        const configPath = fileURLToPath(new URL('./config.ts', import.meta.url));
        server.watcher.add(configPath);
        server.watcher.on('change', (file) => {
          if (file === configPath) {
            generateIcons();
            server.ws.send({ type: 'full-reload' });
          }
        });
      },
    },
  ],
  resolve: {
    alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
  },
  base: '/',
  build: {
    target: 'esnext',
  },
});
