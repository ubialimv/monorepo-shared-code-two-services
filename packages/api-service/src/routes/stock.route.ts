import { Router } from 'express';
import { expressRoutesAdapter } from 'ubialimv-common';

import makeFindOneStockController from '../shared/factories/makeFindOneStockController';
import authMiddleware from '../application/middlewares/auth.middleware';

export default (router: Router): void => {
  router.get(
    '/stocks/:id',
    authMiddleware,
    expressRoutesAdapter(makeFindOneStockController()),
  );
};
