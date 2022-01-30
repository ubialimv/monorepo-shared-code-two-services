import { Router } from 'express';
import expressRouteAdapter from '../../../common/routes/adapters/express.routes.adapter';
import makeFindOneStockController from '../shared/factories/makeFindOneStockController';
import authMiddleware from '../application/middlewares/auth.middleware'

export default (router: Router): void => {
    router.get(
        '/stocks/:id',
        authMiddleware,
        expressRouteAdapter(makeFindOneStockController()),
    );
};