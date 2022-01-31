import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import environments from '../../shared/environments';

const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const token = req.headers["authorization"];

        if (!token) {
            return res.status(401).send({ message: 'Not authorized. Authenticate first' });
        }

        return jwt.verify(token, environments.APP_SECRET, (err: any, decoded: any) => {
            if (err) {
                return res.status(401).send({ message: 'Error validating token' });
            }

            const currentUser = {
                email: decoded.email,
                root: decoded.root,
            }

            req.context = currentUser;

            return next();
        })
    } catch (error: any) {
        return res.status(500).send({ message: error.message });
    }

}

export default authMiddleware