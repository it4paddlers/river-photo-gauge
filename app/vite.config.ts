import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig((configEnv) => {
  const isDevelopment = configEnv.mode === 'development';
  const env = loadEnv(configEnv.mode, process.cwd(), '');

  return {
    base: env.BASE_PATH ?? '/',
    plugins: [react()],
    css: {
      modules: {
        generateScopedName: isDevelopment
          ? '[name]__[local]__[hash:base64:5]'
          : '[hash:base64:5]',
      },
    },
  };
});
