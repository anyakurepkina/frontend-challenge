import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
    base: '/frontend-challenge/',
    plugins: [react(), svgr({ svgrOptions: { svgo: false } })],
});
