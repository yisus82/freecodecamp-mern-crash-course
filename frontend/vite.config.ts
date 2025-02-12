import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const mode = process.env.NODE_ENV || 'development';
const envFilePath = path.resolve(process.cwd(), '..');
const env = loadEnv(mode, envFilePath, '');
if (!env.BACKEND_SERVER || !env.BACKEND_PORT) {
  throw new Error('BACKEND_SERVER and BACKEND_PORT are required in .env file');
}
const backendUrl = `${env.BACKEND_SERVER}:${env.BACKEND_PORT}`;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      '/api': {
        target: backendUrl,
      },
    },
  },
});
