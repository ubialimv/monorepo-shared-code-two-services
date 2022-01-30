import { Router } from 'express';
import expressRouteAdapter from '../../../common/routes/adapters/express.routes.adapter';
import makeRegisterUserController from '../shared/factories/makeRegisterUserController';

export default (router: Router): void => {
    router.post(
        '/user/register',
        expressRouteAdapter(makeRegisterUserController()),
    );
};