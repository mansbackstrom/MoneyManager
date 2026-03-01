/**
 * @author Måns Bäckström
 *
 * src/server/index.ts
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import route from './route/index.js';
import * as middleware from './middleware/index.js';
import listRoutes from 'express-list-routes';
//import livereload from 'livereload';
//import connectLiveReload from "connect-livereload";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

const portEnv = process.env.DBWEBB_PORT;
const port = portEnv && !Number.isNaN(Number(portEnv)) ? Number(portEnv) : 1337;
const app = express();

const rootDir = process.cwd();

const http = await import('http');
const server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'views'));
// Middleware
app.use(middleware.logIncomingToConsole);

async function startServer() {
    if (process.env.NODE_ENV !== 'production') {
        // Serve public to dev
        app.use(express.static(path.join(rootDir, 'public')));

        // 2. Setup the Livereload watcher
        const livereload = await import('livereload');

        const liveReloadServer = livereload.createServer({
            exts: ['ejs'],
            host: '0.0.0.0',
            port: 35729,
        } as any);

        liveReloadServer.watch([
            path.join(rootDir, 'views'),
            path.join(__dirname, 'route'),
        ]);

        // 3. Setup Vite Dev Server
        const { createServer: createViteServer } = await import('vite');
        const vite = await createViteServer({
            appType: 'custom',
            root: process.cwd(),
            server: {
                middlewareMode: true,
                watch: {
                    usePolling: true,
                },
                hmr: {
                    server, // Express and vite runs on the same server
                },
            },
        });

        app.use(vite.middlewares);
    } else {
        app.use(express.static(path.join(rootDir, 'dist')));

        // Correct Manifest Path in produktion dist
        const manifestPath = path.join(
            rootDir,
            'dist',
            '.vite',
            'manifest.json'
        );

        try {
            const fs = await import('fs');
            if (fs.existsSync(manifestPath)) {
                const manifest = JSON.parse(
                    fs.readFileSync(manifestPath, 'utf-8')
                );
                // This makes 'manifest' available in every EJS file automatically
                app.locals.manifest = manifest;
                //console.log('manifest\n', manifest);
            } else {
                // Fallback so EJS doesnt die
                app.locals.manifest = {};
                console.error('Manifest file missing at:', manifestPath);
            }
        } catch (err) {
            app.locals.manifest = {};
            console.error('Failed to parse manifest:', err);
        }
    }

    startExpress();
}

startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});

// Start Express server function
function startExpress() {
    // Routes
    app.use('/manager', route);

    // Start server
    server.listen(port, () => {
        console.info(`Server listening on http://localhost:${port}`);
        if (process.env.NODE_ENV === 'production') {
            console.info('Available routes:');
            listRoutes(app);
        } else {
            console.info(
                'Skipping listRoutes() in dev (Vite middleware active)'
            );
        }
    });
}
