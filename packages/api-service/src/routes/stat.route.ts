import { Router } from 'express';
import { expressRoutesAdapter } from 'ubialimv-common';

import authMiddleware from '../application/middlewares/auth.middleware';
import rootMiddleware from '../application/middlewares/root.middleware';
import makeLoadUserMiddleware from '../shared/factories/makeLoadUserMiddleware';
import makeStatController from '../shared/factories/makeStatController';

export default (router: Router): void => {
  router.get(
    '/stats',
    authMiddleware,
    makeLoadUserMiddleware().handle,
    rootMiddleware,
    expressRoutesAdapter(makeStatController()),
  );
};
