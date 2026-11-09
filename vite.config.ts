import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const config = {
    plugins: [react()],
  };

  if (command !== 'serve') {
    return config;
  }

  const env = loadEnv(mode, process.cwd(), '');
  const keyPath = env.SSL_KEY_PATH;
  const certPath = env.SSL_CERT_PATH;

  if (!keyPath || !certPath) {
    throw new Error(
      'SSL_KEY_PATH and SSL_CERT_PATH must be set.',
    );
  }

  return {
    ...config,
    server: {
      port: 5173,
      https: {
        key: readFileSync(resolve(keyPath)),
        cert: readFileSync(resolve(certPath)),
      },
    },
  };
});
