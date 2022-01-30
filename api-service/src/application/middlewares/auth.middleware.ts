import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import environments from '../../shared/environments';

const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.sendStatus(401);
    }

    return jwt.verify(token, environments.APP_SECRET, (err: any, decoded: any) => {
        if (err) {
            return res.sendStatus(403)
        }

        const currentUser = {
            email: decoded.email,
        }

        req.context = currentUser

        return next()
    })
}

export default authMiddleware