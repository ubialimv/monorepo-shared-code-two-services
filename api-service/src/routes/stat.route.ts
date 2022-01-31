import { Router } from 'express';
import expressRouteAdapter from '../../../common/routes/adapters/express.routes.adapter';
import authMiddleware from '../application/middlewares/auth.middleware';
import rootMiddleware from '../application/middlewares/root.middleware';
import makeStatController from '../shared/factories/makeStatController';

export default (router: Router): void => {
    router.get(
        '/stats',
        authMiddleware,
        rootMiddleware,
        expressRouteAdapter(makeStatController()),
    );
};