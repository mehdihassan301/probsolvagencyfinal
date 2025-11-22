import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
      }
    },
    build: {
      minify: 'terser',
      terserOptions: {
        format: {
          comments: false,  // remove ALL comments
          beautify: false   // ensure minified output
        },
        compress: {
          drop_console: true,   // optional: remove console logs
          drop_debugger: true,  // optional: remove debugger
          pure_funcs: ['console.info', 'console.debug'] // optional: remove other console types
        }
      },
      rollupOptions: {
        output: {
          banner: '', // remove any generated banner/license headers
          footer: ''
        }
      }
    }
  }
});
