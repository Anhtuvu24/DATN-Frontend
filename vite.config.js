import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  optimizeDeps: {
    include: ['redux-thunk'],
  },
})
