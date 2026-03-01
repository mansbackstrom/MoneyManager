import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    build: {
        outDir: 'dist',
        manifest: true,
        emptyOutDir: true,

        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/client/main.ts'),
            },
        },
    },
    plugins: [
        tailwindcss(),
    ],
});
