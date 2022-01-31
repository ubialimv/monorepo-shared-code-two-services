import { NextFunction, Request, Response } from 'express';

const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { root } = req.context;

        if (root) return next();

        res.status(403).send({ message: 'User must be a root to access this route' });

    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }

}

export default authMiddleware