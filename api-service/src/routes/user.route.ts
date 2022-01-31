import { Router } from 'express';
import expressRouteAdapter from '../../../common/routes/adapters/express.routes.adapter';
import authMiddleware from '../application/middlewares/auth.middleware';
import makeHistoryUserController from '../shared/factories/makeHistoryUserController';
import makeLoginUserController from '../shared/factories/makeLoginUserController';
import makeRegisterUserController from '../shared/factories/makeRegisterUserController';

export default (router: Router): void => {
    router.post(
        '/users/register',
        expressRouteAdapter(makeRegisterUserController()),
    );

    router.post(
        '/users/login',
        expressRouteAdapter(makeLoginUserController()),
    )

    router.get(
        '/users/history',
        authMiddleware,
        expressRouteAdapter(makeHistoryUserController()),
    )
};