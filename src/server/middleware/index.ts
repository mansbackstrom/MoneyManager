/**
 * @author Måns Bäckström
 *
 * src/server/middleware/index.ts
 */

import type { Request, Response, NextFunction } from 'express';

/**
 * Log incoming requests to console to see who accesses the server
 * on what route.
 *
 * @param req  The incoming request
 * @param res  The outgoing response
 * @param next Next function in middleware chain
 */
export function logIncomingToConsole(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    console.info(`Got request on ${req.path} (${req.method}).`);
    next();
}
