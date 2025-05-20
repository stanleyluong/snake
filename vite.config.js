import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // No explicit esbuild loader config needed if all JSX is in .jsx files
  // and @vitejs/plugin-react is used.
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
}); 