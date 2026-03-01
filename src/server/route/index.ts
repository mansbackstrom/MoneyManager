/**
 * @author Måns Bäcktröm
 *
 * src/server/route/index.ts
 */

import { Router } from 'express';
import type { Request, Response } from 'express';

const router: Router = Router();

// Route for the root path /
router.get('/', (req: Request, res: Response) => {
    res.render('index', {
        process: { env: { NODE_ENV: process.env.NODE_ENV } },
    });
});

// Route for /about
router.get('/about', (req: Request, res: Response) => {
    res.send('About something');
});

export default router;
