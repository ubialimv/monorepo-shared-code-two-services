import { Router } from 'express';
import expressRouteAdapter from '../../../common/routes/adapters/express.routes.adapter';
import makeFindOneController from '../shared/factories/makeFindOneController';

export default (router: Router): void => {
    router.get(
        '/stocks/:id',
        expressRouteAdapter(makeFindOneController()),
    );
};
